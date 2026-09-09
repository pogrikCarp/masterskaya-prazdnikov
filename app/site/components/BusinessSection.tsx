import Container from "./Container";
import { buttonClassName } from "./Button";
import Reveal from "./Reveal";
import {
  BUSINESS_BENEFITS_SECTION,
  BUSINESS_SECTION,
  DEFAULT_HOME_CONTENT,
  type HomeSectionContent,
} from "@/lib/home-content";

export default function BusinessSection({
  section = DEFAULT_HOME_CONTENT[BUSINESS_SECTION],
  benefitsSection = DEFAULT_HOME_CONTENT[BUSINESS_BENEFITS_SECTION],
}: {
  section?: HomeSectionContent;
  benefitsSection?: HomeSectionContent;
}) {
  const telegramText =
    "Здравствуйте! Хочу обсудить сотрудничество с вами. (Описание)";
  const telegramHref = `https://t.me/orlixina333?text=${encodeURIComponent(telegramText)}`;

  return (
    <section id="business" className="py-14 bg-[linear-gradient(180deg,rgba(130,230,200,0.08)_0%,rgb(var(--mp-bg-rgb)_/_0)_100%)]">
      <Container className="max-w-[1320px]">
        <Reveal className="relative overflow-hidden rounded-[40px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] p-8 sm:p-12">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.22)_0%,rgba(255,255,255,0.85)_55%,rgba(130,230,200,0.18)_100%)]" />
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_0.24)] blur-3xl" />
          <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-white/70 blur-3xl" />

          <div className="relative">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="mt-4 text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
                {section.title}
              </h2>
              {section.subtitle ? (
                <p className="mt-4 text-sm sm:text-base text-black/60">{section.subtitle}</p>
              ) : null}
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {section.cards.map((card) => (
                <div
                  key={card.title}
                  className="relative overflow-hidden rounded-[28px] bg-white/60 ring-1 ring-black/10 p-6"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/70 ring-1 ring-black/10 text-3xl">
                    {card.icon ?? "•"}
                  </div>
                  <h3 className="mt-4 text-lg font-black tracking-tight text-[var(--mp-ink)]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-black/60">{card.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {benefitsSection.cards.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10">
                    <svg className="h-5 w-5 text-[var(--mp-ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--mp-ink)]">{benefit.title}</div>
                    <div className="mt-1 text-sm text-black/60">{benefit.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href={telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClassName({ variant: "primary", size: "lg" })}
              >
                Обсудить сотрудничество
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
