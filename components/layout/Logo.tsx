"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Hide the wordmark and show only the monogram (used in tight spaces). */
  monogramOnly?: boolean;
}

/**
 * TODO(logo): this is the placeholder brand mark.
 * Swap the contents of <Logo /> for the real Tech Sorcery logo later —
 * everything else (navbar, footer, 404, print) already imports this component.
 */
export function Logo({ className, monogramOnly = false }: LogoProps) {
  const uid = useId().replace(/:/g, "");
  const gradientId = `logo-grad-${uid}`;

  return (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        role="img"
        aria-label="Tech Sorcery logo"
        className="size-9 shrink-0 transition-transform duration-500 group-hover:-rotate-6"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="4"
            y1="4"
            x2="36"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#7C5CFF" />
            <stop offset="55%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#A693FF" />
          </linearGradient>
        </defs>
        <rect
          x="1.25"
          y="1.25"
          width="37.5"
          height="37.5"
          rx="11.5"
          fill={`url(#${gradientId})`}
          opacity="0.14"
        />
        <rect
          x="1.25"
          y="1.25"
          width="37.5"
          height="37.5"
          rx="11.5"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
        />
        <text
          x="20"
          y="26.5"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          letterSpacing="-0.6"
          fill={`url(#${gradientId})`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          TS
        </text>
      </svg>

      {!monogramOnly && (
        <span className="text-[1.02rem] leading-none font-semibold tracking-[-0.03em] text-mist">
          Tech <span className="text-gradient-accent">Sorcery</span>
        </span>
      )}
    </span>
  );
}
