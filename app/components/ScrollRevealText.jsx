"use client";

import { useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

const SEGMENTS = [
  {
    text: "Experience one of the world's most effective full-body workouts. ACTIVE20's advanced",
  },
  {
    text: "Electro\u2011Muscle Stimulation (EMS)",
    accent: true,
  },
  {
    text: "technology delivers the benefits of up to a 90-minute conventional workout in just 20 minutes.",
  },
];

const WORDS = SEGMENTS.flatMap((segment) =>
  segment.text
    .trim()
    .split(/\s+/)
    .map((word) => ({ word, accent: Boolean(segment.accent) })),
);

export default function ScrollRevealText() {
  const sectionRef = useRef(null);
  const lenis = useLenis();
  const reduce = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduce !== false) return undefined;

    let context;
    let alive = true;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!alive || !sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      gsap.ticker.lagSmoothing(0);

      context = gsap.context(() => {
        const words = gsap.utils.toArray(".reveal-word");

        gsap.fromTo(
          words,
          { opacity: 0.2 },
          {
            opacity: 1,
            ease: "none",
            duration: 0.55,
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=170%",
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          },
        );
      }, sectionRef);

      const refresh = () => {
        if (!alive) return;
        ScrollTrigger.refresh();
        lenis?.resize();
      };

      requestAnimationFrame(refresh);
      document.fonts?.ready.then(refresh);
    })();

    return () => {
      alive = false;
      context?.revert();
    };
  }, [lenis, reduce]);

  return (
    <section
      ref={sectionRef}
      className="relative z-[2] !mt-0 -mx-[calc(50vw-50%)] flex h-[100svh] min-h-[100svh] w-screen items-center bg-[#01111e] px-[clamp(1.25rem,8vw,8.5rem)] pb-10 pt-20"
    >
      <p className="reveal-statement m-0 w-full text-left font-extrabold tracking-[-0.015em] text-[#f4fbff] [font-family:var(--font-new-science-extended)] [font-stretch:normal]">
        {WORDS.map((item, index) => (
          <span
            key={`${item.word}-${index}`}
            className={`reveal-word inline ${
              reduce ? "opacity-100" : "opacity-20"
            } ${item.accent ? "text-[#80c5d5]" : ""}`}
          >
            {item.word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
