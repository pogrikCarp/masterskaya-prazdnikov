"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Container from "./Container";
import { useRequestModal } from "./RequestModalProvider";

const ease = [0.22, 1, 0.36, 1] as const;

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

function ArrowButton({
  direction,
  onClick,
  className = "",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Предыдущий слайд" : "Следующий слайд"}
      className={[
        "inline-flex h-12 w-12 items-center justify-center rounded-full",
        "bg-white/90 text-[var(--mp-ink)] backdrop-blur-md",
        "ring-1 ring-black/8 shadow-[0_14px_40px_rgba(17,24,39,0.14)]",
        "transition duration-300 hover:bg-white hover:scale-[1.04] active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--mp-lavender-rgb)_/_0.55)]",
        className,
      ].join(" ")}
    >
      <span className="text-xl leading-none">{direction === "prev" ? "‹" : "›"}</span>
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
  const { openRequestModal } = useRequestModal();
  const palette = accents[accent];
  const isFullBleed = layout === "fullBleed";
  const canScroll = items.length > (isFullBleed ? 1 : 4);

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

  const header = (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
          {title}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-black/55">{subtitle}</p>
      </div>

      <Link
        href={allHref}
        className="inline-flex h-11 items-center justify-center self-start rounded-full bg-[var(--mp-ink)] px-5 text-sm font-semibold text-white transition hover:opacity-90 sm:self-auto"
      >
        {allLabel}
      </Link>
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

        <div className="relative mt-8 sm:mt-10">
          {canScroll ? (
            <>
              <ArrowButton
                direction="prev"
                onClick={() => scrollByAmount(-1)}
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 sm:left-5 lg:left-8"
              />
              <ArrowButton
                direction="next"
                onClick={() => scrollByAmount(1)}
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 sm:right-5 lg:right-8"
              />
            </>
          ) : null}

          <div
            ref={scrollerRef}
            onWheel={onScrollerWheel}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 sm:gap-5 sm:px-6 lg:px-[max(2rem,calc((100vw-1320px)/2))]"
          >
            {items.map((item, idx) => (
              <motion.article
                key={item.id}
                data-catalog-card
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.55, ease, delay: Math.min(idx, 2) * 0.05 }
                }
                className="group relative w-[min(920px,calc(100vw-2.5rem))] shrink-0 snap-center overflow-hidden rounded-[28px] ring-1 ring-black/8 shadow-[0_24px_80px_rgba(17,24,39,0.12)] sm:w-[min(980px,calc(100vw-5rem))] sm:rounded-[34px] lg:w-[min(1100px,calc(100vw-8rem))]"
              >
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

                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,24,0.78)_0%,rgba(12,10,24,0.42)_45%,rgba(12,10,24,0.18)_100%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,24,0.12)_0%,transparent_35%,rgba(12,10,24,0.55)_100%)]" />

                  {item.popular ? (
                    <div
                      className={`absolute right-4 top-4 rounded-full ${palette.badge} px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white sm:right-6 sm:top-6`}
                    >
                      Хит
                    </div>
                  ) : null}

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
                    <div className="max-w-xl">
                      <h3 className="text-[28px] font-black tracking-tight text-white sm:text-[36px] lg:text-[42px]">
                        {item.title}
                      </h3>

                      {item.meta && item.meta.length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.meta.map((chip) => (
                            <span
                              key={chip}
                              className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold text-white/85 ring-1 ring-white/20 backdrop-blur"
                            >
                              {chip}
                            </span>
                          ))}
                          <span className="rounded-full bg-[var(--mp-accent)] px-3 py-1.5 text-xs font-bold text-[var(--mp-ink)]">
                            {item.price.toLocaleString()} ₽
                          </span>
                        </div>
                      ) : (
                        <div className="mt-4">
                          <span className="rounded-full bg-[var(--mp-accent)] px-3 py-1.5 text-xs font-bold text-[var(--mp-ink)]">
                            {item.price.toLocaleString()} ₽
                          </span>
                        </div>
                      )}

                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={openRequestModal}
                          className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-[var(--mp-ink)] transition hover:bg-white/90"
                        >
                          Оставить заявку
                        </button>
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
              </motion.article>
            ))}
          </div>
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
                <ArrowButton direction="prev" onClick={() => scrollByAmount(-1)} />
                <ArrowButton direction="next" onClick={() => scrollByAmount(1)} />
              </>
            ) : null}

            <Link
              href={allHref}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--mp-ink)] px-5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {allLabel}
            </Link>
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
                      <div
                        className={`absolute right-3 top-3 rounded-full ${palette.badge} px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white`}
                      >
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
