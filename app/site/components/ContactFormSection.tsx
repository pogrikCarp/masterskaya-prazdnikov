"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "./Container";

export default function ContactFormSection() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) return;
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setConsentGiven(false);
      setFormData({ name: "", phone: "", date: "", guests: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact-form" className="py-16 bg-[linear-gradient(180deg,rgb(var(--mp-bg-rgb)_/_0)_0%,rgb(var(--mp-lavender-rgb)_/_0.12)_100%)]">
      <Container className="max-w-[1320px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-black/70 ring-1 ring-black/10">
              Обратная связь
            </div>
            <h2 className="mt-4 text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
              Поможем организовать праздник
            </h2>
            <p className="mt-4 text-sm sm:text-base text-black/60">
              Оставьте заявку — мы свяжемся с вами в течение 15 минут, обсудим детали и
              подберём идеальную программу под ваш бюджет и пожелания.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10">
                  <svg className="h-5 w-5 text-[var(--mp-ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[var(--mp-ink)]">Быстрый ответ</div>
                  <div className="mt-1 text-sm text-black/60">Перезвоним в течение 15 минут</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10">
                  <svg className="h-5 w-5 text-[var(--mp-ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[var(--mp-ink)]">Индивидуальный подход</div>
                  <div className="mt-1 text-sm text-black/60">Учтём все ваши пожелания</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10">
                  <svg className="h-5 w-5 text-[var(--mp-ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[var(--mp-ink)]">Прозрачная стоимость</div>
                  <div className="mt-1 text-sm text-black/60">Без скрытых платежей</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[34px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] p-8 sm:p-10">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.18)_0%,rgba(255,255,255,0.85)_55%,rgba(255,107,138,0.08)_100%)]" />
              
              <div className="relative">
                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#82E6C8]/20">
                      <svg className="h-8 w-8 text-[#82E6C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-xl font-black text-[var(--mp-ink)]">Заявка отправлена!</h3>
                    <p className="mt-2 text-sm text-black/60">Мы свяжемся с вами в ближайшее время</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-[var(--mp-ink)]">
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-[18px] bg-white/70 px-5 py-3 text-sm text-[var(--mp-ink)] ring-1 ring-black/10 placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mp-lavender-rgb)_/_1)]"
                        placeholder="Как к вам обращаться?"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-[var(--mp-ink)]">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-[18px] bg-white/70 px-5 py-3 text-sm text-[var(--mp-ink)] ring-1 ring-black/10 placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mp-lavender-rgb)_/_1)]"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="date" className="block text-sm font-semibold text-[var(--mp-ink)]">
                          Дата праздника
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-[18px] bg-white/70 px-5 py-3 text-sm text-[var(--mp-ink)] ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mp-lavender-rgb)_/_1)]"
                        />
                      </div>

                      <div>
                        <label htmlFor="guests" className="block text-sm font-semibold text-[var(--mp-ink)]">
                          Количество гостей
                        </label>
                        <input
                          type="number"
                          id="guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-[18px] bg-white/70 px-5 py-3 text-sm text-[var(--mp-ink)] ring-1 ring-black/10 placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mp-lavender-rgb)_/_1)]"
                          placeholder="Примерно"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-[var(--mp-ink)]">
                        Комментарий
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="mt-2 w-full rounded-[18px] bg-white/70 px-5 py-3 text-sm text-[var(--mp-ink)] ring-1 ring-black/10 placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mp-lavender-rgb)_/_1)] resize-none"
                        placeholder="Расскажите о ваших пожеланиях..."
                      />
                    </div>

                    <label
                      htmlFor="consent"
                      className="flex cursor-pointer items-start gap-3 rounded-[18px] bg-white/60 px-4 py-3 ring-1 ring-black/10 transition-colors hover:bg-white/80"
                    >
                      <input
                        type="checkbox"
                        id="consent"
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
                      className="w-full inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold bg-[var(--mp-accent)] text-[var(--mp-ink)] shadow-[0_18px_40px_rgba(255,196,0,0.25)] hover:shadow-[0_22px_50px_rgba(255,196,0,0.35)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Отправка..." : "Отправить заявку"}
                    </button>

                    <p className="text-xs text-center text-black/50">
                      Перезвоним в рабочее время и не передадим ваши контакты третьим лицам
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
