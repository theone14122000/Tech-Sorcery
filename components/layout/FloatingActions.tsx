"use client";

import { ArrowUp, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Floating WhatsApp shortcut — present on every page, bottom-right. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Shubham on WhatsApp"
      className={cn(
        "group fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6",
        "grid size-14 place-items-center rounded-full border border-emerald/40 bg-emerald/15 text-emerald backdrop-blur-xl transition-all duration-500",
        "hover:border-emerald hover:bg-emerald hover:text-void hover:scale-105 hover:shadow-[0_16px_45px_-12px_rgba(52,211,153,0.9)]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full border border-emerald/50 animate-radar motion-reduce:hidden"
      />
      <MessageCircle className="size-6" strokeWidth={2} />
    </a>
  );
}

/** Smooth back-to-top control used inside the footer. */
export function BackToTop({ className }: { className?: string }) {
  const onClick = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-line-2 bg-white/[0.03] px-4 py-2.5 font-mono text-[0.7rem] tracking-[0.18em] text-mist-3 uppercase transition-all duration-300 hover:border-violet/60 hover:bg-violet/10 hover:text-mist",
        className,
      )}
    >
      <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      Back to top
    </button>
  );
}
