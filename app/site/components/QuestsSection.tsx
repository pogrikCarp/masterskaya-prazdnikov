"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "./Container";

const ease = [0.22, 1, 0.36, 1] as const;

type Quest = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  duration: number;
  minAge: number;
  popular: boolean;
  active: boolean;
};

export default function QuestsSection() {
  const reduceMotion = useReducedMotion();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuests() {
      try {
        const res = await fetch("/api/quests");
        if (res.ok) {
          const data = await res.json();
          setQuests(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching quests:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuests();
  }, []);

  return (
    <section id="quests" className="py-14">
      <Container className="max-w-[1320px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
              Квесты
            </h2>
            <p className="mt-3 text-sm sm:text-base text-black/60 max-w-2xl">
              Сюжетные игры с заданиями — вовлекают детей и держат темп.
            </p>
          </div>

          <Link
            href="/quests"
            className="group relative inline-flex h-14 sm:h-16 items-center justify-center gap-3 rounded-full px-8 sm:px-10 text-sm sm:text-[15px] font-semibold text-white bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.92)_0%,rgb(var(--mp-lavender-rgb)_/_0.72)_42%,rgba(255,107,138,0.90)_100%)] bg-[length:220%_220%] bg-[position:0%_50%] shadow-[0_24px_70px_rgba(17,24,39,0.18)] ring-1 ring-white/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_90px_rgba(17,24,39,0.22)] hover:bg-[position:100%_50%] active:translate-y-0"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.12)_28%,rgba(0,0,0,0.12)_100%)]" />
            <span className="pointer-events-none absolute -top-10 left-6 h-16 w-44 rotate-[18deg] rounded-full bg-white/30 blur-2xl transition-transform duration-500 group-hover:translate-x-10" />
            <span className="pointer-events-none absolute -inset-1 rounded-full bg-white/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative">Смотреть ещё</span>
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/18 ring-1 ring-white/30 transition-transform duration-300 group-hover:translate-x-0.5">
              <span className="text-lg leading-none">→</span>
            </span>
          </Link>
        </div>

        {loading ? (
          <div className="mt-10 flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[rgba(255,107,138,0.3)] border-t-[rgba(255,107,138,0.9)]" />
          </div>
        ) : quests.length === 0 ? (
          <div className="mt-10 text-center text-black/50">Нет квестов</div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quests.map((quest, idx) => (
              <motion.div
                key={quest.id}
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 54 }}
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={
                  reduceMotion ? { duration: 0 } : { duration: 0.85, ease, delay: idx * 0.08 }
                }
                className="group relative overflow-hidden rounded-[34px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] transition-all hover:shadow-[0_32px_100px_rgba(17,24,39,0.14)]"
              >
                <div className="absolute inset-0 opacity-90 bg-[linear-gradient(135deg,rgba(255,107,138,0.26)_0%,rgba(255,255,255,0.86)_55%,rgba(175,206,188,0.28)_100%)]" />
                <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[rgba(255,107,138,0.20)] blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/70 blur-3xl" />

                <div className="relative p-7">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-black/70 ring-1 ring-black/10">
                      от {quest.minAge}+ лет
                    </div>
                    {quest.popular && (
                      <div className="rounded-full bg-[rgba(255,107,138,0.85)] px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                        Хит
                      </div>
                    )}
                  </div>

                  <div className="mt-4 text-lg font-black tracking-tight text-[var(--mp-ink)] leading-tight">
                    {quest.name}
                  </div>

                  <div className="mt-4 rounded-[28px] bg-white/55 ring-1 ring-white/60 p-5">
                    <div className="relative aspect-[4/3] w-full rounded-[22px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.0)_62%),linear-gradient(135deg,rgba(255,107,138,0.18)_0%,rgba(175,206,188,0.16)_54%,rgb(var(--mp-lavender-rgb)_/_0.14)_100%)] ring-1 ring-black/5">
                      {quest.imageUrl ? (
                        <img
                          src={quest.imageUrl}
                          alt={quest.name}
                          className="absolute inset-0 w-full h-full object-cover rounded-[22px]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-black/20 text-4xl">
                          🎯
                        </div>
                      )}
                    </div>
                  </div>

                  {quest.description && (
                    <p className="mt-4 text-sm text-black/60 leading-relaxed">
                      {quest.description}
                    </p>
                  )}

                  <div className="mt-5 flex items-center justify-between">
                    <div className="text-sm text-black/60">{quest.duration} мин</div>
                    <div className="text-sm font-semibold text-[var(--mp-ink)]">
                      {quest.price.toLocaleString()} ₽
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
