import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "onDark";

export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[rgba(141,124,255,0.4)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--mp-bg)] hover:-translate-y-px active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "text-white shadow-[var(--mp-btn-shadow)] hover:brightness-[1.04] [background-image:var(--mp-btn)]",
  secondary:
    "bg-white/80 text-[var(--mp-ink)] ring-1 ring-[rgb(var(--mp-lavender-rgb)_/_0.22)] hover:bg-white hover:ring-[rgb(var(--mp-lavender-rgb)_/_0.4)]",
  outline:
    "bg-white/80 text-[var(--mp-ink)] ring-1 ring-[rgb(var(--mp-lavender-rgb)_/_0.22)] hover:bg-white",
  ghost:
    "bg-transparent text-[var(--mp-ink)] hover:bg-[rgb(var(--mp-lavender-rgb)_/_0.08)]",
  onDark:
    "text-white shadow-[var(--mp-btn-shadow)] hover:brightness-[1.04] [background-image:var(--mp-btn)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}

export default function Button({
  className = "",
  variant = "primary",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  );
}

export function ButtonLink({
  className = "",
  variant = "primary",
  size = "md",
  ...props
}: ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <Link
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  );
}

export function badgeClassName(
  tone: "neutral" | "hit" | "price" | "onDark" = "neutral",
  className = ""
) {
  const tones: Record<string, string> = {
    neutral:
      "rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold text-black/60 ring-1 ring-[rgb(var(--mp-lavender-rgb)_/_0.14)]",
    hit: "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white [background-image:var(--mp-btn)]",
    price:
      "rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[var(--mp-lavender)] ring-1 ring-[rgb(var(--mp-lavender-rgb)_/_0.18)]",
    onDark:
      "rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--mp-ink)] ring-1 ring-white/50",
  };
  return `${tones[tone]} ${className}`.trim();
}
