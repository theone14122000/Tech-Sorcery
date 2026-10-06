"use client";

import { ArrowUpRight, Check, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/Button";

const CASE_STUDY_PARTS = [
  "Problem, scope and constraints",
  "Stack choices — and why",
  "Before / after performance numbers",
  "Screens, metrics and decisions",
];

/**
 * TODO(portfolio): shown while `/data/projects.ts` is empty.
 * Drop projects into that file and this placeholder disappears automatically.
 */
export function PortfolioPlaceholder() {
  return (
    <div className="hairline glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-field opacity-30" />

      <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 font-mono text-[0.66rem] tracking-[0.18em] text-gold uppercase">
            <span className="size-1.5 rounded-full bg-gold animate-blip" aria-hidden />
            Writing case studies
          </span>

          <h3 className="mt-6 text-[1.85rem] leading-tight font-semibold tracking-[-0.035em] text-mist sm:text-[2.4rem]">
            The portfolio is being
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient-accent">compiled.</span>
          </h3>

          <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-mist-3">
            I keep client work under wraps until case studies are written up properly — metrics,
            stack and screenshots included. Every build here gets the same engineering standard.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#contact" variant="primary" size="lg">
              Be my next case study
              <ArrowUpRight className="size-4" />
            </Button>
            <Button href="#packages" variant="outline" size="lg">
              See packages
            </Button>
          </div>
        </div>

        {/* build log + what each case study ships with */}
        <div className="rounded-2xl border border-line bg-void/70 p-5 font-mono text-[0.72rem] leading-relaxed sm:p-6 sm:text-[0.78rem]">
          <div className="flex items-center gap-3 border-b border-line pb-3 text-mist-4">
            <span className="terminal-dots flex items-center gap-1.5" aria-hidden>
              <span className="size-2 rounded-full bg-rose/70" />
              <span className="size-2 rounded-full bg-gold/70" />
              <span className="size-2 rounded-full bg-emerald/70" />
            </span>
            <span>case-studies.build</span>
          </div>

          <ul className="mt-4 space-y-3">
            {[
              { label: "scoping metrics", state: "done" },
              { label: "writing case study", state: "active" },
              { label: "publishing", state: "queued" },
            ].map((row) => (
              <li key={row.label} className="flex items-center gap-3">
                <span
                  className={
                    row.state === "done"
                      ? "text-emerald"
                      : row.state === "active"
                        ? "text-cyan"
                        : "text-mist-4"
                  }
                  aria-hidden
                >
                  {row.state === "done" ? "✓" : row.state === "active" ? "▸" : "·"}
                </span>
                <span className={row.state === "queued" ? "text-mist-4" : "text-mist-2"}>
                  {row.label}
                </span>
                <span className="ml-auto text-[0.62rem] tracking-[0.16em] text-mist-4 uppercase">
                  {row.state}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-5 border-t border-line pt-4 font-mono text-[0.62rem] tracking-[0.16em] text-mist-4 uppercase">
            Every case study ships with
          </p>
          <ul className="mt-3 space-y-2.5">
            {CASE_STUDY_PARTS.map((part) => (
              <li key={part} className="flex gap-3 text-[0.78rem] leading-snug text-mist-2">
                <Check className="mt-0.5 size-3.5 shrink-0 text-emerald" aria-hidden />
                <span>{part}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 flex items-center gap-2 text-mist-4">
            <GitBranch className="size-3.5" aria-hidden />
            building… <span className="animate-caret text-cyan">▌</span>
          </p>
        </div>
      </div>
    </div>
  );
}
