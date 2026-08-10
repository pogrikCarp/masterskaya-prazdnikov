"use client";

import { useState } from "react";
import Container from "./Container";
import ServiceBuilderModal from "./ServiceBuilderModal";

export default function ServiceBuilderAnchorSection() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="service-builder"
      className="py-16"
    >
      <Container className="max-w-[1320px]">
        <div className="relative overflow-hidden rounded-[40px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)]">
          <div className="absolute inset-0 opacity-90 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgb(var(--mp-lavender-rgb)_/_0.10)_100%)]" />
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_0.20)] blur-3xl" />
          <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-white/75 blur-3xl" />

          <div className="relative p-8 sm:p-12">
            <div className="text-center">
              <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
                Соберите идеальный праздник за пару минут
              </h2>
              <p className="mt-4 text-base sm:text-lg text-black/60 max-w-3xl mx-auto leading-relaxed">
                Выбирайте формат, возраст и дополнительные опции — мы сразу покажем итоговую стоимость
                и подскажем лучшие сочетания.
              </p>
            </div>

            <div className="mt-10">
              <div className="text-sm font-black tracking-tight text-[var(--mp-ink)]">
                Как это работает:
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
                <div className="rounded-[28px] bg-white/70 ring-1 ring-black/10 p-5 h-full">
                  <div className="text-2xl">🎉</div>
                  <div className="mt-3 text-sm font-extrabold text-[var(--mp-ink)]">
                    Выберите базовую программу
                  </div>
                </div>

                <div className="rounded-[28px] bg-white/70 ring-1 ring-black/10 p-5 h-full">
                  <div className="text-2xl">🧪</div>
                  <div className="mt-3 text-sm font-extrabold text-[var(--mp-ink)]">
                    Добавьте шоу, анимацию или мастер‑класс
                  </div>
                </div>

                <div className="rounded-[28px] bg-white/70 ring-1 ring-black/10 p-5 h-full">
                  <div className="text-2xl">💰</div>
                  <div className="mt-3 text-sm font-extrabold text-[var(--mp-ink)]">
                    Сразу увидите итоговую стоимость
                  </div>
                </div>

                <div className="rounded-[28px] bg-white/70 ring-1 ring-black/10 p-5 h-full shadow-[0_20px_55px_rgba(17,24,39,0.08)] flex flex-col justify-between">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="group relative w-full overflow-hidden inline-flex h-14 sm:h-16 items-center justify-center gap-3 rounded-2xl px-8 sm:px-10 text-sm sm:text-[15px] font-semibold text-white bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.92)_0%,rgb(var(--mp-lavender-rgb)_/_0.72)_42%,rgba(255,107,138,0.90)_100%)] bg-[length:220%_220%] bg-[position:0%_50%] shadow-[0_24px_70px_rgba(17,24,39,0.18)] ring-1 ring-white/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_90px_rgba(17,24,39,0.22)] hover:bg-[position:100%_50%] active:translate-y-0"
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.12)_28%,rgba(0,0,0,0.12)_100%)]" />
                    <span className="pointer-events-none absolute -top-10 left-6 h-16 w-44 rotate-[18deg] rounded-2xl bg-white/30 blur-2xl transition-transform duration-500 group-hover:translate-x-10" />
                    <span className="pointer-events-none absolute -inset-1 rounded-2xl bg-white/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="relative">Собрать свой праздник</span>
                    <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/18 ring-1 ring-white/30 transition-transform duration-300 group-hover:translate-x-0.5">
                      <span className="text-lg leading-none">→</span>
                    </span>
                  </button>

                  <div className="mt-3 text-center text-xs text-black/50">
                    Займёт не больше 2 минут · Бесплатно · Без обязательств
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Container>

      <ServiceBuilderModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
