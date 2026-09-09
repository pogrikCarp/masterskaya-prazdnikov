"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "./Container";
import AboutSection from "./AboutSection";
import {
  DEFAULT_HOME_CONTENT,
  STORY_SECTION,
  WHY_SECTION,
  type HomeSectionContent,
} from "@/lib/home-content";

function CardIcon({ name, uid }: { name: string | null; uid: string }) {
  const gradientId = `mpIcon-${uid}`;

  if (name === "note") {
    return (
      <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true" role="presentation">
        <defs>
          <linearGradient id={gradientId} x1="14" y1="12" x2="52" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="rgb(var(--mp-lavender-rgb) / 0.82)" />
            <stop offset="0.55" stopColor="#FFD2EE" />
            <stop offset="1" stopColor="#7DD3FC" />
          </linearGradient>
        </defs>
        <path
          d="M18 14 H40 C45 14 49 18 49 23 V46 C49 50.4 45.4 54 41 54 H22 C18.7 54 16 51.3 16 48 V16 C16 14.9 16.9 14 18 14 Z"
          fill={`url(#${gradientId})`}
          opacity="0.98"
        />
        <path d="M24 28 H41" fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <path d="M24 36 H38" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <path d="M45 14 L54 23" fill="none" stroke="rgba(17,24,39,0.14)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "bulb") {
    return (
      <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true" role="presentation">
        <defs>
          <linearGradient id={gradientId} x1="14" y1="10" x2="50" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFE39A" />
            <stop offset="0.55" stopColor="#FF79B6" />
            <stop offset="1" stopColor="rgb(var(--mp-lavender-rgb) / 0.82)" />
          </linearGradient>
        </defs>
        <path
          d="M32 10 C22.8 10 16 16.9 16 25.6 C16 32.2 20 37.6 25.8 40.5 C26.8 41 27.4 42 27.4 43.1 V46 H36.6 V43.1 C36.6 42 37.2 41 38.2 40.5 C44 37.6 48 32.2 48 25.6 C48 16.9 41.2 10 32 10 Z"
          fill={`url(#${gradientId})`}
          opacity="0.98"
        />
        <path d="M27.4 49 H36.6" fill="none" stroke="rgba(17,24,39,0.18)" strokeWidth="3" strokeLinecap="round" />
        <path d="M28.6 54 H35.4" fill="none" stroke="rgba(17,24,39,0.14)" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        <path d="M24 24 C24 19.3 27.7 16 32.3 16" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
      </svg>
    );
  }

  if (name === "masks") {
    return (
      <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true" role="presentation">
        <defs>
          <linearGradient id={gradientId} x1="12" y1="10" x2="52" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFD2EE" />
            <stop offset="0.55" stopColor="rgb(var(--mp-lavender-rgb) / 0.8)" />
            <stop offset="1" stopColor="#FFE39A" />
          </linearGradient>
        </defs>
        <path
          d="M20 14 C25 14 29 18 29 23 V37 C29 42 25 46 20 46 C15 46 11 42 11 37 V23 C11 18 15 14 20 14 Z"
          fill={`url(#${gradientId})`}
          opacity="0.98"
        />
        <path
          d="M44 18 C49 18 53 22 53 27 V39 C53 44 49 48 44 48 C39 48 35 44 35 39 V27 C35 22 39 18 44 18 Z"
          fill={`url(#${gradientId})`}
          opacity="0.92"
        />
        <path d="M16.5 29.5 C18.5 28.3 21.5 28.3 23.5 29.5" fill="none" stroke="rgba(17,24,39,0.18)" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M40 33.5 C42.2 34.6 45.8 34.6 48 33.5" fill="none" stroke="rgba(17,24,39,0.16)" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="18" cy="26" r="2" fill="rgba(255,255,255,0.75)" opacity="0.8" />
        <circle cx="22" cy="26" r="2" fill="rgba(255,255,255,0.75)" opacity="0.55" />
        <circle cx="42" cy="30" r="2" fill="rgba(255,255,255,0.75)" opacity="0.8" />
        <circle cx="46" cy="30" r="2" fill="rgba(255,255,255,0.75)" opacity="0.55" />
      </svg>
    );
  }

  if (name && !["balloon", "note", "bulb", "masks"].includes(name)) {
    return (
      <span className="flex h-12 w-12 items-center justify-center text-3xl" aria-hidden="true">
        {name}
      </span>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true" role="presentation">
      <defs>
        <linearGradient id={gradientId} x1="14" y1="10" x2="50" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFD2EE" />
          <stop offset="0.55" stopColor="rgb(var(--mp-lavender-rgb) / 0.8)" />
          <stop offset="1" stopColor="#7DD3FC" />
        </linearGradient>
      </defs>
      <path
        d="M32 10 C22 10 15 18.2 15 28.4 C15 38.3 22.7 47 32 47 C41.3 47 49 38.3 49 28.4 C49 18.2 42 10 32 10 Z"
        fill={`url(#${gradientId})`}
        opacity="0.98"
      />
      <path d="M28 48 C29.6 50.5 30.8 52.2 32 53.2 C33.2 52.2 34.4 50.5 36 48" fill="none" stroke="rgba(17,24,39,0.18)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M27 54 H37" fill="none" stroke="rgba(17,24,39,0.18)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M22 24 C22 19 25.6 14.6 32 14.6" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

export default function PremiumParallaxWaveSection({
  storySection = DEFAULT_HOME_CONTENT[STORY_SECTION],
  whySection = DEFAULT_HOME_CONTENT[WHY_SECTION],
}: {
  storySection?: HomeSectionContent;
  whySection?: HomeSectionContent;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--mp-bg)]">
      <Container className="max-w-[1320px]">
        <div className="relative z-10 pt-10 sm:pt-12 pb-12 sm:pb-14">
          <AboutSection section={storySection} />

          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[34px] sm:text-[46px] font-black tracking-tight text-[var(--mp-ink)]">
              {whySection.title}
            </h2>
            {whySection.subtitle ? (
              <p className="mt-3 text-sm sm:text-base text-black/60">{whySection.subtitle}</p>
            ) : null}
          </div>

          <div className="mt-6 grid auto-rows-fr gap-4 sm:grid-cols-2">
            {whySection.cards.map((c, idx) => (
              <motion.div
                key={`${c.title}-${idx}`}
                initial={
                  reduceMotion ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 0, y: 18 }
                }
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.85,
                        ease: [0.22, 1, 0.36, 1],
                        delay: idx * 0.06,
                      }
                }
                className="relative h-full overflow-hidden rounded-[28px] bg-white/70 p-5 sm:p-6 ring-1 ring-black/10 shadow-[0_22px_70px_rgba(17,24,39,0.10)]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-90 bg-[linear-gradient(135deg,rgba(255,107,138,0.30)_0%,rgba(255,255,255,0.86)_55%,rgba(214,249,239,0.55)_100%)]" />
                <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[rgba(255,107,138,0.22)] blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/70 blur-3xl" />

                <div className="relative flex items-start gap-4">
                  <div className="shrink-0 rounded-[22px] bg-white/60 p-3 sm:p-4 ring-1 ring-white/60 shadow-[0_14px_40px_rgba(17,24,39,0.10)]">
                    <div className="scale-[1.1] sm:scale-[1.15]">
                      <CardIcon name={c.icon} uid={`why-${idx}`} />
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-black tracking-tight text-[var(--mp-ink)]">
                      {c.title}
                    </div>
                    <div className="mt-2 text-sm sm:text-[15px] text-black/60 leading-relaxed">
                      {c.text}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
