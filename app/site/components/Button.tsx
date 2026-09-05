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
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,196,0,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--mp-bg)] hover:-translate-y-px active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--mp-accent)] text-[var(--mp-ink)] shadow-[0_12px_28px_rgba(255,196,0,0.22)] hover:brightness-[0.97]",
  secondary:
    "bg-[var(--mp-ink)] text-white hover:opacity-90",
  outline:
    "bg-white/80 text-[var(--mp-ink)] ring-1 ring-black/10 hover:bg-white",
  ghost:
    "bg-transparent text-[var(--mp-ink)] hover:bg-black/[0.05]",
  onDark:
    "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/16",
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

/** Единые бейджи метаданных / «Хит» */
export function badgeClassName(
  tone: "neutral" | "hit" | "price" | "onDark" = "neutral",
  className = ""
) {
  const tones: Record<string, string> = {
    neutral:
      "rounded-full bg-black/[0.04] px-3 py-1.5 text-xs font-semibold text-black/60 ring-1 ring-black/5",
    hit: "rounded-full bg-[var(--mp-ink)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white",
    price:
      "rounded-full bg-[var(--mp-accent)] px-3 py-1.5 text-xs font-bold text-[var(--mp-ink)]",
    onDark:
      "rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/80 ring-1 ring-white/15",
  };
  return `${tones[tone]} ${className}`.trim();
}
