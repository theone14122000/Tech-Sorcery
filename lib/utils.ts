import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Guarantees a section id scrolls clear of the sticky navbar. */
export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function isRelativeHref(href: string): boolean {
  return href.startsWith("#") || href.startsWith("/") || href.startsWith("?");
}

/** Deterministic pseudo-random number in [0, 1) from an integer seed. */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/**
 * True on Apple platforms, so shortcut labels can read "⌘ K" instead of
 * "Ctrl K". Evaluated during render — wrap the text node in
 * `suppressHydrationWarning` (the server cannot know the platform).
 */
export function isAppleDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
}
