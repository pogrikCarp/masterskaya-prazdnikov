import Container from "./Container";
import Link from "next/link";

export default function BusinessSection() {
  const telegramText =
    "Здравствуйте! Хочу обсудить сотрудничество с вами. (Описание)";
  const telegramHref = `https://t.me/orlixina333?text=${encodeURIComponent(telegramText)}`;

  return (
    <section id="business" className="py-14 bg-[linear-gradient(180deg,rgba(130,230,200,0.08)_0%,rgb(var(--mp-bg-rgb)_/_0)_100%)]">
      <Container className="max-w-[1320px]">
        <div className="relative overflow-hidden rounded-[40px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] p-8 sm:p-12">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.22)_0%,rgba(255,255,255,0.85)_55%,rgba(130,230,200,0.18)_100%)]" />
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_0.24)] blur-3xl" />
          <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-white/70 blur-3xl" />

          <div className="relative">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="mt-4 text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
                Для бизнеса и организаций
              </h2>
              <p className="mt-4 text-sm sm:text-base text-black/60">
                Проводим праздники в детских садах, школах, развивающих центрах и на
                корпоративных мероприятиях. Работаем по договору, предоставляем все документы.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative overflow-hidden rounded-[28px] bg-white/60 ring-1 ring-black/10 p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/70 ring-1 ring-black/10 text-3xl">
                  🏫
                </div>
                <h3 className="mt-4 text-lg font-black tracking-tight text-[var(--mp-ink)]">
                  Детские сады
                </h3>
                <p className="mt-2 text-sm text-black/60">
                  Утренники, выпускные, тематические праздники для групп любого возраста.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[28px] bg-white/60 ring-1 ring-black/10 p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/70 ring-1 ring-black/10 text-3xl">
                  📚
                </div>
                <h3 className="mt-4 text-lg font-black tracking-tight text-[var(--mp-ink)]">
                  Школы
                </h3>
                <p className="mt-2 text-sm text-black/60">
                  Праздники для начальных классов, выпускные, День знаний и другие события.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[28px] bg-white/60 ring-1 ring-black/10 p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/70 ring-1 ring-black/10 text-3xl">
                  🎨
                </div>
                <h3 className="mt-4 text-lg font-black tracking-tight text-[var(--mp-ink)]">
                  Развивающие центры
                </h3>
                <p className="mt-2 text-sm text-black/60">
                  Регулярные мероприятия, мастер-классы, шоу-программы для ваших учеников.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[28px] bg-white/60 ring-1 ring-black/10 p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/70 ring-1 ring-black/10 text-3xl">
                  🏢
                </div>
                <h3 className="mt-4 text-lg font-black tracking-tight text-[var(--mp-ink)]">
                  Корпоративы
                </h3>
                <p className="mt-2 text-sm text-black/60">
                  Семейные корпоративные праздники с детской программой и развлечениями.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10">
                  <svg className="h-5 w-5 text-[var(--mp-ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[var(--mp-ink)]">Работа по договору</div>
                  <div className="mt-1 text-sm text-black/60">Все документы и отчётность</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10">
                  <svg className="h-5 w-5 text-[var(--mp-ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[var(--mp-ink)]">Гибкие условия</div>
                  <div className="mt-1 text-sm text-black/60">Скидки при регулярном сотрудничестве</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10">
                  <svg className="h-5 w-5 text-[var(--mp-ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[var(--mp-ink)]">Опытная команда</div>
                  <div className="mt-1 text-sm text-black/60">Работаем с организациями 5+ лет</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href={telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-14 sm:h-16 min-w-[260px] items-center justify-center rounded-full px-8 sm:px-10 text-sm sm:text-[15px] font-semibold text-white bg-[linear-gradient(135deg,rgba(175,206,188,0.92)_0%,rgb(var(--mp-lavender-rgb)_/_0.72)_48%,rgba(255,107,138,0.88)_100%)] bg-[length:220%_220%] bg-[position:0%_50%] shadow-[0_24px_70px_rgba(17,24,39,0.18)] ring-1 ring-white/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_90px_rgba(17,24,39,0.22)] hover:bg-[position:100%_50%] active:translate-y-0"
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.12)_28%,rgba(0,0,0,0.12)_100%)]" />
                <span className="pointer-events-none absolute -top-10 left-6 h-16 w-44 rotate-[18deg] rounded-full bg-white/30 blur-2xl transition-transform duration-500 group-hover:translate-x-10" />
                <span className="pointer-events-none absolute -inset-1 rounded-full bg-white/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative">Обсудить сотрудничество</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
