"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const NAV_LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#", label: "Franchise" },
  { href: "/#", label: "About us" },
  { href: "/#", label: "Our studios" },
  { href: "/#faq", label: "FAQs" },
];

const HIDE_DISTANCE = 10;

const menuItemMotion = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SiteHeader({ variant = "overlay" }) {
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const [isNavScrolled, setIsNavScrolled] = useState(variant === "solid");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const menuOpenRef = useRef(false);
  const lastScrollRef = useRef(0);
  const accumRef = useRef(0);
  const hiddenRef = useRef(false);

  menuOpenRef.current = isMobileMenuOpen;

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const nav = document.getElementById("mobile-nav");
    const covered = [...document.body.children].filter((node) => node !== nav);
    covered.forEach((node) => node.setAttribute("inert", ""));

    return () => {
      covered.forEach((node) => node.removeAttribute("inert"));
    };
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
    variant !== "transparent" && (variant === "solid" || isNavScrolled);
  const onLightSurface =
    !isMobileMenuOpen && (variant !== "overlay" || isNavActive);
  const isHidden = isHeaderHidden && !isMobileMenuOpen;
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
    <header
      className={`${topbarClassName}${isMobileMenuOpen ? " max-[899px]:invisible" : ""}`}
      inert={isHidden || isMobileMenuOpen ? true : undefined}
    >
      <div className="mx-auto flex w-[min(100%,1440px)] items-center justify-between gap-[1.2rem] px-[1.2rem] max-[899px]:gap-[0.65rem] max-[899px]:px-1">
        <Link
          href="/"
          className="relative z-10 inline-flex shrink-0 items-center gap-[0.38rem]"
          aria-label="Active20"
          onClick={closeMobileMenu}
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

        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/book-trial"
            className="hidden min-h-[2.2rem] items-center justify-center whitespace-nowrap rounded-full border border-[#e8fb76] bg-[#e8fb76] px-[0.92rem] py-[0.34rem] text-[0.7rem] font-bold tracking-[0.08em] text-[#111] min-[900px]:inline-flex"
          >
            Book a trial
          </Link>
          <button
            type="button"
            className={`mobile-nav-toggle inline-flex h-8 w-8 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-current min-[900px]:hidden ${
              isMobileMenuOpen ? "is-open" : ""
            }`}
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-controls="mobile-nav"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {isMounted
        ? createPortal(
            <AnimatePresence>
              {isMobileMenuOpen ? (
                <motion.nav
                  id="mobile-nav"
                  className="mobile-nav min-[900px]:hidden"
                  aria-label="Mobile"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28 }}
                  onClick={closeMobileMenu}
                >
                  <div className="mobile-nav-top px-3 pb-[0.6rem] pt-[0.55rem]">
                    <div className="mx-auto flex w-[min(100%,1440px)] items-center justify-between px-1">
                      <Link
                        href="/"
                        className="inline-flex shrink-0 items-center"
                        aria-label="Active20"
                        onClick={closeMobileMenu}
                      >
                        <Image
                          src="/images/logo.png"
                          alt=""
                          className="block h-8 w-auto"
                          width={252}
                          height={48}
                        />
                      </Link>
                      <button
                        type="button"
                        className="mobile-nav-toggle is-open inline-flex h-8 w-8 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-white"
                        aria-label="Close navigation menu"
                        onClick={(event) => {
                          event.stopPropagation();
                          closeMobileMenu();
                        }}
                      >
                        <span />
                        <span />
                        <span />
                      </button>
                    </div>
                  </div>
                  <motion.div
                    className="mobile-nav-blur"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.div
                    className="mobile-nav-panel"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: reduceMotion ? 0 : 0.07,
                          delayChildren: reduceMotion ? 0 : 0.08,
                        },
                      },
                    }}
                  >
                    <div className="mobile-nav-links">
                      {NAV_LINKS.map((link) => (
                        <motion.div
                          key={link.label}
                          className="mobile-nav-item"
                          variants={reduceMotion ? undefined : menuItemMotion}
                          onClick={(event) => event.stopPropagation()}
                        >
                          <Link
                            href={link.href}
                            className="mobile-nav-link"
                            onClick={closeMobileMenu}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      variants={reduceMotion ? undefined : menuItemMotion}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Link
                        href="/book-trial"
                        className="mobile-nav-cta"
                        onClick={closeMobileMenu}
                      >
                        Book a trial
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.nav>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </header>
  );
}
