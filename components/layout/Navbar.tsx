"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { navLinks, site } from "@/data/site";
import { openCommandPalette } from "@/lib/events";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { cn, isAppleDevice } from "@/lib/utils";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion";

const SECTION_IDS = navLinks.map((link) => link.href.slice(1));
const MENU_IDS = [...SECTION_IDS, "contact"];

export function Navbar() {
  const active = useActiveSection(MENU_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const reduced = useReducedMotionSafe();
  const menuId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start();
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500",
          hidden && !open && "-translate-y-full",
        )}
      >
        <div
          className={cn(
            "border-b transition-all duration-500",
            scrolled || open
              ? "border-line/80 bg-void/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-void/65"
              : "border-transparent bg-transparent",
          )}
        >
          <nav
            aria-label="Primary"
            className="container-page flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]"
          >
            <a href="#top" aria-label="Tech Sorcery — back to top" className="shrink-0">
              <Logo />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative rounded-full px-3.5 py-2 text-[0.9rem] transition-colors duration-300",
                        isActive ? "text-mist" : "text-mist-3 hover:text-mist",
                      )}
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gradient-to-r from-violet to-cyan transition-transform duration-300",
                          isActive ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openCommandPalette}
                aria-label="Open command menu"
                className="hidden items-center gap-2 rounded-full border border-line-2 bg-white/[0.03] px-3 py-2 text-mist-3 transition-colors hover:border-violet/60 hover:text-mist md:inline-flex"
              >
                <Search className="size-3.5" aria-hidden />
                <kbd className="font-mono text-[0.66rem] tracking-[0.1em]" suppressHydrationWarning>
                  {isAppleDevice() ? "⌘ K" : "Ctrl K"}
                </kbd>
              </button>

              <Button href="#contact" variant="primary" size="sm" className="hidden sm:inline-flex">
                Hire me
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls={menuId}
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid size-10 place-items-center rounded-full border border-line-2 bg-white/[0.03] text-mist transition-colors hover:border-violet/60 hover:bg-violet/10 lg:hidden"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: "circle(0% at 92% 5%)" }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, clipPath: "circle(150% at 92% 5%)" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: reduced ? 0.15 : 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-void/97 backdrop-blur-2xl lg:hidden"
          >
            <div className="h-16 shrink-0 sm:h-[4.5rem]" />

            <nav
              aria-label="Mobile"
              className="flex flex-1 flex-col justify-center px-6 pb-16 sm:px-10"
            >
              <ul className="space-y-1">
                {MENU_IDS.map((id, i) => {
                  const label = navLinks.find((l) => l.href === `#${id}`)?.label ?? "Contact";
                  const isActive = active === id;
                  return (
                    <motion.li
                      key={id}
                      initial={reduced ? { opacity: 0 } : { opacity: 0, x: -28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: reduced ? 0 : 0.14 + i * 0.06,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <a
                        href={`#${id}`}
                        onClick={close}
                        className={cn(
                          "group flex items-baseline gap-4 border-b border-line/70 py-4 text-3xl font-semibold tracking-[-0.03em] transition-colors sm:text-4xl",
                          isActive ? "text-mist" : "text-mist-3 hover:text-mist",
                        )}
                      >
                        <span className="font-mono text-[0.68rem] tracking-[0.2em] text-violet/80">
                          0{i + 1}
                        </span>
                        {label}
                        <ArrowUpRight className="ml-auto size-5 self-center opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0 : 0.5, duration: 0.5 }}
                className="mt-10 space-y-3"
              >
                <Button
                  href="#contact"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={close}
                >
                  Start a project
                </Button>
                <div className="flex flex-wrap gap-3 font-mono text-[0.72rem] tracking-[0.12em] text-mist-3 uppercase">
                  <a href={site.phoneHref} className="hover:text-cyan">
                    {site.phoneDisplay}
                  </a>
                  <a href={site.emailHref} className="break-all hover:text-cyan">
                    {site.email}
                  </a>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
