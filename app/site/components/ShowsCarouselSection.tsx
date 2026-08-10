"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import Container from "./Container";

type Show = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  duration: number;
  popular: boolean;
  active: boolean;
};

type ShowSlide = {
  id: number;
  title: string;
  description: string;
  intervalMs: number;
  image: string | null;
  duration: number;
  price: number;
  popular: boolean;
};

export default function ShowsCarouselSection() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState<ShowSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const lastUserActionAtRef = useRef<number>(0);

  useEffect(() => {
    async function fetchShows() {
      try {
        const res = await fetch("/api/shows");
        if (res.ok) {
          const data: Show[] = await res.json();
          setSlides(
            data.slice(0, 5).map((s, i) => ({
              id: s.id,
              title: s.name,
              description: s.description || "",
              intervalMs: 5000 + i * 1000,
              image: s.imageUrl,
              duration: s.duration,
              price: s.price,
              popular: s.popular,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchShows();
  }, []);

  const clampIndex = (i: number) => {
    const len = slides.length;
    return ((i % len) + len) % len;
  };

  const goTo = (i: number) => {
    lastUserActionAtRef.current = Date.now();
    setIndex(clampIndex(i));
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (reduceMotion || slides.length === 0) return;

    const tick = () => {
      const sinceAction = Date.now() - lastUserActionAtRef.current;
      if (sinceAction < 900) return;
      setIndex((v) => clampIndex(v + 1));
    };

    const currentSlide = slides[clampIndex(index)];
    if (!currentSlide) return;

    const id = window.setTimeout(tick, currentSlide.intervalMs);
    return () => window.clearTimeout(id);
  }, [index, reduceMotion, slides]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
      return;
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
      return;
    }
  };

  if (loading) {
    return (
      <section id="shows" className="py-14">
        <Container className="max-w-[1320px]">
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[rgb(var(--mp-lavender-rgb)_/_0.3)] border-t-[rgb(var(--mp-lavender-rgb))]" />
          </div>
        </Container>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section id="shows" className="py-14">
        <Container className="max-w-[1320px]">
          <div className="text-center py-20 text-black/50">Нет шоу-программ</div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section id="shows" className="py-14">
        <Container className="max-w-[1320px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
                Шоу, которые вызывают восторг у детей и взрослых
              </h2>
              <p className="mt-3 text-sm sm:text-base text-black/60 max-w-2xl">
                Хотите удивить гостей? Добавьте яркое шоу!
              </p>
            </div>
          </div>

          <div className="relative mt-10">
            <div
              id="carouselExampleDark"
              className="relative overflow-hidden rounded-[40px] bg-white/60 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)]"
              role="region"
              aria-roledescription="carousel"
              aria-label="Популярные шоу-программы"
              tabIndex={0}
              onKeyDown={onKeyDown}
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.34)_0%,rgba(255,255,255,0.80)_50%,rgba(214,249,239,0.45)_100%)]" />
              <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_0.26)] blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-white/70 blur-3xl" />

              <div className="relative">
                <div className="absolute left-6 top-6 z-10 flex items-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Слайд ${i + 1}`}
                      aria-current={i === index}
                      className={`h-[10px] w-[34px] rounded-full transition-opacity ${
                        i === index ? "bg-black/65 opacity-100" : "bg-black/25 opacity-70"
                      }`}
                    />
                  ))}
                </div>

                <div
                  className="flex"
                  style={{
                    transform: `translate3d(${-index * 100}%, 0, 0)`,
                    transition: reduceMotion
                      ? "none"
                      : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {slides.map((s) => (
                    <div key={s.title} className="w-full shrink-0">
                      <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-12 lg:items-center">
                        <div className="lg:col-span-6">
                          <div className="inline-flex rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-black/70 ring-1 ring-black/10">
                            Популярная программа
                          </div>
                          <h3 className="mt-4 text-[30px] sm:text-[40px] font-black tracking-tight text-[var(--mp-ink)]">
                            {s.title}
                          </h3>
                          <p className="mt-3 text-sm sm:text-base text-black/60 max-w-xl">
                            {s.description}
                          </p>

                          <div className="mt-7 flex flex-wrap gap-3">
                            <div className="rounded-full bg-white/65 px-4 py-2 text-xs font-semibold text-black/70 ring-1 ring-black/10">
                              {s.duration} мин
                            </div>
                            <div className="rounded-full bg-white/65 px-4 py-2 text-xs font-semibold text-black/70 ring-1 ring-black/10">
                              {s.price.toLocaleString()} ₽
                            </div>
                            {s.popular && (
                              <div className="rounded-full bg-[rgba(255,107,138,0.85)] px-4 py-2 text-xs font-semibold text-white">
                                Хит
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="lg:col-span-6">
                          <div className="relative overflow-hidden rounded-[34px] bg-white/60 ring-1 ring-black/10 shadow-[0_22px_60px_rgba(17,24,39,0.10)]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.0)_62%),linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.22)_0%,rgba(255,107,138,0.10)_50%,rgba(125,211,252,0.12)_100%)]" />
                            <div className="relative p-7 sm:p-9">
                              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.15)_55%,rgba(255,255,255,0.0)_100%)] ring-1 ring-white/50">
                                {s.image ? (
                                  <img
                                    src={s.image}
                                    alt={s.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="absolute inset-0 flex items-center justify-center text-black/20 text-6xl">
                                    🎪
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={prev}
              className="group absolute -left-14 md:-left-16 top-1/2 z-10 hidden -translate-y-1/2 sm:inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/85 backdrop-blur ring-1 ring-black/10 shadow-[0_18px_45px_rgba(17,24,39,0.08)] transition-all duration-300 hover:bg-white hover:shadow-[0_24px_60px_rgba(17,24,39,0.12)] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--mp-lavender-rgb)_/_0.55)]"
              aria-label="Предыдущий слайд"
            >
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.20)_55%,rgba(0,0,0,0.06)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="pointer-events-none absolute -left-8 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.65)] blur-xl transition-transform duration-500 group-hover:translate-x-10" />
              <span className="relative text-lg leading-none text-black/70 transition-transform duration-300 group-hover:-translate-x-[1px]">‹</span>
            </button>
            <button
              type="button"
              onClick={next}
              className="group absolute -right-14 md:-right-16 top-1/2 z-10 hidden -translate-y-1/2 sm:inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/85 backdrop-blur ring-1 ring-black/10 shadow-[0_18px_45px_rgba(17,24,39,0.08)] transition-all duration-300 hover:bg-white hover:shadow-[0_24px_60px_rgba(17,24,39,0.12)] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--mp-lavender-rgb)_/_0.55)]"
              aria-label="Следующий слайд"
            >
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.20)_55%,rgba(0,0,0,0.06)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="pointer-events-none absolute -left-8 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.65)] blur-xl transition-transform duration-500 group-hover:translate-x-10" />
              <span className="relative text-lg leading-none text-black/70 transition-transform duration-300 group-hover:translate-x-[1px]">›</span>
            </button>
          </div>

        <div className="mt-10 flex justify-start">
          <Link
            href="/shows"
            className="group relative inline-flex h-14 sm:h-16 min-w-[220px] sm:min-w-[240px] items-center justify-center gap-3 rounded-full px-8 sm:px-10 text-sm sm:text-[15px] font-semibold text-white bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.92)_0%,rgb(var(--mp-lavender-rgb)_/_0.72)_42%,rgba(255,107,138,0.90)_100%)] bg-[length:220%_220%] bg-[position:0%_50%] shadow-[0_24px_70px_rgba(17,24,39,0.18)] ring-1 ring-white/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_90px_rgba(17,24,39,0.22)] hover:bg-[position:100%_50%] active:translate-y-0"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.12)_28%,rgba(0,0,0,0.12)_100%)]" />
            <span className="pointer-events-none absolute -top-10 left-6 h-16 w-44 rotate-[18deg] rounded-full bg-white/30 blur-2xl transition-transform duration-500 group-hover:translate-x-10" />
            <span className="pointer-events-none absolute -inset-1 rounded-full bg-white/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative">Все шоу</span>
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/18 ring-1 ring-white/30 transition-transform duration-300 group-hover:translate-x-0.5">
              <span className="text-lg leading-none">→</span>
            </span>
          </Link>
        </div>
        </Container>
      </section>
    </>
  );
}
