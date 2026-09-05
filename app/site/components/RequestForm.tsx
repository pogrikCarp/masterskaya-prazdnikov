"use client";

import { useState } from "react";
import Link from "next/link";
import { buttonClassName } from "./Button";

const inputClass =
  "mt-2 w-full rounded-[18px] bg-white/70 px-5 py-3 text-sm text-[var(--mp-ink)] ring-1 ring-black/10 placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mp-lavender-rgb)_/_1)]";

const labelClass = "block text-sm font-semibold text-[var(--mp-ink)]";

export default function RequestForm({
  variant = "full",
  autoFocus = false,
}: {
  variant?: "full" | "short";
  autoFocus?: boolean;
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    guests: "",
    message: "",
  });

  const [consentGiven, setConsentGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) return;
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setConsentGiven(false);
      setFormData({ name: "", phone: "", date: "", guests: "", message: "" });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#82E6C8]/20">
          <svg
            className="h-8 w-8 text-[#82E6C8]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-black text-[var(--mp-ink)]">
          Заявка отправлена!
        </h3>
        <p className="mt-2 text-sm text-black/60">
          Мы свяжемся с вами в ближайшее время
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor={`name-${variant}`} className={labelClass}>
          Ваше имя
        </label>
        <input
          type="text"
          id={`name-${variant}`}
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          autoFocus={autoFocus}
          className={inputClass}
          placeholder="Как к вам обращаться?"
        />
      </div>

      <div>
        <label htmlFor={`phone-${variant}`} className={labelClass}>
          Телефон
        </label>
        <input
          type="tel"
          id={`phone-${variant}`}
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className={inputClass}
          placeholder="+7 (___) ___-__-__"
        />
      </div>

      {variant === "full" ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`date-${variant}`} className={labelClass}>
              Дата праздника
            </label>
            <input
              type="date"
              id={`date-${variant}`}
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor={`guests-${variant}`} className={labelClass}>
              Количество гостей
            </label>
            <input
              type="number"
              id={`guests-${variant}`}
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className={inputClass}
              placeholder="Примерно"
            />
          </div>
        </div>
      ) : null}

      <div>
        <label htmlFor={`message-${variant}`} className={labelClass}>
          Комментарий
        </label>
        <textarea
          id={`message-${variant}`}
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={variant === "full" ? 4 : 3}
          className={`${inputClass} resize-none`}
          placeholder="Расскажите о ваших пожеланиях..."
        />
      </div>

      <label
        htmlFor={`consent-${variant}`}
        className="flex cursor-pointer items-start gap-3 rounded-[18px] bg-white/60 px-4 py-3 ring-1 ring-black/10 transition-colors hover:bg-white/80"
      >
        <input
          type="checkbox"
          id={`consent-${variant}`}
          name="consent"
          checked={consentGiven}
          onChange={(e) => setConsentGiven(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-black/20 accent-[var(--mp-lavender)]"
        />
        <span className="text-xs leading-relaxed text-black/60">
          Я даю{" "}
          <Link
            href="/personal-data-consent"
            target="_blank"
            className="font-semibold text-[var(--mp-ink)] underline underline-offset-2 hover:text-black"
          >
            согласие на обработку персональных данных
          </Link>{" "}
          и принимаю условия{" "}
          <Link
            href="/personal-data-policy"
            target="_blank"
            className="font-semibold text-[var(--mp-ink)] underline underline-offset-2 hover:text-black"
          >
            политики обработки персональных данных
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={isSubmitting || !consentGiven}
        className={buttonClassName({
          variant: "primary",
          size: "lg",
          className:
            "w-full shadow-[0_18px_40px_rgba(255,196,0,0.25)] hover:shadow-[0_22px_50px_rgba(255,196,0,0.35)] disabled:opacity-50 disabled:cursor-not-allowed",
        })}
      >
        {isSubmitting ? "Отправка..." : "Отправить заявку"}
      </button>

      <p className="text-center text-xs text-black/50">
        Перезвоним в рабочее время и не передадим ваши контакты третьим лицам
      </p>
    </form>
  );
}
