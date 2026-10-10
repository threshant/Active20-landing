"use client";

import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/#how-it-works", label: "HOW IT WORKS" },
  { href: "/#", label: "FRANCHISE" },
  { href: "/#", label: "ABOUT US" },
  { href: "/#", label: "OUR STUDIOS" },
  { href: "/#", label: "FAQS" },
];

const HIDE_DISTANCE = 10;

export default function SiteHeader({ variant = "overlay" }) {
  const lenis = useLenis();
  const [isNavScrolled, setIsNavScrolled] = useState(variant === "solid");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const menuOpenRef = useRef(false);
  const lastScrollRef = useRef(0);
  const accumRef = useRef(0);
  const hiddenRef = useRef(false);

  menuOpenRef.current = isMobileMenuOpen;

  useEffect(() => {
    if (variant === "solid") setIsNavScrolled(true);
    if (variant === "transparent") setIsNavScrolled(false);
  }, [variant]);

  const onLenisScroll = useCallback(
    (lenis) => {
      const current = Math.max(0, lenis?.scroll ?? 0);
      const delta = current - lastScrollRef.current;

      if (variant === "overlay") {
        const nextScrolled = current > 30;
        setIsNavScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
      }

      let nextHidden = hiddenRef.current;

      if (menuOpenRef.current || current <= 4) {
        nextHidden = false;
        accumRef.current = 0;
      } else if (delta !== 0) {
        const accum = accumRef.current;
        if ((delta > 0 && accum < 0) || (delta < 0 && accum > 0)) {
          accumRef.current = 0;
        }
        accumRef.current += delta;
        if (accumRef.current > HIDE_DISTANCE) nextHidden = true;
        else if (accumRef.current < -HIDE_DISTANCE) nextHidden = false;
      }

      if (nextHidden !== hiddenRef.current) {
        hiddenRef.current = nextHidden;
        setIsHeaderHidden(nextHidden);
      }

      lastScrollRef.current = current;
    },
    [variant],
  );

  useLenis(onLenisScroll, [variant]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    hiddenRef.current = false;
    accumRef.current = 0;
    setIsHeaderHidden(false);

    return undefined;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = isMobileMenuOpen
      ? "hidden"
      : originalOverflow;

    if (lenis) {
      if (isMobileMenuOpen) lenis.stop();
      else lenis.start();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      lenis?.start();
    };
  }, [isMobileMenuOpen, lenis]);

  const isNavActive =
    variant !== "transparent" &&
    (variant === "solid" || isNavScrolled || isMobileMenuOpen);
  const onLightSurface = variant !== "overlay" || isNavActive;
  const isHidden = isHeaderHidden && !isMobileMenuOpen;

  const topbarClassName = `site-header fixed left-0 top-0 z-50 w-full border-none px-[1.2rem] py-[0.85rem] shadow-none max-[899px]:px-3 max-[899px]:pb-[0.6rem] max-[899px]:pt-[0.55rem] ${
    isHidden ? "-translate-y-full pointer-events-none" : "translate-y-0"
  } ${
    onLightSurface
      ? "bg-white/95 text-[#0c1b2a] shadow-[0_8px_24px_rgba(12,27,42,0.08)] backdrop-blur-[10px]"
      : "bg-transparent text-white"
  }`;

  const navLinkClassName =
    "inline-flex min-h-[2.4rem] items-center justify-center px-[0.2rem] leading-none max-[899px]:min-h-[2.75rem] max-[899px]:w-full max-[899px]:justify-start max-[899px]:border-b max-[899px]:border-[rgba(12,40,56,0.1)] max-[899px]:px-0 max-[899px]:text-[0.78rem] max-[899px]:tracking-[0.12em]";

  return (
    <header className={topbarClassName} inert={isHidden ? true : undefined}>
      <div className="mx-auto flex w-[min(100%,1440px)] items-center justify-between gap-[1.2rem] px-[1.2rem] max-[899px]:gap-[0.65rem] max-[899px]:px-1">
        <Link
          href="/"
          className="inline-flex shrink-0 items-center gap-[0.38rem]"
          aria-label="Active20"
        >
          <Image
            src="/images/logo.png"
            alt="Active20"
            className={`block h-8 w-auto ${onLightSurface ? "brightness-0" : ""}`}
            width={252}
            height={48}
            priority
          />
        </Link>

        <nav
          className="hidden items-center justify-center gap-[0.85rem] text-[0.61rem] font-medium tracking-[0.1em] min-[900px]:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={navLinkClassName}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/book-trial"
            className="hidden min-h-[2.2rem] items-center justify-center whitespace-nowrap rounded-full border border-[#e8fb76] bg-[#e8fb76] px-[0.92rem] py-[0.34rem] text-[0.7rem] font-bold tracking-[0.08em] text-[#111] min-[900px]:inline-flex"
          >
            BOOK A TRIAL
          </Link>
          <button
            type="button"
            className="inline-flex h-8 w-8 cursor-pointer flex-col items-center justify-center gap-[0.28rem] border-0 bg-transparent p-0 text-current min-[900px]:hidden"
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-controls="mobile-nav"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? (
              <>
                <span className="block h-[1.5px] w-[1.2rem] translate-y-[3.8px] rotate-45 bg-current" />
                <span className="block h-[1.5px] w-[1.2rem] -translate-y-[3.8px] -rotate-45 bg-current" />
              </>
            ) : (
              <>
                <span className="block h-[1.5px] w-[1.2rem] bg-current" />
                <span className="block h-[1.5px] w-[1.2rem] bg-current" />
                <span className="block h-[1.5px] w-[1.2rem] bg-current" />
              </>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <nav
          id="mobile-nav"
          className="mx-auto mt-3 w-[min(100%,1440px)] px-1 min-[900px]:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-0 rounded-[0.9rem] border border-[rgba(12,40,56,0.12)] bg-white px-4 py-2 text-[#0c1b2a] shadow-[0_12px_32px_rgba(12,27,42,0.08)]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={navLinkClassName}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book-trial"
              className="my-3 inline-flex min-h-[2.6rem] items-center justify-center rounded-full border border-[#e8fb76] bg-[#e8fb76] px-[1.05rem] text-[0.72rem] font-bold tracking-[0.08em] text-[#111]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              BOOK A TRIAL
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
