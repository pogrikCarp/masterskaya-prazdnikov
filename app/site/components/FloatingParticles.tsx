"use client";

import { motion } from "framer-motion";

type Particle = {
  id: string;
  size: number;
  left: string;
  top: string;
  opacity: number;
  blur: number;
  duration: number;
  delay: number;
  color: string;
};

const particles: Particle[] = [
  {
    id: "p1",
    size: 120,
    left: "8%",
    top: "22%",
    opacity: 0.12,
    blur: 18,
    duration: 14,
    delay: 0,
    color: "rgba(255,255,255,0.9)",
  },
  {
    id: "p2",
    size: 64,
    left: "18%",
    top: "54%",
    opacity: 0.10,
    blur: 14,
    duration: 11,
    delay: 0.7,
    color: "rgba(255,255,255,0.9)",
  },
  {
    id: "p3",
    size: 92,
    left: "34%",
    top: "18%",
    opacity: 0.07,
    blur: 16,
    duration: 16,
    delay: 0.4,
    color: "rgba(255,255,255,0.9)",
  },
  {
    id: "p4",
    size: 40,
    left: "48%",
    top: "32%",
    opacity: 0.10,
    blur: 10,
    duration: 10,
    delay: 0.2,
    color: "rgba(255,255,255,0.9)",
  },
  {
    id: "p5",
    size: 110,
    left: "66%",
    top: "16%",
    opacity: 0.08,
    blur: 20,
    duration: 15,
    delay: 0.9,
    color: "rgba(255,116,184,0.9)",
  },
  {
    id: "p6",
    size: 56,
    left: "78%",
    top: "44%",
    opacity: 0.11,
    blur: 12,
    duration: 12,
    delay: 0.35,
    color: "rgba(255,255,255,0.9)",
  },
  {
    id: "p7",
    size: 28,
    left: "88%",
    top: "24%",
    opacity: 0.13,
    blur: 8,
    duration: 9,
    delay: 0.1,
    color: "rgba(255,255,255,0.9)",
  },
  {
    id: "p8",
    size: 84,
    left: "92%",
    top: "58%",
    opacity: 0.07,
    blur: 18,
    duration: 17,
    delay: 0.6,
    color: "rgba(90,141,238,0.9)",
  },
  {
    id: "p9",
    size: 20,
    left: "26%",
    top: "64%",
    opacity: 0.15,
    blur: 6,
    duration: 8,
    delay: 0.25,
    color: "rgba(255,255,255,0.95)",
  },
];

export default function FloatingParticles() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            background: p.color,
            opacity: p.opacity,
            filter: `blur(${p.blur}px)`,
          }}
          animate={{
            y: [0, -18, 0, 12, 0],
            x: [0, 10, 0, -8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1],
          }}
        />
      ))}

      <motion.div
        className="absolute left-1/2 top-[12%] h-[560px] w-[1000px] -translate-x-1/2 rounded-[999px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.16), rgba(255,255,255,0) 70%)",
        }}
        animate={{ opacity: [0.8, 1, 0.85] }}
        transition={{ duration: 8, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />
    </div>
  );
}
