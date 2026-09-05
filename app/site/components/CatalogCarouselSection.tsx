"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Container from "./Container";
import Button, { ButtonLink, badgeClassName } from "./Button";
import { useRequestModal } from "./RequestModalProvider";

const ease = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 5200;

export type CatalogCardItem = {
  id: number;
  title: string;
  imageUrl: string | null;
  price: number;
  meta?: string[];
  popular?: boolean;
};

const accents = {
  lavender: {
    card: "bg-[linear-gradient(160deg,rgb(var(--mp-lavender-rgb)_/_0.18)_0%,rgba(255,255,255,0.92)_48%,rgba(125,211,252,0.14)_100%)]",
    glow: "bg-[rgb(var(--mp-lavender-rgb)_/_0.28)]",
    badge: "bg-[rgb(var(--mp-lavender-rgb))]",
  },
  rose: {
    card: "bg-[linear-gradient(160deg,rgba(255,107,138,0.18)_0%,rgba(255,255,255,0.92)_48%,rgba(255,196,0,0.12)_100%)]",
    glow: "bg-[rgba(255,107,138,0.22)]",
    badge: "bg-[rgba(255,107,138,0.92)]",
  },
  mint: {
    card: "bg-[linear-gradient(160deg,rgba(130,230,200,0.20)_0%,rgba(255,255,255,0.92)_48%,rgb(var(--mp-lavender-rgb)_/_0.12)_100%)]",
    glow: "bg-[rgba(130,230,200,0.28)]",
    badge: "bg-[#2F9B7A]",
  },
} as const;

