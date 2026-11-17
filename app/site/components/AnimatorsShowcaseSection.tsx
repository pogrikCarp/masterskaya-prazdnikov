"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import { ButtonLink } from "./Button";
import NavControl from "./CarouselNav";
import AnimatorCard from "./AnimatorCard";
import type { AnimatorSummary } from "@/lib/animator-filters";
import {
  ANIMATORS_SECTION,
  DEFAULT_HOME_CONTENT,
  type HomeSectionContent,
} from "@/lib/home-content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AnimatorsShowcaseSection({
  showAllLink = true,
  section = DEFAULT_HOME_CONTENT[ANIMATORS_SECTION],
}: {
  showAllLink?: boolean;
  section?: HomeSectionContent;
}) {
  const reduceMotion = useReducedMotion();
  const popularScrollerRef = useRef<HTMLDivElement | null>(null);
  const [popular, setPopular] = useState<AnimatorSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimators() {
      try {
        const res = await fetch("/api/animators");
        if (res.ok) {
          const data: AnimatorSummary[] = await res.json();
          setPopular(data);
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
    const amount = firstCard
      ? firstCard.offsetWidth + gap
      : Math.max(320, Math.round(el.clientWidth * 0.9));

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
    <section id="services" className="py-14">
      <Container className="max-w-[1320px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
              {section.title}
            </h2>
            {section.subtitle ? (
              <p className="mt-3 text-sm sm:text-base text-black/55">{section.subtitle}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <NavControl
              direction="prev"
              onClick={() => scrollPopularByAmount(-1)}
              label="Прокрутить аниматоров влево"
            />
            <NavControl
              direction="next"
              onClick={() => scrollPopularByAmount(1)}
              label="Прокрутить аниматоров вправо"
            />
            {showAllLink ? (
              <ButtonLink href="/animators" variant="primary" size="md">
                Все аниматоры
              </ButtonLink>
            ) : null}
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
                  key={c.id}
                  initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease, delay: idx * 0.05 }}
                  className="shrink-0 w-[min(340px,84vw)] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] snap-start"
                  data-animator-card
                >
                  <AnimatorCard animator={c} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
