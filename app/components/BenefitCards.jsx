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

function CardDots({ active }) {
  return (
    <div className="benefit-dots pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex items-end justify-center gap-[0.42rem] bg-[linear-gradient(to_top,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0)_72%)] px-3 pb-[0.85rem] pt-9">
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

function CardPhoto({ card, alt, sizes, className }) {
  return (
    <Image
      src={card.src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
    />
  );
}

function CardBlur({ card, sizes }) {
  return (
    <div className="benefit-blur" aria-hidden="true">
      <CardPhoto
        card={card}
        alt=""
        sizes={sizes}
        className="benefit-blur-image object-cover object-[center_18%]"
      />
      <div className="benefit-blur-wash" />
    </div>
  );
}

function CardCopy({ card }) {
  return (
    <div className="benefit-copy">
      <h3 className="m-0 w-full text-left text-[clamp(1.02rem,4.4vw,1.28rem)] font-extrabold uppercase leading-[1.04] tracking-[0.01em] text-white [font-family:var(--font-new-science-extended)] [font-stretch:normal] [text-shadow:0_1px_3px_rgba(0,0,0,0.55)] [text-wrap:balance] min-[1100px]:text-[1.3rem] min-[1300px]:text-[1.42rem]">
        {card.title}
      </h3>
      <p className="m-0 mt-2 w-full text-left text-[0.9rem] font-normal leading-[1.45] text-white/92 [font-family:var(--font-inter)] [font-stretch:normal] [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] [text-wrap:pretty] min-[700px]:text-[0.98rem]">
        {card.description}
      </p>
    </div>
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
              className="benefit-card relative h-full min-w-0 overflow-hidden rounded-[1.2rem] bg-[#123044] shadow-[0_10px_28px_rgba(12,27,42,0.07)]"
              style={{
                flexGrow: isOpen ? 2.15 : 1,
                flexBasis: "0%",
                flexShrink: 1,
              }}
            >
              <CardPhoto
                card={card}
                alt={isOpen ? "" : card.title}
                sizes="(max-width: 899px) 100vw, 55vw"
                className="object-cover object-[center_18%]"
              />
              <CardBlur card={card} sizes="(max-width: 899px) 100vw, 55vw" />
              <CardCopy card={card} />
              <CardDots active={active} />
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
              <CardPhoto
                card={card}
                alt=""
                sizes="100vw"
                className="object-cover object-[center_18%]"
              />
              <CardBlur card={card} sizes="100vw" />
              <CardCopy card={card} />
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
            <CardPhoto
              card={card}
              alt=""
              sizes="100vw"
              className="object-cover object-[center_18%]"
            />
            <CardBlur card={card} sizes="100vw" />
            <CardCopy card={card} />
          </article>
        ))}
      </div>
    </section>
  );
}
