"use client";

import { ArrowRight, Check, Crown, Minus, MessageCircle } from "lucide-react";
import type { CSSProperties } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader, Container } from "@/components/ui/Section";
import {
  comparisonRows,
  packageFootnote,
  packageNote,
  tiers,
  type CellValue,
  type PackageTier,
} from "@/data/packages";
import { site } from "@/data/site";
import { usePointerGlow } from "@/hooks/use-pointer-glow";
import { requestPackage } from "@/lib/events";
import { seededRandom } from "@/lib/utils";

const tierOrder = ["basic", "standard", "premium"] as const;

const orderClasses: Record<PackageTier["id"], string> = {
  basic: "order-2 lg:order-1",
  standard: "order-1 lg:order-2",
  premium: "order-3",
};

function Cell({ value }: { value: CellValue }) {
  if (value === true) {
    return <Check className="mx-auto size-4 text-emerald" aria-label="Included" />;
  }
  if (value === false) {
    return <Minus className="mx-auto size-4 text-mist-4" aria-label="Not included" />;
  }
  return <span className="text-sm text-mist-2">{value}</span>;
}

function Particles() {
  // Deterministic sparkle field — pure CSS, no images.
  const sparks = Array.from({ length: 14 }, (_, i) => {
    const a = seededRandom(i + 1);
    const b = seededRandom(i + 31);
    const c = seededRandom(i + 77);
    return {
      left: `${6 + a * 88}%`,
      top: `${28 + b * 66}%`,
      tone: i % 3 === 0 ? "#f5c453" : i % 3 === 1 ? "#7c5cff" : "#22d3ee",
      size: `${2 + c * 3}px`,
      dur: `${6 + b * 6}s`,
      delay: `${-a * 8}s`,
      drift: `${-16 + c * 32}px`,
    };
  });

  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {sparks.map((spark, i) => (
        <span
          key={i}
          className="particle"
          style={
            {
              left: spark.left,
              top: spark.top,
              "--tone": spark.tone,
              "--size": spark.size,
              "--dur": spark.dur,
              "--delay": spark.delay,
              "--drift": spark.drift,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}

function TierCard({ tier }: { tier: PackageTier }) {
  const isStandard = tier.id === "standard";
  const isPremium = tier.id === "premium";
  const isBasic = tier.id === "basic";
  const { onPointerMove, onPointerLeave } = usePointerGlow({ tilt: 4 });

  const surface = [
    "glass spotlight relative rounded-card p-6 sm:p-7 transition-all duration-500 [perspective:1100px]",
    isBasic && "border-line-2 hover:border-mist-4/40 hover:-translate-y-1",
    isStandard &&
      "gradient-ring z-10 shadow-[0_30px_90px_-40px_rgba(124,92,255,0.9)] lg:-translate-y-3 lg:hover:-translate-y-5",
    isPremium && "conic-ring shadow-[0_30px_90px_-40px_rgba(245,196,83,0.55)] hover:-translate-y-1",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={`${surface} ${orderClasses[tier.id]}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {isPremium && <Particles />}

      {isStandard && (
        <span
          aria-hidden
          className="absolute -inset-8 -z-10 rounded-[2rem] bg-violet/25 blur-3xl"
        />
      )}

      <div className="relative z-10 flex h-full flex-col [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] transition-transform duration-300">
        {/* header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.2em] text-mist-4 uppercase">
            <span className={isPremium ? "text-gold" : isStandard ? "text-cyan" : "text-mist-4"}>
              {tier.index}
            </span>
            <span>{tier.name}</span>
          </div>

          {tier.badge && (
            <span
              className={[
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.62rem] font-semibold tracking-[0.16em] uppercase",
                isPremium
                  ? "border border-gold/50 bg-gold/15 text-gold"
                  : "border border-cyan/50 bg-cyan/15 text-cyan",
              ].join(" ")}
            >
              {isPremium ? <Crown className="size-3" aria-hidden /> : null}
              {tier.badge}
            </span>
          )}
        </div>

        {/* price */}
        <div className="mt-6">
          {tier.pricePrefix && (
            <p className="font-mono text-[0.68rem] tracking-[0.18em] text-mist-4 uppercase">
              {tier.pricePrefix}
            </p>
          )}
          <p
            className={[
              "mt-2 font-semibold tracking-[-0.045em] text-mist",
              isPremium
                ? "text-[1.55rem] leading-tight sm:text-[1.95rem] lg:text-[1.75rem] xl:text-[2rem]"
                : "text-[2.4rem] leading-none sm:text-[3rem]",
              isPremium && "text-gradient-gold",
              isStandard && "text-gradient-accent",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {tier.price}
          </p>
          {tier.priceNote && (
            <p className="mt-1.5 font-mono text-[0.66rem] tracking-[0.1em] text-mist-4 uppercase">
              {tier.priceNote}
            </p>
          )}
          <p className="mt-4 text-[0.95rem] leading-snug font-medium text-mist-2">{tier.tagline}</p>
        </div>

        {/* meta */}
        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-line py-4 font-mono text-[0.66rem] tracking-wide uppercase">
          <div>
            <dt className="text-mist-4">Delivery</dt>
            <dd className="mt-1 text-mist-2">{tier.delivery}</dd>
          </div>
          <div>
            <dt className="text-mist-4">Revisions</dt>
            <dd className="mt-1 text-mist-2">{tier.revisions}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-mist-4">Support</dt>
            <dd className="mt-1 text-mist-2">{tier.support}</dd>
          </div>
        </dl>

        {/* features */}
        <ul className="mt-6 flex-1 space-y-3">
          {tier.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-[0.9rem] leading-snug text-mist-2">
              <Check
                className={[
                  "mt-0.5 size-4 shrink-0",
                  isPremium ? "text-gold" : isStandard ? "text-cyan" : "text-emerald",
                ].join(" ")}
                aria-hidden
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {tier.excluded && (
          <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
            <li className="font-mono text-[0.64rem] tracking-[0.18em] text-mist-4 uppercase">
              Not included
            </li>
            {tier.excluded.map((feature) => (
              <li
                key={feature}
                className="flex gap-3 text-[0.85rem] leading-snug text-mist-4 line-through decoration-mist-4/40"
              >
                <Minus className="mt-0.5 size-4 shrink-0 text-mist-4/60" aria-hidden />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <div className="mt-8">
          <Button
            href="#contact"
            onClick={() => requestPackage(tier.name)}
            variant={isPremium ? "gold" : isStandard ? "primary" : "outline"}
            size="lg"
            className={`relative w-full overflow-hidden ${isPremium ? "font-semibold" : ""}`}
            aria-label={`Choose the ${tier.name} package`}
          >
            {isPremium && <span aria-hidden className="shimmer-btn absolute inset-0" />}
            <span className="relative inline-flex items-center gap-2">
              {tier.cta}
              <ArrowRight className="size-4" />
            </span>
          </Button>
          <p className="mt-3 text-center font-mono text-[0.64rem] tracking-[0.14em] text-mist-4 uppercase">
            {tier.domainNote}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Packages() {
  const ordered = tierOrder
    .map((id) => tiers.find((tier) => tier.id === id))
    .filter((tier): tier is PackageTier => Boolean(tier));

  const mobileItems = comparisonRows.map((row) => ({
    id: row.label,
    question: row.label,
    answer: (
      <dl className="space-y-2">
        {(["Basic", "Standard", "Premium"] as const).map((name, i) => (
          <div
            key={name}
            className="flex items-center justify-between gap-4 border-b border-line/70 pb-2 last:border-0"
          >
            <dt className="font-mono text-[0.7rem] tracking-[0.14em] text-mist-4 uppercase">
              {name}
            </dt>
            <dd className="text-right text-sm text-mist-2">
              <Cell value={row.cells[i]} />
            </dd>
          </div>
        ))}
      </dl>
    ),
  }));

  return (
    <section id="packages" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-field opacity-60" />
        <GlowOrb
          tone="violet"
          className="top-20 left-1/2 size-[30rem] -translate-x-1/2 animate-drift"
        />
        <GlowOrb tone="gold" className="right-[-10rem] bottom-10 size-[22rem] animate-drift-slow" />
      </div>

      <Container>
        <SectionHeader
          index="03"
          eyebrow="// packages"
          align="center"
          title={
            <>
              Three tiers.
              <br className="sm:hidden" />{" "}
              <span className="text-gradient-accent">No surprises.</span>
            </>
          }
          lead="Transparent starting prices, written scope and a fixed quote before anything begins."
        />

        {/* prominent note */}
        <Reveal delay={0.06} className="mx-auto mt-8 max-w-3xl">
          <p className="flex items-start gap-3 rounded-2xl border border-violet/35 bg-violet/8 px-5 py-4 text-center text-sm leading-relaxed text-mist-2 sm:px-7 sm:text-[0.95rem]">
            <span
              aria-hidden
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-violet/60 text-[0.65rem] text-violet-soft"
            >
              !
            </span>
            {packageNote}
          </p>
        </Reveal>

        {/* cards */}
        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:items-stretch lg:gap-5 lg:px-2">
          {ordered.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        {/* footnote + custom CTA */}
        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-line bg-white/[0.02] px-6 py-5 sm:flex-row sm:px-8">
            <div>
              <p className="text-sm font-medium text-mist">
                Need something custom? Let&apos;s talk.
              </p>
              <p className="mt-1 font-mono text-[0.66rem] tracking-[0.14em] text-mist-4 uppercase">
                {packageFootnote}
              </p>
            </div>
            <Button
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              variant="cyan"
              size="md"
              className="shrink-0"
            >
              <MessageCircle className="size-4" />
              Message on WhatsApp
            </Button>
          </div>
        </Reveal>

        {/* comparison */}
        <div className="mt-16 lg:mt-24">
          <SectionHeader
            index="04"
            eyebrow="// compare"
            title="What changes between tiers"
            lead="The short version of everything above, line by line."
          />

          {/* desktop table */}
          <Reveal delay={0.05} className="mt-10 hidden lg:block">
            <div className="hairline glass overflow-hidden rounded-2xl">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Feature comparison across Basic, Standard and Premium
                </caption>
                <thead>
                  <tr className="border-b border-line">
                    <th
                      scope="col"
                      className="px-6 py-5 font-mono text-[0.68rem] tracking-[0.2em] text-mist-4 uppercase"
                    >
                      Feature
                    </th>
                    {tiers.map((tier) => (
                      <th
                        key={tier.id}
                        scope="col"
                        className={[
                          "px-6 py-5 text-center font-mono text-[0.68rem] tracking-[0.2em] uppercase",
                          tier.id === "standard"
                            ? "bg-violet/8 text-cyan"
                            : tier.id === "premium"
                              ? "bg-gold/6 text-gold"
                              : "text-mist-4",
                        ].join(" ")}
                      >
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr
                      key={row.label}
                      className={[
                        "border-b border-line/70 transition-colors duration-300 last:border-0 hover:bg-white/[0.025]",
                        index % 2 === 1 && "bg-white/[0.012]",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <th scope="row" className="px-6 py-4 text-sm font-normal text-mist-2">
                        {row.label}
                      </th>
                      {row.cells.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={[
                            "px-6 py-4 text-center",
                            cellIndex === 1 && "bg-violet/6",
                            cellIndex === 2 && "bg-gold/5",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          <Cell value={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* mobile accordion */}
          <div className="mt-8 lg:hidden">
            <Accordion items={mobileItems} multiple />
          </div>
        </div>
      </Container>
    </section>
  );
}
