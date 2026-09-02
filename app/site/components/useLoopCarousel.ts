"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const AUTOPLAY_MS = 5200;

export function useLoopCarousel(length: number, enabled = true) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const lastUserActionAtRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);

  const clampIndex = (value: number) => {
    if (length <= 0) return 0;
    return ((value % length) + length) % length;
  };

  const goTo = (value: number) => {
    lastUserActionAtRef.current = Date.now();
    setIndex(clampIndex(value));
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (!enabled || reduceMotion || paused || length < 2) return;

    const timer = window.setInterval(() => {
      if (Date.now() - lastUserActionAtRef.current < 1200) return;
      setIndex((current) => clampIndex(current + 1));
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [enabled, reduceMotion, paused, length]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartXRef.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const startX = touchStartXRef.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartXRef.current = null;
    if (startX == null || endX == null) return;
    const delta = endX - startX;
    if (Math.abs(delta) < 48) return;
    if (delta > 0) prev();
    else next();
  };

  return {
    index,
    reduceMotion,
    paused,
    setPaused,
    goTo,
    next,
    prev,
    onTouchStart,
    onTouchEnd,
  };
}
