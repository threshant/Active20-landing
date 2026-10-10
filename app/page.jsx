"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import BenefitCards from "./components/BenefitCards";
import Footer2 from "./components/Footer2";
import HowItWorks from "./components/HowItWorks";
import { premiumEase, Reveal } from "./components/Reveal";
import ScrollRevealText from "./components/ScrollRevealText";
import SiteHeader from "./components/SiteHeader";
import STitle from "./components/STitle";
import TestimonialMarquee from "./components/TestimonialMarquee";

export default function HomePage() {
  const reduceMotion = useReducedMotion();

  const emsTechImages = [
    {
      src: "/images/holders/ems-tech1.png",
      alt: "EMS module close-up",
      sizes: "(max-width: 900px) 78vw, 370px",
      className:
        "block min-h-full w-full rounded-[0.22rem] border border-[rgba(12,40,56,0.14)] object-cover min-[900px]:col-[1] min-[900px]:row-[1]",
    },
    {
      src: "/images/holders/ems-tech-2.png",
      alt: "EMS console",
      sizes: "(max-width: 900px) 78vw, 540px",
      className:
        "block min-h-full w-full rounded-[0.22rem] border border-[rgba(12,40,56,0.14)] object-cover min-[900px]:col-[2] min-[900px]:row-[1/span_2]",
    },
    {
      src: "/images/holders/ems-tech-3.png",
      alt: "Resistance and EMS suit",
      sizes: "(max-width: 900px) 78vw, 370px",
      className:
        "block min-h-full w-full rounded-[0.22rem] border border-[rgba(12,40,56,0.14)] object-cover min-[900px]:col-[3] min-[900px]:row-[1/span_2]",
    },
    {
      src: "/images/holders/ems-tech-4.png",
      alt: "EMS suit",
      sizes: "(max-width: 900px) 78vw, 370px",
      className:
        "block min-h-full w-full rounded-[0.22rem] border border-[rgba(12,40,56,0.14)] object-cover min-[900px]:col-[1] min-[900px]:row-[2]",
    },
  ];

  return (
    <main className="relative isolate flex w-full justify-center bg-white p-0">
      <div className="relative z-[1] w-[min(100%,1440px)] px-4 pb-6 max-[899px]:px-3 max-[899px]:pb-4 [&>section+section]:mt-16 max-[899px]:[&>section+section]:mt-[2.6rem] min-[900px]:px-[1.2rem] min-[900px]:[&>section+section]:mt-24">
        <SiteHeader />

        <section className="relative isolate -mx-[calc(50vw-50%)] h-[100svh] w-screen overflow-hidden bg-[#01111e]">
          <motion.div
            className="absolute inset-0 z-0"
            initial={reduceMotion ? false : { scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: premiumEase }}
          >
            <Image
              src="/images/holders/hero.png"
              alt="Athlete in EMS suit"
              className="object-cover max-[899px]:object-[70%_20%]"
              fill
              sizes="100vw"
              priority
            />
          </motion.div>

          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-readability" aria-hidden="true" />

          <div className="absolute inset-0 z-[3] flex flex-col justify-end px-[clamp(1rem,4.2vw,4.5rem)] pb-[clamp(1rem,3.2vh,2.4rem)] pt-[4.35rem] max-[899px]:pt-[4.15rem]">
            <div className="@container flex w-full min-w-0 flex-col gap-[clamp(0.7rem,1.6vh,1.15rem)]">
              <motion.h1
                className="m-0 max-w-full text-left text-[clamp(1.65rem,8vw,2.05rem)] font-extrabold uppercase leading-[0.9] tracking-[0.01em] text-white [font-family:var(--font-new-science-extended)] [font-stretch:normal] [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] min-[900px]:text-[clamp(2rem,4.05cqw,3.25rem)] min-[900px]:leading-[0.88]"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, ease: premiumEase }}
              >
                <span className="hidden whitespace-nowrap min-[900px]:block">
                  ADVANCED FITNESS
                </span>
                <span className="block whitespace-nowrap min-[900px]:hidden">
                  ADVANCED
                </span>
                <span className="block whitespace-nowrap min-[900px]:hidden">
                  FITNESS
                </span>
                <span className="block whitespace-nowrap">CLUB</span>
              </motion.h1>

              <div className="flex w-full min-w-0 flex-col items-stretch gap-3.5 min-[1100px]:flex-row min-[1100px]:items-end min-[1100px]:justify-between min-[1100px]:gap-8">
                <motion.p
                  className="m-0 max-w-[34rem] self-start text-left text-[clamp(0.88rem,2.05vw,1.02rem)] font-normal leading-[1.4] text-white/90 [font-family:var(--font-inter)] [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: premiumEase, delay: 0.16 }}
                >
                  Experience one of the world&apos;s most effective full-body
                  workouts in just 20 minutes.
                </motion.p>

                <motion.div
                  className="flex w-full shrink-0 flex-col items-end gap-2 self-end min-[1100px]:w-auto"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: premiumEase, delay: 0.24 }}
                >
                  <Link
                    href="/book-trial"
                    className="flex w-full max-w-[19.5rem] items-center justify-between gap-3 rounded-[1.15rem] bg-[#e8fb76] py-2.5 pl-3.5 pr-2 text-[#111] shadow-[0_12px_28px_rgba(0,0,0,0.22)] min-[900px]:w-auto min-[900px]:min-w-[16.75rem] min-[900px]:py-3 min-[900px]:pl-4"
                  >
                    <span className="flex min-w-0 flex-col items-start">
                      <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium leading-none text-[#111]/75 [font-family:var(--font-inter)]">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                          className="shrink-0"
                        >
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
                      <span className="mt-1.5 text-[1.12rem] font-semibold leading-none tracking-[-0.01em] text-[#111] [font-family:var(--font-inter)] min-[900px]:text-[1.22rem]">
                        Book a trial
                      </span>
                    </span>
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-[0.85rem] bg-[#111] text-[#e8fb76]"
                      aria-hidden="true"
                    >
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
                  <p className="m-0 text-right text-[0.75rem] leading-none text-white/88 [font-family:var(--font-inter)] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                    No pressure. Just 20 minutes.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <ScrollRevealText />

        <BenefitCards />

        <HowItWorks />

        <section className="pt-0">
          <STitle
            sectionClassName="px-[0.1rem] pb-4 pt-[1.6rem] min-[900px]:px-12 min-[900px]:pb-4 min-[900px]:pt-20"
            titleClassName="m-0 text-[clamp(1.45rem,7vw,2rem)] leading-none text-[#0d5f72] [font-family:var(--font-new-science-extended)] min-[900px]:text-[2.6rem] min-[900px]:leading-[1.05]"
            descriptionClassName="mt-[0.55rem] max-w-full text-[0.86rem] leading-[1.42] text-[#243240] [font-family:var(--font-inter)] min-[900px]:mt-[0.65rem] min-[900px]:max-w-[39rem] min-[900px]:text-[1rem] min-[900px]:leading-[1.5]"
            title="THE EMS TECH"
            description="Wear a state-of-the-art EMS suit connected to a tablet-controlled system and guided by your certified coach. Every session is personalised in real time, with intensity, muscle activation, and training programmes precisely adjusted to match your body, fitness level, and goals."
          />

          <div className="ems-tech-marquee mt-0 min-[900px]:hidden">
            <div className="ems-tech-marquee-track">
              {[0, 1].flatMap((copy) =>
                emsTechImages.map((image) => (
                  <Image
                    key={`${image.src}-${copy}`}
                    src={image.src}
                    alt={image.alt}
                    className="h-[13.5rem] w-[78vw] shrink-0 rounded-[0.22rem] border border-[rgba(12,40,56,0.14)] object-cover"
                    width={0}
                    height={0}
                    sizes={image.sizes}
                  />
                )),
              )}
            </div>
          </div>

          <Reveal className="mt-0 hidden grid-cols-[1fr_1.45fr_1fr] grid-rows-2 gap-[0.3rem] min-[900px]:grid">
            {emsTechImages.map((image) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                className={image.className}
                width={0}
                height={0}
                sizes={image.sizes}
              />
            ))}
          </Reveal>
        </section>

        <TestimonialMarquee />

        <Footer2 />
      </div>
    </main>
  );
}
