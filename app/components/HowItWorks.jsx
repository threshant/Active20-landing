"use client";

import { useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

const STEPS = [
  {
    number: "01",
    title: "Prepare for your visit",
    description:
      "Stay hydrated and skip intense workouts for 24 to 48 hours before. No gym clothes needed. We provide a sterilized EMS suit.",
    src: "/images/holders/ems-tech-4.png",
    alt: "Member wearing the EMS suit and training pack",
    objectPosition: "72% center",
  },
  {
    number: "02",
    title: "Get suited up",
    description:
      "Meet your Coach, get a complimentary body composition scan and talk through your goals.",
    src: "/images/holders/gentle-on-joints.png",
    alt: "Member training in the EMS suit",
    objectPosition: "32% 28%",
  },
  {
    number: "03",
    title: "Turn it on",
    description:
      "Try a sample of Strength, Endurance and Performance training, tailored to you.",
    src: "/images/holders/how-it-works.png",
    alt: "Member training with battle ropes in the EMS suit",
    objectPosition: "70% center",
  },
  {
    number: "04",
    title: "Unlock your potential",
    description:
      "Review your results with your Coach and get a recommended plan.",
    src: "/images/holders/advance-fitness.png",
    alt: "Members training together in EMS suits",
    objectPosition: "center 30%",
  },
];

const PEEK = 18;

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const lenis = useLenis();
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

      if (!alive) return;

      gsap.registerPlugin(ScrollTrigger);
      gsap.ticker.lagSmoothing(0);

      context = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const cards = gsap.utils.toArray(".how-card");
          if (!cards.length) return undefined;

          section.classList.add("is-deck");

          gsap.set(cards, {
            x: (index) => index * PEEK,
            zIndex: (index) => cards.length - index,
          });

          const timeline = gsap.timeline({
            defaults: { ease: "none", duration: 1 },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${window.innerHeight * (cards.length - 1) * 0.9}`,
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          });

          for (let step = 0; step < cards.length - 1; step += 1) {
            timeline.set(cards[step], { zIndex: cards.length + 2 }, step);
            timeline.to(cards[step], { xPercent: -110 }, step);

            cards.forEach((card, index) => {
              if (index <= step) return;
              const depth = index - step - 1;
              timeline.to(
                card,
                {
                  x: depth * PEEK,
                  zIndex: cards.length - depth,
                },
                step,
              );
            });

            timeline.set(cards[step], { autoAlpha: 0, zIndex: 0 }, step + 0.98);
          }

          return () => {
            section.classList.remove("is-deck");
          };
        });
      }, section);

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
      section.classList.remove("is-deck");
      context?.revert();
    };
  }, [lenis, preference]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="how-steps scroll-mt-24 -mx-[calc(50vw-50%)] w-screen bg-[#f3f4f6]"
      aria-labelledby="how-it-works-title"
    >
      <div className="how-steps-grid">
        <div className="how-steps-copy">
          <h2
            id="how-it-works-title"
            className="m-0 max-w-[12ch] text-[clamp(2.15rem,4.6vw,3.7rem)] leading-[0.92] text-[#0d5f72] [font-family:var(--font-new-science-extended)] [text-wrap:balance]"
          >
            HOW DOES IT WORK
          </h2>
          <p className="m-0 mt-4 max-w-[34rem] text-[0.95rem] leading-[1.5] text-[#243240] [font-family:var(--font-inter)] min-[900px]:mt-5 min-[900px]:text-[1.05rem]">
            During an ACTIVE20 session, low-impact electrical impulses activate
            multiple muscle groups at once while you move through simple, guided
            exercises with your coach. This creates deeper, more complete muscle
            contractions, delivering a full-body workout in just 20 minutes with
            minimal joint stress.
          </p>
        </div>

        <ol className="how-steps-deck">
          {STEPS.map((step) => (
            <li key={step.number} className="how-card">
              <Image
                src={step.src}
                alt={step.alt}
                fill
                sizes="(max-width: 899px) 92vw, 48vw"
                className="object-cover"
                style={{ objectPosition: step.objectPosition }}
              />
              <div className="how-card-shade" aria-hidden="true" />
              <div className="how-card-copy">
                <span className="how-card-number">{step.number}</span>
                <h3 className="m-0 text-[clamp(1.25rem,2.1vw,1.7rem)] leading-[1.05] text-white [font-family:var(--font-new-science-extended)] [text-wrap:balance]">
                  {step.title}
                </h3>
                <p className="m-0 mt-2 max-w-[28rem] text-[0.92rem] leading-[1.45] text-white/82 [font-family:var(--font-inter)] min-[900px]:text-[0.98rem]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
