"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import Container from "./Container";

type Quest = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  duration: number;
  minAge: number;
  popular: boolean;
  active: boolean;
};

type QuestSlide = {
  id: number;
  title: string;
  description: string;
  intervalMs: number;
  image: string | null;
  duration: number;
  price: number;
  minAge: number;
  popular: boolean;
};

export default function QuestsSection() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState<QuestSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const lastUserActionAtRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    async function fetchQuests() {
      try {
        const popularRes = await fetch("/api/quests?popular=true");
        let data: Quest[] = popularRes.ok ? await popularRes.json() : [];

        if (data.length === 0) {
          const allRes = await fetch("/api/quests");
          if (allRes.ok) data = await allRes.json();
        }

        setSlides(
          data.slice(0, 6).map((quest, i) => ({
            id: quest.id,
            title: quest.name,
            description: quest.description || "",
            intervalMs: 5500 + i * 800,
            image: quest.imageUrl,
            duration: quest.duration,
            price: quest.price,
            minAge: quest.minAge,
            popular: quest.popular,
          }))
        );
      } catch (error) {
        console.error("Error fetching quests:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuests();
  }, []);

  const clampIndex = (i: number) => {
    const len = slides.length || 1;
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
      if (Date.now() - lastUserActionAtRef.current < 900) return;
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
    }
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartXRef.current;
    const endX = e.changedTouches[0]?.clientX;
    touchStartXRef.current = null;
    if (startX == null || endX == null) return;

    const delta = endX - startX;
    if (Math.abs(delta) < 48) return;
    if (delta > 0) prev();
    else next();
  };

  if (loading) {
    return (
      <section id="quests" className="py-14">
        <Container className="max-w-[1600px]">
          <div className="flex min-h-[60vh] items-center justify-center rounded-[40px] bg-white/50 ring-1 ring-black/10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[rgba(255,107,138,0.3)] border-t-[rgba(255,107,138,0.9)]" />
          </div>
        </Container>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section id="quests" className="py-14">
        <Container className="max-w-[1320px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
                Квесты
              </h2>
              <p className="mt-3 text-sm sm:text-base text-black/60 max-w-2xl">
                Сюжетные игры с заданиями — вовлекают детей и держат темп.
              </p>
            </div>

            <Link
              href="/quests"
              className="group relative inline-flex h-14 sm:h-16 items-center justify-center gap-3 rounded-full px-8 sm:px-10 text-sm sm:text-[15px] font-semibold text-white bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.92)_0%,rgb(var(--mp-lavender-rgb)_/_0.72)_42%,rgba(255,107,138,0.90)_100%)] bg-[length:220%_220%] bg-[position:0%_50%] shadow-[0_24px_70px_rgba(17,24,39,0.18)] ring-1 ring-white/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_90px_rgba(17,24,39,0.22)] hover:bg-[position:100%_50%] active:translate-y-0"
            >
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.12)_28%,rgba(0,0,0,0.12)_100%)]" />
              <span className="relative">Смотреть ещё</span>
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/18 ring-1 ring-white/30">
                <span className="text-lg leading-none">→</span>
              </span>
            </Link>
          </div>
          <div className="mt-10 text-center text-black/50">Нет квестов</div>
        </Container>
      </section>
    );
  }

  const active = slides[clampIndex(index)];

  return (
    <section id="quests" className="py-10 sm:py-14">
      <Container className="max-w-[1600px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
              Квесты, в которые дети погружаются с головой
            </h2>
            <p className="mt-3 text-sm sm:text-base text-black/60 max-w-2xl">
              Популярные сюжетные приключения с легендой, испытаниями и наградой в финале.
            </p>
          </div>
        </div>

        <div className="relative mt-8 sm:mt-10">
          <div
            className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] bg-[#140f1f] shadow-[0_40px_120px_rgba(17,24,39,0.28)] ring-1 ring-black/10"
            role="region"
            aria-roledescription="carousel"
            aria-label="Популярные квесты"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative min-h-[72vh] sm:min-h-[78vh] lg:min-h-[82vh]">
              <div
                className="flex h-full min-h-[inherit]"
                style={{
                  transform: `translate3d(${-index * 100}%, 0, 0)`,
                  transition: reduceMotion
                    ? "none"
                    : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {slides.map((slide) => (
                  <div key={slide.id} className="relative w-full shrink-0 min-h-[inherit]">
                    <div className="absolute inset-0">
                      {slide.image ? (
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-[linear-gradient(135deg,#5A3FE0_0%,#FF6B8A_55%,#FFC400_100%)]" />
                      )}
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,24,0.88)_0%,rgba(12,10,24,0.62)_42%,rgba(12,10,24,0.28)_68%,rgba(12,10,24,0.55)_100%)]" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,24,0.25)_0%,transparent_28%,rgba(12,10,24,0.72)_100%)]" />
                    </div>

                    <div className="relative z-10 flex min-h-[inherit] items-end p-6 sm:p-10 lg:p-14">
                      <div className="w-full max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white/85 ring-1 ring-white/20 backdrop-blur">
                            Популярный квест
                          </div>
                          {slide.popular ? (
                            <div className="rounded-full bg-[rgba(255,107,138,0.92)] px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-white">
                              Хит
                            </div>
                          ) : null}
                        </div>

                        <h3 className="mt-5 text-[34px] font-black tracking-tight text-white sm:text-[48px] lg:text-[56px]">
                          {slide.title}
                        </h3>

                        {slide.description ? (
                          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base lg:text-lg">
                            {slide.description}
                          </p>
                        ) : null}

                        <div className="mt-7 flex flex-wrap gap-3">
                          <div className="rounded-full bg-white/12 px-4 py-2 text-xs font-semibold text-white/85 ring-1 ring-white/18 backdrop-blur">
                            от {slide.minAge}+ лет
                          </div>
                          <div className="rounded-full bg-white/12 px-4 py-2 text-xs font-semibold text-white/85 ring-1 ring-white/18 backdrop-blur">
                            {slide.duration} мин
                          </div>
                          <div className="rounded-full bg-[var(--mp-accent)] px-4 py-2 text-xs font-bold text-[var(--mp-ink)]">
                            {slide.price.toLocaleString()} ₽
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute left-6 top-6 z-20 flex items-center gap-2 sm:left-10 sm:top-10">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Квест ${i + 1}`}
                    aria-current={i === index}
                    className={`h-[10px] rounded-full transition-all ${
                      i === index
                        ? "w-[42px] bg-white"
                        : "w-[18px] bg-white/35 hover:bg-white/55"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute bottom-6 right-6 z-20 hidden items-center gap-3 sm:flex sm:bottom-10 sm:right-10">
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/25"
                  aria-label="Предыдущий квест"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/25"
                  aria-label="Следующий квест"
                >
                  ›
                </button>
              </div>

              <div className="pointer-events-none absolute bottom-6 left-6 z-20 text-xs font-semibold tracking-wide text-white/55 sm:bottom-10 sm:left-auto sm:right-36">
                {clampIndex(index) + 1} / {slides.length}
                {active ? ` · ${active.title}` : ""}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-start sm:mt-10">
            <Link
              href="/quests"
              className="group relative inline-flex h-14 sm:h-16 min-w-[220px] items-center justify-center gap-3 rounded-full px-8 sm:px-10 text-sm sm:text-[15px] font-semibold text-white bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.92)_0%,rgb(var(--mp-lavender-rgb)_/_0.72)_42%,rgba(255,107,138,0.90)_100%)] bg-[length:220%_220%] bg-[position:0%_50%] shadow-[0_24px_70px_rgba(17,24,39,0.18)] ring-1 ring-white/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_90px_rgba(17,24,39,0.22)] hover:bg-[position:100%_50%] active:translate-y-0"
            >
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.12)_28%,rgba(0,0,0,0.12)_100%)]" />
              <span className="relative">Все квесты</span>
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/18 ring-1 ring-white/30 transition-transform duration-300 group-hover:translate-x-0.5">
                <span className="text-lg leading-none">→</span>
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
