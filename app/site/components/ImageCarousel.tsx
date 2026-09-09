"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Button, { badgeClassName } from "./Button";
import { Chevron } from "./CarouselNav";
import { useRequestModal } from "./RequestModalProvider";

export type CarouselSlide = {
  id: number;
  title: string;
  imageUrl: string | null;
  price?: number;
  priceSuffix?: string;
  meta?: string[];
  popular?: boolean;
  description?: string | null;
};

const AUTOPLAY_MS = 5200;

export default function ImageCarousel({
  slides,
  label,
  ctaLabel = "Оставить заявку",
}: {
  slides: CarouselSlide[];
  label: string;
  ctaLabel?: string;
}) {
  const reduceMotion = useReducedMotion();
  const { openRequestModal } = useRequestModal();
  const lastUserActionAtRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const canSlide = slides.length > 1;

  const clampIndex = (value: number) => {
    const len = slides.length || 1;
    return ((value % len) + len) % len;
  };

  const goTo = (value: number) => {
    lastUserActionAtRef.current = Date.now();
    setIndex(clampIndex(value));
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (!canSlide || reduceMotion || paused) return;

    const timer = window.setInterval(() => {
      if (Date.now() - lastUserActionAtRef.current < 1200) return;
      setIndex((current) => clampIndex(current + 1));
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [canSlide, reduceMotion, paused, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          prev();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          next();
        }
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      onTouchStart={(event) => {
        touchStartXRef.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const startX = touchStartXRef.current;
        const endX = event.changedTouches[0]?.clientX;
        touchStartXRef.current = null;
        if (startX == null || endX == null) return;
        const delta = endX - startX;
        if (Math.abs(delta) < 48) return;
        if (delta > 0) prev();
        else next();
      }}
      className="relative overflow-hidden rounded-[28px] bg-black/5 ring-1 ring-black/10 shadow-[0_28px_90px_rgba(17,24,39,0.14)] sm:rounded-[34px]"
    >
      <div
        className="flex"
        style={{
          transform: `translate3d(${-index * 100}%, 0, 0)`,
          transition: reduceMotion
            ? "none"
            : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {slides.map((slide, i) => (
          <article key={slide.id} className="relative w-full shrink-0">
            <div className="relative aspect-[16/10] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
              {slide.imageUrl ? (
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#c084fc,#8d7cff)]" />
              )}

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,24,0.08)_0%,transparent_42%,rgba(12,10,24,0.62)_100%)]" />

              {slide.popular ? (
                <div className={`absolute right-4 top-4 sm:right-6 sm:top-6 ${badgeClassName("hit")}`}>
                  Хит
                </div>
              ) : null}

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
                <div className="max-w-xl">
                  <h3 className="text-[28px] font-black tracking-tight text-white sm:text-[36px] lg:text-[42px]">
                    {slide.title}
                  </h3>

                  {slide.description ? (
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 line-clamp-2 sm:text-base">
                      {slide.description}
                    </p>
                  ) : null}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(slide.meta || []).map((chip) => (
                      <span key={chip} className={badgeClassName("onDark")}>
                        {chip}
                      </span>
                    ))}
                    {slide.price != null ? (
                      <span className={badgeClassName("price")}>
                        {slide.price.toLocaleString("ru-RU")} ₽
                        {slide.priceSuffix ?? ""}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-5">
                    <Button type="button" size="md" onClick={openRequestModal}>
                      {ctaLabel}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {canSlide ? (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/18 text-white ring-1 ring-white/35 backdrop-blur-md transition hover:bg-white/28 sm:left-4 sm:h-14 sm:w-14"
          >
            <Chevron direction="prev" />
            <span className="sr-only">Предыдущий</span>
          </button>

          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/18 text-white ring-1 ring-white/35 backdrop-blur-md transition hover:bg-white/28 sm:right-4 sm:h-14 sm:w-14"
          >
            <Chevron direction="next" />
            <span className="sr-only">Следующий</span>
          </button>
        </>
      ) : null}
    </div>
  );
}
