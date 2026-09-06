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

async function fetchJson(path) {
  const response = await fetch(`${getApiBase()}${path}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
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
