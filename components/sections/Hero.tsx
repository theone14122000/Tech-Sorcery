"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { CodeTerminal } from "@/components/sections/CodeTerminal";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Magnetic } from "@/components/ui/Magnetic";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Section";
import { site, trustChips } from "@/data/site";
import { cn } from "@/lib/utils";
import { usePointerGlow } from "@/hooks/use-pointer-glow";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const clockFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export function Hero() {
  const reduced = useReducedMotionSafe();
  const { onPointerMove, onPointerLeave } = usePointerGlow({ tilt: 4 });

  // Live IST clock. Placeholder matches SSR output, so hydration stays clean.
  const [clock, setClock] = useState("--:--:--");
  useEffect(() => {
    const id = setInterval(() => setClock(clockFormatter.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="group relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40"
    >
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-field" />
        <div className="absolute inset-0 vignette" />
        {!reduced && (
          <div className="pointer-glow absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        )}
        <GlowOrb tone="violet" className="-top-40 -left-32 animate-drift" />
        <GlowOrb tone="cyan" className="top-24 right-[-8rem] size-[22rem] animate-drift-slow" />
        <GlowOrb tone="emerald" className="bottom-[-12rem] left-1/3 size-[20rem] animate-drift" />
      </div>

      <Container>
        <motion.div
          variants={container}
          initial={reduced ? "show" : "hidden"}
          animate="show"
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"
        >
          {/* ---- copy ---- */}
          <div className="min-w-0">
            <motion.div variants={item}>
              <Chip tone="cyan">
                <span className="size-1.5 rounded-full bg-cyan" aria-hidden />
                Freelance Developer • India
              </Chip>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-7 text-[clamp(2.5rem,5.6vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-mist"
            >
              I build websites
              <br />
              that rank, convert
              <br />
              and feel <span className="text-gradient">unfair.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-7 max-w-xl text-base leading-relaxed text-mist-3 sm:text-lg"
            >
              Hi, I&apos;m <span className="text-mist">{site.owner.name}</span>, a full-stack
              developer building fast websites, AI integrations, SEO and GTM setups for businesses
              that want to grow.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button href="#contact" variant="primary" size="lg">
                  Start a project
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Magnetic>
              <Button
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
              >
                <MessageCircle className="size-4" />
                WhatsApp me
              </Button>
            </motion.div>

            <motion.ul variants={item} className="mt-10 flex flex-wrap gap-2.5">
              {trustChips.map((chip) => (
                <li key={chip}>
                  <Chip tone="neutral" className="bg-white/[0.03]">
                    <Sparkles className="size-3 text-violet" aria-hidden />
                    {chip}
                  </Chip>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ---- terminal ---- */}
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 40, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-w-0 [perspective:1400px]"
          >
            <span
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-violet/25 via-transparent to-cyan/20 blur-3xl"
            />
            {/* tilts with the pointer via the section's --rx / --ry */}
            <div className="[transform:perspective(1400px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] transition-transform duration-300">
              <CodeTerminal />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 font-mono text-[0.68rem] tracking-[0.16em] text-mist-4 uppercase">
              <span className="hidden sm:inline">lat 12.9716 · lng 77.5946</span>
              <span className={cn("text-cyan")} aria-label="Current time in India">
                ist {clock}
              </span>
              <span>lighthouse ≥ 95</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