function Chevron({ direction }: { direction: "prev" | "next" }) {
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
      {direction === "prev" ? (
        <path d="M15 6l-6 6 6 6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

function NavControl({
  direction,
  onClick,
  tone = "light",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  tone?: "light" | "dark";
}) {
  const light = tone === "light";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Предыдущий слайд" : "Следующий слайд"}
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

export default function CatalogCarouselSection({
  id,
  title,
  subtitle,
  allHref,
  allLabel,
  items,
  loading,
  emptyText,
  accent = "lavender",
  layout = "cards",
}: {
  id: string;
  title: string;
  subtitle: string;
  allHref: string;
  allLabel: string;
  items: CatalogCardItem[];
  loading: boolean;
  emptyText: string;
  accent?: keyof typeof accents;
  layout?: "cards" | "fullBleed";
}) {
  const reduceMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const lastUserActionAtRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);
  const { openRequestModal } = useRequestModal();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const palette = accents[accent];
  const isFullBleed = layout === "fullBleed";
  const canScroll = items.length > (isFullBleed ? 1 : 4);

  const clampIndex = (value: number) => {
    const len = items.length || 1;
    return ((value % len) + len) % len;
  };

  const goTo = (value: number) => {
    lastUserActionAtRef.current = Date.now();
    setIndex(clampIndex(value));
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (!isFullBleed || reduceMotion || paused || items.length < 2) return;

    const idTimer = window.setInterval(() => {
      if (Date.now() - lastUserActionAtRef.current < 1200) return;
      setIndex((current) => clampIndex(current + 1));
    }, AUTOPLAY_MS);

    return () => window.clearInterval(idTimer);
  }, [isFullBleed, reduceMotion, paused, items.length]);

  const scrollByAmount = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-catalog-card]");
    const styles = window.getComputedStyle(el);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const amount = firstCard
      ? firstCard.offsetWidth + gap
      : Math.max(280, Math.round(el.clientWidth * 0.8));
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const onScrollerWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const isVerticalScroll =
      !event.shiftKey && Math.abs(event.deltaY) >= Math.abs(event.deltaX);
    if (!isVerticalScroll) return;
    event.preventDefault();
    window.scrollBy({ top: event.deltaY, behavior: "auto" });
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartXRef.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartXRef.current = null;
    if (startX == null || endX == null) return;
    const delta = endX - startX;
    if (Math.abs(delta) < 48) return;
    if (delta > 0) prev();
    else next();
  };

  const header = (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
          {title}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-black/55">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-auto">
        {isFullBleed && canScroll ? (
          <>
            <NavControl direction="prev" onClick={prev} tone="light" />
            <NavControl direction="next" onClick={next} tone="light" />
          </>
        ) : null}
        <ButtonLink href={allHref} variant="secondary" size="md">
          {allLabel}
        </ButtonLink>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section id={id} className="py-14">
        <Container className="max-w-[1320px]">
          {header}
          <div className="mt-10 flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[rgb(var(--mp-lavender-rgb)_/_0.25)] border-t-[rgb(var(--mp-lavender-rgb))]" />
          </div>
        </Container>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section id={id} className="py-14">
        <Container className="max-w-[1320px]">
          {header}
          <div className="mt-10 rounded-[28px] bg-white/60 py-16 text-center text-black/45 ring-1 ring-black/5">
            {emptyText}
          </div>
        </Container>
      </section>
    );
  }

  if (isFullBleed) {
    return (
      <section id={id} className="overflow-x-clip py-14">
        <Container className="max-w-[1320px]">{header}</Container>

        <div
          className="relative mt-8 sm:mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setPaused(false);
            }
          }}
        >
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label={title}
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
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="relative mx-auto w-full max-w-[1600px] overflow-hidden px-4 sm:px-6 lg:px-8"
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
              {items.map((item) => (
                <article
                  key={item.id}
                  className="group relative w-full shrink-0 px-1 sm:px-2"
                >
                  <div className="relative overflow-hidden rounded-[28px] ring-1 ring-black/10 shadow-[0_28px_90px_rgba(17,24,39,0.14)] sm:rounded-[34px]">
                    <div className="relative aspect-[16/10] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      ) : (
                        <div className={`absolute inset-0 ${palette.card}`} />
                      )}

                      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(12,10,24,0.82)_0%,rgba(12,10,24,0.38)_48%,rgba(12,10,24,0.22)_100%)]" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,24,0.08)_0%,transparent_40%,rgba(12,10,24,0.58)_100%)]" />

                      {item.popular ? (
                        <div className={`absolute right-4 top-4 sm:right-6 sm:top-6 ${badgeClassName("hit")}`}>
                          Хит
                        </div>
                      ) : null}

                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
                        <div className="max-w-xl">
                          <h3 className="text-[28px] font-black tracking-tight text-white sm:text-[36px] lg:text-[42px]">
                            {item.title}
                          </h3>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {(item.meta || []).map((chip) => (
                              <span key={chip} className={badgeClassName("onDark")}>
                                {chip}
                              </span>
                            ))}
                            <span className={badgeClassName("price")}>
                              {item.price.toLocaleString()} ₽
                            </span>
                          </div>

                          <div className="mt-5 flex flex-wrap items-center gap-3">
                            <Button type="button" size="md" onClick={openRequestModal}>
                              Оставить заявку
                            </Button>
                            <Link
                              href={allHref}
                              className="text-sm font-semibold text-white/70 underline-offset-2 transition hover:text-white hover:underline"
                            >
                              Смотреть все
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {canScroll ? (
              <div className="pointer-events-none absolute inset-y-0 left-4 right-4 hidden items-center justify-between sm:flex sm:left-6 sm:right-6 lg:left-8 lg:right-8">
                <div className="pointer-events-auto">
                  <NavControl direction="prev" onClick={prev} tone="dark" />
                </div>
                <div className="pointer-events-auto">
                  <NavControl direction="next" onClick={next} tone="dark" />
                </div>
              </div>
            ) : null}
          </div>

          {canScroll ? (
            <div className="mt-5 flex items-center justify-center gap-2">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Слайд ${i + 1}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? "w-8 bg-[var(--mp-ink)]"
                      : "w-3 bg-black/15 hover:bg-black/25"
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-14">
      <Container className="max-w-[1320px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
              {title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-black/55">{subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            {canScroll ? (
              <>
                <NavControl direction="prev" onClick={() => scrollByAmount(-1)} />
                <NavControl direction="next" onClick={() => scrollByAmount(1)} />
              </>
            ) : null}

            <ButtonLink href={allHref} variant="secondary" size="md">
              {allLabel}
            </ButtonLink>
          </div>
        </div>

        <div className="relative mt-10">
          <div
            ref={scrollerRef}
            onWheel={onScrollerWheel}
            className="flex gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-mandatory"
          >
            {items.map((item, idx) => (
              <motion.article
                key={item.id}
                data-catalog-card
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.55, ease, delay: Math.min(idx, 3) * 0.05 }
                }
                className="group relative w-[min(280px,78vw)] shrink-0 snap-start overflow-hidden rounded-[28px] ring-1 ring-black/8 shadow-[0_18px_50px_rgba(17,24,39,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(17,24,39,0.12)] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]"
              >
                <div className={`absolute inset-0 ${palette.card}`} />
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full ${palette.glow} blur-3xl`}
                />

                <div className="relative p-4 sm:p-5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-white/50 ring-1 ring-white/70">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-3xl text-black/15">
                        ✦
                      </div>
                    )}

                    {item.popular ? (
                      <div className={`absolute right-3 top-3 ${badgeClassName("hit")}`}>
                        Хит
                      </div>
                    ) : null}
                  </div>

                  <h3 className="mt-4 min-h-[3rem] text-[17px] font-black leading-snug tracking-tight text-[var(--mp-ink)]">
                    {item.title}
                  </h3>

                  {item.meta && item.meta.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.meta.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-black/55 ring-1 ring-black/5"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3">
                    <span className="text-sm font-bold text-[var(--mp-ink)]">
                      {item.price.toLocaleString()} ₽
                    </span>
                    <span className="text-xs font-semibold text-black/40 transition group-hover:text-black/70">
                      Подробнее →
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
