"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Container from "./Container";
import { buttonClassName } from "./Button";
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

export default function Header() {
  const [open, setOpen] = useState(false);
  const { openRequestModal } = useRequestModal();

  const phone = useMemo(() => SITE_PHONE_DISPLAY, []);

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

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar - фиолетовый тон, приглушённый */}
      <div className="bg-gradient-to-r from-[#5A3FE0]/90 to-[#7C3AED]/85 backdrop-blur-md">
        <Container>
          <div className="flex items-center justify-between gap-3 py-2.5 text-[13px]">
            <div className="hidden sm:flex items-center gap-4">
              <div className="font-medium tracking-wide text-white/85">Организация праздников в Москве и МО</div>
              <div className="text-white/55 tracking-wide">с 09:00 до 21:00 без выходных</div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={SITE_PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 font-medium tracking-wide text-white ring-1 ring-white/20 transition-all duration-300 hover:bg-white/25 hover:ring-white/30"
              >
                <Icon name="phone" className="h-4 w-4" />
                {phone}
              </a>
              <a
                href="#"
                className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/12 text-white/80 ring-1 ring-white/15 transition-all duration-300 hover:bg-white/20 hover:text-white"
                aria-label="VK"
              >
                <Icon name="vk" className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/12 text-white/80 ring-1 ring-white/15 transition-all duration-300 hover:bg-white/20 hover:text-white"
                aria-label="Telegram"
              >
                <Icon name="telegram" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Main navbar - glass effect с фиолетовым оттенком */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-[#5A3FE0]/10 shadow-[0_4px_30px_rgba(90,63,224,0.08)]">
        <Container>
          <div className="flex h-[72px] items-center justify-between gap-6 px-2">
            <Link href="/" className="group flex items-center gap-3.5">
              <div className="leading-tight">
                <div className="text-[15px] font-bold tracking-tight text-[#2A245E]">Мастерская праздников</div>
                <div className="text-[12px] font-medium tracking-wide text-[#5A3FE0]/60">аниматоры, декор, шоу</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={resolveHref(item.href)}
                  onClick={onAnchorClick(item.href)}
                  className="nav-link-premium relative px-5 py-2.5 text-[14px] font-semibold tracking-wide text-[#2A245E]/70 transition-colors duration-300 hover:text-[#5A3FE0]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={openRequestModal}
                className={`hidden sm:inline-flex ${buttonClassName({ variant: "primary", size: "lg" })}`}
              >
                Оставить заявку
              </button>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#5A3FE0]/10 text-[#5A3FE0]/70 transition-all duration-300 hover:bg-[#5A3FE0]/15 hover:text-[#5A3FE0]"
                aria-label={open ? "Закрыть меню" : "Открыть меню"}
              >
                <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Container>

        {open && (
          <div className="lg:hidden" data-site-mobile>
            <Container className="pb-6">
              <div className="rounded-[24px] bg-white/90 backdrop-blur-xl ring-1 ring-[#5A3FE0]/10 shadow-[0_20px_50px_rgba(90,63,224,0.12)] p-4">
                <div className="grid gap-1">
                  {nav.map((item) => (
                    <Link
                      key={item.href}
                      href={resolveHref(item.href)}
                      onClick={(e) => {
                        onAnchorClick(item.href, { closeMobile: true })(e);
                        if (!item.href.startsWith("#")) setOpen(false);
                      }}
                      className="rounded-xl px-4 py-3.5 text-[14px] font-semibold tracking-wide text-[#2A245E]/70 transition-colors hover:bg-[#5A3FE0]/8 hover:text-[#5A3FE0]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openRequestModal();
                  }}
                  className={buttonClassName({
                    variant: "primary",
                    size: "lg",
                    className: "mt-4 w-full",
                  })}
                >
                  Оставить заявку
                </button>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <a
                    href={SITE_PHONE_HREF}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#5A3FE0]/10 text-[#5A3FE0] h-12 font-semibold tracking-wide transition-colors hover:bg-[#5A3FE0]/15"
                  >
                    <Icon name="phone" className="h-4 w-4" />
                    Позвонить
                  </a>
                  <a
                    href="#"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#5A3FE0]/10 text-[#5A3FE0]/60 transition-colors hover:bg-[#5A3FE0]/15 hover:text-[#5A3FE0]"
                    aria-label="VK"
                  >
                    <Icon name="vk" className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#5A3FE0]/10 text-[#5A3FE0]/60 transition-colors hover:bg-[#5A3FE0]/15 hover:text-[#5A3FE0]"
                    aria-label="Telegram"
                  >
                    <Icon name="telegram" className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </Container>
          </div>
        )}
      </div>

      <style jsx>{`
        .mp-confetti {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          transform: translate(-50%, -50%);
          opacity: 0;
          filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.18));
          animation: mp-pop 780ms cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }

        .mp-confetti-1 {
          background: rgba(255, 196, 0, 0.95);
          animation-delay: 0ms;
        }
        .mp-confetti-2 {
          background: rgba(255, 107, 138, 0.95);
          animation-delay: 90ms;
        }
        .mp-confetti-3 {
          background: rgba(175, 206, 188, 0.95);
          animation-delay: 170ms;
        }
        .mp-confetti-4 {
          background: rgba(255, 255, 255, 0.9);
          animation-delay: 240ms;
        }
        .mp-confetti-5 {
          background: rgba(42, 36, 94, 0.85);
          animation-delay: 310ms;
        }

        .group:hover .mp-confetti {
          opacity: 1;
        }

        @keyframes mp-pop {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
          }
          30% {
            transform: translate(calc(-50% - 14px), calc(-50% - 18px)) scale(1);
          }
          55% {
            transform: translate(calc(-50% + 20px), calc(-50% - 10px)) scale(0.95);
          }
          80% {
            transform: translate(calc(-50% - 18px), calc(-50% + 16px)) scale(0.85);
            opacity: 0.9;
          }
          100% {
            transform: translate(calc(-50% + 12px), calc(-50% + 22px)) scale(0.75);
            opacity: 0;
          }
        }

        /* Premium hover underline effect */
        .nav-link-premium::after {
          content: "";
          position: absolute;
          bottom: 4px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #5A3FE0, #8B5CF6);
          border-radius: 2px;
          transform: translateX(-50%);
          transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav-link-premium:hover::after {
          width: 70%;
        }
      `}</style>
    </header>
  );
}

