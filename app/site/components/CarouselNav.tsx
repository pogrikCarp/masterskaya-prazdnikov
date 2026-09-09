"use client";

/** Единые стрелки для всех каруселей сайта */
export function Chevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "prev" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

export default function NavControl({
  direction,
  onClick,
  tone = "light",
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  tone?: "light" | "dark";
  label?: string;
}) {
  const light = tone === "light";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label ?? (direction === "prev" ? "Предыдущий слайд" : "Следующий слайд")}
      className={[
        "inline-flex h-11 items-center justify-center gap-1 rounded-2xl px-3.5",
        "transition duration-300 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--mp-lavender-rgb)_/_0.45)]",
        light
          ? "bg-black/[0.04] text-black/65 ring-1 ring-black/8 hover:bg-black/[0.07] hover:text-black"
          : "bg-white/10 text-white/90 ring-1 ring-white/20 backdrop-blur-md hover:bg-white/18",
      ].join(" ")}
    >
      <Chevron direction={direction} />
    </button>
  );
}
