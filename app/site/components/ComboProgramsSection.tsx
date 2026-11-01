import Container from "./Container";
import { ButtonLink } from "./Button";
import Reveal from "./Reveal";
import {
  COMBO_SECTION,
  DEFAULT_HOME_CONTENT,
  type HomeSectionContent,
} from "@/lib/home-content";

const TITLE_COLORS = ["#8d63d9", "#53d4b1", "#ff9d83", "#ffd45d", "#68aee8", "#f16b9f"];
const CHECK_COLORS = ["#9be8b5", "#f5a2b8", "#ffe279", "#bca1ef", "#9edaf2"];

const COMBO_PROGRAMS = [
  {
    title: "Стандарт с шоу",
    oldPrice: "24 500",
    price: "20 500",
    discount: "4 000",
    variant: "show",
    features: [
      "Анимационная программа на 2 часа с любым героем или квест для детей от 8 лет",
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
    oldPrice: "34 990",
    price: "28 990",
    discount: "6 000",
    variant: "supermix",
    features: [
      "Анимационная программа на 2 часа с двумя любимыми героями или квест-программа для детей от 8 лет",
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
    title: "Мегабум",
    oldPrice: "47 990",
    price: "36 990",
    discount: "11 000",
    variant: "megaboom",
    features: [
      "Два любых аниматора на 2 часа",
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
  {
    title: "Стандарт с любимым мастер-классом",
    oldPrice: "28 990",
    price: "24 990",
    discount: "4 000",
    variant: "craft",
    features: [
      "Любой аниматор на 2,5 часа или квест-программа для детей от 8 лет",
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
] as const;

type ProgramVariant = (typeof COMBO_PROGRAMS)[number]["variant"];

function ColorfulTitle({ title }: { title: string }) {
  let letterIndex = 0;

  return (
    <h3
      className="relative z-10 flex flex-wrap justify-center gap-x-[0.24em] text-center text-[29px] leading-[1.18] sm:text-[37px]"
      style={{ fontFamily: "var(--font-combo-title), sans-serif" }}
    >
      {title.split(" ").map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="whitespace-nowrap">
          {Array.from(word).map((letter) => {
            const color = TITLE_COLORS[letterIndex % TITLE_COLORS.length];
            letterIndex += 1;
            return (
              <span
                key={`${letter}-${letterIndex}`}
                style={{
                  color,
                  WebkitTextStroke: "1.5px #24477d",
                  paintOrder: "stroke fill",
                  textShadow: "0 3px 0 #fff, 0 6px 0 rgba(98,76,160,.22)",
                }}
              >
                {letter}
              </span>
            );
          })}
        </span>
      ))}
    </h3>
  );
}

function PartyBadge({ variant }: { variant: ProgramVariant }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 120" className="mx-auto h-[88px] w-[162px] sm:h-[102px] sm:w-[190px]">
      <g fill="none" stroke="#25487e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
        <path fill="#fff" d="M53 30c12-18 34-20 49-8 16-22 48-15 53 9 23-4 38 17 27 34 10 17-6 36-25 32-13 18-42 16-52-4-19 12-44 0-43-22-22-7-21-34-9-41Z" />
        {variant === "megaboom" ? (
          <>
            <path fill="#b68be8" d="M72 46 113 28l34 27-10 35-45 5-27-24Z" />
            <path d="m77 51 63 28M96 39l-8 51M122 35l14 54" />
            <path stroke="#f06f9e" d="m78 93-8 17m24-17 3 19m18-20 10 18m9-22 18 12" />
          </>
        ) : variant === "craft" ? (
          <>
            <path fill="#ffcf66" d="M74 68c0-25 22-43 48-37 31 7 42 41 19 58-12 9-22-2-34 3-23 10-33-7-33-24Z" />
            <circle cx="102" cy="49" r="6" fill="#f48ea7" />
            <circle cx="123" cy="48" r="6" fill="#77d9c1" />
            <circle cx="137" cy="64" r="6" fill="#9881e8" />
            <path fill="#fff" d="m67 95 48-39 9 10-48 39Z" />
          </>
        ) : (
          <>
            <path fill="#ffd94f" d="m113 24 13 27 30 4-22 21 6 30-27-14-27 14 5-30-21-21 30-4Z" />
            <path fill="#ff967f" d="m124 81 55-22 5 13-55 22Z" />
            <circle cx="137" cy="90" r="8" fill="#fff" />
            <circle cx="172" cy="76" r="8" fill="#fff" />
          </>
        )}
      </g>
      <g fill="#ffcf4d">
        <path d="m39 19 4 9 10 1-8 7 2 10-8-5-9 5 2-10-7-7 10-1Z" />
        <path d="m188 23 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1Z" />
      </g>
      <g fill="#f06f9e"><circle cx="44" cy="86" r="5" /><circle cx="187" cy="92" r="5" /></g>
    </svg>
  );
}

function PartyBackdrop({ variant }: { variant: ProgramVariant }) {
  const left = variant === "megaboom" ? "#b68be8" : variant === "craft" ? "#ff9cb4" : "#9b7be4";
  const right = variant === "supermix" ? "#ffdf69" : "#ff91aa";

  return (
    <svg aria-hidden="true" viewBox="0 0 700 1000" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full opacity-80">
      <g fill="none" stroke="#31548a" strokeWidth="3">
        <path d="M0 54C170 94 530 15 700 58" />
        {[
          [28, 58, "#ff8f9b"], [83, 69, "#74dcb9"], [139, 66, "#ffcf63"], [196, 58, "#c69be9"],
          [503, 52, "#ffcf63"], [559, 62, "#ff9c81"], [615, 67, "#75dcb9"], [668, 60, "#c69be9"],
        ].map(([x, y, fill], index) => (
          <path key={index} fill={String(fill)} d={`M${x} ${y}l24 7-15 34-19-31Z`} />
        ))}
      </g>

      <g fill="none" stroke="#31548a" strokeWidth="3">
        <ellipse cx="47" cy="210" rx="35" ry="48" fill={left} />
        <path d="M47 258c-8 48 20 82 5 129" />
        <ellipse cx="658" cy="245" rx="34" ry="47" fill={right} />
        <path d="M658 292c8 45-20 75-6 123" />
        <ellipse cx="23" cy="365" rx="31" ry="43" fill="#74dcb9" />
        <path d="M23 408c-6 42 16 72 4 106" />
      </g>

      <g fill="#fff" stroke="#31548a" strokeWidth="3">
        <path d="M30 553c7-22 34-28 48-10 19-13 43 3 38 26 18 8 10 34-10 34H38c-25 0-31-34-8-50Z" />
        <path d="M603 533c7-22 34-28 48-10 19-13 43 3 38 26 18 8 10 34-10 34h-68c-25 0-31-34-8-50Z" />
      </g>

      <g stroke="#31548a" strokeWidth="3">
        <path fill="#ffd94f" d="m77 461 9 18 20 3-15 14 4 20-18-9-18 9 3-20-14-14 20-3Z" />
        <path fill="#f07aa0" d="m626 438 8 17 19 3-14 13 3 19-16-9-17 9 3-19-14-13 19-3Z" />
        <path fill="#7bd9bb" d="m102 722 6 13 15 2-11 10 3 15-13-7-13 7 3-15-11-10 15-2Z" />
        <path fill="#b892e8" d="m620 737 6 13 15 2-11 10 3 15-13-7-13 7 3-15-11-10 15-2Z" />
      </g>
    </svg>
  );
}

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
            <h2 className="text-[34px] font-black tracking-tight text-[var(--mp-ink)] sm:text-[44px]">Наши комбо-программы</h2>
            {section.subtitle ? <p className="mt-3 text-sm text-black/55 sm:text-base">{section.subtitle}</p> : null}
          </div>
          <ButtonLink href="#service-builder" variant="primary" size="md" className="self-start sm:self-auto">Собрать свой праздник</ButtonLink>
        </div>

        <div className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-2">
          {COMBO_PROGRAMS.map((program) => (
            <Reveal key={program.title} className="h-full">
              <article className="mp-card-lift relative isolate flex h-full min-h-[820px] flex-col overflow-hidden rounded-[34px] border-2 border-[#d8c8ff] bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,.96),rgba(244,239,255,.91)_45%,rgba(255,232,242,.9)_100%)] px-4 pb-5 pt-3 shadow-[0_26px_70px_rgba(75,50,125,.14)] sm:min-h-[900px] sm:px-7 sm:pb-7">
                <PartyBackdrop variant={program.variant} />

                <div className="relative z-10 mx-auto mt-10 rounded-[28px] bg-white/55 px-4 pb-3 pt-1 backdrop-blur-[2px]">
                  <PartyBadge variant={program.variant} />
                  <ColorfulTitle title={program.title} />
                </div>

                <ul className="relative z-10 mx-auto mt-7 grid w-full max-w-[510px] gap-2 text-[15px] font-normal leading-[1.35] text-[#153f78] sm:text-[17px]" style={{ fontFamily: "var(--font-combo-copy), sans-serif" }}>
                  {program.features.map((feature, featureIndex) => (
                    <li key={feature} className="flex items-start gap-2.5 rounded-md bg-white/64 px-2.5 py-1.5 shadow-[0_3px_0_rgba(75,70,140,.06)] backdrop-blur-[1px]">
                      <span aria-hidden="true" className="mt-px inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#28528a] text-[17px] font-black text-white shadow-[0_2px_0_rgba(53,64,125,.2)]" style={{ backgroundColor: CHECK_COLORS[featureIndex % CHECK_COLORS.length], WebkitTextStroke: "1px #28528a" }}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative z-10 mt-auto pt-7">
                  <div className="grid gap-4 rounded-[26px] border-[3px] border-dashed border-[#9f79e2] bg-white/72 p-4 shadow-[0_8px_0_rgba(131,103,195,.08)] sm:grid-cols-[1fr_190px] sm:items-center sm:p-5">
                    <div style={{ fontFamily: "var(--font-combo-copy), sans-serif" }}>
                      <div className="text-base text-[#153f78] sm:text-lg">Стоимость программы: <span className="relative ml-1 inline-block text-xl sm:text-2xl">{program.oldPrice} ₽<span className="absolute left-[-3px] right-[-3px] top-1/2 h-[3px] -rotate-3 bg-[#ef6d99]" /></span></div>
                      <div className="mt-1 text-base text-[#153f78] sm:text-lg">Стоимость с комбо:</div>
                      <div className="mt-1 text-[48px] leading-none text-[#f06f9e] sm:text-[58px]" style={{ WebkitTextStroke: "2px #28528a", paintOrder: "stroke fill", textShadow: "0 4px 0 #fff, 0 7px 0 rgba(53,75,135,.22)" }}>{program.price}</div>
                    </div>

                    <div className="mx-auto flex aspect-square w-[165px] flex-col items-center justify-center bg-[#ffd94f] px-4 text-center text-[#153f78] drop-shadow-[0_5px_0_rgba(69,75,135,.2)] [clip-path:polygon(50%_0%,61%_10%,75%_5%,81%_19%,96%_23%,91%_39%,100%_50%,90%_61%,96%_77%,81%_81%,75%_96%,61%_90%,50%_100%,39%_90%,25%_96%,19%_81%,4%_77%,10%_61%,0%_50%,10%_39%,4%_23%,19%_19%,25%_5%,39%_10%)]">
                      <span className="text-base font-black uppercase" style={{ fontFamily: "var(--font-combo-copy), sans-serif" }}>Скидка</span>
                      <span className="mt-1 text-[32px] font-black leading-none text-[#ef6d99] [-webkit-text-stroke:1px_white]">−{program.discount}</span>
                    </div>
                  </div>

                  <ButtonLink href="#service-builder" variant="primary" size="lg" className="mt-4 w-full">Заказать программу</ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
