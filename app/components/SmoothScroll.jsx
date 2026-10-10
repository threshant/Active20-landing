"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

const smoothScrollOptions = {
  autoRaf: true,
  lerp: 0.075,
  smoothWheel: true,
  syncTouch: false,
  anchors: {
    duration: 1.15,
  },
  allowNestedScroll: true,
  stopInertiaOnNavigate: true,
};

function samePageHash(anchor) {
  let url;

  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return null;
  }

  if (url.origin !== window.location.origin) return null;
  if (url.pathname !== window.location.pathname) return null;
  if (!url.hash || url.hash === "#") return null;

  const id = decodeURIComponent(url.hash.slice(1));
  if (!document.getElementById(id)) return null;

  return url;
}

function SmoothScrollLinks() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return undefined;

    const onClickCapture = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      const url = samePageHash(anchor);
      if (!url) return;

      event.preventDefault();
      window.history.pushState(
        window.history.state,
        "",
        `${url.pathname}${url.search}${url.hash}`,
      );
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return undefined;

    const hash = window.location.hash;
    if (!hash || hash === "#") return undefined;

    const id = decodeURIComponent(hash.slice(1));
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target) lenis.scrollTo(target, { duration: 1.15 });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={smoothScrollOptions}>
      <SmoothScrollLinks />
      {children}
    </ReactLenis>
  );
}
