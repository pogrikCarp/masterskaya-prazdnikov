"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Button, { badgeClassName } from "./Button";
import { Chevron } from "./CarouselNav";
import { useOptionalRequestModal } from "./RequestModalProvider";

import ProgramGallery from "./ProgramGallery";
import { formatCatalogPrice, getCatalogImages } from "@/lib/catalog-media";

export type CarouselSlide = {
  id: number;
  title: string;
  imageUrl: string | null;
  imageUrls?: string[];
  priceFrom?: boolean;
  price?: number;
  priceSuffix?: string;
  meta?: string[];
  popular?: boolean;
  description?: string | null;
};

const AUTOPLAY_MS = 5200;
const SLIDE_CONTROL_CLASS =
  "pointer-events-auto flex size-[44px] items-center justify-center rounded-full bg-black/5 text-black/70 ring-1 ring-black/10 transition hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:size-14 lg:bg-white/18 lg:text-white lg:ring-white/35 lg:backdrop-blur-md lg:hover:bg-white/28";

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
  const requestModal = useOptionalRequestModal();
  const lastUserActionAtRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const canSlide = slides.length > 1;

  const clampIndex = useCallback((value: number) => {
    const len = slides.length || 1;
    return ((value % len) + len) % len;
  }, [slides.length]);

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
  }, [canSlide, reduceMotion, paused, clampIndex]);

  if (!Array.isArray(slides) || slides.length === 0) return null;

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
      className="relative"
    >
      <div className="overflow-hidden rounded-[28px] bg-black/5 ring-1 ring-black/10 shadow-[0_28px_90px_rgba(17,24,39,0.14)] sm:rounded-[34px]">
        <div
          className="flex"
          style={{
            transform: `translate3d(${-index * 100}%, 0, 0)`,
            transition: reduceMotion
              ? "none"
              : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {slides.map((slide) => (
            <article
              key={slide.id}
              className={`relative grid w-full shrink-0 grid-cols-1 before:col-start-1 before:row-start-1 before:w-full ${getCatalogImages(slide).length > 1 ? "before:aspect-[4/5]" : "before:aspect-[16/10]"} sm:before:aspect-[16/9] lg:before:aspect-[21/9]`}
            >
              <ProgramGallery title={slide.title} imageUrl={slide.imageUrl} imageUrls={slide.imageUrls} controlsPosition="top" onInteract={() => setPaused(true)} />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,24,0.08)_0%,transparent_42%,rgba(12,10,24,0.62)_100%)]" />

              {slide.popular ? (
                <div className={`absolute right-4 top-4 sm:right-6 sm:top-6 ${badgeClassName("hit")}`}>
                  Хит
                </div>
              ) : null}

              <div className={`relative col-start-1 row-start-1 min-w-0 self-end px-5 pt-14 pb-5 sm:px-8 sm:pt-16 sm:pb-8 lg:pb-10 ${canSlide ? "lg:px-[5.5rem]" : "lg:px-10"}`}>
                <div className="max-w-xl">
                  <h3 className="text-[28px] font-black tracking-tight text-white [overflow-wrap:anywhere] sm:text-[36px] lg:text-[42px]">
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
                    {formatCatalogPrice(slide.price, slide.priceFrom) ? (
                      <span className={badgeClassName("price")}>
                        {formatCatalogPrice(slide.price, slide.priceFrom)}
                        {slide.priceSuffix ?? ""}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-5">
                    <Button
                      type="button"
                      size="md"
                      onClick={() => requestModal?.openRequestModal(`Программа: ${slide.title}`)}
                    >
                      {ctaLabel}
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {canSlide ? (
        <div className="mt-3 flex justify-end gap-2 lg:pointer-events-none lg:absolute lg:inset-x-4 lg:top-1/2 lg:z-10 lg:mt-0 lg:-translate-y-1/2 lg:justify-between">
          <button type="button" onClick={prev} aria-label="Предыдущий слайд" className={SLIDE_CONTROL_CLASS}>
            <Chevron direction="prev" />
          </button>

          <button type="button" onClick={next} aria-label="Следующий слайд" className={SLIDE_CONTROL_CLASS}>
            <Chevron direction="next" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
