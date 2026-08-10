"use client";

import { motion } from "framer-motion";

export default function WaveDivider({
  fill = "var(--mp-bg)",
}: {
  fill?: string;
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[-6px]">
      <motion.svg
        viewBox="0 0 1440 180"
        className="block w-full translate-y-[2px]"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.g
          animate={{ x: [0, -1440] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <path
            d="M0,96 C240,28 480,164 720,96 C960,28 1200,164 1440,96 C1680,28 1920,164 2160,96 C2400,28 2640,164 2880,96 L2880,180 L0,180 Z"
            fill={fill}
            stroke={fill}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </motion.g>
      </motion.svg>
    </div>
  );
}
