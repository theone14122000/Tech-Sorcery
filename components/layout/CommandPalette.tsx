"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  Check,
  Copy,
  FileText,
  Hash,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { navLinks, site } from "@/data/site";
import { OPEN_PALETTE_EVENT } from "@/lib/events";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion";
import { cn, isAppleDevice } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  group: "Jump to" | "Actions" | "Links";
  icon: LucideIcon;
  hint?: string;
  keywords?: string;
  run: () => void;
}

const NAV_OFFSET = -96;

/**
 * ⌘K / Ctrl+K command menu: jump to sections, copy the email, open the legal
 * pages. Opened by the navbar trigger or the keyboard shortcut.
 */
export function CommandPalette() {
  const reduced = useReducedMotionSafe();
  const router = useRouter();
  const { copy } = useCopyToClipboard();
  const baseId = useId();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    setStatus(null);
  }, []);

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery("");
    setActive(0);
    setStatus(null);
  }, []);

  /** Show a confirmation; it clears on close or on the next keystroke. */
  const flash = useCallback((message: string) => {
    setStatus(message);
  }, []);

  const jumpTo = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET, duration: 1.15 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  const commands = useMemo<Command[]>(() => {
    // Everything except "copy" dismisses the palette first: you asked for a
    // destination, not a menu.
    const jump: Command[] = navLinks.map((link) => ({
      id: link.href,
      label: link.label,
      group: "Jump to",
      icon: Hash,
      keywords: link.label,
      run: () => {
        close();
        jumpTo(link.href.slice(1));
      },
    }));

    jump.push({
      id: "#contact",
      label: "Contact — start a project",
      group: "Jump to",
      icon: Hash,
      keywords: "hire brief quote enquiry form",
      run: () => {
        close();
        jumpTo("contact");
      },
    });

    const actions: Command[] = [
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Actions",
        icon: Copy,
        hint: site.email,
        keywords: `email mail copy ${site.email}`,
        run: () => {
          void copy(site.email).then(() => flash("Email copied to clipboard"));
        },
      },
      {
        id: "call",
        label: `Call ${site.phoneDisplay}`,
        group: "Actions",
        icon: Phone,
        keywords: `phone call ${site.phoneDisplay}`,
        run: () => {
          close();
          window.location.href = site.phoneHref;
        },
      },
      {
        id: "whatsapp",
        label: "Chat on WhatsApp",
        group: "Actions",
        icon: MessageCircle,
        keywords: "whatsapp message chat",
        run: () => {
          close();
          window.open(site.whatsapp, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "top",
        label: "Back to top",
        group: "Actions",
        icon: ArrowUp,
        keywords: "top home start",
        run: () => {
          close();
          jumpTo("top");
        },
      },
    ];

    const links: Command[] = [
      {
        id: "/privacy",
        label: "Privacy policy",
        group: "Links",
        icon: ShieldCheck,
        keywords: "legal privacy data gdpr",
        run: () => {
          close();
          router.push("/privacy");
        },
      },
      {
        id: "/terms",
        label: "Terms of service",
        group: "Links",
        icon: FileText,
        keywords: "legal terms conditions refund",
        run: () => {
          close();
          router.push("/terms");
        },
      },
    ];

    return [...jump, ...actions, ...links];
  }, [close, copy, flash, jumpTo, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.group} ${command.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  const activeIndex = Math.min(active, Math.max(filtered.length - 1, 0));
  const optionId = (index: number) => `${baseId}-option-${index}`;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") return;
      event.preventDefault();
      if (open) close();
      else openPalette();
    };
    const onOpen = () => openPalette();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, [close, open, openPalette]);

  // Pause smooth scrolling + lock the page while the palette is up.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    inputRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    document
      .getElementById(`${baseId}-option-${activeIndex}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, baseId]);

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const last = filtered.length - 1;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (filtered.length === 0 ? 0 : i >= last ? 0 : i + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (filtered.length === 0 ? 0 : i <= 0 ? last : i - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      filtered[activeIndex]?.run();
    }
  };

  const onPanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const focusables = panelRef.current?.querySelectorAll<HTMLElement>("input, button");
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const lastEl = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      lastEl.focus();
    } else if (!event.shiftKey && document.activeElement === lastEl) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.12 : 0.18 }}
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
        >
          <div
            aria-hidden
            onPointerDown={close}
            className="absolute inset-0 bg-void/85 backdrop-blur-md"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: reduced ? 0.12 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={onPanelKeyDown}
            className="hairline glass relative w-full max-w-xl overflow-hidden rounded-2xl shadow-[0_40px_120px_-30px_rgba(124,92,255,0.55)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-4 shrink-0 text-mist-4" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                  setStatus(null);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Jump to a section, copy the email…"
                className="h-12 w-full min-w-0 bg-transparent text-sm text-mist outline-none placeholder:text-mist-4"
                role="combobox"
                aria-expanded="true"
                aria-controls={baseId}
                aria-autocomplete="list"
                aria-activedescendant={filtered.length > 0 ? optionId(activeIndex) : undefined}
                aria-label="Search commands"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden rounded-md border border-line-2 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[0.6rem] tracking-[0.12em] text-mist-4 sm:block">
                ESC
              </kbd>
            </div>

            <ul
              id={baseId}
              role="listbox"
              aria-label="Commands"
              className="max-h-[52vh] overflow-y-auto p-2"
            >
              {filtered.length === 0 && (
                <li role="presentation" className="px-3 py-8 text-center text-sm text-mist-4">
                  No matches — try “packages”, “email” or “privacy”.
                </li>
              )}

              {filtered.map((command, index) => {
                const isActive = index === activeIndex;
                const isGroupStart = index === 0 || filtered[index - 1].group !== command.group;
                const Icon = command.icon;

                return (
                  <Fragment key={command.id}>
                    {isGroupStart && (
                      <li
                        role="presentation"
                        className="px-3 pt-3 pb-1.5 font-mono text-[0.6rem] tracking-[0.18em] text-mist-4 uppercase"
                      >
                        {command.group}
                      </li>
                    )}
                    <li
                      id={optionId(index)}
                      role="option"
                      aria-selected={isActive}
                      onPointerMove={() => setActive(index)}
                      onPointerDown={(event) => {
                        event.preventDefault();
                        command.run();
                      }}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
                        isActive ? "bg-violet/15 text-mist" : "text-mist-3",
                      )}
                    >
                      <Icon
                        className={cn("size-4 shrink-0", isActive ? "text-cyan" : "text-mist-4")}
                        aria-hidden
                      />
                      <span className="truncate">{command.label}</span>
                      {command.hint && (
                        <span className="ml-auto hidden max-w-[45%] truncate font-mono text-[0.62rem] text-mist-4 sm:block">
                          {command.hint}
                        </span>
                      )}
                    </li>
                  </Fragment>
                );
              })}
            </ul>

            <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5 font-mono text-[0.6rem] tracking-[0.14em] text-mist-4 uppercase">
              {status ? (
                <span className="flex items-center gap-2 text-emerald">
                  <Check className="size-3.5" aria-hidden />
                  {status}
                </span>
              ) : (
                <span>↑↓ navigate · ↵ select · esc close</span>
              )}
              <span className="flex items-center gap-1.5">
                <kbd
                  className="rounded-md border border-line-2 bg-white/[0.04] px-1.5 py-0.5"
                  suppressHydrationWarning
                >
                  {isAppleDevice() ? "⌘" : "Ctrl"}
                </kbd>
                <kbd className="rounded-md border border-line-2 bg-white/[0.04] px-1.5 py-0.5">
                  K
                </kbd>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
