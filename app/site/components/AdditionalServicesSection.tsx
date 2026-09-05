"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Container from "./Container";
import { ButtonLink } from "./Button";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    title: "Аквагрим",
    description: "Профессиональный аквагрим — любой образ от простого до сложного.",
    icon: "🎨",
  },
  {
    title: "Пригласительные для вашего праздника",
    description: "Красивый дизайн в стиле праздника — печатные или электронные.",
    icon: "💌",
    href: "#invitations",
  },
  {
    title: "Календарные праздники",
    description: "Сезонные программы: Новый год, Масленица, 8 Марта и другие даты.",
    icon: "🎉",
    href: "#seasonal-holidays",
  },
  {
    title: "Фигуры из шаров",
    description: "Твистинг — создаём фигуры из шаров: животные, цветы, мечи.",
    icon: "🎈",
  },
  {
    title: "Фотограф",
    description: "Репортажная съёмка праздника — живые эмоции и кадры.",
    icon: "📸",
  },
  {
    title: "Ведущий",
    description: "Профессиональный ведущий для программы любого формата.",
    icon: "🎤",
  },
];

export default function AdditionalServicesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="additional-services" className="py-14">
      <Container className="max-w-[1320px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
              Дополнительные услуги
            </h2>
            <p className="mt-3 text-sm sm:text-base text-black/60 max-w-2xl">
              Добавьте к празднику дополнительные опции — соберите идеальную программу под
              ваш бюджет.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={
                reduceMotion ? { duration: 0 } : { duration: 0.5, ease, delay: idx * 0.05 }
              }
            >
              <Link
                href={service.href ?? "/services"}
                className="mp-card-lift group block relative overflow-hidden rounded-[34px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] hover:shadow-[0_32px_100px_rgba(17,24,39,0.14)]"
              >
                <div className="absolute inset-0 opacity-90 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.34)_0%,rgba(255,255,255,0.86)_52%,rgba(214,249,239,0.48)_100%)]" />
                <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_0.22)] blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/70 blur-3xl" />

                <div className="relative p-7">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-white/70 ring-1 ring-black/10 text-3xl">
                    {service.icon}
                  </div>

                  <div className="mt-5 text-lg font-black tracking-tight text-[var(--mp-ink)] leading-tight">
                    {service.title}
                  </div>

                  <p className="mt-3 text-sm text-black/60 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="text-sm text-black/60">от 2 000 ₽</div>
                    <div className="text-sm font-semibold text-[var(--mp-ink)] group-hover:translate-x-[2px] transition-transform">
                      Подробнее
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <ButtonLink href="/services" variant="secondary" size="lg">
            Смотреть ещё
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
