import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  index,
  title,
  lead,
  align = "left",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {(eyebrow || index) && (
        <div
          className={cn(
            "flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.22em] text-cyan uppercase",
            centered && "justify-center",
          )}
        >
          {index && <span className="text-mist-4">{index}</span>}
          {eyebrow && <span>{eyebrow}</span>}
          <span aria-hidden className="hairline-x h-px w-16" />
        </div>
      )}

      <h2 className="mt-5 text-[2rem] leading-[1.05] font-semibold tracking-[-0.035em] text-mist sm:text-[2.6rem] lg:text-[3.2rem]">
        {title}
      </h2>

      {lead && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed text-mist-3 sm:text-lg",
            centered && "mx-auto",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

interface SectionProps {
  id: string;
  children: ReactNode;
  header?: ReactNode;
  className?: string;
  /** Removes the default vertical rhythm for sections that manage their own. */
  flush?: boolean;
}

export function Section({ id, children, header, className, flush = false }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={header ? `${id}-heading` : undefined}
      className={cn("relative", !flush && "py-20 sm:py-24 lg:py-32", className)}
    >
      {header}
      {children}
    </section>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-page", className)}>{children}</div>;
}
