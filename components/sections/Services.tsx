"use client";

import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-2 to-transparent"
      />

      <Container>
        <SectionHeader
          index="02"
          eyebrow="// services"
          title={
            <>
              Four levers. <span className="text-gradient-accent">One operator.</span>
            </>
          }
          lead="Every engagement is built from the same kit: a fast site, the automation on top of it, the search visibility underneath it, and the measurement that proves it worked."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6" stagger={0.09}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.id}>
                <SpotlightCard className="group h-full p-6 sm:p-8">
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid size-12 place-items-center rounded-xl border border-violet/30 bg-violet/10 text-violet-soft transition-all duration-500 group-hover:border-cyan/50 group-hover:bg-cyan/10 group-hover:text-cyan">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="font-mono text-[0.72rem] tracking-[0.2em] text-mist-4 transition-colors group-hover:text-violet-soft">
                        {service.index}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-mist sm:text-2xl">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-[0.95rem] leading-relaxed text-mist-3">
                      {service.summary}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {service.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="rounded-full border border-line-2 bg-white/[0.03] px-3 py-1 font-mono text-[0.68rem] tracking-wide text-mist-3 transition-colors duration-300 group-hover:border-violet/30 group-hover:text-mist-2"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#contact"
                      className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-mist-3 transition-colors hover:text-cyan"
                      aria-label={`Discuss ${service.title}`}
                    >
                      Discuss this
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
