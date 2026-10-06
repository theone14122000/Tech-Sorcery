import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChipProps {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "violet" | "cyan" | "emerald" | "gold";
}

const tones: Record<NonNullable<ChipProps["tone"]>, string> = {
  neutral: "border-line-2 bg-white/[0.035] text-mist-2",
  violet: "border-violet/35 bg-violet/10 text-violet-soft",
  cyan: "border-cyan/35 bg-cyan/10 text-cyan",
  emerald: "border-emerald/35 bg-emerald/10 text-emerald",
  gold: "border-gold/40 bg-gold/10 text-gold",
};

export function Chip({ children, className, tone = "neutral" }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[0.7rem] tracking-[0.14em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-violet/40 bg-violet/15 px-3 py-1 font-mono text-[0.68rem] font-semibold tracking-[0.18em] text-violet-soft uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
