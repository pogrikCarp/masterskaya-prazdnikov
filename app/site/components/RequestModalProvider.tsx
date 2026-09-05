"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import RequestForm from "./RequestForm";

type RequestModalContextValue = {
  openRequestModal: () => void;
  closeRequestModal: () => void;
};

const RequestModalContext = createContext<RequestModalContextValue | null>(null);

export function useRequestModal() {
  const context = useContext(RequestModalContext);
  if (!context) {
    throw new Error("useRequestModal должен использоваться внутри RequestModalProvider");
  }
  return context;
}

export default function RequestModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openRequestModal = useCallback(() => setIsOpen(true), []);
  const closeRequestModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const value = useMemo(
    () => ({ openRequestModal, closeRequestModal }),
    [openRequestModal, closeRequestModal]
  );

  return (
    <RequestModalContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/45 p-4 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={closeRequestModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="request-modal-title"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative my-auto w-full max-w-[520px] overflow-hidden rounded-[34px] bg-[var(--mp-bg)] p-7 shadow-[0_40px_120px_rgba(17,24,39,0.35)] ring-1 ring-black/10 sm:p-9"
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.20)_0%,rgba(255,255,255,0.90)_55%,rgba(255,107,138,0.10)_100%)]" />

              <button
                type="button"
                onClick={closeRequestModal}
                aria-label="Закрыть форму"
                className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-black/50 ring-1 ring-black/10 transition-colors hover:bg-white hover:text-black"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="relative">
                <div className="inline-flex rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-black/70 ring-1 ring-black/10">
                  Заявка на праздник
                </div>
                <h2
                  id="request-modal-title"
                  className="mt-4 text-[22px] font-black tracking-tight text-[var(--mp-ink)] sm:text-[30px]"
                >
                  Оставьте заявку
                </h2>
                <p className="mt-2 text-sm text-black/60">
                  Перезвоним в течение 15 минут, обсудим детали и подберём программу под
                  ваш бюджет.
                </p>

                <div className="mt-7">
                  <RequestForm variant="short" autoFocus />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </RequestModalContext.Provider>
  );
}
