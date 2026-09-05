import Container from "./Container";
import RequestForm from "./RequestForm";
import Reveal from "./Reveal";

const advantages = [
  { title: "Быстрый ответ", text: "Перезвоним в течение 15 минут" },
  { title: "Индивидуальный подход", text: "Учтём все ваши пожелания" },
  { title: "Прозрачная стоимость", text: "Без скрытых платежей" },
];

export default function ContactFormSection() {
  return (
    <section
      id="contact-form"
      className="scroll-mt-28 py-16 bg-[linear-gradient(180deg,rgb(var(--mp-bg-rgb)_/_0)_0%,rgb(var(--mp-lavender-rgb)_/_0.12)_100%)]"
    >
      <Container className="max-w-[1320px]">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-center">
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
              {advantages.map((advantage) => (
                <div key={advantage.title} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10">
                    <svg
                      className="h-5 w-5 text-[var(--mp-ink)]"
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
                  <div>
                    <div className="font-semibold text-[var(--mp-ink)]">
                      {advantage.title}
                    </div>
                    <div className="mt-1 text-sm text-black/60">{advantage.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[34px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] p-8 sm:p-10">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.18)_0%,rgba(255,255,255,0.85)_55%,rgba(255,107,138,0.08)_100%)]" />

              <div className="relative">
                <RequestForm />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
