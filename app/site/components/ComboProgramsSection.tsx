import Image from "next/image";
import Link from "next/link";
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
    image: "/combo-programs/standart-show.jpg",
  },
  {
    title: "Супермикс с шоу",
    image: "/combo-programs/supermix-show.jpg",
  },
  {
    title: "Стандарт с любимым мастер-классом",
    image: "/combo-programs/standart-master-class.jpg",
  },
  {
    title: "Мегабум",
    image: "/combo-programs/megaboom.jpg",
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
              {section.title}
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

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {COMBO_PROGRAMS.map((program) => (
            <Reveal key={program.title} className="h-full">
              <Link
                href="#service-builder"
                aria-label={`${program.title} — рассчитать стоимость`}
                className="mp-card-lift block h-full overflow-hidden rounded-[26px] bg-white/70 ring-1 ring-black/10 shadow-[0_20px_56px_rgba(17,24,39,0.10)] sm:rounded-[34px] sm:shadow-[0_26px_80px_rgba(17,24,39,0.10)]"
              >
                <Image
                  src={program.image}
                  alt={program.title}
                  width={1843}
                  height={2560}
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
