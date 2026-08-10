"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(1400px 520px at 50% 108%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.00) 60%), radial-gradient(900px 520px at 50% 28%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 62%), linear-gradient(180deg, rgb(var(--mp-lavender-rgb) / 0.92) 0%, rgb(var(--mp-lavender-rgb) / 0.74) 42%, rgb(var(--mp-lavender-rgb) / 0.62) 100%)",
        backgroundSize: "200% 200%",
      }}
      animate={{
        backgroundPosition: ["35% 45%", "65% 55%", "35% 45%"],
      }}
      transition={{
        duration: 22,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1],
      }}
    />
  );
}
