import Image from "next/image";
import PartyLogo from "../../img/logoformpng.png";
import ComboProgramDecor from "./ComboProgramDecor";
import styles from "./ComboProgramsSection.module.css";
import Container from "./Container";
import { ButtonLink } from "./Button";
import Reveal from "./Reveal";
import {
  COMBO_SECTION,
  DEFAULT_HOME_CONTENT,
  type HomeSectionContent,
} from "@/lib/home-content";

const TITLE_COLORS = ["#bc94e3", "#88d9bd", "#ffb59c", "#ffda6b", "#8ac9ed", "#f591b8"];
const CHECK_COLORS = ["#c6a3e8", "#93dfbe", "#f39bb6", "#a0d9ed", "#f6a2b8", "#ffe18a", "#bca2e8", "#9ad9c8", "#fac59f"];

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

function ColorfulTitle({ title, variant }: { title: string; variant: ProgramVariant }) {
  const lines = variant === "megaboom" ? ["Мегабум"] : variant === "craft" ? ["Стандарт", "с любимым", "мастер-классом"] : [variant === "supermix" ? "Супермикс" : "Стандарт", "с шоу"];
  let letterIndex = 0;

  return (
    <h3 className={styles.title} aria-label={title}>
      {lines.map((line, lineIndex) => (
        <span key={line} aria-hidden="true" className={`${styles.titleLine} ${variant === "craft" && lineIndex > 0 ? styles.titleLineSmall : ""}`}>
          {Array.from(line).map((letter, index) => {
            if (letter === " ") return <span key={index} className={styles.titleSpace}> </span>;
            const color = TITLE_COLORS[letterIndex++ % TITLE_COLORS.length];
            return <span key={index} className={styles.letter} data-letter={letter} style={{ color }}><span className={styles.letterFace}>{letter}</span></span>;
          })}
        </span>
      ))}
    </h3>
  );
}

function Checkmark({ index }: { index: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className={styles.check}>
      <circle cx="24" cy="24" r="21.5" fill={CHECK_COLORS[index % CHECK_COLORS.length]} stroke="#28507d" strokeWidth="1.8" />
      <path d="m14 24 7 9 13-20" fill="none" stroke="#28507d" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m14 24 7 9 13-20" fill="none" stroke="white" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Discount({ value }: { value: string }) {
  const burst = "m100 6 13 13 18-5 8 17 19 1 3 20 17 8-6 19 13 14-12 14 5 19-18 8-2 19-20 1-8 17-19-5-14 13-14-13-19 5-8-17-20-1-2-19-18-8 5-19-12-14 13-14-6-19 17-8 3-20 19-1 8-17 18 5Z";
  return (
    <div className={styles.discount}>
      <svg aria-hidden="true" viewBox="0 0 200 210">
        <path d={burst} fill="#ffdf63" stroke="#fff" strokeWidth="11" strokeLinejoin="round" />
        <path d={burst} fill="#ffdf63" stroke="#2f4a79" strokeWidth="2.3" strokeLinejoin="round" />
        <path d="m168 5 7 14 16 2-11 12 3 16-15-8-14 8 2-16-11-12 16-2Z" fill="#ffe16b" stroke="white" strokeWidth="6" strokeLinejoin="round" />
        <path d="m168 5 7 14 16 2-11 12 3 16-15-8-14 8 2-16-11-12 16-2Z" fill="#ffe16b" stroke="#2f4a79" strokeWidth="2" strokeLinejoin="round" />
        <path d="m159 27 4 2 2-4m8-1 4 3 2-4m-13 11q4 4 7-1" fill="none" stroke="#2f4a79" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="158" cy="34" r="2.5" fill="#ef98ad" /><circle cx="179" cy="32" r="2.5" fill="#ef98ad" />
      </svg>
      <span className={styles.discountLabel}>СКИДКА</span>
      <span className={styles.discountValue}>−{value.replaceAll(" ", "")}</span>
      <span className="sr-only">рублей</span>
    </div>
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
              <article className={styles.card} data-variant={program.variant}>
                <ComboProgramDecor variant={program.variant} />
                <div className={styles.header}>
                  <div className={styles.logo}>
                    <Image src={PartyLogo} alt="Мастерская праздников — звезда на скейте" sizes="(min-width: 1024px) 340px, 54vw" />
                  </div>
                  <ColorfulTitle title={program.title} variant={program.variant} />
                </div>

                <ul className={styles.features}>
                  {program.features.map((feature, featureIndex) => (
                    <li key={feature} className={styles.feature}>
                      <Checkmark index={featureIndex} />
                      <span className={styles.featureText}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.footer}>
                  <div className={styles.priceBox}>
                    <div className={styles.priceCopy}>
                      <div className={styles.priceLabel}>Стоимость программы: <del className={styles.oldPrice}>{program.oldPrice}<span className="sr-only"> рублей</span></del></div>
                      <div className={`${styles.priceLabel} ${styles.comboLabel}`}>Стоимость с комбо:</div>
                      <strong className={styles.price}>{program.price.replaceAll(" ", "")}<span className="sr-only"> рублей</span></strong>
                    </div>
                    <Discount value={program.discount} />
                  </div>
                  <ButtonLink href="#service-builder" variant="primary" size="lg" className={styles.orderButton}>Заказать программу</ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
