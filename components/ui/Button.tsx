import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "cyan" | "gold";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-cyan disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-violet to-violet-deep text-white shadow-[0_10px_40px_-12px_rgba(124,92,255,0.85)] hover:shadow-[0_16px_50px_-10px_rgba(124,92,255,1)] hover:-translate-y-0.5",
  cyan: "bg-cyan text-void shadow-[0_10px_40px_-14px_rgba(34,211,238,0.9)] hover:-translate-y-0.5 hover:brightness-110",
  gold: "bg-gradient-to-r from-gold via-amber to-gold text-void shadow-[0_12px_45px_-14px_rgba(245,196,83,0.9)] hover:-translate-y-0.5",
  outline:
    "border border-line-2 bg-white/[0.03] text-mist hover:border-violet/60 hover:bg-violet/10 hover:-translate-y-0.5",
  ghost: "text-mist-2 hover:text-mist hover:bg-white/[0.05]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm sm:h-12 sm:px-7 sm:text-[0.95rem]",
  lg: "h-12 px-7 text-[0.95rem] sm:h-14 sm:px-9 sm:text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (typeof rest.href === "string") {
    const { href, ...anchorRest } = rest;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button type="button" className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
