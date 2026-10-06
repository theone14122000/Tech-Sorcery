"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Container, SectionHeader } from "@/components/ui/Section";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion";

const AUTOPLAY_MS = 6500;

export function Testimonials() {
  const reduced = useReducedMotionSafe();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;
  const active = testimonials[index];

  const go = useCallback((next: number) => setIndex((next + total) % total), [total]);

  useEffect(() => {
    if (reduced || paused || total < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduced, paused, total]);

  if (!active) return null;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative py-20 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-2 to-transparent"
      />

      <Container>
        <SectionHeader
          index="08"
          eyebrow="// kind words"
          title={<span id="testimonials-heading">What clients say after launch.</span>}
          align="center"
          className="mx-auto"
        />

        <div
          className="relative mx-auto mt-14 max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <Quote
            aria-hidden
            className="absolute -top-6 -left-2 size-16 text-violet/25 sm:-top-10 sm:-left-8 sm:size-24"
          />

          <div className="relative min-h-[19rem] rounded-3xl border border-line bg-white/[0.025] px-6 py-10 text-center sm:min-h-[17rem] sm:px-14 sm:py-14">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active.id}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -18 }}
                transition={{ duration: reduced ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-lg leading-relaxed font-medium text-mist sm:text-xl lg:text-[1.4rem]">
                  “{active.quote}”
                </p>
                <footer className="mt-7">
                  <p className="font-mono text-[0.78rem] tracking-[0.16em] text-cyan uppercase">
                    {active.name}
                  </p>
                  <p className="mt-1.5 text-sm text-mist-4">{active.role}</p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="mt-7 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="grid size-10 place-items-center rounded-full border border-line-2 bg-white/[0.03] text-mist-3 transition-all hover:border-violet/60 hover:bg-violet/10 hover:text-mist"
            >
              <ArrowLeft className="size-4" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((testimonial, i) => (
                <button
                  key={testimonial.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show testimonial ${i + 1} of ${total}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index
                      ? "w-8 bg-gradient-to-r from-violet to-cyan"
                      : "w-1.5 bg-line-2 hover:bg-mist-4",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="grid size-10 place-items-center rounded-full border border-line-2 bg-white/[0.03] text-mist-3 transition-all hover:border-violet/60 hover:bg-violet/10 hover:text-mist"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
