"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { TitleReveal } from "./Reveal";

const COPY =
  "Active20 combines Electro-Muscle Stimulation with certified coach guidance for a focused, full-body workout in just 20 minutes, with minimal stress on your joints.";

const METRICS = [
  { value: 20, display: "20", label: "minutes per workout" },
  { value: 1, display: "1:1", label: "certified coach guidance", ratio: true },
  { value: 3, display: "3", label: "training styles" },
];

export default function AboutActive20() {
  const sectionRef = useRef(null);
  const preference = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || preference === true) return undefined;

    let context;
    let alive = true;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!alive || !sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        const counters = gsap.utils.toArray("[data-counter]");
        const counterState = counters.map(() => ({ value: 0 }));

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            end: "bottom 38%",
            scrub: true,
            pin: false,
          },
        });

        counters.forEach((counter, index) => {
          const target = Number(counter.dataset.counter);
          timeline.to(
            counterState[index],
            {
              value: target,
              ease: "none",
              duration: 0.45,
              onUpdate: () => {
                const value = Math.round(counterState[index].value);
                counter.textContent =
                  counter.dataset.ratio === "true" ? `${value}:1` : `${value}`;
              },
            },
            0.25,
          );
        });
      }, sectionRef);

      requestAnimationFrame(() => alive && ScrollTrigger.refresh());
    })();

    return () => {
      alive = false;
      context?.revert();
    };
  }, [preference]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-active20 scroll-mt-24"
      aria-labelledby="about-active20-title"
    >
      <div className="about-active20-intro">
        <TitleReveal id="about-active20-title" className="about-active20-statement">
          {COPY}
        </TitleReveal>
      </div>

      <dl className="about-active20-metrics">
        {METRICS.map((metric) => (
          <div key={metric.label} className="about-active20-metric">
            <dd
              className="about-active20-value"
              data-counter={metric.value}
              data-ratio={metric.ratio ? "true" : undefined}
            >
              {preference === true ? metric.display : metric.ratio ? "0:1" : "0"}
            </dd>
            <dt>{metric.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
