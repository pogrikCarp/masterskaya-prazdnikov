"use client";

import { type ReactNode, useEffect, useState } from "react";

export default function PreloaderGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const check = () => {
      if (!root.classList.contains("is-preloading")) setReady(true);
    };

    check();

    const onLoaded = () => setReady(true);

    window.addEventListener("site:loaded", onLoaded);
    return () => window.removeEventListener("site:loaded", onLoaded);
  }, []);

  if (!ready) return null;

  return children;
}
