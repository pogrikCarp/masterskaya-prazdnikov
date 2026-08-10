"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Container from "./Container";
import AnimatedBackground from "./AnimatedBackground";
import FloatingParticles from "./FloatingParticles";
import GlassHeader from "./GlassHeader";
import WaveDivider from "./WaveDivider";
import FoldSparkleButton from "./FoldSparkleButton";

import Among2 from "../../img/Among2.png";
import Logo from "../../img/mastprasnPOSLEDN.png";
import LogoForm from "../../img/logoformpng.png";

const ease = [0.22, 1, 0.36, 1] as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function HeroSection() {
  const leftMascotRef = useRef<HTMLDivElement | null>(null);
  const rightMascotRef = useRef<HTMLDivElement | null>(null);
  const giftRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const leftState = { x: 0, y: 0, r: 0 };
    const rightState = { x: 0, y: 0, r: 0 };
    const giftState = { x: 0, y: 0, r: 0 };

    let raf = 0;
    const start = performance.now();

    const tick = (t: number) => {
      const time = (t - start) / 1000;
      const radius = 240;

      const apply = (
        el: HTMLDivElement | null,
        phase: number,
        state: { x: number; y: number; r: number }
      ) => {
        if (!el) return;

        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mouse.x - cx;
        const dy = mouse.y - cy;
        const dist = Math.hypot(dx, dy);

        const p0 = clamp(1 - dist / radius, 0, 1);
        const p = p0 * p0 * (3 - 2 * p0);

        const amp = 4.2 * p;
        const rotAmp = 1.6 * p;

        const jxT = amp * Math.sin(time * 9 + phase);
        const jyT = amp * 0.65 * Math.cos(time * 10.5 + phase * 1.7);
        const rrT = rotAmp * Math.sin(time * 8.5 + phase * 2.3);

        const smooth = 0.12;
        state.x = lerp(state.x, jxT, smooth);
        state.y = lerp(state.y, jyT, smooth);
        state.r = lerp(state.r, rrT, smooth);

        el.style.transform = `translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px, 0) rotate(${state.r.toFixed(2)}deg)`;
      };

      apply(leftMascotRef.current, 0.7, leftState);
      apply(rightMascotRef.current, 1.9, rightState);

      const applyGift = (
        el: HTMLDivElement | null,
        phase: number,
        state: { x: number; y: number; r: number }
      ) => {
        if (!el) return;

        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mouse.x - cx;
        const dy = mouse.y - cy;
        const dist = Math.hypot(dx, dy);

        const giftRadius = 260;
        const p0 = clamp(1 - dist / giftRadius, 0, 1);
        const p = p0 * p0 * (3 - 2 * p0);

        const amp = 3.2 * p;
        const rotAmp = 1.2 * p;

        const jxT = amp * Math.sin(time * 9.4 + phase);
        const jyT = amp * 0.62 * Math.cos(time * 10.1 + phase * 1.4);
        const rrT = rotAmp * Math.sin(time * 8.2 + phase * 2.1);

        const smooth = 0.12;
        state.x = lerp(state.x, jxT, smooth);
        state.y = lerp(state.y, jyT, smooth);
        state.r = lerp(state.r, rrT, smooth);

        el.style.transform = `translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px, 0) rotate(${state.r.toFixed(2)}deg)`;
      };

      applyGift(giftRef.current, 2.8, giftState);

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      <AnimatedBackground />
      <FloatingParticles />
      <GlassHeader />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="hero-balloon hero-balloon-left"
            style={{
              top: "22%",
              left: "max(18px,3.2vw)",
              width: "clamp(24px,3.1vw,44px)",
              height: "clamp(32px,4.1vw,58px)",
              animationDelay: "0s",
              animationDuration: "13s",
            }}
          />
          <div
            className="hero-balloon hero-balloon-left"
            style={{
              top: "42%",
              left: "max(26px,3.8vw)",
              width: "clamp(18px,2.6vw,36px)",
              height: "clamp(24px,3.5vw,50px)",
              opacity: 0.85,
              animationDelay: "2.2s",
              animationDuration: "15s",
            }}
          />
          <div
            className="hero-balloon hero-balloon-left"
            style={{
              top: "62%",
              left: "max(14px,2.8vw)",
              width: "clamp(20px,2.8vw,40px)",
              height: "clamp(28px,3.8vw,54px)",
              opacity: 0.8,
              animationDelay: "5.6s",
              animationDuration: "16.5s",
            }}
          />
          <div
            className="hero-balloon hero-balloon-left"
            style={{
              top: "78%",
              left: "max(28px,4.2vw)",
              width: "clamp(16px,2.3vw,34px)",
              height: "clamp(22px,3.1vw,46px)",
              opacity: 0.75,
              animationDelay: "8.2s",
              animationDuration: "18s",
            }}
          />

          <div
            className="hero-balloon hero-balloon-right"
            style={{
              top: "26%",
              right: "max(18px,3.2vw)",
              width: "clamp(24px,3.1vw,44px)",
              height: "clamp(32px,4.1vw,58px)",
              animationDelay: "1.1s",
              animationDuration: "13.5s",
            }}
          />
          <div
            className="hero-balloon hero-balloon-right"
            style={{
              top: "46%",
              right: "max(26px,3.8vw)",
              width: "clamp(18px,2.6vw,36px)",
              height: "clamp(24px,3.5vw,50px)",
              opacity: 0.85,
              animationDelay: "3.4s",
              animationDuration: "15.5s",
            }}
          />
          <div
            className="hero-balloon hero-balloon-right"
            style={{
              top: "66%",
              right: "max(14px,2.8vw)",
              width: "clamp(20px,2.8vw,40px)",
              height: "clamp(28px,3.8vw,54px)",
              opacity: 0.8,
              animationDelay: "6.3s",
              animationDuration: "17s",
            }}
          />
          <div
            className="hero-balloon hero-balloon-right"
            style={{
              top: "80%",
              right: "max(28px,4.2vw)",
              width: "clamp(16px,2.3vw,34px)",
              height: "clamp(22px,3.1vw,46px)",
              opacity: 0.75,
              animationDelay: "9.1s",
              animationDuration: "18.5s",
            }}
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden hidden lg:block"
      >
        <div className="hero-butterfly-layer absolute inset-0">
          <div className="hero-butterfly hero-butterfly-1">
            <svg
              viewBox="0 0 64 48"
              className="hero-butterfly-svg"
              role="presentation"
              aria-hidden="true"
            >
              <g className="hero-butterfly-flap">
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-left"
                  d="M30 24 C16 10 6 10 6 24 C6 36 18 38 30 28 Z"
                />
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-right"
                  d="M34 24 C48 10 58 10 58 24 C58 36 46 38 34 28 Z"
                />
              </g>
              <path
                className="hero-butterfly-body"
                d="M32 12 C30 14 30 18 31 24 C30 30 30 34 32 36 C34 34 34 30 33 24 C34 18 34 14 32 12 Z"
              />
              <path
                className="hero-butterfly-antenna"
                d="M31 12 C27 9 25 8 22 8"
              />
              <path
                className="hero-butterfly-antenna"
                d="M33 12 C37 9 39 8 42 8"
              />
            </svg>
          </div>

          <div className="hero-butterfly hero-butterfly-2">
            <svg
              viewBox="0 0 64 48"
              className="hero-butterfly-svg"
              role="presentation"
              aria-hidden="true"
            >
              <g className="hero-butterfly-flap">
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-left"
                  d="M30 24 C16 10 6 10 6 24 C6 36 18 38 30 28 Z"
                />
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-right"
                  d="M34 24 C48 10 58 10 58 24 C58 36 46 38 34 28 Z"
                />
              </g>
              <path
                className="hero-butterfly-body"
                d="M32 12 C30 14 30 18 31 24 C30 30 30 34 32 36 C34 34 34 30 33 24 C34 18 34 14 32 12 Z"
              />
              <path
                className="hero-butterfly-antenna"
                d="M31 12 C27 9 25 8 22 8"
              />
              <path
                className="hero-butterfly-antenna"
                d="M33 12 C37 9 39 8 42 8"
              />
            </svg>
          </div>

          <div className="hero-butterfly hero-butterfly-3">
            <svg
              viewBox="0 0 64 48"
              className="hero-butterfly-svg"
              role="presentation"
              aria-hidden="true"
            >
              <g className="hero-butterfly-flap">
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-left"
                  d="M30 24 C16 10 6 10 6 24 C6 36 18 38 30 28 Z"
                />
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-right"
                  d="M34 24 C48 10 58 10 58 24 C58 36 46 38 34 28 Z"
                />
              </g>
              <path
                className="hero-butterfly-body"
                d="M32 12 C30 14 30 18 31 24 C30 30 30 34 32 36 C34 34 34 30 33 24 C34 18 34 14 32 12 Z"
              />
              <path
                className="hero-butterfly-antenna"
                d="M31 12 C27 9 25 8 22 8"
              />
              <path
                className="hero-butterfly-antenna"
                d="M33 12 C37 9 39 8 42 8"
              />
            </svg>
          </div>

          <div className="hero-butterfly hero-butterfly-4">
            <svg
              viewBox="0 0 64 48"
              className="hero-butterfly-svg"
              role="presentation"
              aria-hidden="true"
            >
              <g className="hero-butterfly-flap">
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-left"
                  d="M30 24 C16 10 6 10 6 24 C6 36 18 38 30 28 Z"
                />
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-right"
                  d="M34 24 C48 10 58 10 58 24 C58 36 46 38 34 28 Z"
                />
              </g>
              <path
                className="hero-butterfly-body"
                d="M32 12 C30 14 30 18 31 24 C30 30 30 34 32 36 C34 34 34 30 33 24 C34 18 34 14 32 12 Z"
              />
              <path className="hero-butterfly-antenna" d="M31 12 C27 9 25 8 22 8" />
              <path className="hero-butterfly-antenna" d="M33 12 C37 9 39 8 42 8" />
            </svg>
          </div>

          <div className="hero-butterfly hero-butterfly-5">
            <svg
              viewBox="0 0 64 48"
              className="hero-butterfly-svg"
              role="presentation"
              aria-hidden="true"
            >
              <g className="hero-butterfly-flap">
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-left"
                  d="M30 24 C16 10 6 10 6 24 C6 36 18 38 30 28 Z"
                />
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-right"
                  d="M34 24 C48 10 58 10 58 24 C58 36 46 38 34 28 Z"
                />
              </g>
              <path
                className="hero-butterfly-body"
                d="M32 12 C30 14 30 18 31 24 C30 30 30 34 32 36 C34 34 34 30 33 24 C34 18 34 14 32 12 Z"
              />
              <path className="hero-butterfly-antenna" d="M31 12 C27 9 25 8 22 8" />
              <path className="hero-butterfly-antenna" d="M33 12 C37 9 39 8 42 8" />
            </svg>
          </div>

          <div className="hero-butterfly hero-butterfly-6">
            <svg
              viewBox="0 0 64 48"
              className="hero-butterfly-svg"
              role="presentation"
              aria-hidden="true"
            >
              <g className="hero-butterfly-flap">
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-left"
                  d="M30 24 C16 10 6 10 6 24 C6 36 18 38 30 28 Z"
                />
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-right"
                  d="M34 24 C48 10 58 10 58 24 C58 36 46 38 34 28 Z"
                />
              </g>
              <path
                className="hero-butterfly-body"
                d="M32 12 C30 14 30 18 31 24 C30 30 30 34 32 36 C34 34 34 30 33 24 C34 18 34 14 32 12 Z"
              />
              <path className="hero-butterfly-antenna" d="M31 12 C27 9 25 8 22 8" />
              <path className="hero-butterfly-antenna" d="M33 12 C37 9 39 8 42 8" />
            </svg>
          </div>

          <div className="hero-butterfly hero-butterfly-7">
            <svg
              viewBox="0 0 64 48"
              className="hero-butterfly-svg"
              role="presentation"
              aria-hidden="true"
            >
              <g className="hero-butterfly-flap">
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-left"
                  d="M30 24 C16 10 6 10 6 24 C6 36 18 38 30 28 Z"
                />
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-right"
                  d="M34 24 C48 10 58 10 58 24 C58 36 46 38 34 28 Z"
                />
              </g>
              <path
                className="hero-butterfly-body"
                d="M32 12 C30 14 30 18 31 24 C30 30 30 34 32 36 C34 34 34 30 33 24 C34 18 34 14 32 12 Z"
              />
              <path className="hero-butterfly-antenna" d="M31 12 C27 9 25 8 22 8" />
              <path className="hero-butterfly-antenna" d="M33 12 C37 9 39 8 42 8" />
            </svg>
          </div>
        </div>

        <div className="hero-butterfly-layer hero-butterfly-layer-mirror absolute inset-0">
          <div className="hero-butterfly hero-butterfly-1">
            <svg
              viewBox="0 0 64 48"
              className="hero-butterfly-svg"
              role="presentation"
              aria-hidden="true"
            >
              <g className="hero-butterfly-flap">
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-left"
                  d="M30 24 C16 10 6 10 6 24 C6 36 18 38 30 28 Z"
                />
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-right"
                  d="M34 24 C48 10 58 10 58 24 C58 36 46 38 34 28 Z"
                />
              </g>
              <path
                className="hero-butterfly-body"
                d="M32 12 C30 14 30 18 31 24 C30 30 30 34 32 36 C34 34 34 30 33 24 C34 18 34 14 32 12 Z"
              />
              <path className="hero-butterfly-antenna" d="M31 12 C27 9 25 8 22 8" />
              <path className="hero-butterfly-antenna" d="M33 12 C37 9 39 8 42 8" />
            </svg>
          </div>

          <div className="hero-butterfly hero-butterfly-2">
            <svg
              viewBox="0 0 64 48"
              className="hero-butterfly-svg"
              role="presentation"
              aria-hidden="true"
            >
              <g className="hero-butterfly-flap">
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-left"
                  d="M30 24 C16 10 6 10 6 24 C6 36 18 38 30 28 Z"
                />
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-right"
                  d="M34 24 C48 10 58 10 58 24 C58 36 46 38 34 28 Z"
                />
              </g>
              <path
                className="hero-butterfly-body"
                d="M32 12 C30 14 30 18 31 24 C30 30 30 34 32 36 C34 34 34 30 33 24 C34 18 34 14 32 12 Z"
              />
              <path className="hero-butterfly-antenna" d="M31 12 C27 9 25 8 22 8" />
              <path className="hero-butterfly-antenna" d="M33 12 C37 9 39 8 42 8" />
            </svg>
          </div>

          <div className="hero-butterfly hero-butterfly-3">
            <svg
              viewBox="0 0 64 48"
              className="hero-butterfly-svg"
              role="presentation"
              aria-hidden="true"
            >
              <g className="hero-butterfly-flap">
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-left"
                  d="M30 24 C16 10 6 10 6 24 C6 36 18 38 30 28 Z"
                />
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-right"
                  d="M34 24 C48 10 58 10 58 24 C58 36 46 38 34 28 Z"
                />
              </g>
              <path
                className="hero-butterfly-body"
                d="M32 12 C30 14 30 18 31 24 C30 30 30 34 32 36 C34 34 34 30 33 24 C34 18 34 14 32 12 Z"
              />
              <path className="hero-butterfly-antenna" d="M31 12 C27 9 25 8 22 8" />
              <path className="hero-butterfly-antenna" d="M33 12 C37 9 39 8 42 8" />
            </svg>
          </div>

          <div className="hero-butterfly hero-butterfly-4">
            <svg
              viewBox="0 0 64 48"
              className="hero-butterfly-svg"
              role="presentation"
              aria-hidden="true"
            >
              <g className="hero-butterfly-flap">
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-left"
                  d="M30 24 C16 10 6 10 6 24 C6 36 18 38 30 28 Z"
                />
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-right"
                  d="M34 24 C48 10 58 10 58 24 C58 36 46 38 34 28 Z"
                />
              </g>
              <path
                className="hero-butterfly-body"
                d="M32 12 C30 14 30 18 31 24 C30 30 30 34 32 36 C34 34 34 30 33 24 C34 18 34 14 32 12 Z"
              />
              <path className="hero-butterfly-antenna" d="M31 12 C27 9 25 8 22 8" />
              <path className="hero-butterfly-antenna" d="M33 12 C37 9 39 8 42 8" />
            </svg>
          </div>

          <div className="hero-butterfly hero-butterfly-5">
            <svg
              viewBox="0 0 64 48"
              className="hero-butterfly-svg"
              role="presentation"
              aria-hidden="true"
            >
              <g className="hero-butterfly-flap">
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-left"
                  d="M30 24 C16 10 6 10 6 24 C6 36 18 38 30 28 Z"
                />
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-right"
                  d="M34 24 C48 10 58 10 58 24 C58 36 46 38 34 28 Z"
                />
              </g>
              <path
                className="hero-butterfly-body"
                d="M32 12 C30 14 30 18 31 24 C30 30 30 34 32 36 C34 34 34 30 33 24 C34 18 34 14 32 12 Z"
              />
              <path className="hero-butterfly-antenna" d="M31 12 C27 9 25 8 22 8" />
              <path className="hero-butterfly-antenna" d="M33 12 C37 9 39 8 42 8" />
            </svg>
          </div>

          <div className="hero-butterfly hero-butterfly-6">
            <svg
              viewBox="0 0 64 48"
              className="hero-butterfly-svg"
              role="presentation"
              aria-hidden="true"
            >
              <g className="hero-butterfly-flap">
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-left"
                  d="M30 24 C16 10 6 10 6 24 C6 36 18 38 30 28 Z"
                />
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-right"
                  d="M34 24 C48 10 58 10 58 24 C58 36 46 38 34 28 Z"
                />
              </g>
              <path
                className="hero-butterfly-body"
                d="M32 12 C30 14 30 18 31 24 C30 30 30 34 32 36 C34 34 34 30 33 24 C34 18 34 14 32 12 Z"
              />
              <path className="hero-butterfly-antenna" d="M31 12 C27 9 25 8 22 8" />
              <path className="hero-butterfly-antenna" d="M33 12 C37 9 39 8 42 8" />
            </svg>
          </div>

          <div className="hero-butterfly hero-butterfly-7">
            <svg
              viewBox="0 0 64 48"
              className="hero-butterfly-svg"
              role="presentation"
              aria-hidden="true"
            >
              <g className="hero-butterfly-flap">
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-left"
                  d="M30 24 C16 10 6 10 6 24 C6 36 18 38 30 28 Z"
                />
                <path
                  className="hero-butterfly-wing hero-butterfly-wing-right"
                  d="M34 24 C48 10 58 10 58 24 C58 36 46 38 34 28 Z"
                />
              </g>
              <path
                className="hero-butterfly-body"
                d="M32 12 C30 14 30 18 31 24 C30 30 30 34 32 36 C34 34 34 30 33 24 C34 18 34 14 32 12 Z"
              />
              <path className="hero-butterfly-antenna" d="M31 12 C27 9 25 8 22 8" />
              <path className="hero-butterfly-antenna" d="M33 12 C37 9 39 8 42 8" />
            </svg>
          </div>
        </div>

        <div className="hero-gift">
          <div className="hero-gift-tilt">
            <div ref={giftRef} className="hero-gift-jitter">
              <div className="hero-gift-float">
                <div className="hero-gift-clip">
                  <svg
                    viewBox="0 0 300 300"
                    className="hero-gift-svg"
                    role="presentation"
                    aria-hidden="true"
                  >
                  <defs>
                    <linearGradient id="giftBox" x1="40" y1="110" x2="260" y2="270" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="rgb(var(--mp-lavender-rgb))" stopOpacity="0.35" />
                      <stop offset="0.52" stopColor="rgb(var(--mp-lavender-rgb))" stopOpacity="0.75" />
                      <stop offset="1" stopColor="rgb(var(--mp-lavender-rgb))" stopOpacity="0.92" />
                    </linearGradient>
                    <linearGradient id="giftLid" x1="50" y1="70" x2="250" y2="150" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="rgb(var(--mp-lavender-rgb))" stopOpacity="0.22" />
                      <stop offset="0.55" stopColor="rgb(var(--mp-lavender-rgb))" stopOpacity="0.6" />
                      <stop offset="1" stopColor="rgb(var(--mp-lavender-rgb))" stopOpacity="0.86" />
                    </linearGradient>
                    <linearGradient id="giftRibbon" x1="150" y1="50" x2="150" y2="270" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#FFE39A" />
                      <stop offset="0.45" stopColor="#FFB84D" />
                      <stop offset="1" stopColor="#FF79B6" />
                    </linearGradient>
                    <radialGradient id="giftGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(110 140) rotate(40) scale(190 150)">
                      <stop offset="0" stopColor="rgba(255,255,255,0.42)" />
                      <stop offset="0.55" stopColor="rgba(255,255,255,0.12)" />
                      <stop offset="1" stopColor="rgba(255,255,255,0)" />
                    </radialGradient>
                    <radialGradient id="giftBloom" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(150 190) rotate(90) scale(170 170)">
                      <stop offset="0" stopColor="rgba(255,255,255,0.22)" />
                      <stop offset="0.5" stopColor="rgba(255, 214, 90, 0.10)" />
                      <stop offset="1" stopColor="rgba(255,255,255,0)" />
                    </radialGradient>
                    <filter id="giftShadow" x="-20%" y="-20%" width="140%" height="160%" colorInterpolationFilters="sRGB">
                      <feDropShadow dx="0" dy="24" stdDeviation="20" floodColor="rgba(17,24,39,0.25)" />
                      <feDropShadow dx="0" dy="0" stdDeviation="18" floodColor="rgba(255,255,255,0.12)" />
                    </filter>
                    <filter id="giftBloomBlur" x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
                      <feGaussianBlur stdDeviation="10" />
                    </filter>
                  </defs>

                  <g filter="url(#giftShadow)">
                    <ellipse
                      cx="150"
                      cy="210"
                      rx="108"
                      ry="86"
                      fill="url(#giftBloom)"
                      opacity="0.9"
                      filter="url(#giftBloomBlur)"
                    />
                    <path
                      d="M64 132 C64 121 73 112 84 112 H216 C227 112 236 121 236 132 V238 C236 250 227 260 216 260 H84 C73 260 64 250 64 238 Z"
                      fill="url(#giftBox)"
                    />
                    <path
                      d="M56 104 C56 92 66 82 78 82 H222 C234 82 244 92 244 104 V136 H56 Z"
                      fill="url(#giftLid)"
                    />

                    <path
                      d="M141 82 H159 V136 H141 Z"
                      fill="url(#giftRibbon)"
                      opacity="0.96"
                    />

                    <path
                      d="M98 78 C86 64 92 46 110 44 C126 42 139 52 150 66 C161 52 174 42 190 44 C208 46 214 64 202 78 C188 96 165 96 150 84 C135 96 112 96 98 78 Z"
                      fill="url(#giftRibbon)"
                    />
                    <circle cx="150" cy="78" r="10" fill="rgba(255,255,255,0.52)" />

                    <path
                      d="M64 132 C64 121 73 112 84 112 H216 C227 112 236 121 236 132 V238 C236 250 227 260 216 260 H84 C73 260 64 250 64 238 Z"
                      fill="url(#giftGlow)"
                      opacity="0.9"
                    />
                  </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
      >
        <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          <div className="hero-top-mascot hero-top-float-left absolute top-[252px] left-[calc(max(8px,2vw)-220px)] h-[clamp(92px,12vw,140px)] w-[clamp(200px,24vw,300px)] opacity-70">
            <div className="hero-top-float-layer h-full w-full">
              <div className="hero-top-tilt-left h-full w-full">
                <div ref={leftMascotRef} className="hero-top-jitter h-full w-full">
                  <div className="hero-top-mirror h-full w-full">
                    <Image
                      src={Among2}
                      alt=""
                      aria-hidden="true"
                      fill
                      priority
                      sizes="(min-width: 1024px) 300px, 200px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-top-mascot hero-top-float absolute top-[92px] right-[calc(max(8px,2vw)-160px)] h-[clamp(92px,12vw,140px)] w-[clamp(200px,24vw,300px)] opacity-70">
            <div className="hero-top-float-layer h-full w-full">
              <div ref={rightMascotRef} className="hero-top-jitter h-full w-full">
                <Image
                  src={Among2}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 640px) 240px, 300px"
                  className="select-none"
                  style={{ objectFit: "contain", objectPosition: "center" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Container>
        <div className="relative pt-14 pb-28 sm:pt-16 sm:pb-32 lg:pt-20 lg:pb-40">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease }}
              className="hidden"
            >
              <motion.span
                whileHover={{ rotate: -12 }}
                transition={{ duration: 0.18, ease }}
                className="group relative inline-block h-[clamp(192px,24vw,320px)] w-[clamp(192px,24vw,320px)] shrink-0"
              >
                <motion.span
                  whileHover={{ x: [0, -3, 3, -2, 2, 0], y: [0, 1, -1, 1, -1, 0] }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0"
                />

                <div
                  className="hero-logo-fireworks pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <div className="hero-firework hero-logo-firework-1">
                    <span className="hero-firework-core" />
                    <span className="hero-firework-spark hero-firework-spark-1" />
                    <span className="hero-firework-spark hero-firework-spark-2" />
                    <span className="hero-firework-spark hero-firework-spark-3" />
                    <span className="hero-firework-spark hero-firework-spark-4" />
                  </div>

                  <div className="hero-firework hero-logo-firework-2">
                    <span className="hero-firework-core" />
                    <span className="hero-firework-spark hero-firework-spark-1" />
                    <span className="hero-firework-spark hero-firework-spark-2" />
                    <span className="hero-firework-spark hero-firework-spark-3" />
                  </div>
                </div>

                <Image
                  src={Logo}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 256px, 192px"
                  className="select-none object-contain object-bottom"
                />
              </motion.span>
            </motion.div>

            <div className="relative">
              <Image
                src={LogoForm}
                alt=""
                aria-hidden="true"
                width={112}
                height={112}
                className="pointer-events-none absolute left-[calc(50%-390px)] top-0 hidden h-28 w-28 -translate-y-[8%] object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.25)] lg:block"
                priority
              />

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.08 }}
                className="mt-2 text-[42px] leading-[1.02] font-extrabold tracking-tight text-white sm:text-[64px]"
              >
                Подарите ребенку сказку,
                <br />
                <span>а себе — отдых</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.14 }}
              className="mt-5 max-w-2xl mx-auto text-[17px] text-white/80 sm:text-xl"
            >
              Индивидуальные сценарии под психотип и особенности характера ребенка
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.18 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
            >
              <FoldSparkleButton
                label="Подобрать программу"
                onClick={() => {
                  document
                    .getElementById("service-builder")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.22 }}
              className="mt-12 mx-auto grid w-full max-w-[560px] grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div className="rounded-[22px] bg-white/10 ring-1 ring-white/20 p-5">
                <div className="text-lg font-extrabold text-white">5,0</div>
                <div className="mt-1 text-sm text-white/70">средняя оценка по отзывам</div>
              </div>

              <div className="rounded-[22px] bg-white/10 ring-1 ring-white/20 p-5">
                <div className="text-lg font-extrabold text-white">24/7</div>
                <div className="mt-1 text-sm text-white/70">поддержка до и после праздника</div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      <WaveDivider />

      <style jsx>{`
        .hero-balloon {
          position: absolute;
          border-radius: 9999px;
          background: radial-gradient(
              12px 18px at 30% 26%,
              rgba(255, 255, 255, 0.85) 0%,
              rgba(255, 255, 255, 0.25) 28%,
              rgba(255, 255, 255, 0) 58%
            ),
            radial-gradient(
              120% 120% at 30% 20%,
              rgba(255, 214, 90, 0.95) 0%,
              rgba(255, 173, 205, 0.52) 38%,
              rgba(154, 210, 255, 0.38) 72%,
              rgba(255, 255, 255, 0.18) 100%
            );
          box-shadow:
            0 16px 40px rgba(17, 24, 39, 0.14),
            inset 0 0 0 1px rgba(255, 255, 255, 0.35);
          opacity: 0.9;
          will-change: transform, opacity;
        }

        .hero-balloon::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 100%;
          width: 1px;
          height: 46px;
          transform: translateX(-50%);
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.22),
            rgba(255, 255, 255, 0)
          );
          opacity: 0.9;
        }

        .hero-balloon-left {
          animation-name: hero-balloon-left;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .hero-balloon-right {
          animation-name: hero-balloon-right;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes hero-balloon-left {
          0% {
            transform: translate3d(-26px, 44px, 0) rotate(-2deg);
            opacity: 0;
          }
          18% {
            transform: translate3d(0px, 0px, 0) rotate(1deg);
            opacity: 0.92;
          }
          100% {
            transform: translate3d(14px, -280px, 0) rotate(4deg);
            opacity: 0;
          }
        }

        @keyframes hero-balloon-right {
          0% {
            transform: translate3d(26px, 44px, 0) rotate(2deg);
            opacity: 0;
          }
          18% {
            transform: translate3d(0px, 0px, 0) rotate(-1deg);
            opacity: 0.92;
          }
          100% {
            transform: translate3d(-14px, -280px, 0) rotate(-4deg);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-balloon-left,
          .hero-balloon-right {
            animation: none !important;
            opacity: 0.35;
            transform: none !important;
          }
        }

        .hero-radio-dot {
          position: relative;
        }

        .hero-radio-dot::before,
        .hero-radio-dot::after {
          content: "";
          position: absolute;
          inset: 50%;
          width: 6px;
          height: 6px;
          transform: translate(-50%, -50%) scale(1);
          border-radius: 9999px;
          border: 2px solid rgba(34, 197, 94, 0.55);
          opacity: 0;
          animation: hero-radio-wave 2.1s ease-out infinite;
          will-change: transform, opacity;
          pointer-events: none;
        }

        .hero-radio-dot::after {
          animation-delay: 0.9s;
          border-color: rgba(34, 197, 94, 0.42);
        }

        @keyframes hero-radio-wave {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.0;
          }
          12% {
            opacity: 0.9;
          }
          100% {
            transform: translate(-50%, -50%) scale(6.2);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-radio-dot::before,
          .hero-radio-dot::after {
            animation: none !important;
          }
        }

        .hero-butterfly {
          position: absolute;
          right: 70px;
          top: 140px;
          width: 18px;
          height: 18px;
          opacity: 0.92;
          filter:
            drop-shadow(0 16px 26px rgba(17, 24, 39, 0.18))
            drop-shadow(0 0 22px rgba(255, 255, 255, 0.16));
          will-change: transform, opacity;
          transform: translate3d(0, 0, 0);
          offset-path: path(
            "M 0 0 C 220 10 320 170 160 260 C 30 330 60 460 240 540 C 400 612 330 760 120 860"
          );
          offset-rotate: auto;
          animation: hero-butterfly-flight var(--bf-dur, 12s)
            cubic-bezier(0.22, 1, 0.36, 1) infinite;
          animation-delay: var(--bf-delay, 0s);
        }

        .hero-butterfly-layer {
          transform: translate3d(-380px, 0, 0);
          will-change: transform;
        }

        .hero-butterfly-layer-mirror {
          transform: translate3d(120px, 0, 0) scaleX(-1);
          opacity: 0.92;
          will-change: transform;
        }

        .hero-gift {
          position: absolute;
          right: 470px;
          top: 42%;
          width: 210px;
          height: 210px;
          opacity: 0.96;
          filter:
            drop-shadow(0 24px 60px rgba(17, 24, 39, 0.18))
            drop-shadow(0 0 40px rgba(255, 255, 255, 0.14));
          will-change: transform, opacity;
        }

        @media (max-width: 1024px) {
          .hero-butterfly {
            right: 22px;
            top: 96px;
            opacity: 0.75;
          }

          .hero-butterfly-layer {
            transform: translate3d(-260px, 0, 0);
          }

          .hero-butterfly-layer-mirror {
            transform: translate3d(80px, 0, 0) scaleX(-1);
          }

          .hero-gift {
            right: clamp(18px, 6vw, 90px);
            top: 52%;
            width: clamp(140px, 18vw, 190px);
            height: clamp(140px, 18vw, 190px);
            opacity: 0.88;
          }
        }

        @media (max-width: 768px) {
          .hero-butterfly {
            display: none;
          }

          .hero-gift {
            right: 16px;
            top: 58%;
            width: 150px;
            height: 150px;
          }
        }

        @media (max-width: 480px) {
          .hero-gift {
            display: none;
          }
        }

        .hero-gift-float {
          position: absolute;
          inset: 0;
          animation: hero-gift-float 6.8s ease-in-out infinite;
          will-change: transform;
        }

        .hero-gift-jitter {
          position: absolute;
          inset: 0;
          will-change: transform;
        }

        .hero-gift-tilt {
          position: absolute;
          inset: 0;
          transform: rotate(45deg);
          transform-origin: 50% 55%;
          will-change: transform;
        }

        .hero-gift-clip {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 26px;
          overflow: hidden;
          clip-path: inset(0 0 0 0 round 26px);
          background: transparent;
          transform: translate3d(0, 0, 0);
        }

        .hero-gift-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        @keyframes hero-gift-float {
          0% {
            transform: translate3d(0px, 0px, 0) rotate(1.2deg) scale(1);
          }
          50% {
            transform: translate3d(10px, -18px, 0) rotate(-2.4deg) scale(1.02);
          }
          100% {
            transform: translate3d(0px, 0px, 0) rotate(1.2deg) scale(1);
          }
        }

        .hero-fireworks-layer {
          pointer-events: none;
          will-change: transform, opacity;
        }

        .hero-logo-fireworks {
          will-change: opacity;
          transform: translate3d(-14px, 6px, 0) scale(1.5);
          transform-origin: 50% 50%;
        }

        .hero-firework {
          position: absolute;
          left: 220px;
          top: 62%;
          width: 1px;
          height: 1px;
          transform: translate3d(0, 0, 0);
          opacity: 0;
          animation: hero-firework-burst var(--fw-dur, 3.8s) ease-out infinite;
          animation-delay: var(--fw-delay, 0s);
          filter:
            drop-shadow(0 16px 30px rgba(17, 24, 39, 0.16))
            drop-shadow(0 0 26px rgba(255, 255, 255, 0.14));
        }

        .hero-firework::before,
        .hero-firework::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 140px;
          height: 140px;
          transform: translate(-50%, -50%) scale(0.65);
          border-radius: 9999px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.75) 0%,
            rgba(255, 214, 90, 0.25) 28%,
            rgba(154, 210, 255, 0.16) 44%,
            rgba(255, 173, 205, 0.08) 60%,
            rgba(255, 255, 255, 0) 72%
          );
          opacity: 0;
          will-change: transform, opacity;
        }

        .hero-firework::after {
          width: 220px;
          height: 220px;
          transform: translate(-50%, -50%) scale(0.5);
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.55) 0%,
            rgba(255, 214, 90, 0.18) 26%,
            rgba(255, 173, 205, 0.08) 48%,
            rgba(255, 255, 255, 0) 70%
          );
        }

        .hero-firework-1 {
          --fw-dur: 4.2s;
          --fw-delay: -0.6s;
          left: 200px;
          top: 66%;
        }

        .hero-firework-2 {
          --fw-dur: 5.1s;
          --fw-delay: -2.2s;
          left: 290px;
          top: 58%;
        }

        .hero-logo-firework-1 {
          --fw-dur: 2.8s;
          --fw-delay: -0.35s;
          left: 55%;
          top: 38%;
        }

        .hero-logo-firework-2 {
          --fw-dur: 3.2s;
          --fw-delay: -1.25s;
          left: 40%;
          top: 64%;
        }

        .hero-firework-core {
          position: absolute;
          left: 0;
          top: 0;
          width: 10px;
          height: 10px;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 214, 90, 0.55) 35%,
            rgba(255, 173, 205, 0.22) 62%,
            rgba(255, 255, 255, 0) 72%
          );
          opacity: 0.95;
        }

        .hero-firework-spark {
          position: absolute;
          left: 0;
          top: 0;
          width: 6px;
          height: 6px;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(154, 210, 255, 0.5) 35%,
            rgba(255, 255, 255, 0) 70%
          );
          opacity: 0.0;
          will-change: transform, opacity;
          animation: hero-firework-spark 0.9s ease-out infinite;
          animation-delay: calc(var(--fw-delay, 0s) + var(--sd, 0s));
        }

        .hero-firework-spark-1 {
          --sd: 0.08s;
        }
        .hero-firework-spark-2 {
          --sd: 0.18s;
        }
        .hero-firework-spark-3 {
          --sd: 0.3s;
        }
        .hero-firework-spark-4 {
          --sd: 0.42s;
        }

        @keyframes hero-firework-burst {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(0.72) rotate(-8deg);
          }
          12% {
            opacity: 1;
          }
          42% {
            opacity: 0.92;
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(1.25) rotate(8deg);
          }
        }

        @keyframes hero-firework-bloom {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.45);
          }
          14% {
            opacity: 0.92;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.15);
          }
        }

        .hero-firework::before {
          animation: hero-firework-bloom var(--fw-dur, 3.8s) ease-out infinite;
          animation-delay: var(--fw-delay, 0s);
        }

        .hero-firework::after {
          animation: hero-firework-bloom var(--fw-dur, 3.8s) ease-out infinite;
          animation-delay: calc(var(--fw-delay, 0s) + 0.08s);
        }

        @keyframes hero-firework-spark {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.6);
          }
          20% {
            opacity: 0.85;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2.8);
          }
        }

        .hero-butterfly-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .hero-butterfly-wing {
          fill: rgba(255, 255, 255, 0.72);
          stroke: rgba(255, 255, 255, 0.22);
          stroke-width: 1.2;
        }

        .hero-butterfly-body {
          fill: rgba(17, 24, 39, 0.28);
        }

        .hero-butterfly-antenna {
          fill: none;
          stroke: rgba(255, 255, 255, 0.32);
          stroke-width: 1.4;
          stroke-linecap: round;
        }

        .hero-butterfly-flap {
          transform-origin: 32px 24px;
          animation: hero-butterfly-flap 0.95s ease-in-out infinite;
        }

        .hero-butterfly-2 {
          --bf-dur: 14.5s;
          --bf-delay: -5.2s;
          width: 14px;
          height: 14px;
          opacity: 0.82;
          right: 120px;
          top: 175px;
          filter: drop-shadow(0 12px 18px rgba(17, 24, 39, 0.14));
        }

        .hero-butterfly-2 .hero-butterfly-flap {
          animation-duration: 1.05s;
        }

        .hero-butterfly-3 {
          --bf-dur: 16.2s;
          --bf-delay: -11.8s;
          width: 22px;
          height: 22px;
          opacity: 0.9;
          right: 46px;
          top: 205px;
          filter:
            drop-shadow(0 18px 30px rgba(17, 24, 39, 0.18))
            drop-shadow(0 0 26px rgba(255, 255, 255, 0.18));
        }

        .hero-butterfly-3 .hero-butterfly-flap {
          animation-duration: 0.88s;
        }

        .hero-butterfly-4 {
          --bf-dur: 13.2s;
          --bf-delay: -2.9s;
          width: 16px;
          height: 16px;
          opacity: 0.86;
          right: 96px;
          top: 130px;
          filter: drop-shadow(0 14px 22px rgba(17, 24, 39, 0.16));
        }

        .hero-butterfly-4 .hero-butterfly-flap {
          animation-duration: 0.98s;
        }

        .hero-butterfly-5 {
          --bf-dur: 17.8s;
          --bf-delay: -14.2s;
          width: 12px;
          height: 12px;
          opacity: 0.74;
          right: 84px;
          top: 230px;
          filter: drop-shadow(0 10px 16px rgba(17, 24, 39, 0.14));
        }

        .hero-butterfly-5 .hero-butterfly-flap {
          animation-duration: 1.12s;
        }

        .hero-butterfly-6 {
          --bf-dur: 15.4s;
          --bf-delay: -7.6s;
          width: 20px;
          height: 20px;
          opacity: 0.92;
          right: 32px;
          top: 158px;
          filter:
            drop-shadow(0 18px 28px rgba(17, 24, 39, 0.18))
            drop-shadow(0 0 22px rgba(255, 255, 255, 0.14));
        }

        .hero-butterfly-6 .hero-butterfly-flap {
          animation-duration: 0.9s;
        }

        .hero-butterfly-7 {
          --bf-dur: 19.2s;
          --bf-delay: -18.1s;
          width: 15px;
          height: 15px;
          opacity: 0.78;
          right: 140px;
          top: 212px;
          filter: drop-shadow(0 12px 20px rgba(17, 24, 39, 0.15));
        }

        .hero-butterfly-7 .hero-butterfly-flap {
          animation-duration: 1.06s;
        }

        @keyframes hero-butterfly-flight {
          0% {
            offset-distance: 0%;
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(0.96);
          }
          10% {
            opacity: 0.92;
          }
          55% {
            opacity: 0.98;
          }
          100% {
            offset-distance: 100%;
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(1.06);
          }
        }

        @keyframes hero-butterfly-flap {
          0% {
            transform: scaleY(1) rotate(0deg);
          }
          50% {
            transform: scaleY(0.82) rotate(1.4deg);
          }
          100% {
            transform: scaleY(1) rotate(0deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-butterfly,
          .hero-butterfly-flap {
            animation: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-firework,
          .hero-firework-spark {
            animation: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-gift-float,
          .hero-gift-tilt {
            animation: none !important;
          }
        }

        .hero-top-mascot {
          will-change: transform;
          filter: drop-shadow(0 18px 40px rgba(17, 24, 39, 0.14));
        }

        .hero-top-float-layer {
          height: 100%;
          width: 100%;
          will-change: transform;
        }

        .hero-top-jitter {
          height: 100%;
          width: 100%;
          will-change: transform;
        }

        .hero-top-tilt-left {
          transform: rotate(30deg);
          transform-origin: 50% 60%;
          will-change: transform;
        }

        .hero-top-mirror {
          transform: scaleX(-1);
        }

        .hero-top-float {
          animation: hero-top-float-right 6s ease-in-out infinite;
        }

        .hero-top-float-left {
          animation: hero-top-float-left 6.5s ease-in-out infinite;
        }

        @keyframes hero-top-float-right {
          0% {
            transform: translate3d(-4px, 0px, 0) rotate(2deg);
          }
          50% {
            transform: translate3d(4px, -14px, 0) rotate(5deg);
          }
          100% {
            transform: translate3d(-4px, 0px, 0) rotate(2deg);
          }
        }

        @keyframes hero-top-float-left {
          0% {
            transform: translate3d(4px, 0px, 0) rotate(2deg);
          }
          50% {
            transform: translate3d(-4px, -14px, 0) rotate(5deg);
          }
          100% {
            transform: translate3d(4px, 0px, 0) rotate(2deg);
          }
        }
      `}</style>
    </section>
  );
}
