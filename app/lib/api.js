const DEFAULT_API_BASE =
  "https://laravel-production-cecb.up.railway.app/api";

function getApiBase() {
  const configured = process.env.NEXT_PUBLIC_API_BASE_URL;
  const base = (configured || DEFAULT_API_BASE).replace(/\/+$/, "");
  return base.toLowerCase().endsWith("/api") ? base : `${base}/api`;
}

function asArray(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.slots)) {
    return payload.slots;
  }

  return [];
}

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

function readErrorMessage(payload, status) {
  if (typeof payload?.message === "string" && payload.message.trim()) {
    return payload.message;
  }

  const fieldErrors = payload?.errors;
  if (fieldErrors && typeof fieldErrors === "object") {
    const firstError = Object.values(fieldErrors).flat()[0];
    if (typeof firstError === "string" && firstError.trim()) {
      return firstError;
    }
  }

  return `Request failed with status ${status}`;
}

async function parseJson(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  return { message: await response.text() };
}

async function fetchJson(path) {
  const response = await fetch(`${getApiBase()}${path}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  const payload = await parseJson(response);

  if (!response.ok) {
    throw new ApiError(readErrorMessage(payload, response.status), response.status, payload);
  }

  return payload;
}

async function postJson(path, body) {
  const response = await fetch(`${getApiBase()}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const payload = await parseJson(response);

  if (!response.ok) {
    throw new ApiError(readErrorMessage(payload, response.status), response.status, payload);
  }

  return payload;
}

export async function fetchLocations() {
  try {
    return asArray(await fetchJson("/v2/locations/all"));
  } catch {
    return asArray(await fetchJson("/locations/all"));
  }
}

export async function fetchTrialServices(branchId) {
  const query = new URLSearchParams({
    branch_id: branchId,
    isTrial: "1",
  });

  return asArray(await fetchJson(`/services/all?${query}`));
}

export async function fetchTrialAvailableTimeSlots({ serviceId, date }) {
  const query = new URLSearchParams({
    service_id: serviceId,
    date,
  });

  return asArray(
    await fetchJson(`/bookings/trial-available-time-slots?${query}`),
  );
}

export async function createTrialBookingOrder(payload) {
  try {
    return await postJson("/bookings/trial-booking-order", payload);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return postJson("/v2/bookings/trial-booking-order", payload);
    }

    throw error;
  }
}

export async function verifyPineLabsPayment(orderId) {
  try {
    return await postJson("/payments/pinelabs-verify", { order_id: orderId });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return postJson("/v2/payments/pinelabs-verify", { order_id: orderId });
    }

    throw error;
  }
}

export function normalizeTrialSlot(slot, durationMinutes = 60) {
  const time = String(slot?.time || slot?.time_slot || "");
  const available = slot?.available !== false && !slot?.locked;

  return {
    time,
    label: time ? formatSlotLabel(time, durationMinutes) : "",
    trainer_id: String(slot?.trainer_id || ""),
    device_id: String(slot?.device_id || slot?.trainer_id || ""),
    available,
  };
}

export function formatSlotLabel(time, durationMinutes = 60) {
  const [hours, minutes] = time.split(":").map(Number);
  const start = new Date();
  start.setHours(hours, minutes, 0, 0);

  const end = new Date(start);
  end.setMinutes(end.getMinutes() + Number(durationMinutes) || 60);

  return `${formatClock(start)} – ${formatClock(end)}`;
}

function formatClock(date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
