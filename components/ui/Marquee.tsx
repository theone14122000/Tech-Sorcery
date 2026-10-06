import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: readonly string[];
  reverse?: boolean;
  className?: string;
  /** Separator rendered between items (decorative). */
  separator?: string;
}

/**
 * Infinite text-only tech strip. Content is duplicated once so the
 * translate(-50%) loop is seamless; the clone is hidden from assistive tech.
 */
export function Marquee({ items, reverse = false, className, separator = "◆" }: MarqueeProps) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          <span className="px-5 font-mono text-sm tracking-tight text-mist-2 whitespace-nowrap sm:px-7 sm:text-base">
            {item}
          </span>
          <span aria-hidden className="text-[0.6rem] text-violet/70">
            {separator}
          </span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      aria-label={`Technology stack: ${items.join(", ")}`}
    >
      <div
        className={cn(
          "marquee-track flex",
          reverse ? "animate-marquee-rev" : "animate-marquee",
          "motion-reduce:animate-none",
        )}
      >
        {row}
        <div aria-hidden>{row}</div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-void to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-void to-transparent sm:w-28" />
    </div>
  );
}
