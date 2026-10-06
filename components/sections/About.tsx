"use client";

import { Counter } from "@/components/ui/Counter";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { stats } from "@/data/stats";
import { timeline } from "@/data/timeline";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <GlowOrb tone="violet" className="top-1/4 -left-40 size-[24rem] animate-drift-slow" />
      </div>

      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* ---- story ---- */}
          <div>
            <SectionHeader
              index="01"
              eyebrow="// about"
              title={
                <>
                  Engineering first.
                  <br />
                  <span className="text-gradient-accent">Magic</span> as a side effect.
                </>
              }
            />

            <Reveal delay={0.08}>
              <div className="mt-8 space-y-5 text-[0.98rem] leading-relaxed text-mist-3 sm:text-base">
                <p>
                  I started freelancing in 2021–22 with one rule: ship work that survives contact
                  with real users. Five years later that rule still decides everything — from the
                  typography to the deploy pipeline.
                </p>
                <p>
                  In that time I&apos;ve built career and recruitment platforms, hospitality and
                  lifestyle sites, lead-generation tools and internal dashboards. Some were
                  brochures, some were full products. All of them had to load fast, rank well and
                  turn visitors into enquiries.
                </p>
                <p className="text-mist">
                  I work end to end — design, development, deployment, SEO and analytics — so you
                  deal with one person instead of five vendors, and nothing gets lost between them.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---- timeline ---- */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-transparent via-violet/50 to-transparent sm:left-[9px]"
            />

            <Stagger className="space-y-8" stagger={0.07}>
              {timeline.map((entry) => (
                <StaggerItem key={entry.year} className="relative pl-10 sm:pl-14">
                  <span
                    aria-hidden
                    className="absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border border-violet/60 bg-void sm:size-[19px]"
                  >
                    <span className="size-1.5 rounded-full bg-violet" />
                  </span>

                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-mono text-[0.78rem] tracking-[0.16em] text-cyan">
                      {entry.year}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-mist sm:text-xl">
                      {entry.title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-mist-3">
                    {entry.body}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        {/* ---- stats ---- */}
        <Stagger className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:mt-24 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem
              key={stat.label}
              className="group bg-panel px-5 py-7 transition-colors duration-500 hover:bg-panel-2 sm:px-7 sm:py-9"
            >
              <p className="text-[2.1rem] leading-none font-semibold tracking-[-0.04em] text-mist sm:text-[2.75rem]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-sm font-medium text-mist-2">{stat.label}</p>
              <p className="mt-1 font-mono text-[0.68rem] tracking-[0.12em] text-mist-4 uppercase">
                {stat.note}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
