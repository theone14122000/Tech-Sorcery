"use client";

import type { CSSProperties, ReactNode } from "react";
import { usePointerGlow } from "@/hooks/use-pointer-glow";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** px radius of the spotlight falloff. */
  radius?: number;
  /** Max tilt in degrees at the card edge. 0 disables the tilt. */
  tilt?: number;
}

/**
 * Glass card whose glow follows the cursor, plus a subtle 3D tilt. Both are
 * CSS custom properties (`--mx` / `--my` / `--rx` / `--ry`) so the browser
 * only repaints one layer; the tilt is skipped for reduced-motion visitors.
 */
export function SpotlightCard({ children, className, radius = 340, tilt = 5 }: SpotlightCardProps) {
  const { onPointerMove, onPointerLeave } = usePointerGlow({ radius, tilt });

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "spotlight hairline glass relative overflow-hidden rounded-card transition-transform duration-500 [transform:perspective(1200px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]",
        className,
      )}
      style={
        {
          "--spot-radius": `${radius}px`,
          "--rx": "0deg",
          "--ry": "0deg",
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
