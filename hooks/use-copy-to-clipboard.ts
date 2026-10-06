"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CopyState = "idle" | "copied" | "error";

export function useCopyToClipboard(resetMs = 1800): {
  state: CopyState;
  copy: (value: string) => Promise<void>;
} {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback(
    async (value: string) => {
      const done = (next: CopyState) => {
        setState(next);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setState("idle"), resetMs);
      };

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
          done("copied");
          return;
        }
        throw new Error("clipboard unavailable");
      } catch {
        // Fallback for older browsers / non-secure contexts.
        try {
          const ta = document.createElement("textarea");
          ta.value = value;
          ta.setAttribute("readonly", "");
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          const ok = document.execCommand("copy");
          document.body.removeChild(ta);
          done(ok ? "copied" : "error");
        } catch {
          done("error");
        }
      }
    },
    [resetMs],
  );

  return { state, copy };
}
