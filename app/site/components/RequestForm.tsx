"use client";

import { useState } from "react";
import Link from "next/link";
import { buttonClassName } from "./Button";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF, SITE_REQUEST_TG_URL } from "../content/contacts";

/** 16px обязателен: iOS Safari зумит страницу при фокусе на поле с меньшим шрифтом */
const inputClass =
  "mt-2 w-full rounded-[18px] bg-white/70 px-5 py-3 text-[16px] text-[var(--mp-ink)] ring-1 ring-black/10 placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mp-lavender-rgb)_/_1)]";

const labelClass = "block text-sm font-semibold text-[var(--mp-ink)]";

export default function RequestForm({
  variant = "full",
  autoFocus = false,
  initialMessage = "",
}: {
  variant?: "full" | "short";
  autoFocus?: boolean;
  initialMessage?: string;
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: initialMessage,
  });

  const [consentGiven, setConsentGiven] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) return;
    setError("");
    const phone = formData.phone.replace(/\D/g, "");
    if (!formData.name.trim() || phone.length < 10 || phone.length > 15) {
      setError("Проверьте имя и номер телефона");
      return;
    }
    const text = [
      "Здравствуйте! Хочу заказать праздник.",
      `Имя: ${formData.name.trim()}`,
      `Телефон: ${formData.phone.trim()}`,
      formData.message.trim() ? `Пожелания: ${formData.message.trim()}` : "",
      `Страница: ${window.location.origin}${window.location.pathname}`,
    ].filter(Boolean).join("\n");
    window.location.assign(`${SITE_REQUEST_TG_URL}?text=${encodeURIComponent(text)}`);
  };

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
          maxLength={100}
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
          maxLength={25}
          className={inputClass}
          placeholder="+7 (___) ___-__-__"
        />
      </div>

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
          maxLength={2000}
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
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-black/20 accent-[var(--mp-lavender)]"
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
        disabled={!consentGiven}
        className={buttonClassName({
          variant: "primary",
          size: "lg",
          className:
            "w-full disabled:opacity-50 disabled:cursor-not-allowed",
        })}
      >
        Перейти в Telegram
      </button>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error} Можно позвонить нам — <a href={SITE_PHONE_HREF} className="underline">{SITE_PHONE_DISPLAY}</a>.
        </p>
      )}
      <p className="text-center text-xs text-black/50">
        Откроется диалог с менеджером. Проверьте подготовленное сообщение и нажмите «Отправить» в Telegram.
      </p>
    </form>
  );
}
