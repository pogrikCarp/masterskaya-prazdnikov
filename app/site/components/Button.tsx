import type { ButtonHTMLAttributes } from "react";

export default function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 h-12 text-sm font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,196,0,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--mp-bg)] active:translate-y-[1px]";

  const styles: Record<string, string> = {
    primary:
      "bg-[var(--mp-accent)] text-[var(--mp-ink)] shadow-[0_18px_40px_rgba(255,196,0,0.25)] hover:brightness-[0.98]",
    outline:
      "bg-white/70 text-[var(--mp-text)] ring-1 ring-black/10 hover:bg-white",
    ghost: "bg-transparent text-[var(--mp-text)] hover:bg-black/5",
  };

  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
}
