"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function canQuery(): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function";
}

function subscribe(onChange: () => void): () => void {
  if (!canQuery()) return () => undefined;
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return canQuery() && window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Hydration-safe `prefers-reduced-motion` reader.
 *
 * The media query only exists in the browser, so the server always renders
 * with `false`. `useSyncExternalStore` hands React that same server snapshot
 * for the hydration render and only switches to the real preference
 * afterwards — which keeps server HTML and client markup identical while
 * still honouring the user's setting.
 */
export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const usePrefersReducedMotion = useReducedMotionSafe;
