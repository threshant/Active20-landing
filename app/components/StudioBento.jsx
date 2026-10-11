"use client";

import { motion, useMotionValue, useReducedMotion, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { TitleReveal } from "./Reveal";

const CARD_SLIDE = [
  ["start 96%", "start 42%"],
  ["start 84%", "start 28%"],
  ["start 72%", "start 16%"],
  ["start 92%", "start 34%"],
];

const SLIDE_FROM_LEFT = [true, false, false, true];

const VISITS = [
  { id: "trial", name: "First visit", detail: "30 min", with: "with your certified coach" },
  { id: "strength", name: "Strength", detail: "20 min", with: "with your certified coach" },
  { id: "endurance", name: "Endurance", detail: "20 min", with: "with your certified coach" },
  { id: "performance", name: "Performance", detail: "20 min", with: "with your certified coach" },
  { id: "scan", name: "Body composition scan", detail: "included", with: "part of your first visit" },
];

const VISIT_LINES = [
  ["Meet your coach", "Included"],
  ["Body composition scan", "Included"],
  ["Strength, Endurance, Performance", "Sampled"],
  ["Recommended plan", "Included"],
];

const BLOCKS = 18;

export default function StudioBento() {
  const [selectedId, setSelectedId] = useState(VISITS[0].id);
  const selected = VISITS.find((visit) => visit.id === selectedId) ?? VISITS[0];

  return (
    <section id="training" className="studio-bento-section" aria-labelledby="training-title">
      <header className="bento-heading">
        <TitleReveal id="training-title">
          A session you can follow,
          <br />
          from first visit to your plan
        </TitleReveal>
      </header>

      <div className="bento-grid">
        <SlideCard order={0} className="bento-panel bento-book">
          <div className="bento-panel-top">
            <TitleReveal as="h3">Book a trial</TitleReveal>
            <p className="bento-live">
              <span aria-hidden="true" />
              30-min visit
            </p>
          </div>
          <p className="bento-panel-lead">
            Pick a session, then book a time. Your first visit is 30 minutes,
            with a coach from the start.
          </p>
          <p className="bento-field-label">Session</p>
          <div className="bento-options" role="radiogroup" aria-label="Session">
            {VISITS.map((visit) => {
              const isSelected = visit.id === selected.id;
              return (
                <button
                  key={visit.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className="bento-option"
                  data-selected={isSelected ? "true" : "false"}
                  onClick={() => setSelectedId(visit.id)}
                >
                  {visit.name}
                  <span> · {visit.detail}</span>
                </button>
              );
            })}
          </div>
          <div className="bento-book-foot">
            <p>
              <span>Your visit</span>
              <strong>{selected.name}</strong>
              <em>{selected.with}</em>
            </p>
            <Link href="/book-trial" className="bento-book-btn">
              Book a trial
              <Arrow />
            </Link>
          </div>
        </SlideCard>

        <div className="bento-stack">
          <SlideCard order={1} className="bento-panel bento-plan">
            <div className="bento-panel-top">
              <TitleReveal as="h3">Training plan</TitleReveal>
              <p className="bento-pill">On track</p>
            </div>
            <div className="bento-plan-main">
              <p className="bento-plan-figure">
                <strong>20</strong>
                <span>min</span>
              </p>
              <p className="bento-plan-next">
                <span>First visit</span>
                <strong>30 min</strong>
              </p>
            </div>
            <div className="bento-blocks" aria-hidden="true">
              {Array.from({ length: BLOCKS }, (_, index) => (
                <span
                  key={index}
                  data-fill={index < 11 ? "full" : index < 14 ? "mid" : "empty"}
                />
              ))}
            </div>
            <div className="bento-block-labels">
              <span>Warm-up</span>
              <span>Full body</span>
            </div>
            <div className="bento-stats">
              <p>
                <span>Coach with you</span>
                <strong>1:1</strong>
              </p>
              <p>
                <span>Styles in a trial</span>
                <strong>3</strong>
              </p>
            </div>
          </SlideCard>

          <SlideCard order={3} className="bento-panel bento-visit">
            <div className="bento-panel-top">
              <TitleReveal as="h3">First visit</TitleReveal>
              <p className="bento-pill bento-pill-quiet">30 minutes</p>
            </div>
            <ul className="bento-lines">
              {VISIT_LINES.map(([label, value]) => (
                <li key={label}>
                  <span>{label}</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
            <div className="bento-total">
              <p>
                <span>You leave with</span>
                <strong>A plan</strong>
              </p>
              <p>Mapped with your coach after the session.</p>
            </div>
          </SlideCard>
        </div>

        <SlideCard order={2} className="bento-panel bento-promo">
          <p className="bento-promo-kicker">Every session</p>
          <TitleReveal as="h3">Stay with the work, twenty minutes at a time</TitleReveal>
          <p>
            EMS and your coach, in one focused session. The suit does the deep
            muscle work while you move through simple exercises.
          </p>
          <Link href="/book-trial" className="bento-promo-link">
            Book a trial
            <Arrow />
          </Link>
          <div className="bento-promo-photo">
            <Image
              src="/images/holders/ems-tech-4.png"
              alt="Member training in the EMS suit"
              fill
              sizes="(max-width: 899px) 92vw, 380px"
              className="object-cover"
              style={{ objectPosition: "center 38%" }}
            />
          </div>
        </SlideCard>
      </div>
    </section>
  );
}

function SlideCard({ order, className, children }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const fromLeft = SLIDE_FROM_LEFT[order];
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: CARD_SLIDE[order],
  });
  const x = useMotionValue(0);
  const zIndex = useMotionValue(1);

  useLayoutEffect(() => {
    if (reduce) {
      x.set(0);
      zIndex.set(1);
      return undefined;
    }

    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = scrollYProgress.get();
      const offscreen = fromLeft
        ? -(rect.left + rect.width)
        : window.innerWidth - rect.left;
      x.set(offscreen * (1 - progress));
      zIndex.set(progress < 0.98 ? 2 : 1);
    };

    update();
    const unsubscribe = scrollYProgress.on("change", update);
    window.addEventListener("resize", update);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", update);
    };
  }, [fromLeft, reduce, scrollYProgress, x, zIndex]);

  return (
    <div className="bento-slide" ref={ref}>
      <motion.article
        className={className}
        style={reduce ? undefined : { x, zIndex, position: "relative" }}
      >
        {children}
      </motion.article>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M3 7h8M7.5 3.5 11 7 7.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
