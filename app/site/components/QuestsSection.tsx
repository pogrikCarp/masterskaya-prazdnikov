"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "./Container";
import Button, { ButtonLink, badgeClassName, buttonClassName } from "./Button";
import { useRequestModal } from "./RequestModalProvider";
import { useLoopCarousel } from "./useLoopCarousel";

type Quest = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  duration: number;
  minAge: number;
  popular: boolean;
};

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

export default function QuestsSection() {
  const { openRequestModal } = useRequestModal();
  const [items, setItems] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    index,
    reduceMotion,
    setPaused,
    goTo,
    next,
    prev,
    onTouchStart,
    onTouchEnd,
  } = useLoopCarousel(items.length, !loading);

  useEffect(() => {
    async function fetchQuests() {
      try {
        const popularRes = await fetch("/api/quests?popular=true");
        let data: Quest[] = popularRes.ok ? await popularRes.json() : [];
        if (data.length === 0) {
          const allRes = await fetch("/api/quests");
          if (allRes.ok) data = await allRes.json();
        }
        setItems(data);
      } catch (error) {
        console.error("Error fetching quests:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuests();
  }, []);

  const active = items[index];

  return (
    <section
      id="quests"
      className="relative overflow-x-clip py-16 sm:py-20"
      style={{
        background:
          "linear-gradient(180deg, rgba(251,243,244,0) 0%, rgba(130,230,200,0.10) 35%, rgba(141,124,255,0.08) 100%)",
      }}
    >
      <Container className="max-w-[1320px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--mp-lavender)]">
              Adventure quest
            </div>
            <h2 className="mt-3 text-[34px] font-black tracking-tight text-[var(--mp-ink)] sm:text-[48px]">
              Квесты с историей,
              <span className="block text-black/40">а не набор конкурсов</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/55 sm:text-base">
              Легенда, испытания и финал с наградой — дети проживают приключение, а не просто
              бегают по точкам.
            </p>
          </div>

          <ButtonLink href="/quests" variant="secondary" size="md">
            Все квесты
          </ButtonLink>
        </div>

        <div
          className="relative mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {loading ? (
            <div className="flex h-[520px] items-center justify-center rounded-[32px] bg-white/60 ring-1 ring-black/5">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[rgb(var(--mp-lavender-rgb)_/_0.2)] border-t-[var(--mp-lavender)]" />
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-[32px] bg-white/60 py-16 text-center text-black/45 ring-1 ring-black/5">
              Нет квестов
            </div>
          ) : (
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label="Квесты"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  prev();
                }
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  next();
                }
              }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="overflow-hidden rounded-[32px] bg-white/70 shadow-[0_30px_90px_rgba(17,24,39,0.10)] ring-1 ring-black/8 sm:rounded-[40px]"
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
                {items.map((item, i) => (
                  <article
                    key={item.id}
                    className="grid w-full shrink-0 lg:grid-cols-12 lg:min-h-[560px]"
                  >
                    <div className="relative order-1 min-h-[280px] sm:min-h-[360px] lg:order-2 lg:col-span-7 lg:min-h-full">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading={i === 0 ? "eager" : "lazy"}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,#82E6C8,#8D7CFF)]" />
                      )}
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(20,16,30,0.35)_100%)] lg:bg-[linear-gradient(90deg,rgba(255,255,255,0.18)_0%,transparent_28%)]" />
                    </div>

                    <div className="relative order-2 flex flex-col justify-between bg-[linear-gradient(165deg,rgba(255,255,255,0.96)_0%,rgba(245,252,249,0.96)_100%)] p-7 sm:p-10 lg:order-1 lg:col-span-5">
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-[13px] font-bold tracking-[0.18em] text-[var(--mp-lavender)]">
                            {String(i + 1).padStart(2, "0")}
                          </div>
                          {item.popular ? (
                            <span className={badgeClassName("hit")}>Хит</span>
                          ) : null}
                        </div>

                        <h3 className="mt-5 text-[30px] font-black leading-tight tracking-tight text-[var(--mp-ink)] sm:text-[38px]">
                          {item.name}
                        </h3>

                        {item.description ? (
                          <p className="mt-4 text-sm leading-relaxed text-black/55 sm:text-[15px] line-clamp-5">
                            {item.description}
                          </p>
                        ) : (
                          <p className="mt-4 text-sm leading-relaxed text-black/55">
                            Сюжетное приключение с картой, заданиями и наградой в финале.
                          </p>
                        )}

                        <div className="mt-6 flex flex-wrap gap-2">
                          <span className={badgeClassName("neutral")}>
                            от {item.minAge}+ лет
                          </span>
                          <span className={badgeClassName("neutral")}>
                            {item.duration} мин
                          </span>
                          <span className={badgeClassName("price")}>
                            {item.price.toLocaleString()} ₽
                          </span>
                        </div>
                      </div>

                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Button type="button" size="md" onClick={openRequestModal}>
                          Забронировать квест
                        </Button>
                        <Link
                          href="/quests"
                          className="text-sm font-semibold text-black/45 underline-offset-2 hover:text-black/70 hover:underline"
                        >
                          Подробнее
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {items.length > 1 ? (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className={buttonClassName({ variant: "outline", size: "md" })}
                >
                  <Chevron dir="left" />
                  Назад
                </button>
                <button
                  type="button"
                  onClick={next}
                  className={buttonClassName({ variant: "outline", size: "md" })}
                >
                  Дальше
                  <Chevron dir="right" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden text-xs font-semibold text-black/35 sm:block">
                  {active ? active.name : ""}
                </div>
                <div className="flex flex-wrap items-center">
                  {items.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Квест ${i + 1}`}
                      aria-current={i === index}
                      className="inline-flex h-11 items-center px-1"
                    >
                      <span
                        className={`block h-2 rounded-full transition-all ${
                          i === index ? "w-7 bg-[var(--mp-lavender)]" : "w-2 bg-black/15 hover:bg-black/25"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
