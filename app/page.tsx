import Link from "next/link";
import SiteShell from "./site/components/SiteShell";
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
          <div className="rounded-[40px] bg-[#0B0B0B] text-white p-10 sm:p-14 overflow-hidden relative">
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#FF6B8A]/30 blur-3xl" />
            <div className="absolute -right-16 top-10 h-72 w-72 rounded-full bg-[#FFD23A]/25 blur-3xl" />

            <div className="relative text-center">
              <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight">
                Посмотрите, как проходит праздник
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
                Визуальный стиль — ключ к «вау‑эффекту». Подборка фото и видео помогает
                выбрать формат без лишних звонков.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center rounded-full px-6 h-12 text-sm font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,196,0,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--mp-bg)] active:translate-y-[1px] bg-[var(--mp-accent)] text-[var(--mp-ink)] shadow-[0_18px_40px_rgba(255,196,0,0.25)] hover:brightness-[0.98]"
                >
                  Открыть галерею
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
