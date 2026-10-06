"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion";

interface AccordionItemData {
  id: string;
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
  /** Allow several panels open at once. */
  multiple?: boolean;
  defaultOpenId?: string;
}

export function Accordion({ items, className, multiple = false, defaultOpenId }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);
  const reduced = useReducedMotionSafe();
  const baseId = useId();

  const toggle = (id: string) => {
    setOpen((current) => {
      const isOpen = current.includes(id);
      if (multiple) {
        return isOpen ? current.filter((x) => x !== id) : [...current, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <div
      className={cn(
        "divide-y divide-line rounded-2xl border border-line bg-white/[0.02]",
        className,
      )}
    >
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <div key={item.id} className="group">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className={cn(
                  "flex w-full items-start justify-between gap-6 px-5 py-5 text-left transition-colors sm:px-7 sm:py-6",
                  isOpen ? "text-mist" : "text-mist-2 hover:text-mist",
                )}
              >
                <span className="text-base leading-snug font-medium tracking-tight sm:text-lg">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-300",
                    isOpen
                      ? "rotate-180 border-violet/60 bg-violet/20 text-violet-soft"
                      : "border-line-2 bg-white/[0.03] text-mist-3 group-hover:border-violet/40",
                  )}
                >
                  {isOpen ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? { height: "auto", opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.34, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 text-[0.95rem] leading-relaxed text-mist-3 sm:px-7 sm:pb-7">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
