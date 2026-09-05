"use client";

import { useEffect, useRef } from "react";
import { Icon } from "./Icon";

type Item = { src: string; alt: string; place?: string };

export default function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: Item[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        touchRef.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const start = touchRef.current;
        touchRef.current = null;
        if (!start) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
        if (dx > 0) onPrev();
        else onNext();
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-[28px] ring-1 ring-white/15 bg-black">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60"
              aria-label="Закрыть"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>

            <img
              src={item.src}
              alt={item.alt}
              className="max-h-[72vh] w-full select-none object-contain sm:max-h-[78vh]"
              draggable={false}
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
              <div className="text-sm font-semibold text-white">{item.alt}</div>
              {item.place && <div className="text-xs text-white/70">{item.place}</div>}
            </div>

            <button
              type="button"
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Предыдущее"
            >
              <span className="sr-only">Назад</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  className="fill-none stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 18 9 12l6-6"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Следующее"
            >
              <span className="sr-only">Вперёд</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  className="fill-none stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 18 6-6-6-6"
                />
              </svg>
            </button>
          </div>

          <div className="mt-4 hidden items-center justify-center gap-2 text-xs text-white/60 sm:flex">
            <span>← →</span>
            <span>листалка</span>
            <span className="mx-2">•</span>
            <span>Esc</span>
            <span>закрыть</span>
            <span className="mx-2">•</span>
            <span>Swipe</span>
            <span>на мобильном</span>
          </div>
        </div>
      </div>
    </div>
  );
}
