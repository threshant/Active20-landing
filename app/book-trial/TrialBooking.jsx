"use client";

import { useEffect, useMemo, useState } from "react";
import Footer2 from "../components/Footer2";
import SiteHeader from "../components/SiteHeader";
import {
  fetchLocations,
  fetchTrialAvailableTimeSlots,
  fetchTrialServices,
  normalizeTrialSlot,
} from "../lib/api";

const STEPS = [
  { id: 1, label: "Location" },
  { id: 2, label: "Date & time" },
  { id: 3, label: "Your details" },
];

const DATE_COUNT = 14;

function getUpcomingDates() {
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let index = 0; index < DATE_COUNT; index += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    dates.push(date);
  }

  return dates;
}

function toDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatLongDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone);
}

const fieldClassName =
  "mt-2 w-full rounded-[0.7rem] border border-[rgba(132,169,193,0.26)] bg-[rgba(8,16,24,0.72)] px-4 py-3 text-[0.95rem] text-[#eff8ff] outline-none transition-[border-color,box-shadow] [font-family:var(--font-inter)] placeholder:text-[rgba(174,191,201,0.55)] focus:border-[#80c5d5] focus:shadow-[0_0_0_3px_rgba(128,197,213,0.16)]";

export default function TrialBooking() {
  const [step, setStep] = useState(1);
  const [locations, setLocations] = useState([]);
  const [locationsError, setLocationsError] = useState("");
  const [isLocationsLoading, setIsLocationsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(toDateValue(new Date()));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotsError, setSlotsError] = useState("");
  const [isSlotsLoading, setIsSlotsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dates = useMemo(() => getUpcomingDates(), []);

  useEffect(() => {
    let cancelled = false;

    const loadLocations = async () => {
      setIsLocationsLoading(true);
      setLocationsError("");

      try {
        const items = await fetchLocations();
        if (cancelled) {
          return;
        }

        setLocations(items);
        if (items.length === 0) {
          setLocationsError("No studios are available right now.");
        }
      } catch {
        if (!cancelled) {
          setLocationsError("Unable to load studios. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setIsLocationsLoading(false);
        }
      }
    };

    loadLocations();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedLocation?.branch_id) {
      setSelectedService(null);
      setSlots([]);
      return undefined;
    }

    let cancelled = false;

    const loadServices = async () => {
      setIsSlotsLoading(true);
      setSlotsError("");
      setSelectedSlot(null);
      setSlots([]);

      try {
        const services = await fetchTrialServices(selectedLocation.branch_id);
        if (cancelled) {
          return;
        }

        const firstService = services[0] || null;
        setSelectedService(firstService);

        if (!firstService) {
          setSlotsError("No trial service is available at this studio.");
          setIsSlotsLoading(false);
        }
      } catch {
        if (!cancelled) {
          setSelectedService(null);
          setSlotsError("Unable to load trial services. Please try again.");
          setIsSlotsLoading(false);
        }
      }
    };

    loadServices();

    return () => {
      cancelled = true;
    };
  }, [selectedLocation]);

  useEffect(() => {
    if (!selectedService?.service_id || !selectedDate) {
      setSlots([]);
      return undefined;
    }

    let cancelled = false;

    const loadSlots = async () => {
      setIsSlotsLoading(true);
      setSlotsError("");
      setSelectedSlot(null);

      try {
        const rawSlots = await fetchTrialAvailableTimeSlots({
          serviceId: selectedService.service_id,
          date: selectedDate,
        });
        const duration = Number(selectedService.duration) || 60;
        const nextSlots = rawSlots
          .map((slot) => normalizeTrialSlot(slot, duration))
          .filter((slot) => slot.time && slot.available);

        if (!cancelled) {
          setSlots(nextSlots);
        }
      } catch {
        if (!cancelled) {
          setSlots([]);
          setSlotsError("Unable to load time slots. Please try another date.");
        }
      } finally {
        if (!cancelled) {
          setIsSlotsLoading(false);
        }
      }
    };

    loadSlots();

    return () => {
      cancelled = true;
    };
  }, [selectedService, selectedDate]);

  const filteredLocations = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return locations;
    }

    return locations.filter((location) => {
      const name = String(location.branch_name || "").toLowerCase();
      const address = String(location.address || "").toLowerCase();
      return name.includes(query) || address.includes(query);
    });
  }, [locations, search]);

  const canContinue = () => {
    if (step === 1) {
      return Boolean(selectedLocation?.branch_id);
    }

    if (step === 2) {
      return Boolean(selectedService?.service_id && selectedDate && selectedSlot);
    }

    return (
      fullName.trim().length >= 2 &&
      isValidPhone(phone.trim()) &&
      isValidEmail(email.trim())
    );
  };

  const goNext = () => {
    if (!canContinue()) {
      return;
    }

    setFormError("");
    setStep((current) => Math.min(current + 1, 3));
  };

  const goBack = () => {
    setFormError("");
    setStep((current) => Math.max(current - 1, 1));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!canContinue()) {
      setFormError("Please enter a valid name, phone number, and email.");
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <main className="relative isolate flex w-full justify-center overflow-x-hidden bg-[#01111e] p-0">
      <div className="relative z-[1] w-[min(100%,1440px)] px-4 pb-6 max-[899px]:px-3 max-[899px]:pb-4 min-[900px]:px-[1.2rem]">
        <SiteHeader variant="solid" />

        <section className="mx-auto w-full max-w-[58rem] pt-[clamp(5.6rem,12vw,7.2rem)] min-[900px]:pt-[clamp(6.6rem,10vw,7.8rem)]">
          <p className="m-0 text-[0.78rem] tracking-[0.12em] text-[#80c5d5] [font-family:var(--font-inter)]">
            FREE TRIAL SESSION
          </p>
          <h1 className="mt-3 text-[clamp(1.8rem,6vw,2.8rem)] leading-[1.05] text-[#80c5d5] [font-family:var(--font-new-science-extended)] min-[900px]:text-[2.6rem]">
            Book your trial session
          </h1>
          <p className="mt-3 max-w-[38rem] text-[0.92rem] leading-[1.55] text-[#d6e3ee] [font-family:var(--font-inter)] min-[900px]:text-[1rem]">
            Choose a studio, pick a time that works, and leave your details. We
            will confirm your 20-minute EMS trial.
          </p>

          <ol className="mt-8 grid grid-cols-3 gap-2" aria-label="Booking steps">
            {STEPS.map((item, index) => {
              const isComplete = step > item.id;
              const isCurrent = step === item.id;

              return (
                <li key={item.id} className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[0.72rem] font-bold ${
                        isCurrent
                          ? "bg-[#e8fb76] text-[#111]"
                          : isComplete
                            ? "bg-[#80c5d5] text-[#01111e]"
                            : "border border-[rgba(132,169,193,0.35)] text-[#aebfc9]"
                      }`}
                    >
                      {isComplete ? "✓" : item.id}
                    </span>
                    <span
                      className={`truncate text-[0.68rem] tracking-[0.08em] uppercase [font-family:var(--font-inter)] min-[900px]:text-[0.74rem] ${
                        isCurrent ? "text-[#eff8ff]" : "text-[#aebfc9]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {index < STEPS.length - 1 ? (
                    <div
                      className={`mt-3 h-px w-full ${
                        step > item.id ? "bg-[#80c5d5]" : "bg-[rgba(132,169,193,0.22)]"
                      }`}
                    />
                  ) : (
                    <div className="mt-3 h-px w-full bg-transparent" />
                  )}
                </li>
              );
            })}
          </ol>

          <div className="mt-2 rounded-[1rem] border border-[rgba(132,169,193,0.26)] bg-[linear-gradient(160deg,rgba(36,48,60,0.2)_0%,rgba(11,16,24,0.46)_100%)] p-4 min-[900px]:p-6">
            {isSubmitted ? (
              <div className="py-8 text-center">
                <p className="m-0 text-[0.78rem] tracking-[0.12em] text-[#80c5d5] [font-family:var(--font-inter)]">
                  REQUEST RECEIVED
                </p>
                <h2 className="mt-3 text-[1.6rem] leading-tight text-[#eff8ff] [font-family:var(--font-new-science-extended)]">
                  You are all set
                </h2>
                <p className="mx-auto mt-3 max-w-[28rem] text-[0.95rem] leading-[1.55] text-[#d6e3ee] [font-family:var(--font-inter)]">
                  {`${fullName}, we have your trial request at ${selectedLocation?.branch_name} on ${formatLongDate(selectedDate)} at ${selectedSlot?.label}. We will reach you at ${phone} and ${email}.`}
                </p>
              </div>
            ) : null}

            {!isSubmitted && step === 1 ? (
              <div>
                <h2 className="m-0 text-[1.15rem] text-[#eff8ff] [font-family:var(--font-new-science-extended)]">
                  Search and select a location
                </h2>
                <label className="mt-4 block">
                  <span className="sr-only">Search studios</span>
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by studio name or address"
                    className={fieldClassName}
                  />
                </label>

                {isLocationsLoading ? (
                  <p className="mt-6 text-[0.92rem] text-[#aebfc9] [font-family:var(--font-inter)]">
                    Loading studios...
                  </p>
                ) : null}

                {locationsError ? (
                  <p className="mt-6 text-[0.92rem] text-[#f3b4b4] [font-family:var(--font-inter)]">
                    {locationsError}
                  </p>
                ) : null}

                {!isLocationsLoading && !locationsError && filteredLocations.length === 0 ? (
                  <p className="mt-6 text-[0.92rem] text-[#aebfc9] [font-family:var(--font-inter)]">
                    No studios match that search.
                  </p>
                ) : null}

                <div className="mt-5 grid grid-cols-1 gap-3 min-[640px]:grid-cols-2">
                  {filteredLocations.map((location) => {
                    const isSelected =
                      selectedLocation?.branch_id === location.branch_id;

                    return (
                      <button
                        key={location.branch_id}
                        type="button"
                        onClick={() => setSelectedLocation(location)}
                        className={`rounded-[0.8rem] border p-4 text-left transition-[border-color,background-color] ${
                          isSelected
                            ? "border-[#e8fb76] bg-[rgba(232,251,118,0.08)]"
                            : "border-[rgba(132,169,193,0.26)] bg-[rgba(8,16,24,0.5)] hover:border-[rgba(128,197,213,0.55)]"
                        }`}
                      >
                        <strong className="block text-[1rem] font-semibold text-[#eff8ff] [font-family:var(--font-new-science)]">
                          {location.branch_name}
                        </strong>
                        <span className="mt-2 block text-[0.86rem] leading-[1.45] text-[#aebfc9] [font-family:var(--font-inter)]">
                          {location.address || "Address coming soon"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {!isSubmitted && step === 2 ? (
              <div>
                <h2 className="m-0 text-[1.15rem] text-[#eff8ff] [font-family:var(--font-new-science-extended)]">
                  Choose a date
                </h2>
                <p className="mt-2 text-[0.86rem] text-[#aebfc9] [font-family:var(--font-inter)]">
                  {selectedLocation?.branch_name}
                  {selectedService?.name || selectedService?.service_name
                    ? ` · ${selectedService.name || selectedService.service_name}`
                    : ""}
                </p>

                <div className="-mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-2">
                  {dates.map((date) => {
                    const value = toDateValue(date);
                    const isSelected = selectedDate === value;

                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setSelectedDate(value)}
                        className={`w-[4.6rem] shrink-0 rounded-[0.75rem] border px-2 py-3 text-center ${
                          isSelected
                            ? "border-[#e8fb76] bg-[rgba(232,251,118,0.1)] text-[#eff8ff]"
                            : "border-[rgba(132,169,193,0.26)] bg-[rgba(8,16,24,0.5)] text-[#d6e3ee]"
                        }`}
                      >
                        <span className="block text-[0.62rem] uppercase tracking-[0.08em] text-[#80c5d5] [font-family:var(--font-inter)]">
                          {date.toLocaleDateString("en-IN", { weekday: "short" })}
                        </span>
                        <span className="mt-1 block text-[1.15rem] font-semibold leading-none [font-family:var(--font-new-science)]">
                          {date.getDate()}
                        </span>
                        <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.06em] text-[#aebfc9] [font-family:var(--font-inter)]">
                          {date.toLocaleDateString("en-IN", { month: "short" })}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <h3 className="mt-6 text-[0.95rem] text-[#eff8ff] [font-family:var(--font-new-science-extended)]">
                  Available time slots
                </h3>

                {isSlotsLoading ? (
                  <p className="mt-4 text-[0.92rem] text-[#aebfc9] [font-family:var(--font-inter)]">
                    Checking available times...
                  </p>
                ) : null}

                {slotsError ? (
                  <p className="mt-4 text-[0.92rem] text-[#f3b4b4] [font-family:var(--font-inter)]">
                    {slotsError}
                  </p>
                ) : null}

                {!isSlotsLoading && !slotsError && slots.length === 0 ? (
                  <p className="mt-4 text-[0.92rem] text-[#aebfc9] [font-family:var(--font-inter)]">
                    No slots left for this date. Please pick another day.
                  </p>
                ) : null}

                <div className="mt-4 grid grid-cols-2 gap-2 min-[640px]:grid-cols-3">
                  {slots.map((slot) => {
                    const isSelected =
                      selectedSlot?.time === slot.time &&
                      selectedSlot?.device_id === slot.device_id;

                    return (
                      <button
                        key={`${slot.time}-${slot.device_id}`}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`rounded-[0.7rem] border px-3 py-3 text-[0.82rem] [font-family:var(--font-inter)] ${
                          isSelected
                            ? "border-[#e8fb76] bg-[rgba(232,251,118,0.1)] text-[#eff8ff]"
                            : "border-[rgba(132,169,193,0.26)] bg-[rgba(8,16,24,0.5)] text-[#d6e3ee] hover:border-[rgba(128,197,213,0.55)]"
                        }`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {!isSubmitted && step === 3 ? (
              <form onSubmit={handleSubmit}>
                <h2 className="m-0 text-[1.15rem] text-[#eff8ff] [font-family:var(--font-new-science-extended)]">
                  Your details
                </h2>
                <p className="mt-2 text-[0.86rem] text-[#aebfc9] [font-family:var(--font-inter)]">
                  {selectedLocation?.branch_name} · {formatLongDate(selectedDate)}{" "}
                  · {selectedSlot?.label}
                </p>

                <label className="mt-5 block">
                  <span className="text-[0.78rem] tracking-[0.08em] uppercase text-[#80c5d5] [font-family:var(--font-inter)]">
                    Full name
                  </span>
                  <input
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Your full name"
                    className={fieldClassName}
                  />
                </label>

                <label className="mt-4 block">
                  <span className="text-[0.78rem] tracking-[0.08em] uppercase text-[#80c5d5] [font-family:var(--font-inter)]">
                    Phone number
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="10-digit mobile number"
                    className={fieldClassName}
                  />
                </label>

                <label className="mt-4 block">
                  <span className="text-[0.78rem] tracking-[0.08em] uppercase text-[#80c5d5] [font-family:var(--font-inter)]">
                    Email
                  </span>
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@email.com"
                    className={fieldClassName}
                  />
                </label>

                {formError ? (
                  <p className="mt-4 text-[0.86rem] text-[#f3b4b4] [font-family:var(--font-inter)]">
                    {formError}
                  </p>
                ) : null}
              </form>
            ) : null}

            {!isSubmitted ? (
              <div className="mt-6 flex flex-col-reverse gap-3 min-[640px]:flex-row min-[640px]:justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 1}
                  className="inline-flex min-h-[2.7rem] items-center justify-center rounded-full border border-white/80 bg-transparent px-[1.3rem] text-[0.72rem] font-bold tracking-[0.1em] text-white disabled:cursor-not-allowed disabled:opacity-35"
                >
                  BACK
                </button>
                <button
                  type="button"
                  onClick={step === 3 ? handleSubmit : goNext}
                  disabled={!canContinue()}
                  className="inline-flex min-h-[2.7rem] items-center justify-center rounded-full border border-[#e8fb76] bg-[#e8fb76] px-[1.4rem] text-[0.72rem] font-bold tracking-[0.1em] text-[#111] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {step === 3 ? "CONFIRM TRIAL" : "CONTINUE"}
                </button>
              </div>
            ) : null}
          </div>
        </section>

        <Footer2 />
      </div>
    </main>
  );
}
