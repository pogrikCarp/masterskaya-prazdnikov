import type { ReactNode } from "react";
import SiteShell from "./SiteShell";
import Container from "./Container";

export function Fill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-red-100 px-1.5 py-0.5 font-bold text-red-600 ring-1 ring-red-300">
      {children}
    </span>
  );
}

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

export default function LegalPage({
  badge,
  title,
  lead,
  updatedAt,
  sections,
  footer,
}: {
  badge: string;
  title: string;
  lead: ReactNode;
  updatedAt: ReactNode;
  sections: LegalSection[];
  footer?: ReactNode;
}) {
  return (
    <SiteShell>
      <section className="py-14 sm:py-20">
        <Container className="max-w-[1240px]">
          <div className="relative overflow-hidden rounded-[34px] bg-white/70 p-8 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] sm:p-12">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.18)_0%,rgba(255,255,255,0.85)_55%,rgba(255,107,138,0.08)_100%)]" />

            <div className="relative">
              <div className="inline-flex rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-black/70 ring-1 ring-black/10">
                {badge}
              </div>
              <h1 className="mt-4 max-w-3xl text-[30px] font-black tracking-tight text-[var(--mp-ink)] sm:text-[42px]">
                {title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/60 sm:text-base">
                {lead}
              </p>
              <p className="mt-6 text-xs text-black/50">Обновлено: {updatedAt}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-700 ring-1 ring-red-200">
            <strong>Перед публикацией:</strong> поля, выделенные <Fill>красным</Fill>, — это
            официальные реквизиты оператора (наименование ИП или юрлица, ИНН, ОГРН/ОГРНИП,
            адрес, e‑mail). Замените их реальными данными, иначе документ не имеет силы.
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <aside className="lg:col-span-4 xl:col-span-3">
              <nav
                aria-label="Содержание документа"
                className="rounded-[26px] bg-white/70 p-6 ring-1 ring-black/10 lg:sticky lg:top-28"
              >
                <div className="text-sm font-black tracking-tight text-[var(--mp-ink)]">
                  Содержание
                </div>
                <ol className="mt-4 space-y-2 text-sm text-black/60">
                  {sections.map((section, index) => (
                    <li key={section.id} className="flex gap-3">
                      <span className="shrink-0 font-semibold text-black/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${section.id}`}
                        className="transition-colors hover:text-[var(--mp-ink)]"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <article className="lg:col-span-8 xl:col-span-9">
              <div className="space-y-4">
                {sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 rounded-[26px] bg-white/70 p-6 ring-1 ring-black/10 sm:p-8"
                  >
                    <h2 className="flex items-baseline gap-3 text-lg font-black tracking-tight text-[var(--mp-ink)] sm:text-xl">
                      <span className="text-sm font-semibold text-black/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </h2>
                    <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-black/70 [&_li]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
                      {section.body}
                    </div>
                  </section>
                ))}
              </div>

              {footer ? (
                <div className="mt-4 rounded-[26px] bg-[var(--mp-ink)] p-6 text-[15px] leading-relaxed text-white/75 sm:p-8">
                  {footer}
                </div>
              ) : null}
            </article>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
