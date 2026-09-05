import SiteShell from "./site/components/SiteShell";
import { ButtonLink } from "./site/components/Button";
import HeroSection from "./site/components/HeroSection";
import PremiumParallaxWaveSection from "./site/components/PremiumParallaxWaveSection";
import Container from "./site/components/Container";
import AnimatorsShowcaseSection from "./site/components/AnimatorsShowcaseSection";
import ShowsCarouselSection from "./site/components/ShowsCarouselSection";
import AdditionalServicesSection from "./site/components/AdditionalServicesSection";
import ServiceBuilderAnchorSection from "./site/components/ServiceBuilderAnchorSection";
import InvitationsSection from "./site/components/InvitationsSection";
import BusinessSection from "./site/components/BusinessSection";
import QuestsSection from "./site/components/QuestsSection";
import WorkshopsSection from "./site/components/WorkshopsSection";
import ContactFormSection from "./site/components/ContactFormSection";
import Reveal from "./site/components/Reveal";

export default function HomePage() {
  return (
    <SiteShell showHeader={false}>
      <HeroSection />

      <div id="about" className="scroll-mt-24" />
      <PremiumParallaxWaveSection />

      <AnimatorsShowcaseSection />

      <ShowsCarouselSection />

      <QuestsSection />

      <WorkshopsSection />

      <AdditionalServicesSection />

      <div id="pricing" className="scroll-mt-24" />
      <ServiceBuilderAnchorSection />

      <InvitationsSection />

      <BusinessSection />

      <ContactFormSection />

      <section className="py-10">
        <Container>
          <Reveal className="relative overflow-hidden rounded-[40px] bg-white/75 p-6 text-[var(--mp-ink)] ring-1 ring-[rgb(var(--mp-lavender-rgb)_/_0.12)] shadow-[0_24px_70px_rgba(141,124,255,0.10)] sm:p-10 lg:p-14">
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_0.22)] blur-3xl" />
            <div className="absolute -right-16 top-10 h-72 w-72 rounded-full bg-[rgba(255,138,168,0.18)] blur-3xl" />

            <div className="relative text-center">
              <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight">
                Посмотрите, как проходит праздник
              </h2>
              <p className="mt-3 text-sm sm:text-base text-black/55 max-w-2xl mx-auto">
                Визуальный стиль — ключ к «вау‑эффекту». Подборка фото и видео помогает
                выбрать формат без лишних звонков.
              </p>
              <div className="mt-8 flex justify-center">
                <ButtonLink href="/gallery" size="lg">
                  Открыть галерею
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </SiteShell>
  );
}
