"use client";

import { useState } from "react";
import Container from "./Container";
import Button from "./Button";
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
                  <Button
                    type="button"
                    size="lg"
                    className="w-full"
                    onClick={() => setOpen(true)}
                  >
                    Собрать свой праздник
                  </Button>

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
