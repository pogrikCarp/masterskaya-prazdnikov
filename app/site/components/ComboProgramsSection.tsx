import Container from "./Container";
import { ButtonLink } from "./Button";
import Reveal from "./Reveal";
import {
  COMBO_SECTION,
  DEFAULT_HOME_CONTENT,
  type HomeSectionContent,
} from "@/lib/home-content";

const COMBO_PROGRAMS = [
  {
    title: "Стандарт с шоу",
    duration: "2 часа",
    oldPrice: "24 500 ₽",
    price: "20 500 ₽",
    discount: "4 000 ₽",
    tone: "from-[#eee8ff] via-white to-[#ffe8f1]",
    features: [
      "Анимационная программа с любым героем или квест для детей от 8 лет",
      "Музыкальное сопровождение",
      "Игры с тематическим реквизитом",
      "Аквагрим",
      "Фигурки из шариков",
      "Шоу мыльных пузырей или химическое шоу",
      "Вынос торта",
      "Торжественное поздравление",
      "Праздничные пригласительные в подарок",
    ],
  },
  {
    title: "Супермикс с шоу",
    duration: "2 часа",
    oldPrice: "34 990 ₽",
    price: "28 990 ₽",
    discount: "6 000 ₽",
    tone: "from-[#e9faff] via-white to-[#f4e8ff]",
    features: [
      "Анимационная программа с двумя любимыми героями или квест-программа для детей от 8 лет",
      "Музыкальное сопровождение",
      "Игры с тематическим реквизитом",
      "Аквагрим",
      "Фигурки из шариков",
      "Шоу мыльных пузырей или химическое шоу",
      "Вынос торта",
      "Переводные тату и блеск-тату",
      "Торжественное поздравление",
      "Шар-сюрприз",
      "Праздничные пригласительные в подарок",
    ],
  },
  {
    title: "Стандарт с любимым мастер-классом",
    duration: "2,5 часа",
    oldPrice: "28 990 ₽",
    price: "24 990 ₽",
    discount: "4 000 ₽",
    tone: "from-[#fff2e2] via-white to-[#eee8ff]",
    features: [
      "Любой аниматор или квест-программа для детей от 8 лет",
      "Музыкальное сопровождение",
      "Игры с тематическим реквизитом",
      "Аквагрим",
      "Фигурки из шариков",
      "Мастер-класс по слайму или росписи шопперов до 10 человек (следующие участники рассчитываются отдельно)",
      "Вынос торта",
      "Торжественное поздравление",
      "Праздничные пригласительные в подарок",
    ],
  },
  {
    title: "Мегабум",
    duration: "2 часа",
    oldPrice: "47 990 ₽",
    price: "36 990 ₽",
    discount: "11 000 ₽",
    tone: "from-[#ffe8f1] via-white to-[#e7fbf3]",
    features: [
      "Два любых аниматора",
      "Мощная портативная колонка",
      "Тематический сценарий и реквизит",
      "Аквагрим",
      "Переводные тату и блеск-тату",
      "Фигурки из шариков",
      "Шар-сюрприз или пиньята",
      "Бумажное шоу — 20 кг бумаги",
      "Пушка для бумаги",
      "Праздничное конфетти",
      "Вынос торта",
      "Торжественное поздравление",
      "Праздничные пригласительные в подарок",
    ],
  },
] as const;

export default function ComboProgramsSection({
  section = DEFAULT_HOME_CONTENT[COMBO_SECTION],
}: {
  section?: HomeSectionContent;
}) {
  return (
    <section id="combo-programs" className="py-14">
      <Container className="max-w-[1320px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
              Наши комбо-программы
            </h2>
            {section.subtitle ? (
              <p className="mt-3 text-sm sm:text-base text-black/55">{section.subtitle}</p>
            ) : null}
          </div>

          <ButtonLink
            href="#service-builder"
            variant="primary"
            size="md"
            className="self-start sm:self-auto"
          >
            Собрать свой праздник
          </ButtonLink>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-2 lg:gap-6">
          {COMBO_PROGRAMS.map((program) => (
            <Reveal key={program.title} className="h-full">
              <article
                className={`mp-card-lift relative flex h-full flex-col overflow-hidden rounded-[26px] bg-gradient-to-br ${program.tone} p-5 ring-1 ring-black/10 shadow-[0_20px_56px_rgba(17,24,39,0.10)] sm:rounded-[34px] sm:p-7 sm:shadow-[0_26px_80px_rgba(17,24,39,0.10)]`}
              >
                <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-white/75 blur-3xl" />

                <div className="relative flex items-start justify-between gap-4">
                  <h3 className="max-w-[28rem] text-2xl font-black leading-tight tracking-tight text-[var(--mp-ink)] sm:text-[28px]">
                    {program.title}
                  </h3>
                  <span className="shrink-0 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-black/55 ring-1 ring-black/8">
                    {program.duration}
                  </span>
                </div>

                <div className="relative mt-5 flex items-end justify-between gap-4 rounded-2xl bg-white/80 px-4 py-3.5 ring-1 ring-black/8">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">
                      Цена комбо
                    </div>
                    <div className="mt-1 text-3xl font-black tracking-tight text-[var(--mp-ink)]">
                      {program.price}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-black/35 line-through decoration-2">
                      {program.oldPrice}
                    </div>
                    <div className="mt-1 rounded-full bg-[#ffdf67] px-3 py-1 text-xs font-black text-[#5b3d00]">
                      Скидка {program.discount}
                    </div>
                  </div>
                </div>

                <ul className="relative mt-5 grid gap-2.5 text-sm leading-relaxed text-black/70 sm:text-[15px]">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8ee3a1] text-[12px] font-black text-[#174f2a]"
                      >
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-auto pt-6">
                  <ButtonLink
                    href="#service-builder"
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    Заказать программу
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
