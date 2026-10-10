"use client";

import Image from "next/image";
import Link from "next/link";
import Footer2 from "./Footer2";

const sectionHeadingClassName =
  "mt-8 mb-3 text-[clamp(1.05rem,2.4vw,1.35rem)] font-semibold leading-[1.2] text-[#0d5f72] [font-family:var(--font-new-science-extended)] first:mt-0";

const paragraphClassName =
  "m-0 text-[0.92rem] leading-[1.65] text-[#243240] [font-family:var(--font-inter)] min-[900px]:text-[1rem]";

const listClassName =
  "mt-3 list-disc space-y-2 pl-5 text-[0.92rem] leading-[1.65] text-[#243240] [font-family:var(--font-inter)] min-[900px]:text-[1rem]";

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
      className="font-medium text-[#0d5f72] underline decoration-[rgba(13,95,114,0.4)] underline-offset-[0.18em] transition-colors hover:text-[#094555]"
    >
      team@active20.com
    </a>
  );
}

export default function LegalPageLayout({ title, lastUpdated, children }) {
  return (
    <main className="relative isolate flex w-full justify-center bg-white p-0">
      <div className="relative z-[1] w-[min(100%,1440px)] px-4 pb-6 max-[899px]:px-3 max-[899px]:pb-4 min-[900px]:px-[1.2rem]">
        <header className="fixed left-0 top-0 z-40 w-full border-b border-[rgba(12,40,56,0.08)] bg-white/95 px-[1.2rem] py-[0.85rem] text-[#0c1b2a] shadow-[0_8px_24px_rgba(12,27,42,0.06)] backdrop-blur-[8px] max-[899px]:px-3 max-[899px]:pb-[0.6rem] max-[899px]:pt-[0.55rem]">
          <div className="mx-auto grid w-[min(100%,1440px)] grid-cols-[1fr_auto] items-center gap-[1.2rem] px-[1.2rem] max-[899px]:gap-[0.65rem] min-[900px]:grid-cols-[1fr_auto_1fr]">
            <Link
              href="/"
              className="inline-flex items-center gap-[0.38rem] max-[899px]:col-[1] min-[900px]:col-[1] min-[900px]:justify-self-start"
              aria-label="Active20 home"
            >
              <Image
                src="/images/logo.png"
                alt="Active20"
                className="block h-8 w-auto brightness-0"
                width={252}
                height={48}
                priority
              />
            </Link>

            <nav
              className="hidden w-full min-[900px]:col-[2] min-[900px]:flex min-[900px]:justify-self-center"
              aria-label="Legal page navigation"
            >
              <div className="flex w-auto items-center justify-center gap-[0.75rem] whitespace-nowrap text-[0.61rem] font-medium tracking-[0.1em] text-[#0c1b2a]">
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
          <p className="m-0 text-[0.78rem] tracking-[0.08em] text-[#0d5f72] [font-family:var(--font-inter)] min-[900px]:text-[0.84rem]">
            Last updated: {lastUpdated}
          </p>
          <h1 className="mt-3 text-[clamp(1.8rem,6vw,2.8rem)] leading-[1.05] text-[#0c1b2a] [font-family:var(--font-new-science-extended)] min-[900px]:text-[2.6rem]">
            {title}
          </h1>
          <div className="mt-8">{children}</div>
        </article>

        <Footer2 />
      </div>
    </main>
  );
}
