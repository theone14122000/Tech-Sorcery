"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Ease-out counter that starts when scrolled into view. */
export function Counter({ value, suffix = "", duration = 1.6, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotionSafe();
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;

        const startAt = performance.now();
        let frame = 0;

        const tick = (now: number) => {
          const p = Math.min((now - startAt) / (duration * 1000), 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.round(value * eased));
          if (p < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        observer.disconnect();
        window.setTimeout(() => cancelAnimationFrame(frame), duration * 1000 + 200);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {reduced ? value : count}
      {suffix}
    </span>
  );
}
