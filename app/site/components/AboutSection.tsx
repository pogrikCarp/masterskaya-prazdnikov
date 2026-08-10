import React from 'react';
import { motion } from "framer-motion";
import Container from "./Container";

// Пример простых иконок (можно заменить на react-icons или свои картинки)
const MagicIcon = () => (
  <motion.span
    aria-hidden
    initial={{ opacity: 0, y: 10, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    <motion.span
      className="inline-block"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    >
      ✨
    </motion.span>
  </motion.span>
);

const HeartIcon = () => (
  <motion.span
    aria-hidden
    initial={{ opacity: 0, y: 10, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
  >
    <motion.span
      className="inline-block"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
    >
      ❤️
    </motion.span>
  </motion.span>
);

const AboutStructuredSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative -mt-px w-full bg-[var(--mp-bg)] py-16 sm:py-20"
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
            Ваш праздник — наша история
          </h2>
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
          className="mt-12 grid gap-8 md:grid-cols-2"
        >
          {/* Блок 1: О миссии */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            className="rounded-[22px] p-8 ring-1 ring-black/10 shadow-[0_18px_50px_rgba(0,0,0,0.08)] bg-[linear-gradient(135deg,#f4dee1_0%,rgba(255,255,255,0.78)_55%,rgba(244,222,225,0.55)_100%)]"
          >
            <div className="flex items-center gap-3">
              <span className="text-[32px] leading-none">
                <MagicIcon />
              </span>
              <h3 className="text-[26px] sm:text-[26px] font-black tracking-tight text-[var(--mp-ink)]">
                Магия без хлопот
              </h3>
            </div>

            <p className="mt-4 text-lg sm:text-[19px] leading-relaxed text-black/60">
              В&nbsp;
              <span className="font-bold">«Мастерской праздника Орлихиной и Сергиенко»</span>
              &nbsp;мы не просто проводим праздники, а создаем историю, которая понравится именно вашему ребёнку. Наша цель — счастливый именинник и отдохнувшие родители, которые могут спокойно пообщаться, пока мы берем все заботы на себя.
            </p>
          </motion.div>

          {/* Блок 2: Об индивидуальном подходе */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            className="rounded-[22px] p-8 ring-1 ring-black/10 shadow-[0_18px_50px_rgba(0,0,0,0.08)] bg-[linear-gradient(135deg,#f4dee1_0%,rgba(255,255,255,0.78)_55%,rgba(244,222,225,0.55)_100%)]"
          >
            <div className="flex items-center gap-3">
              <span className="text-[32px] leading-none">
                <HeartIcon />
              </span>
              <h3 className="text-[26px] sm:text-[26px] font-black tracking-tight text-[var(--mp-ink)]">
                Индивидуальный подход
              </h3>
            </div>
            <p className="mt-4 text-lg sm:text-[19px] leading-relaxed text-black/60">
              В основе нашей работы — индивидуальный подход. Мы не используем шаблонные сценарии. Перед программой мы общаемся с Вами, чтобы узнать характер, интересы и особенности вашего ребенка. Это позволяет нам подобрать аниматора, который говорит с ребенком на одном языке, и создать сценарий, который вовлечет всех гостей.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default AboutStructuredSection;