"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Container from "./Container";
import { ButtonLink } from "./Button";
import {
  DEFAULT_HOME_CONTENT,
  EXTRA_SERVICES_SECTION,
  type HomeSectionContent,
} from "@/lib/home-content";

const ease = [0.22, 1, 0.36, 1] as const;

/** Услуги, у которых есть свой блок на странице */
const SERVICE_ANCHORS: Record<string, string> = {
  "Пригласительные для вашего праздника": "#invitations",
  "Календарные праздники": "#seasonal-holidays",
};

export default function AdditionalServicesSection({
  section = DEFAULT_HOME_CONTENT[EXTRA_SERVICES_SECTION],
}: {
  section?: HomeSectionContent;
}) {
  const reduceMotion = useReducedMotion();
  const services = section.cards;

  return (
    <section id="additional-services" className="py-14">
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

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <ButtonLink href="/services" variant="primary" size="md">
              Все услуги
            </ButtonLink>
          </div>
        </div>

        <div className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              className="h-full"
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={
                reduceMotion ? { duration: 0 } : { duration: 0.5, ease, delay: idx * 0.05 }
              }
            >
              <Link
                href={SERVICE_ANCHORS[service.title] ?? "/services"}
                className="mp-card-lift group flex h-full flex-col overflow-hidden rounded-[34px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] hover:shadow-[0_32px_100px_rgba(17,24,39,0.14)]"
              >
                <div className="relative flex h-full flex-col p-7">
                  <div className="absolute inset-0 opacity-90 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.34)_0%,rgba(255,255,255,0.86)_52%,rgba(214,249,239,0.48)_100%)]" />
                  <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_0.22)] blur-3xl" />
                  <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/70 blur-3xl" />

                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] bg-white/70 ring-1 ring-black/10 text-3xl">
                    {service.icon}
                  </div>

                  <div className="relative mt-5 min-h-[3.25rem] text-lg font-black tracking-tight text-[var(--mp-ink)] leading-tight line-clamp-2">
                    {service.title}
                  </div>

                  <p className="relative mt-3 min-h-[3.75rem] text-sm text-black/60 leading-relaxed line-clamp-3">
                    {service.text}
                  </p>

                  <div className="relative mt-auto flex items-center justify-between pt-5">
                    <div className="text-sm text-black/60">от 2 000 ₽</div>
                    <div className="text-sm font-semibold text-[var(--mp-ink)] transition-transform group-hover:translate-x-[2px]">
                      Подробнее
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
