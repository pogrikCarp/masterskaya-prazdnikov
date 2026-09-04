"use client";

import { type ReactNode } from "react";

/**
 * Раньше скрывал children до site:loaded (плохо для SEO/SSR).
 * Контент в DOM всегда; визуально скрывает CSS html.is-preloading .site-content.
 */
export default function PreloaderGate({ children }: { children: ReactNode }) {
  return children;
}
