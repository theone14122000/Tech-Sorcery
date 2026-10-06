"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const NAV_OFFSET = -96;

declare global {
  interface Window {
    /** Exposed so overlays (mobile menu) can pause smooth scrolling. */
    __lenis?: Lenis;
  }
}

/**
 * Lenis smooth scrolling. Skipped entirely when the visitor prefers reduced
 * motion, and anchor links are intercepted so they respect the sticky navbar.
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.("a[href^='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET, duration: 1.15 });
      window.history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);
    window.__lenis = lenis;

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      delete window.__lenis;
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
