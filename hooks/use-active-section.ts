"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which anchored section is currently in view so the navbar can
 * highlight it. Uses IntersectionObserver — no scroll listeners.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();
    let frame = 0;

    const pick = () => {
      frame = 0;
      let bestId = "";
      let bestRatio = 0;
      ratios.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });
      setActive(bestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        if (!frame) frame = requestAnimationFrame(pick);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.15, 0.35, 0.6, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [ids]);

  return active;
}
