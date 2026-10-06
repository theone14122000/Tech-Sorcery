"use client";

import { useCallback, type MouseEvent } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

interface PointerGlowOptions {
  /** px radius of the spotlight falloff. */
  radius?: number;
  /** Max tilt in degrees at the element edge. 0 (default) disables tilt. */
  tilt?: number;
}

/**
 * Cursor tracking for cards: writes `--mx` / `--my` / `--spot-radius` (drives
 * `.spotlight`) and `--rx` / `--ry` (drives `rotateX` / `rotateY` on the
 * element or any descendant). One element, one set of custom properties —
 * the browser only repaints the effect layer. Tilt is skipped entirely for
 * reduced-motion visitors; the glow itself is a position, not an animation.
 */
export function usePointerGlow({ radius = 340, tilt = 0 }: PointerGlowOptions = {}) {
  const reduced = usePrefersReducedMotion();

  const onPointerMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();

      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
      el.style.setProperty("--spot-radius", `${radius}px`);

      if (reduced || tilt === 0) return;
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--rx", `${(-py * tilt).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(px * tilt).toFixed(2)}deg`);
    },
    [radius, reduced, tilt],
  );

  const onPointerLeave = useCallback((event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  }, []);

  return { onPointerMove, onPointerLeave };
}
