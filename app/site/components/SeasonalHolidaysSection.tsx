"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "./Container";

const ease = [0.22, 1, 0.36, 1] as const;

const holidays = [
  {
    title: "Масленица",
    description: "Традиционные гулянья, блины, конкурсы и сжигание чучела.",
    period: "Февраль–Март",
    emoji: "🥞",
  },
  {
    title: "Новый год",
    description: "Дед Мороз, Снегурочка, хороводы и новогодние чудеса.",
    period: "Декабрь–Январь",
    emoji: "🎄",
  },
  {
    title: "8 Марта",
    description: "Весенний праздник с цветами, поздравлениями и сюрпризами.",
    period: "Март",
    emoji: "🌷",
  },
  {
    title: "День защиты детей",
    description: "Весёлые игры, конкурсы и развлечения для детей.",
    period: "1 Июня",
    emoji: "🎈",
  },
];

export default function SeasonalHolidaysSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="seasonal-holidays" className="py-14">
      <Container className="max-w-[1320px]">
        <div className="text-center">
          <div className="inline-flex rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-black/70 ring-1 ring-black/10">
            Сезонные программы
          </div>
          <h2 className="mt-4 text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
            Календарные праздники
          </h2>
          <p className="mt-3 text-sm sm:text-base text-black/60 max-w-2xl mx-auto">
            Специальные программы к традиционным праздникам — Масленица, Новый год и другие
            события года.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {holidays.map((holiday, idx) => (
            <motion.div
              key={holiday.title}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 54 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={
                reduceMotion ? { duration: 0 } : { duration: 0.85, ease, delay: idx * 0.08 }
              }
              className="group relative overflow-hidden rounded-[34px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] transition-all hover:shadow-[0_32px_100px_rgba(17,24,39,0.14)]"
            >
              <div className="absolute inset-0 opacity-90 bg-[linear-gradient(135deg,rgba(255,107,138,0.25)_0%,rgba(255,255,255,0.85)_55%,rgba(255,196,0,0.22)_100%)]" />
              <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#FF6B8A]/28 blur-3xl" />
              <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/70 blur-3xl" />

              <div className="relative p-7">
                <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-white/70 ring-1 ring-black/10 text-4xl">
                  {holiday.emoji}
                </div>

                <div className="mt-5 text-lg font-black tracking-tight text-[var(--mp-ink)] leading-tight">
                  {holiday.title}
                </div>

                <div className="mt-2 inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-black/70 ring-1 ring-black/10">
                  {holiday.period}
                </div>

                <p className="mt-4 text-sm text-black/60 leading-relaxed">
                  {holiday.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div className="text-sm text-black/60">от 8 000 ₽</div>
                  <div className="text-sm font-semibold text-[var(--mp-ink)] group-hover:translate-x-[2px] transition-transform">
                    Подробнее
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
