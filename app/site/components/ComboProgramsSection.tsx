import Container from "./Container";
import { ButtonLink } from "./Button";
import Reveal from "./Reveal";
import {
  COMBO_SECTION,
  DEFAULT_HOME_CONTENT,
  type HomeSectionContent,
} from "@/lib/home-content";

export default function ComboProgramsSection({
  section = DEFAULT_HOME_CONTENT[COMBO_SECTION],
}: {
  section?: HomeSectionContent;
}) {
  const programs = section?.cards ?? [];

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

        <div className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <Reveal key={program.title} className="h-full">
              <div className="mp-card-lift relative flex h-full flex-col overflow-hidden rounded-[34px] bg-white/70 p-7 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)]">
                <div className="absolute inset-0 opacity-90 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.34)_0%,rgba(255,255,255,0.86)_52%,rgba(255,198,214,0.42)_100%)]" />
                <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_0.22)] blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/70 blur-3xl" />

                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] bg-white/70 text-3xl ring-1 ring-black/10">
                  {program.icon ?? "🎁"}
                </div>

                <div className="relative mt-5 text-xl font-black leading-tight tracking-tight text-[var(--mp-ink)]">
                  {program.title}
                </div>

                <p className="relative mt-3 text-sm leading-relaxed text-black/60">
                  {program.text}
                </p>

                <div className="relative mt-auto pt-6">
                  <ButtonLink href="#service-builder" variant="secondary" size="md">
                    Рассчитать стоимость
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
