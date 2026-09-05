"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Container from "./Container";
import Button, { buttonClassName } from "./Button";
import { Icon } from "./Icon";
import { useRequestModal } from "./RequestModalProvider";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "../content/contacts";

type NavItem = {
  label: string;
  href: string;
};

const nav: NavItem[] = [
  { label: "Все услуги", href: "#services" },
  { label: "Все шоу", href: "/shows" },
  { label: "О нас", href: "#about" },
  { label: "Цены", href: "#pricing" },
  { label: "Фотогалерея", href: "/gallery" },
  { label: "Контакты", href: "#contacts" },
];

export default function GlassHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const phone = useMemo(() => SITE_PHONE_DISPLAY, []);
  const { openRequestModal } = useRequestModal();

  const resolveHref = (href: string) => {
    if (href.startsWith("#")) return `/${href}`;
    return href;
  };

  const onAnchorClick = (href: string, opts?: { closeMobile?: boolean }) => {
    return (e: React.MouseEvent) => {
      if (!href.startsWith("#")) return;

      const isHome =
        typeof window !== "undefined" &&
        (window.location.pathname === "/" || window.location.pathname === "");

      if (!isHome) return;

      e.preventDefault();

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

      if (opts?.closeMobile) setOpen(false);
    };
  };

  useEffect(() => {
    const threshold = 24;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > threshold);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-site-mobile]") == null) setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [open]);

  const surfaceClass = scrolled
    ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.80)_100%)] ring-1 ring-black/10 shadow-[0_16px_50px_rgba(0,0,0,0.18)]"
    : "bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.08)_100%)] ring-1 ring-white/20";

  const mobilePanelClass = scrolled
    ? "bg-white/92 ring-1 ring-black/10 text-[var(--mp-ink)]"
    : "bg-white/10 ring-1 ring-white/20 text-white";

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          marginTop: scrolled ? 0 : 16,
          borderRadius: scrolled ? 0 : 26,
        }}
        transition={{
          opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          marginTop: { type: "spring", stiffness: 140, damping: 40, mass: 1.2 },
          borderRadius: { type: "spring", stiffness: 140, damping: 40, mass: 1.2 },
        }}
        className={`relative overflow-hidden backdrop-blur-xl ${surfaceClass} ${
          scrolled ? "border-b border-black/5" : ""
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.65),transparent)]" />
        <div
          className={`pointer-events-none absolute inset-0 ${
            scrolled
              ? "bg-[radial-gradient(1200px_160px_at_50%_0%,rgba(0,0,0,0.06),transparent_60%)]"
              : "bg-[radial-gradient(900px_160px_at_50%_0%,rgba(255,255,255,0.18),transparent_55%)]"
          }`}
        />
        <Container>
          <div
            className={`flex items-center justify-between gap-4 px-4 sm:px-6 ${
              scrolled ? "py-2" : "py-3"
            } relative`}
          >
            <div className="w-11 shrink-0" aria-hidden="true" />

            <nav className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center justify-center gap-3">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={resolveHref(item.href)}
                    onClick={onAnchorClick(item.href)}
                    className={[
                      "whitespace-nowrap",
                      "px-3",
                      "py-2",
                      "text-sm",
                      "font-semibold",
                      "transition-colors",
                      scrolled
                        ? "text-black/70 hover:text-black"
                        : "text-white/80 hover:text-white",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="flex items-center gap-2 shrink-0">
              <motion.a
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.25 }}
                href={SITE_PHONE_HREF}
                className={[
                  "hidden sm:inline-flex",
                  "items-center",
                  "gap-2",
                  "rounded-full",
                  "px-3",
                  "h-9",
                  "font-semibold",
                  "text-xs",
                  "ring-1",
                  "transition-colors",
                  scrolled
                    ? "bg-black/[0.05] text-[var(--mp-ink)] ring-black/10 hover:bg-black/[0.08]"
                    : "bg-white/14 text-white ring-white/20 hover:bg-white/18",
                ].join(" ")}
              >
                <Icon name="phone" className="h-4 w-4" />
                {phone}
              </motion.a>

              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.25 }}
                onClick={openRequestModal}
                className={`hidden sm:inline-flex ${buttonClassName({ variant: "primary", size: "sm" })}`}
              >
                Оставить заявку
              </motion.button>

              <a
                href="#"
                className={[
                  "hidden sm:inline-flex",
                  "h-9",
                  "w-9",
                  "items-center",
                  "justify-center",
                  "rounded-full",
                  "ring-1",
                  "transition-colors",
                  scrolled
                    ? "bg-black/[0.05] text-black/80 ring-black/10 hover:bg-black/[0.08]"
                    : "bg-white/14 text-white/90 ring-white/20 hover:bg-white/18",
                ].join(" ")}
                aria-label="VK"
              >
                <Icon name="vk" className="h-4 w-4" />
              </a>
              <a
                href="#"
                className={[
                  "hidden sm:inline-flex",
                  "h-9",
                  "w-9",
                  "items-center",
                  "justify-center",
                  "rounded-full",
                  "ring-1",
                  "transition-colors",
                  scrolled
                    ? "bg-black/[0.05] text-black/80 ring-black/10 hover:bg-black/[0.08]"
                    : "bg-white/14 text-white/90 ring-white/20 hover:bg-white/18",
                ].join(" ")}
                aria-label="Telegram"
              >
                <Icon name="telegram" className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 transition-colors ${
                  scrolled
                    ? "bg-black/[0.05] ring-black/10 text-[var(--mp-ink)] hover:bg-black/[0.08]"
                    : "bg-white/14 ring-white/20 text-white hover:bg-white/18"
                }`}
                aria-label={open ? "Закрыть меню" : "Открыть меню"}
              >
                <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
              </button>
            </div>
          </div>

          {open && (
            <div className="lg:hidden px-4 pb-4" data-site-mobile>
              <div className={`rounded-[22px] p-2 ${mobilePanelClass}`}>
                <div className="grid gap-1">
                  {nav.map((item) => (
                    <Link
                      key={item.href}
                      href={resolveHref(item.href)}
                      onClick={(e) => {
                        onAnchorClick(item.href, { closeMobile: true })(e);
                        if (!item.href.startsWith("#")) setOpen(false);
                      }}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                        scrolled
                          ? "text-black/80 hover:bg-black/[0.06]"
                          : "text-white/90 hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <Button
                  type="button"
                  size="lg"
                  className="mt-3 w-full"
                  onClick={() => {
                    setOpen(false);
                    openRequestModal();
                  }}
                >
                  Оставить заявку
                </Button>

                <div className="mt-2 flex items-center justify-between gap-2">
                  <a
                    href={SITE_PHONE_HREF}
                    className={buttonClassName({
                      variant: "outline",
                      size: "lg",
                      className: "flex-1",
                    })}
                  >
                    <Icon name="phone" className="h-4 w-4" />
                    Позвонить
                  </a>
                  <a
                    href="#"
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-colors ${
                      scrolled
                        ? "bg-black/[0.05] text-black/80 ring-black/10 hover:bg-black/[0.08]"
                        : "bg-white/10 text-white ring-white/20 hover:bg-white/15"
                    }`}
                    aria-label="VK"
                  >
                    <Icon name="vk" className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-colors ${
                      scrolled
                        ? "bg-black/[0.05] text-black/80 ring-black/10 hover:bg-black/[0.08]"
                        : "bg-white/10 text-white ring-white/20 hover:bg-white/15"
                    }`}
                    aria-label="Telegram"
                  >
                    <Icon name="telegram" className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </Container>
      </motion.div>
    </div>
  );
}
