"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useState } from "react";
import Container from "./Container";

import Among2 from "../../img/Among2.png";

function Mascot({
  variant,
  className,
  style,
}: {
  variant: "left" | "right";
  className?: string;
  style?: CSSProperties;
}) {
  const objectPosition = variant === "left" ? "left bottom" : "right bottom";

  return (
    <div
      className={["pointer-events-none", "will-change-transform", className ?? ""].join(" ")}
      style={style}
    >
      <div className="relative h-[clamp(150px,22vw,240px)] w-[clamp(170px,24vw,280px)] overflow-hidden">
        <Image
          src={Among2}
          alt=""
          aria-hidden="true"
          fill
          priority={false}
          sizes="(max-width: 640px) 200px, 280px"
          className="select-none"
          style={{
            objectFit: "cover",
            objectPosition,
            transform: "scale(1.12)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-black/25 to-transparent opacity-45" />
      </div>
    </div>
  );
}

export default function PeekabooWaveSection() {
  const [delays, setDelays] = useState({ left: 0, right: 0.9 });

  useEffect(() => {
    const left = Math.random() * 0.8;
    const right = 0.6 + Math.random() * 0.9;
    setDelays({ left, right });
  }, []);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgb(var(--mp-lavender-rgb)_/_0.22)_0%,rgba(125,211,252,0.10)_45%,rgba(255,255,255,0.96)_100%)]">
      <div className="absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_0.28)] blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#7DD3FC]/20 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[520px] w-[520px] translate-x-1/3 rounded-full bg-white/55 blur-3xl" />
      </div>

      <Container>
        <div className="relative py-16 sm:py-20 pb-32 sm:pb-36">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-black/70 ring-1 ring-black/10">
              Идеально для детских праздников
            </div>
            <h2 className="mt-4 text-[30px] leading-[1.05] sm:text-[40px] font-black tracking-tight text-[var(--mp-ink)]">
              Персонажи, декор и настроение —
              <span className="block">в одном стиле</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-black/60">
              Нежная палитра, аккуратная геометрия и «вау‑эффект» без перегруза.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { t: "Пастельные темы", d: "Лиловый, голубой, белый — мягко и современно." },
              { t: "Сценарии под возраст", d: "Подбираем интерактив и темп под детей." },
              { t: "Фото‑дружелюбно", d: "Красиво в кадре: свет, фон, реквизит." },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-[28px] bg-white/70 p-6 ring-1 ring-black/10 shadow-[0_18px_45px_rgba(17,24,39,0.08)]"
              >
                <div className="text-sm font-extrabold text-[var(--mp-ink)]">{c.t}</div>
                <div className="mt-2 text-sm text-black/60">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[240px]">
        <div className="absolute inset-x-0 bottom-0 h-[240px] z-10" aria-hidden="true">
          <svg viewBox="0 0 1440 220" className="block h-[240px] w-full" preserveAspectRatio="none">
            <path
              d="M0,112 C180,170 360,190 540,158 C720,126 840,70 1020,86 C1200,102 1290,170 1440,192 L1440,220 L0,220 Z"
              fill="rgba(255,255,255,0.96)"
            />
            <path
              d="M0,112 C180,170 360,190 540,158 C720,126 840,70 1020,86 C1200,102 1290,170 1440,192"
              fill="none"
              stroke="rgba(0,0,0,0.06)"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-0">
          <div className="relative mx-auto max-w-[1200px]">
            <Mascot
              variant="left"
              className="um2-float absolute -bottom-[28px] left-[max(10px,3vw)] drop-shadow-[0_18px_35px_rgba(17,24,39,0.18)]"
              style={
                { "--um2-delay": `${delays.left}s` } as React.CSSProperties
              }
            />
            <Mascot
              variant="right"
              className="um2-float um2-float-hi absolute -bottom-[26px] right-[max(10px,3vw)] drop-shadow-[0_18px_35px_rgba(17,24,39,0.18)]"
              style={
                { "--um2-delay": `${delays.right}s` } as React.CSSProperties
              }
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .um2-float {
          animation: um2-float 4.4s ease-in-out infinite;
          animation-delay: var(--um2-delay, 0s);
          will-change: transform;
        }

        .um2-float-hi {
          animation-name: um2-float-hi;
          animation-duration: 4.9s;
        }

        @keyframes um2-float {
          0% {
            transform: translateY(0);
          }
          45% {
            transform: translateY(-12px);
          }
          70% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes um2-float-hi {
          0% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-14px);
          }
          62% {
            transform: translateY(-22px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
