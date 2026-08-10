import Link from "next/link";
import Container from "./Container";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(1200px_500px_at_50%_-120px,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_60%),linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.86)_0%,rgb(var(--mp-lavender-rgb)_/_0.74)_45%,rgb(var(--mp-lavender-rgb)_/_0.66)_100%)]">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/18 blur-2xl" />
      <div className="absolute -right-28 top-24 h-80 w-80 rounded-full bg-[#FF74B8]/20 blur-3xl" />
      <div className="absolute left-1/2 top-[-120px] h-80 w-[980px] -translate-x-1/2 rounded-[999px] bg-white/10 blur-3xl" />

      <div className="pointer-events-none absolute left-[6%] top-[34%] h-10 w-10 rounded-full bg-white/20 blur-[1px]" />
      <div className="pointer-events-none absolute left-[18%] top-[22%] h-3 w-3 rounded-full bg-white/40" />
      <div className="pointer-events-none absolute right-[16%] top-[28%] h-4 w-4 rounded-full bg-white/35" />
      <div className="pointer-events-none absolute right-[9%] top-[44%] h-12 w-12 rounded-full bg-white/10 blur-[2px]" />

      <Container>
        <div className="py-14 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/14 ring-1 ring-white/20 px-4 py-2 text-xs font-semibold text-white/90">
                <span className="inline-block h-2 w-2 rounded-full bg-[#22c55e]" />
                Праздники под ключ: выезд, реквизит, фото
              </div>

              <h1 className="mt-6 text-[40px] leading-[1.02] font-black tracking-tight text-white sm:text-[64px]">
                Подарите ребенку сказку, а себе — отдых.
                <span className="block">Обезьяна</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
                Профессиональная команда, понятные пакеты и визуально красивый результат.
                Без суеты — с заботой о деталях.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button className="bg-white/18 text-white ring-1 ring-white/25 shadow-[0_22px_60px_rgba(0,0,0,0.18)] hover:bg-white/22">
                  Получить расчёт
                </Button>
                <Link
                  href="/gallery"
                  className="inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-white bg-white/12 ring-1 ring-white/20 hover:bg-white/18"
                >
                  Смотреть фото
                </Link>
              </div>

              <div className="mt-12 grid w-full gap-3 sm:grid-cols-3">
                <div className="rounded-[22px] bg-white/12 ring-1 ring-white/20 p-4">
                  <div className="text-sm font-extrabold text-white">5.0</div>
                  <div className="text-xs text-white/70">средняя оценка по отзывам</div>
                </div>
                <div className="rounded-[22px] bg-white/12 ring-1 ring-white/20 p-4">
                  <div className="text-sm font-extrabold text-white">от 2 990 ₽</div>
                  <div className="text-xs text-white/70">бюджетные и премиум‑пакеты</div>
                </div>
                <div className="rounded-[22px] bg-white/12 ring-1 ring-white/20 p-4">
                  <div className="text-sm font-extrabold text-white">24/7</div>
                  <div className="text-xs text-white/70">поддержка до и после события</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-[-1px]">
        <svg viewBox="0 0 1440 160" className="block w-full" aria-hidden="true">
          <path
            d="M0,64 C120,96 240,128 360,122 C480,116 600,72 720,72 C840,72 960,116 1080,122 C1200,128 1320,96 1440,64 L1440,160 L0,160 Z"
            fill="var(--mp-bg)"
          />
        </svg>
      </div>
    </section>
  );
}
