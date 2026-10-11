"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    meta: "Before you arrive",
    title: "Prepare for your visit",
    src: "/images/holders/ems-tech-4.png",
    alt: "Member wearing the EMS suit and training pack",
    objectPosition: "72% center",
  },
  {
    meta: "Coach and scan",
    title: "Get suited up",
    src: "/images/holders/gentle-on-joints.png",
    alt: "Member training in the EMS suit",
    objectPosition: "32% 28%",
  },
  {
    meta: "20-minute session",
    title: "Turn it on",
    src: "/images/holders/how-it-works.png",
    alt: "Member training with battle ropes in the EMS suit",
    objectPosition: "70% center",
  },
  {
    meta: "Your plan",
    title: "Unlock your potential",
    src: "/images/holders/advance-fitness.png",
    alt: "Members training together in EMS suits",
    objectPosition: "center 30%",
  },
];

const FACES = STEPS.slice(0, 3);

export default function HowItWorks() {
  const railRef = useRef(null);
  const preference = useReducedMotion();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    const update = () => {
      setAtStart(rail.scrollLeft <= 2);
      setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2);
    };

    update();
    rail.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(rail);

    return () => {
      rail.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  const scrollByCard = (direction) => {
    const rail = railRef.current;
    const card = rail?.querySelector(".how-works-card");
    const track = rail?.querySelector("ol");
    if (!rail || !card || !track) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 14;
    const step = card.getBoundingClientRect().width + gap;
    const index = Math.round(rail.scrollLeft / step);
    const maxIndex = Math.max(0, track.children.length - 1);
    const next = Math.min(Math.max(index + direction, 0), maxIndex);
    rail.scrollTo({
      left: next * step,
      behavior: preference ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="how-it-works"
      className="how-works scroll-mt-24"
      aria-labelledby="how-it-works-title"
    >
      <div className="how-works-head">
        <div>
          <p className="how-works-kicker">How it works /</p>
          <h2 id="how-it-works-title">
            How does
            <br />
            it work
          </h2>
        </div>
        <p className="how-works-lead">
          During an ACTIVE20 session, low-impact electrical impulses activate
          multiple muscle groups at once while you move through simple, guided
          exercises with your coach.
        </p>
      </div>

      <div className="how-works-stage">
        <div className="how-works-aside">
          <div>
            <div className="how-works-stat">
              <div className="how-works-faces" aria-hidden="true">
                {FACES.map((face) => (
                  <span key={face.src}>
                    <Image
                      src={face.src}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                      style={{ objectPosition: face.objectPosition }}
                    />
                  </span>
                ))}
              </div>
              <p>
                <strong>20</strong>
                <span>minutes per session</span>
              </p>
            </div>
            <p className="how-works-note">
              Swipe through a first visit, from preparation to your plan.
            </p>
          </div>
          <div className="how-works-controls">
            <button
              type="button"
              aria-label="Previous step"
              disabled={atStart}
              onClick={() => scrollByCard(-1)}
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next step"
              disabled={atEnd}
              onClick={() => scrollByCard(1)}
            >
              <Chevron direction="right" />
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="how-works-rail"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              scrollByCard(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              scrollByCard(-1);
            }
          }}
        >
          <ol>
            {STEPS.map((step) => (
              <li key={step.title} className="how-works-card">
                <Image
                  src={step.src}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 899px) 78vw, 280px"
                  className="object-cover"
                  style={{ objectPosition: step.objectPosition }}
                />
                <div className="how-works-card-copy">
                  <p>{step.meta}</p>
                  <h3>{step.title}</h3>
                </div>
                <span className="how-works-card-arrow" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Chevron({ direction }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d={direction === "left" ? "M10 3.5 5.5 8 10 12.5" : "M6 3.5 10.5 8 6 12.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden="true">
      <path
        d="M4 11 11 4M6.2 4H11v4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
