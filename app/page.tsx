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
import {
  ANIMATORS_SECTION,
  BUILDER_SECTION,
  BUSINESS_BENEFITS_SECTION,
  BUSINESS_SECTION,
  CONTACT_SECTION,
  EXTRA_SERVICES_SECTION,
  GALLERY_SECTION,
  HERO_SECTION,
  INVITATIONS_SECTION,
  QUESTS_SECTION,
  SHOWS_SECTION,
  STORY_SECTION,
  WHY_SECTION,
  WORKSHOPS_SECTION,
} from "@/lib/home-content";
import { getHomeSections } from "@/lib/home-content.server";

export const revalidate = 60;

export default async function HomePage() {
  const sections = await getHomeSections();
  const gallerySection = sections[GALLERY_SECTION];

  return (
    <SiteShell showHeader={false}>
      <HeroSection section={sections[HERO_SECTION]} />

      <div id="about" className="scroll-mt-24" />
      <PremiumParallaxWaveSection
        storySection={sections[STORY_SECTION]}
        whySection={sections[WHY_SECTION]}
      />

      <AnimatorsShowcaseSection section={sections[ANIMATORS_SECTION]} />

      <ShowsCarouselSection section={sections[SHOWS_SECTION]} />

      <QuestsSection section={sections[QUESTS_SECTION]} />

      <WorkshopsSection section={sections[WORKSHOPS_SECTION]} />

      <AdditionalServicesSection section={sections[EXTRA_SERVICES_SECTION]} />

      <div id="pricing" className="scroll-mt-24" />
      <ServiceBuilderAnchorSection section={sections[BUILDER_SECTION]} />

      <InvitationsSection section={sections[INVITATIONS_SECTION]} />

      <BusinessSection
        section={sections[BUSINESS_SECTION]}
        benefitsSection={sections[BUSINESS_BENEFITS_SECTION]}
      />

      <ContactFormSection section={sections[CONTACT_SECTION]} />

      <section className="py-10">
        <Container>
          <Reveal className="relative overflow-hidden rounded-[40px] bg-white/75 p-6 text-[var(--mp-ink)] ring-1 ring-[rgb(var(--mp-lavender-rgb)_/_0.12)] shadow-[0_24px_70px_rgba(141,124,255,0.10)] sm:p-10 lg:p-14">
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_0.22)] blur-3xl" />
            <div className="absolute -right-16 top-10 h-72 w-72 rounded-full bg-[rgba(255,138,168,0.18)] blur-3xl" />

            <div className="relative text-center">
              <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight">
                {gallerySection.title}
              </h2>
              {gallerySection.subtitle ? (
                <p className="mt-3 text-sm sm:text-base text-black/55 max-w-2xl mx-auto">
                  {gallerySection.subtitle}
                </p>
              ) : null}
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
