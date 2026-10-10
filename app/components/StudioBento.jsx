"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const CARDS = [
  {
    id: "session",
    motion: "drift",
    title: "Twenty minutes",
    body: "A full-body EMS session with your coach. Simple, guided exercises and deeper muscle work, finished in 20 minutes.",
    src: "/images/holders/how-it-works.png",
    alt: "Member training with battle ropes in an EMS suit",
    objectPosition: "72% 42%",
  },
  {
    id: "suit",
    motion: "breathe",
    title: "Suit and coach",
    body: "No gym clothes needed. You train in a sterilized EMS suit while your coach adjusts the intensity live.",
    src: "/images/holders/ems-tech-4.png",
    alt: "Close view of the EMS suit, training pack, and resistance band",
    objectPosition: "76% 28%",
  },
  {
    id: "joints",
    motion: "drift-y",
    title: "Easy on joints",
    body: "The effort stays in the muscle, so you can train with your coach without the pounding of a conventional workout.",
    src: "/images/holders/gentle-on-joints.png",
    alt: "Member moving through a low-impact drill in an EMS suit",
    objectPosition: "24% 16%",
  },
];

const STYLES = [
  {
    name: "Strength",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M6.5 12.5v7M10.5 8.5v15M21.5 8.5v15M25.5 12.5v7M10.5 16h11"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Endurance",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M16 8.5a7.5 7.5 0 1 1-6.2 3.3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M8.2 7.2v5.1h5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Performance",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M17.6 6.2 8.4 17.4h6.6l-1.5 8.4 10.1-12.2h-6.8l.8-7.4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function PhotoCard({ card }) {
  return (
    <article
      className={`bento-card bento-photo bento-${card.id}`}
      data-bento-card
      data-motion={card.motion}
    >
      <div className={`bento-media bento-media-${card.motion}`}>
        <Image
          src={card.src}
          alt={card.alt}
          fill
          sizes={
            card.id === "session"
              ? "(max-width: 899px) 92vw, 760px"
              : "(max-width: 899px) 92vw, 640px"
          }
          className="object-cover"
          style={{ objectPosition: card.objectPosition }}
        />
      </div>
      <div className="bento-scrim" aria-hidden="true" />
      <div className="bento-photo-copy">
        <h3>{card.title}</h3>
        <p>{card.body}</p>
      </div>
    </article>
  );
}

export default function StudioBento() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const cards = [...root.querySelectorAll("[data-bento-card]")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      cards.forEach((card) => card.classList.add("is-in"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.38, rootMargin: "0px 0px -6% 0px" },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="studio-bento-section"
      aria-label="An Active20 session"
    >
      <div className="studio-bento">
        {CARDS.filter((card) => card.id === "session").map((card) => (
          <PhotoCard key={card.id} card={card} />
        ))}
        {CARDS.filter((card) => card.id === "suit").map((card) => (
          <PhotoCard key={card.id} card={card} />
        ))}

        <article
          className="bento-card bento-surface bento-styles"
          data-bento-card
          data-motion="icons"
        >
          <h3>How you train</h3>
          <p>
            Your trial samples each style. Your coach keeps the session matched
            to your level and goals.
          </p>
          <ul className="bento-style-row">
            {STYLES.map((style) => (
              <li key={style.name} className="bento-style">
                <span className="bento-style-icon">{style.icon}</span>
                <span className="bento-style-name">{style.name}</span>
              </li>
            ))}
          </ul>
        </article>

        {CARDS.filter((card) => card.id === "joints").map((card) => (
          <PhotoCard key={card.id} card={card} />
        ))}

        <article
          className="bento-card bento-surface bento-plan"
          data-bento-card
          data-motion="draw"
        >
          <h3>After the trial</h3>
          <p>
            You and your coach go through how the session felt and map out a
            plan that fits you.
          </p>
          <div className="bento-track-wrap">
            <div className="bento-track" aria-hidden="true">
              <span className="bento-track-line" />
              <span className="bento-track-dot" />
              <span className="bento-track-dot" />
              <span className="bento-track-dot bento-track-dot-accent" />
            </div>
            <div className="bento-track-labels">
              <span>Trial</span>
              <span>Review</span>
              <span>Plan</span>
            </div>
          </div>
        </article>

        <article
          className="bento-card bento-photo bento-book"
          data-bento-card
          data-motion="float"
        >
          <div className="bento-media bento-media-book">
            <Image
              src="/images/holders/hero.png"
              alt="Members training in EMS suits"
              fill
              sizes="(max-width: 899px) 92vw, 360px"
              className="object-cover"
              style={{ objectPosition: "center 42%" }}
            />
          </div>
          <div className="bento-scrim" aria-hidden="true" />
          <div className="bento-photo-copy">
            <h3>Book a trial</h3>
            <p>No pressure. Just 20 minutes.</p>
            <Link href="/book-trial" className="bento-book-link">
              <span className="bento-book-copy">
                <span className="bento-book-kicker">
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                    <circle
                      cx="8"
                      cy="8"
                      r="6.15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M8 4.7V8.1l2.15 1.35"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  20-min session
                </span>
                <span className="bento-book-label">Book a trial</span>
              </span>
              <span className="bento-book-arrow" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path
                    d="M3.5 9h10M9.75 5.25 13.5 9l-3.75 3.75"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
