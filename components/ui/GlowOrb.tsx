import { cn } from "@/lib/utils";

/**
 * Soft drifting glow orb — pure CSS, no canvas or images.
 * Used sparingly as ambient depth behind hero, pricing and contact.
 */
export function GlowOrb({
  className,
  tone = "violet",
}: {
  className?: string;
  tone?: "violet" | "cyan" | "gold" | "emerald";
}) {
  const tones = {
    violet: "bg-violet/25 blur-[110px]",
    cyan: "bg-cyan/20 blur-[120px]",
    gold: "bg-gold/16 blur-[120px]",
    emerald: "bg-emerald/16 blur-[110px]",
  } as const;

  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute block size-[26rem] rounded-full",
        tones[tone],
        className,
      )}
    />
  );
}
