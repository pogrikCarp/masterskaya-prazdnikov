"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Container from "./Container";

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
}) {
  const reduceMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const palette = accents[accent];
  const canScroll = items.length > 4;

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
                <button
                  type="button"
                  onClick={() => scrollByAmount(-1)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-black/70 ring-1 ring-black/10 shadow-[0_12px_30px_rgba(17,24,39,0.06)] transition hover:-translate-y-0.5 hover:bg-white"
                  aria-label="Листать влево"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => scrollByAmount(1)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-black/70 ring-1 ring-black/10 shadow-[0_12px_30px_rgba(17,24,39,0.06)] transition hover:-translate-y-0.5 hover:bg-white"
                  aria-label="Листать вправо"
                >
                  ›
                </button>
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

        {loading ? (
          <div className="mt-10 flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[rgb(var(--mp-lavender-rgb)_/_0.25)] border-t-[rgb(var(--mp-lavender-rgb))]" />
          </div>
        ) : items.length === 0 ? (
          <div className="mt-10 rounded-[28px] bg-white/60 py-16 text-center text-black/45 ring-1 ring-black/5">
            {emptyText}
          </div>
        ) : (
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
        )}
      </Container>
    </section>
  );
}
