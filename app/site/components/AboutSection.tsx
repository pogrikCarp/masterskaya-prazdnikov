"use client";

import React from 'react';
import { motion } from "framer-motion";
import Container from "./Container";
import { DEFAULT_HOME_CONTENT, STORY_SECTION, type HomeSectionContent } from "@/lib/home-content";

const FLOAT_DURATIONS = [2.8, 3.1];

const CardIcon = ({ icon, index }: { icon: string | null; index: number }) => (
  <motion.span
    aria-hidden
    initial={{ opacity: 0, y: 10, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
  >
    <motion.span
      className="inline-block"
      animate={{ y: [0, index % 2 === 0 ? -6 : -4, 0] }}
      transition={{
        duration: FLOAT_DURATIONS[index % FLOAT_DURATIONS.length],
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {icon || "✨"}
    </motion.span>
  </motion.span>
);

const AboutStructuredSection = ({
  section = DEFAULT_HOME_CONTENT[STORY_SECTION],
}: {
  section?: HomeSectionContent;
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative -mt-px w-full bg-[var(--mp-bg)] pb-6 sm:pb-8"
    >
      <Container className="max-w-[1800px] px-0 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h2 className="text-[34px] sm:text-[46px] font-black tracking-tight text-[var(--mp-ink)]">
            {section.title}
          </h2>
          {section.subtitle ? (
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-black/60">
              {section.subtitle}
            </p>
          ) : null}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.14,
                delayChildren: 0.12,
              },
            },
          }}
          className="mt-6 grid auto-rows-fr gap-5 md:grid-cols-2"
        >
          {(section.cards ?? []).map((card, idx) => (
            <motion.div
              key={`${card.title}-${idx}`}
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              className="h-full rounded-[22px] p-6 sm:p-7 ring-1 ring-black/10 shadow-[0_18px_50px_rgba(0,0,0,0.08)] bg-[linear-gradient(135deg,#f4dee1_0%,rgba(255,255,255,0.78)_55%,rgba(244,222,225,0.55)_100%)]"
            >
              <div className="flex items-center gap-3">
                <span className="text-[32px] leading-none">
                  <CardIcon icon={card.icon} index={idx} />
                </span>
                <h3 className="text-[26px] sm:text-[26px] font-black tracking-tight text-[var(--mp-ink)]">
                  {card.title}
                </h3>
              </div>

              <p className="mt-3 text-base sm:text-[17px] leading-relaxed text-black/60">
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default AboutStructuredSection;
