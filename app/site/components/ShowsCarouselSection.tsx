"use client";

import { useEffect, useState } from "react";
import Container from "./Container";
import Button, { ButtonLink, badgeClassName } from "./Button";
import { useRequestModal } from "./RequestModalProvider";
import { useLoopCarousel } from "./useLoopCarousel";

type Show = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  duration: number;
  popular: boolean;
};

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

export default function ShowsCarouselSection() {
  const { openRequestModal } = useRequestModal();
  const [items, setItems] = useState<Show[]>([]);
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
    async function fetchShows() {
      try {
        const popularRes = await fetch("/api/shows?popular=true");
        let data: Show[] = popularRes.ok ? await popularRes.json() : [];
        if (data.length === 0) {
          const allRes = await fetch("/api/shows");
          if (allRes.ok) data = await allRes.json();
        }
        setItems(data);
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchShows();
  }, []);

  return (
    <section id="shows" className="relative bg-[var(--mp-bg)] px-4 py-6 sm:px-6 sm:py-8">
      <div className="relative overflow-hidden rounded-[32px] bg-white/75 py-16 text-[var(--mp-ink)] shadow-[0_24px_70px_rgba(141,124,255,0.10)] ring-1 ring-[rgb(var(--mp-lavender-rgb)_/_0.10)] sm:rounded-[40px] sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_12%_0%,rgba(141,124,255,0.16),transparent_58%),radial-gradient(700px_360px_at_92%_18%,rgba(255,138,168,0.12),transparent_55%)]" />

      <Container className="relative max-w-[1320px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--mp-lavender)]">
              Live show
            </div>
            <h2 className="mt-3 text-[36px] font-black tracking-tight sm:text-[52px]">
              Шоу, от которых
              <span className="block text-black/40">ахает весь зал</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/55 sm:text-base">
              Бумага, пузыри, свет и музыка — короткие вау‑номера, которые держат темп праздника.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {items.length > 1 ? (
              <div className="flex items-center gap-1 rounded-full bg-white/80 p-1 ring-1 ring-[rgb(var(--mp-lavender-rgb)_/_0.16)]">
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black/55 transition hover:bg-white hover:text-[var(--mp-ink)]"
                  aria-label="Предыдущее шоу"
                >
                  <Chevron dir="left" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black/55 transition hover:bg-white hover:text-[var(--mp-ink)]"
                  aria-label="Следующее шоу"
                >
                  <Chevron dir="right" />
                </button>
              </div>
            ) : null}
            <ButtonLink href="/shows" variant="secondary" size="md">
              Все шоу
            </ButtonLink>
          </div>
        </div>
      </Container>

      <div
        className="relative mt-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {loading ? (
          <div className="flex h-[58vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[rgb(var(--mp-lavender-rgb)_/_0.2)] border-t-[var(--mp-lavender)]" />
          </div>
        ) : items.length === 0 ? (
          <Container>
            <div className="rounded-[28px] bg-white/70 py-16 text-center text-black/40 ring-1 ring-black/5">
              Нет шоу-программ
            </div>
          </Container>
        ) : (
          <>
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label="Шоу-программы"
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
              className="relative overflow-hidden"
            >
              <div
                className="flex"
                style={{
                  transform: `translate3d(${-index * 100}%, 0, 0)`,
                  transition: reduceMotion
                    ? "none"
                    : "transform 780ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {items.map((item, i) => (
                  <article key={item.id} className="relative w-full shrink-0">
                    <div className="relative min-h-[62vh] w-full sm:min-h-[68vh]">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading={i === 0 ? "eager" : "lazy"}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,#c084fc,#8d7cff)]" />
                      )}
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.58)_48%,rgba(255,255,255,0.22)_100%)]" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(255,255,255,0.55)_100%)]" />

                      <Container className="relative flex min-h-[62vh] items-end pb-10 sm:min-h-[68vh] sm:pb-14">
                        <div className="max-w-2xl">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={badgeClassName("onDark")}>
                              {item.duration} мин
                            </span>
                            {item.popular ? (
                              <span className={badgeClassName("hit")}>Хит</span>
                            ) : null}
                          </div>

                          <h3 className="mt-5 text-[clamp(28px,8vw,40px)] font-black leading-[1] tracking-tight sm:text-[64px] sm:leading-[0.95]">
                            {item.name}
                          </h3>

                          {item.description ? (
                            <p className="mt-4 max-w-lg text-sm leading-relaxed text-black/55 sm:text-base line-clamp-3">
                              {item.description}
                            </p>
                          ) : null}

                          <div className="mt-7 flex flex-wrap items-center gap-3">
                            <Button type="button" size="lg" onClick={openRequestModal}>
                              Заказать шоу
                            </Button>
                            <div className="text-lg font-black text-[var(--mp-ink)]">
                              {item.price.toLocaleString()} ₽
                            </div>
                          </div>
                        </div>
                      </Container>
                    </div>
                  </article>
                ))}
              </div>

              {items.length > 1 ? (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgb(var(--mp-lavender-rgb)_/_0.16)]">
                  <div
                    key={index}
                    className={`h-full origin-left bg-[var(--mp-lavender)] ${
                      reduceMotion ? "" : "mp-show-progress"
                    }`}
                  />
                </div>
              ) : null}
            </div>

            {items.length > 1 ? (
              <Container className="mt-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-semibold tracking-wide text-black/35">
                    {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </div>
                  <div className="flex flex-wrap items-center">
                    {items.map((item, i) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => goTo(i)}
                        className="inline-flex h-11 items-center px-1"
                        aria-label={`Шоу ${i + 1}`}
                        aria-current={i === index}
                      >
                        <span
                          className={`block h-1.5 rounded-full transition-all ${
                            i === index ? "w-10 bg-[var(--mp-lavender)]" : "w-3 bg-black/15 hover:bg-black/25"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </Container>
            ) : null}
          </>
        )}
      </div>
      </div>
    </section>
  );
}
