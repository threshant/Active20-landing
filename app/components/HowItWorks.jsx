"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { TitleReveal } from "./Reveal";

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
  const stackRef = useRef(null);

  useEffect(() => {
    const stack = stackRef.current;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!stack || motionQuery.matches) return undefined;

    const cards = [...stack.querySelectorAll(".how-works-card")];
    let frame = 0;

    const update = () => {
      frame = 0;
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next) {
          card.style.transform = "";
          return;
        }

        const cardTop = card.getBoundingClientRect().top;
        const nextTop = next.getBoundingClientRect().top;
        const height = card.offsetHeight;
        const start = cardTop + height;
        const end = cardTop + 14;
        const distance = start - end;
        const progress =
          distance <= 0 ? 0 : Math.min(1, Math.max(0, (start - nextTop) / distance));
        const scale = 1 - progress * 0.08;
        card.style.transform = `scale(${scale})`;
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="how-it-works"
      className="how-works scroll-mt-24"
      aria-labelledby="how-it-works-title"
    >
      <div className="how-works-layout">
        <div className="how-works-copy">
          <TitleReveal id="how-it-works-title">
            How does
            <br />
            it work
          </TitleReveal>
          <p className="how-works-lead">
            During an Active20 session, low-impact electrical impulses activate
            multiple muscle groups at once while you move through simple, guided
            exercises with your coach.
          </p>
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
        </div>

        <ol className="how-works-stack" ref={stackRef}>
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="how-works-card"
              style={{ "--stack": index, zIndex: index + 1 }}
            >
              <Image
                src={step.src}
                alt={step.alt}
                fill
                sizes="(max-width: 899px) 92vw, 640px"
                className="object-cover"
                style={{ objectPosition: step.objectPosition }}
              />
              <div className="how-works-card-copy">
                <p>{step.meta}</p>
                  <TitleReveal as="h3">{step.title}</TitleReveal>
              </div>
              <span className="how-works-card-arrow" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
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
