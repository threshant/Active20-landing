"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import BenefitCards from "./components/BenefitCards";
import Footer2 from "./components/Footer2";
import {
  fadeScale,
  premiumEase,
  Reveal,
  RevealItem,
  RevealStagger,
} from "./components/Reveal";
import ScrollRevealText from "./components/ScrollRevealText";
import SiteHeader from "./components/SiteHeader";
import STitle from "./components/STitle";

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

  const testimonials = [
    {
      id: "sushant",
      quote:
        "Active20 made training feel easy to stick with. The workouts are fast, focused, and I noticed meaningful strength gains within weeks. It finally fits my schedule without compromising results.",
      name: "Sushant, Age 37",
      initials: "SU",
      gradientAngle: 160,
      minHeight: "15.8rem",
    },
    {
      id: "ananya",
      quote:
        "The coaching and EMS pairing has been incredible. I get a full-body session in just 20 minutes and still feel challenged every time. Recovery is smoother and my energy is better all week.",
      name: "Ananya, Age 28",
      initials: "AN",
      gradientAngle: 230,
      minHeight: "14.5rem",
    },
    {
      id: "girish",
      quote:
        "I expected it to be a trend, but the progress has been very real. The sessions are efficient, my posture improved, and I feel stronger without putting unnecessary stress on my joints.",
      name: "Girish, Age 52",
      initials: "GI",
      gradientAngle: 312,
      minHeight: "16.3rem",
    },
    {
      id: "rahul",
      quote:
        "Active20 keeps me consistent in a way no gym plan ever did. Short sessions, expert guidance, and visible improvement made it easy to build a routine I actually enjoy.",
      name: "Rahul, Age 41",
      initials: "RK",
      gradientAngle: 28,
      minHeight: "14.1rem",
    },
    {
      id: "meera",
      quote:
        "I joined with lower back concerns and was surprised by how controlled every movement felt. My coach adjusted intensity each week, and I can now train consistently without flare-ups.",
      name: "Meera, Age 46",
      initials: "ME",
      gradientAngle: 188,
      minHeight: "17.1rem",
    },
    {
      id: "arjun",
      quote:
        "As a founder, time is always tight. Active20 gave me a practical routine that actually fits my calendar. The 20-minute format is efficient, and the strength improvements are clear.",
      name: "Arjun, Age 34",
      initials: "AR",
      gradientAngle: 256,
      minHeight: "13.8rem",
    },
    {
      id: "naina",
      quote:
        "I wanted better muscle tone without long gym sessions. Within the first month, I noticed better definition and stamina. The structure keeps me motivated week after week.",
      name: "Naina, Age 31",
      initials: "NA",
      gradientAngle: 330,
      minHeight: "15.1rem",
    },
    {
      id: "dev",
      quote:
        "From day one, the coaching felt premium and personal. The session quality is consistent, the effort feels focused, and recovery has been far better than my old routine.",
      name: "Dev, Age 39",
      initials: "DE",
      gradientAngle: 96,
      minHeight: "16.7rem",
    },
    {
      id: "isha",
      quote:
        "I came in looking for a smarter routine, and the accountability here made all the difference. The sessions are short, progress is measurable, and I feel stronger in daily life.",
      name: "Isha, Age 33",
      initials: "IS",
      gradientAngle: 142,
      minHeight: "15.4rem",
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

        <section id="how-it-works" className="scroll-mt-24">
          <STitle
            sectionClassName="px-[0.1rem] pb-4 pt-[1.6rem] min-[900px]:px-12 min-[900px]:pb-[1.2rem] min-[900px]:pt-20"
            titleClassName="m-0 text-[clamp(1.45rem,7vw,2rem)] leading-none text-[#0d5f72] [font-family:var(--font-new-science-extended)] min-[900px]:text-[2.6rem] min-[900px]:leading-[1.05]"
            descriptionClassName="mt-[0.55rem] max-w-full text-[0.86rem] leading-[1.42] text-[#243240] [font-family:var(--font-inter)] min-[900px]:mt-[0.65rem] min-[900px]:max-w-[39rem] min-[900px]:text-[1rem] min-[900px]:leading-[1.5]"
            title="HOW DOES IT WORK"
            description="During an ACTIVE20 session, low-impact electrical impulses activate multiple muscle groups at once while you move through simple, guided exercises with your coach. This creates deeper, more complete muscle contractions, delivering a full-body workout in just 20 minutes with minimal joint stress."
          />

          <Reveal className="relative mt-0 overflow-hidden rounded-[0.9rem] border border-[rgba(12,40,56,0.14)] bg-transparent">
            <Image
              src="/images/holders/how-it-works.png"
              alt="Battle rope training"
              className="block h-[70svh] w-full object-cover min-[900px]:h-[clamp(28rem,56vw,46rem)]"
              width={0}
              height={0}
              sizes="100vw"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Reveal
                as="span"
                variants={fadeScale}
                delay={0.18}
                className="relative block h-[5rem] w-[5rem] cursor-pointer rounded-full border-2 border-[rgba(219,237,246,0.68)] bg-[rgba(8,10,12,0.28)] backdrop-blur-[10px] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-[42%] after:-translate-y-1/2 after:border-b-[0.7rem] after:border-l-[1.1rem] after:border-t-[0.7rem] after:border-b-transparent after:border-l-[rgba(219,237,246,0.9)] after:border-t-transparent after:content-[''] min-[900px]:h-[6.5rem] min-[900px]:w-[6.5rem] min-[900px]:after:border-b-[0.9rem] min-[900px]:after:border-l-[1.45rem] min-[900px]:after:border-t-[0.9rem]"
                aria-hidden="true"
              />
            </div>
          </Reveal>
        </section>

        <section className="pt-0">
          <STitle
            sectionClassName="px-[0.1rem] pb-[0.7rem] pt-0 text-center min-[900px]:pb-4"
            titleClassName="m-0 text-[clamp(1.1rem,5.8vw,1.55rem)] leading-none text-[#0d5f72] [font-family:var(--font-new-science-extended)] min-[900px]:whitespace-nowrap min-[900px]:text-[clamp(0.78rem,2.55vw,1.95rem)]"
            title="ADVANCED FITNESS FOR EVERY BODY"
          />

          <Reveal className="relative mt-0 overflow-hidden rounded-[0.9rem] border border-[rgba(12,40,56,0.14)] bg-transparent">
            <img
              src="/images/holders/advance-fitness.png"
              alt="Strength training with age"
              className="block h-[70svh] w-full object-cover min-[900px]:h-[clamp(28rem,56vw,46rem)]"
            />
            <Reveal
              as="span"
              delay={0.16}
              className="absolute bottom-[0.7rem] right-[0.7rem] rounded-full border border-[rgba(180,214,236,0.72)] bg-[rgba(0,8,16,0.68)] px-[0.72rem] py-[0.4rem] text-[0.68rem] font-bold text-[#e5f6ff] [font-family:var(--font-inter)] min-[900px]:bottom-[1.2rem] min-[900px]:right-[1.2rem] min-[900px]:px-[1rem] min-[900px]:py-[0.48rem] min-[900px]:text-[clamp(0.75rem,1.1vw,1.05rem)]"
            >
              Those Building Strength with Age
            </Reveal>
          </Reveal>
        </section>

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

        <section className="pt-0">
          <STitle
            sectionClassName="px-[0.1rem] pb-4 pt-0 text-center min-[900px]:pb-6"
            titleClassName="m-0 text-[clamp(1.45rem,7vw,2rem)] leading-none text-[#0d5f72] [font-family:var(--font-new-science-extended)] min-[900px]:text-[2.6rem] min-[900px]:leading-[1.05]"
            title="REAL PEOPLE. REAL PROGRESS."
          />

          <RevealStagger
            className="mt-4 columns-1 gap-[1rem] min-[760px]:columns-2 min-[1160px]:columns-3"
            stagger={0.07}
          >
            {testimonials.map((testimonial) => (
              <RevealItem
                as="article"
                key={testimonial.id}
                className="relative isolate mb-[1rem] overflow-hidden rounded-[1rem] border border-[rgba(12,40,56,0.12)] px-[1.2rem] pb-[1.15rem] pt-[1.15rem] shadow-[0_10px_28px_rgba(12,27,42,0.05)] [break-inside:avoid] min-[900px]:px-[1.55rem] min-[900px]:pb-[1.32rem] min-[900px]:pt-[1.32rem]"
                style={{
                  minHeight: testimonial.minHeight,
                  backgroundImage: `linear-gradient(${testimonial.gradientAngle}deg, #ffffff 0%, #f4f8f6 52%, #e7f1ef 100%)`,
                }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(232,251,118,0.34)_0%,rgba(232,251,118,0)_42%)]" />
                <p className="relative z-[1] m-0 text-[0.9rem] leading-[1.55] text-[#31414d] [font-family:var(--font-inter)] min-[900px]:text-[1.08rem] min-[900px]:leading-[1.5]">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="relative z-[1] mt-[0.85rem] flex items-center gap-[0.52rem] min-[900px]:mt-[1rem]">
                  <div className="flex -space-x-2">
                    <span className="inline-grid h-[1.9rem] w-[1.9rem] place-items-center rounded-full border border-[rgba(12,40,56,0.12)] bg-[linear-gradient(145deg,#e8fb76,#9fd7e2)] text-[0.5rem] font-semibold tracking-[0.03em] text-[#0c1b2a] min-[900px]:h-[2.35rem] min-[900px]:w-[2.35rem] min-[900px]:text-[0.62rem]">
                      {testimonial.initials}
                    </span>
                    <span className="inline-grid h-[1.9rem] w-[1.9rem] place-items-center rounded-full border border-[rgba(12,40,56,0.12)] bg-[linear-gradient(145deg,#eef3f6,#c9d7e0)] text-[0.48rem] font-semibold tracking-[0.03em] text-[#0c1b2a] min-[900px]:h-[2.35rem] min-[900px]:w-[2.35rem] min-[900px]:text-[0.6rem]">
                      M
                    </span>
                  </div>
                  <div>
                    <strong className="block text-[0.86rem] font-medium text-[#0c1b2a] [font-family:var(--font-inter)] min-[900px]:text-[1.02rem]">
                      {testimonial.name}
                    </strong>
                    <span className="block text-[0.68rem] text-[#5c6b76] [font-family:var(--font-inter)] min-[900px]:text-[0.82rem]">
                      Active20 Member
                    </span>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </section>

        <Footer2 />
      </div>
    </main>
  );
}
