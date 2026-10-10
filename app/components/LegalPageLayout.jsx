"use client";

import Image from "next/image";
import Link from "next/link";
import Footer2 from "./Footer2";

const sectionHeadingClassName =
  "mt-8 mb-3 text-[clamp(1.05rem,2.4vw,1.35rem)] font-semibold leading-[1.2] text-[#80c5d5] [font-family:var(--font-new-science-extended)] first:mt-0";

const paragraphClassName =
  "m-0 text-[0.92rem] leading-[1.65] text-[#d6e3ee] [font-family:var(--font-inter)] min-[900px]:text-[1rem]";

const listClassName =
  "mt-3 list-disc space-y-2 pl-5 text-[0.92rem] leading-[1.65] text-[#d6e3ee] [font-family:var(--font-inter)] min-[900px]:text-[1rem]";

export function LegalSection({ title, children }) {
  return (
    <section>
      <h2 className={sectionHeadingClassName}>{title}</h2>
      {children}
    </section>
  );
}

export function LegalParagraph({ children }) {
  return <p className={`${paragraphClassName} mt-3`}>{children}</p>;
}

export function LegalList({ items }) {
  return (
    <ul className={listClassName}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function LegalContactEmail() {
  return (
    <a
      href="mailto:team@active20.com"
      className="font-medium text-[#80c5d5] underline decoration-[rgba(128,197,213,0.45)] underline-offset-[0.18em] transition-colors hover:text-[#a8dce8]"
    >
      team@active20.com
    </a>
  );
}

export default function LegalPageLayout({ title, lastUpdated, children }) {
  return (
    <main className="relative isolate flex w-full justify-center bg-[#01111e] p-0">
      <div className="relative z-[1] w-[min(100%,1440px)] px-4 pb-6 max-[899px]:px-3 max-[899px]:pb-4 min-[900px]:px-[1.2rem]">
        <header className="fixed left-0 top-0 z-40 w-full border-none bg-[linear-gradient(135deg,rgba(12,12,12,0.82),rgba(4,4,4,0.88))] px-[1.2rem] py-[0.85rem] shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-[8px] max-[899px]:px-3 max-[899px]:pb-[0.6rem] max-[899px]:pt-[0.55rem]">
          <div className="mx-auto grid w-[min(100%,1440px)] grid-cols-[1fr_auto] items-center gap-[1.2rem] px-[1.2rem] max-[899px]:gap-[0.65rem] min-[900px]:grid-cols-[1fr_auto_1fr]">
            <Link
              href="/"
              className="inline-flex items-center gap-[0.38rem] max-[899px]:col-[1] min-[900px]:col-[1] min-[900px]:justify-self-start"
              aria-label="Active20 home"
            >
              <Image
                src="/images/logo.png"
                alt="Active20"
                className="block h-8 w-auto"
                width={252}
                height={48}
                priority
              />
            </Link>

            <nav
              className="hidden w-full min-[900px]:col-[2] min-[900px]:flex min-[900px]:justify-self-center"
              aria-label="Legal page navigation"
            >
              <div className="flex w-auto items-center justify-center gap-[0.75rem] whitespace-nowrap text-[0.61rem] font-medium tracking-[0.1em] text-[#e8f5ff]">
                <Link
                  href="/privacy-policy"
                  className="inline-flex items-center justify-center px-[0.2rem] leading-none transition-opacity hover:opacity-80"
                >
                  PRIVACY POLICY
                </Link>
                <Link
                  href="/terms"
                  className="inline-flex items-center justify-center px-[0.2rem] leading-none transition-opacity hover:opacity-80"
                >
                  TERMS
                </Link>
              </div>
            </nav>

            <div className="hidden min-[900px]:col-[3] min-[900px]:flex min-[900px]:items-center min-[900px]:justify-self-end">
              <Link
                href="/"
                className="inline-flex min-h-[2.2rem] items-center justify-center whitespace-nowrap rounded-full border border-[#e8fb76] bg-[#e8fb76] px-[0.92rem] py-[0.34rem] text-[0.7rem] font-bold tracking-[0.08em] text-[#111]"
              >
                BACK TO HOME
              </Link>
            </div>
          </div>
        </header>

        <article className="mx-auto max-w-[48rem] pt-[clamp(5.5rem,12vw,7rem)] min-[900px]:pt-[clamp(6.5rem,10vw,7.5rem)]">
          <p className="m-0 text-[0.78rem] tracking-[0.08em] text-[#80c5d5] [font-family:var(--font-inter)] min-[900px]:text-[0.84rem]">
            Last updated: {lastUpdated}
          </p>
          <h1 className="mt-3 text-[clamp(1.8rem,6vw,2.8rem)] leading-[1.05] text-[#80c5d5] [font-family:var(--font-new-science-extended)] min-[900px]:text-[2.6rem]">
            {title}
          </h1>
          <div className="mt-8">{children}</div>
        </article>

        <Footer2 />
      </div>
    </main>
  );
}
