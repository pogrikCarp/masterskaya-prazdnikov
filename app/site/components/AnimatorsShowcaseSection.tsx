"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import { ButtonLink } from "./Button";

type Animator = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  pricePerHour: number;
  popular: boolean;
  active: boolean;
};

type AnimatorCard = {
  title: string;
  tag?: string;
  image: string | null;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function AnimatorsShowcaseSection({
  showAllLink = true,
}: {
  showAllLink?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const popularScrollerRef = useRef<HTMLDivElement | null>(null);
  const [popular, setPopular] = useState<AnimatorCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimators() {
      try {
        const res = await fetch("/api/animators");
        if (res.ok) {
          const data: Animator[] = await res.json();
          setPopular(
            data.map((a) => ({
              title: a.name,
              tag: a.popular ? "хит" : undefined,
              image: a.imageUrl,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching animators:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnimators();
  }, []);

  const scrollPopularByAmount = (dir: -1 | 1) => {
    const el = popularScrollerRef.current;
    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>("[data-animator-card]");
    const styles = window.getComputedStyle(el);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const amount = firstCard ? firstCard.offsetWidth + gap : Math.max(320, Math.round(el.clientWidth * 0.9));

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
    <>
      <section id="services" className="py-14">
        <Container className="max-w-[1320px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
            <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
              Аниматоры - те самые любимые герои, только вживую
            </h2>
            <p className="mt-3 text-sm sm:text-base text-black/60 max-w-2xl">
              В нашей команде — только чуткие, веселые и опытные артисты.
            </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollPopularByAmount(-1)}
                className="group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white/75 ring-1 ring-white/60 shadow-[0_18px_45px_rgba(17,24,39,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_22px_60px_rgba(17,24,39,0.12)] active:translate-y-0"
                aria-label="Прокрутить популярные влево"
              >
                <span className="pointer-events-none absolute -left-8 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.65)] blur-xl transition-transform duration-500 group-hover:translate-x-10" />
                <span className="relative text-lg leading-none text-black/70 transition-transform duration-300 group-hover:-translate-x-[1px]">‹</span>
              </button>
              <button
                type="button"
                onClick={() => scrollPopularByAmount(1)}
                className="group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white/75 ring-1 ring-white/60 shadow-[0_18px_45px_rgba(17,24,39,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_22px_60px_rgba(17,24,39,0.12)] active:translate-y-0"
                aria-label="Прокрутить популярные вправо"
              >
                <span className="pointer-events-none absolute -left-8 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.65)] blur-xl transition-transform duration-500 group-hover:translate-x-10" />
                <span className="relative text-lg leading-none text-black/70 transition-transform duration-300 group-hover:translate-x-[1px]">›</span>
              </button>
            </div>
          </div>

          <div className="relative mt-10 overflow-x-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-14 bg-[linear-gradient(90deg,var(--mp-bg)_0%,rgb(var(--mp-bg-rgb)_/_0)_100%)]" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-14 bg-[linear-gradient(270deg,var(--mp-bg)_0%,rgb(var(--mp-bg-rgb)_/_0)_100%)]" />
            <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-12 w-full bg-[linear-gradient(180deg,rgb(var(--mp-bg-rgb)_/_0)_0%,var(--mp-bg)_100%)]" />

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[rgb(var(--mp-lavender-rgb)_/_0.3)] border-t-[rgb(var(--mp-lavender-rgb))]" />
              </div>
            ) : popular.length === 0 ? (
              <div className="text-center py-20 text-black/50">Нет аниматоров</div>
            ) : (
              <div
                ref={popularScrollerRef}
                onWheel={onScrollerWheel}
                className="flex items-stretch gap-5 overflow-x-auto px-6 pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-mandatory scroll-px-6 focus:outline-none"
              >
                {popular.map((c, idx) => (
                  <motion.div
                    key={c.title}
                    initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 54 }}
                    whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.85, ease, delay: idx * 0.06 }}
                    className="shrink-0 w-[min(340px,84vw)] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] snap-start"
                    data-animator-card
                  >
                    <div className="group relative overflow-hidden rounded-[34px] bg-white/70 shadow-[0_26px_80px_rgba(17,24,39,0.10)]">
                      <div className="absolute inset-0 opacity-90 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.42)_0%,rgba(255,255,255,0.85)_55%,rgba(214,249,239,0.55)_100%)]" />
                      <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_0.35)] blur-3xl" />
                      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/70 blur-3xl" />

                      <div className="relative p-7 sm:p-8">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-h-[44px] sm:min-h-[56px] text-lg sm:text-xl font-black tracking-tight text-[var(--mp-ink)] leading-tight">
                            {c.title}
                          </div>
                          {c.tag ? (
                            <div className="shrink-0 rounded-full bg-[rgba(255,107,138,0.85)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-[0_14px_30px_rgba(255,107,138,0.25)]">
                              {c.tag}
                            </div>
                          ) : null}
                        </div>

                        <div className="mt-6 rounded-[28px] bg-white/55 ring-1 ring-white/70 p-6 sm:p-7">
                          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.0)_62%),linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.24)_0%,rgba(255,107,138,0.10)_50%,rgba(125,211,252,0.12)_100%)] ring-1 ring-white/60">
                            {c.image ? (
                              <img
                                src={c.image}
                                alt={c.title}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-black/30 text-4xl">
                                🎭
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <div className="text-sm text-black/60">Фото героя</div>
                          <div className="text-sm font-semibold text-[var(--mp-ink)] group-hover:translate-x-[2px] transition-transform">
                            Подробнее
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {showAllLink ? (
            <div className="mt-6 flex justify-start px-6">
              <ButtonLink href="/animators" variant="secondary" size="lg">
                Все аниматоры
              </ButtonLink>
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}
