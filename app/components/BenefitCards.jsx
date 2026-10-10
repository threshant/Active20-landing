"use client";

import { useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CARDS = [
  {
    src: "/images/holders/gentle-on-joints.png",
    title: "GENTLE ON JOINTS",
    description:
      "Low-impact EMS training protects your joints while your muscles do the work. You get a full session without the pounding of a conventional workout.",
  },
  {
    src: "/images/holders/powerful-on-muscles.png",
    title: "POWERFUL ON MUSCLES",
    description:
      "Deep, full-body activation in a 20-minute session. Multiple muscle groups fire together while your coach keeps the work focused.",
  },
  {
    src: "/images/holders/science-backed-results.png",
    title: "SCIENCE BACKED RESULTS",
    description:
      "Coached sessions, adjusted to your level and goals. Intensity and muscle activation change with you as you progress.",
  },
];

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function CardDots({ active }) {
  return (
    <div className="benefit-dots pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center gap-[0.42rem] bg-[linear-gradient(to_top,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0)_72%)] px-3 pb-[0.85rem] pt-9">
      {CARDS.map((card, index) => (
        <span
          key={card.title}
          className={`h-[0.38rem] w-[0.38rem] rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)] ${
            index === active ? "bg-white" : "bg-white/50"
          }`}
        />
      ))}
    </div>
  );
}

function CardCopy({ card, tone }) {
  const titleClass =
    tone === "light"
      ? "m-0 text-[clamp(1.05rem,4.6vw,1.45rem)] font-extrabold uppercase leading-[1.02] tracking-[0.02em] text-white [font-family:var(--font-new-science-extended)] [font-stretch:normal]"
      : "m-0 text-[1.02rem] font-extrabold uppercase leading-[1.02] tracking-[0.01em] text-[#0c1b2a] [font-family:var(--font-new-science-extended)] [font-stretch:normal] min-[1100px]:text-[1.28rem] min-[1300px]:text-[1.48rem]";
  const bodyClass =
    tone === "light"
      ? "m-0 mt-2 max-w-[26rem] text-[0.92rem] font-normal leading-[1.45] text-white/90 [font-family:var(--font-inter)] [font-stretch:normal] min-[700px]:text-[1rem]"
      : "m-0 max-w-[24rem] text-[0.84rem] font-normal leading-[1.45] text-[#3c4b57] [font-family:var(--font-inter)] [font-stretch:normal] min-[1100px]:text-[0.95rem]";

  return (
    <>
      <h3 className={titleClass}>{card.title}</h3>
      <p className={bodyClass}>{card.description}</p>
    </>
  );
}

export default function BenefitCards() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const lenis = useLenis();
  const preference = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 900px)");
    let timer = 0;

    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };

    const start = () => {
      stop();
      if (motion.matches || !desktop.matches || paused || preference === true) return;
      timer = window.setInterval(() => {
        setActive((current) => (current + 1) % CARDS.length);
      }, 3000);
    };

    start();
    motion.addEventListener("change", start);
    desktop.addEventListener("change", start);
    return () => {
      stop();
      motion.removeEventListener("change", start);
      desktop.removeEventListener("change", start);
    };
  }, [paused, preference]);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return undefined;

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

        mm.add("(max-width: 899px) and (prefers-reduced-motion: no-preference)", () => {
          const travel = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

          const tween = gsap.to(track, {
            x: () => -travel(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () =>
                `+=${Math.max(travel(), window.innerHeight * (CARDS.length - 1))}`,
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
              snap: {
                snapTo: 1 / (CARDS.length - 1),
                duration: { min: 0.15, max: 0.4 },
                delay: 0.05,
                ease: "power1.inOut",
              },
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
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
      context?.revert();
    };
  }, [lenis]);

  return (
    <section
      ref={sectionRef}
      aria-label="Training benefits"
      className="benefit-cards relative max-[899px]:-mx-3 max-[899px]:w-[calc(100%+1.5rem)]"
    >
      <div
        className="benefit-row hidden h-[clamp(19rem,30vw,25rem)] w-full min-w-0 gap-[0.55rem] min-[900px]:flex"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        {CARDS.map((card, index) => {
          const isOpen = index === active;
          return (
            <article
              key={card.title}
              data-expanded={isOpen ? "true" : "false"}
              className="benefit-card grid h-full min-w-0 overflow-hidden rounded-[1.2rem] bg-white shadow-[0_10px_28px_rgba(12,27,42,0.07)]"
              style={{
                flexGrow: isOpen ? 2.15 : 1,
                flexBasis: "0%",
                flexShrink: 1,
                gridTemplateColumns: isOpen ? "1.05fr 0.95fr" : "1fr 0fr",
                transition: `flex-grow 700ms ${EASE}, grid-template-columns 700ms ${EASE}`,
              }}
            >
              <div className="relative h-full min-h-0 min-w-0 overflow-hidden">
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  sizes="(max-width: 899px) 100vw, 34vw"
                  className="object-cover object-[center_18%]"
                />
                <CardDots active={active} />
              </div>
              <div className="h-full min-h-0 min-w-0 overflow-hidden bg-white">
                <div className="flex h-full min-w-0 flex-col justify-between px-[1.05rem] py-[1.15rem] min-[1100px]:px-[1.4rem] min-[1100px]:py-[1.4rem] min-[1300px]:px-[1.65rem] min-[1300px]:py-[1.6rem]">
                  <CardCopy card={card} tone="dark" />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div
        ref={viewportRef}
        className="benefit-pin h-[100svh] w-full overflow-hidden min-[900px]:hidden"
      >
        <div ref={trackRef} className="flex h-full w-[300%] will-change-transform">
          {CARDS.map((card) => (
            <article key={card.title} className="relative h-full w-1/3 shrink-0">
              <Image
                src={card.src}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-[center_18%]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(1,8,16,0.86)_0%,rgba(1,8,16,0.48)_42%,rgba(1,8,16,0)_100%)] px-5 pb-8 pt-28">
                <CardCopy card={card} tone="light" />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="benefit-stack hidden flex-col gap-[0.65rem] px-3 min-[900px]:hidden">
        {CARDS.map((card) => (
          <article
            key={card.title}
            className="relative m-0 aspect-[3/4] overflow-hidden rounded-[0.9rem] border border-[rgba(12,40,56,0.14)]"
          >
            <Image
              src={card.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[center_18%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(1,8,16,0.86)_0%,rgba(1,8,16,0.46)_46%,rgba(1,8,16,0)_100%)] px-4 pb-4 pt-16">
              <CardCopy card={card} tone="light" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
