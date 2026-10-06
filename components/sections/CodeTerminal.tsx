"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface Token {
  text: string;
  cls: string;
}

type Line = Token[];

const C = {
  comment: "text-mist-4",
  keyword: "text-violet-soft",
  string: "text-emerald",
  key: "text-cyan",
  punct: "text-mist-3",
  fn: "text-gold",
  plain: "text-mist-2",
} as const;

const CODE: Line[] = [
  [{ text: "// sorcery.config.ts", cls: C.comment }],
  [
    { text: "import ", cls: C.keyword },
    { text: "{ defineProject } ", cls: C.plain },
    { text: "from ", cls: C.keyword },
    { text: '"tech-sorcery"', cls: C.string },
    { text: ";", cls: C.punct },
  ],
  [],
  [
    { text: "export default ", cls: C.keyword },
    { text: "defineProject", cls: C.fn },
    { text: "({", cls: C.punct },
  ],
  [
    { text: "  owner: ", cls: C.key },
    { text: '"Shubham Sharma"', cls: C.string },
    { text: ",", cls: C.punct },
  ],
  [
    { text: "  since: ", cls: C.key },
    { text: "2021", cls: C.plain },
    { text: ",", cls: C.punct },
    { text: "  // 5+ years", cls: C.comment },
  ],
  [{ text: "  services: [", cls: C.key }],
  [{ text: '    "website-building",', cls: C.string }],
  [{ text: '    "ai-integration",', cls: C.string }],
  [{ text: '    "seo-integration",', cls: C.string }],
  [{ text: '    "gtm-analytics",', cls: C.string }],
  [{ text: "  ],", cls: C.punct }],
  [
    { text: "  delivery: ", cls: C.key },
    { text: '"5 days -> 5 weeks"', cls: C.string },
    { text: ",", cls: C.punct },
  ],
  [
    { text: "  status: ", cls: C.key },
    { text: '"available"', cls: C.string },
    { text: "  ", cls: C.plain },
    { text: "// accepting projects", cls: C.comment },
  ],
  [{ text: "});", cls: C.punct }],
];

/** Character offset where each line starts (module scope, computed once). */
const LINE_STARTS: number[] = (() => {
  const starts: number[] = [];
  let sum = 0;
  for (const line of CODE) {
    starts.push(sum);
    sum += line.reduce((n, token) => n + token.text.length, 0) + 1;
  }
  starts.push(sum);
  return starts;
})();

const TOTAL_CHARS = LINE_STARTS[LINE_STARTS.length - 1];
const CHARS_PER_TICK = 3;
const TICK_MS = 16;

interface RenderedLine {
  key: number;
  tokens: Token[];
  cursor: boolean;
}

function cursorLineFor(chars: number): number {
  for (let index = 0; index < CODE.length; index += 1) {
    const start = LINE_STARTS[index];
    const end = LINE_STARTS[index + 1] ?? TOTAL_CHARS;
    if (chars >= start && chars < end) return index;
  }
  return CODE.length - 1;
}

/** Pure slice of the script up to `chars` — no state, no mutation of render data. */
function buildLines(chars: number, done: boolean): RenderedLine[] {
  const cursorIndex = done ? CODE.length - 1 : cursorLineFor(chars);

  return CODE.map((line, lineIndex) => {
    let remaining = chars;
    // Consume characters already emitted by previous lines.
    for (let previous = 0; previous < lineIndex; previous += 1) {
      remaining -= CODE[previous].reduce((n, token) => n + token.text.length, 0) + 1;
    }

    const tokens: Token[] = [];
    if (remaining > 0) {
      for (const token of line) {
        if (remaining <= 0) break;
        const take = Math.min(remaining, token.text.length);
        tokens.push({ text: token.text.slice(0, take), cls: token.cls });
        remaining -= take;
      }
    }

    return { tokens, key: lineIndex, cursor: lineIndex === cursorIndex && !done };
  });
}

export function CodeTerminal({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [typed, setTyped] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reduced) return;

    timer.current = setInterval(() => {
      setTyped((current) => {
        const next = current + CHARS_PER_TICK;
        if (next >= TOTAL_CHARS) {
          if (timer.current) clearInterval(timer.current);
          return TOTAL_CHARS;
        }
        return next;
      });
    }, TICK_MS);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [reduced]);

  const progress = reduced ? TOTAL_CHARS : typed;
  const done = progress >= TOTAL_CHARS;

  const lines = useMemo(() => buildLines(progress, done), [progress, done]);

  return (
    <div
      className={cn(
        "hairline glass relative overflow-hidden rounded-2xl shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line/80 bg-white/[0.02] px-4 py-3">
        <span className="terminal-dots flex items-center gap-2" aria-hidden>
          <span className="bg-rose/80" />
          <span className="bg-gold/80" />
          <span className="bg-emerald/80" />
        </span>
        <span className="truncate font-mono text-[0.72rem] tracking-wide text-mist-4">
          sorcery.config.ts
        </span>
        <span className="ml-auto hidden font-mono text-[0.65rem] tracking-[0.18em] text-mist-4 uppercase sm:inline">
          ts
        </span>
      </div>

      <pre
        className="overflow-x-auto px-4 py-5 font-mono text-[0.7rem] leading-[1.75] sm:px-6 sm:text-[0.78rem] lg:text-[0.82rem]"
        aria-label="Code sample: sorcery.config.ts"
        role="img"
      >
        <code>
          {lines.map((line) => (
            <span key={line.key} className="block min-h-[1.75em] whitespace-pre">
              {line.tokens.map((token, i) => (
                <span key={i} className={token.cls}>
                  {token.text}
                </span>
              ))}
              {line.cursor && (
                <span aria-hidden className="animate-caret text-cyan">
                  ▌
                </span>
              )}
            </span>
          ))}
          {done && (
            <span className="mt-3 block whitespace-pre text-emerald">
              ✓ compiled successfully · 0 errors · ready to deploy
            </span>
          )}
        </code>
      </pre>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/80 bg-white/[0.02] px-4 py-3 font-mono text-[0.68rem] tracking-[0.12em] text-mist-4 uppercase sm:px-6">
        <span className="inline-flex items-center gap-2 text-emerald">
          <span className="size-1.5 rounded-full bg-emerald animate-blip" aria-hidden />
          {done ? "available for new projects" : "compiling…"}
        </span>
        <span className="text-mist-4">utf-8 · lf · india</span>
      </div>
    </div>
  );
}
