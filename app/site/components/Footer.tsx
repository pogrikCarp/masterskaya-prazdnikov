import Link from "next/link";
import Container from "./Container";
import {
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
} from "../content/contacts";

export default function Footer() {
  return (
    <footer id="contacts" className="mt-20">
      <div className="border-t border-[rgb(var(--mp-lavender-rgb)_/_0.12)] bg-white/70 text-[var(--mp-ink)]">
        <Container className="max-w-[1320px]">
          <div className="grid gap-10 py-[60px] sm:py-[72px] lg:grid-cols-3">
            <div>
              <div className="text-[16px] sm:text-[18px] font-semibold tracking-tight">
                О компании
              </div>
              <div className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-black/55 max-w-md">
                «Мастерская праздников» — команда, которая берёт на себя организацию под ключ:
                сценарий, реквизит, аниматоров и визуальную подачу, чтобы вы наслаждались
                событием.
              </div>
            </div>

            <div>
              <div className="text-[16px] sm:text-[18px] font-semibold tracking-tight">
                Контакты
              </div>
              <div className="mt-4 grid gap-3 text-[14px] sm:text-[15px] text-black/55">
                <a
                  href={SITE_PHONE_HREF}
                  className="inline-flex items-center gap-2 text-[var(--mp-ink)] transition-colors hover:text-[var(--mp-lavender)]"
                >
                  <span aria-hidden="true" className="text-black/40">
                    ☎
                  </span>
                  {SITE_PHONE_DISPLAY}
                </a>
                <a
                  href={SITE_EMAIL_HREF}
                  className="inline-flex items-center gap-2 text-[var(--mp-ink)] transition-colors hover:text-[var(--mp-lavender)]"
                >
                  <span aria-hidden="true" className="text-black/40">
                    ✉
                  </span>
                  {SITE_EMAIL}
                </a>
                <div className="inline-flex items-start gap-2">
                  <span aria-hidden="true" className="text-black/40">
                    ⌁
                  </span>
                  <span>Москва, выезд по области</span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[16px] sm:text-[18px] font-semibold tracking-tight">
                Режим работы
              </div>
              <div className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-black/55">
                Ежедневно 09:00–21:00
                <div className="mt-3">
                  Перезвоним в течение дня и предложим 2–3 варианта программы.
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[rgb(var(--mp-lavender-rgb)_/_0.12)]">
            <div className="flex flex-col gap-2 py-5 sm:py-6 text-[12px] text-black/40 sm:flex-row sm:items-center sm:justify-between">
              <div>© {new Date().getFullYear()} Мастерская праздников</div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <Link
                  href="/personal-data-policy"
                  className="transition-colors hover:text-[var(--mp-lavender)]"
                >
                  Политика обработки персональных данных
                </Link>
                <span aria-hidden="true">·</span>
                <Link
                  href="/personal-data-consent"
                  className="transition-colors hover:text-[var(--mp-lavender)]"
                >
                  Согласие на обработку персональных данных
                </Link>
                <span aria-hidden="true">·</span>
                <Link href="/privacy" className="transition-colors hover:text-[var(--mp-lavender)]">
                  Политика конфиденциальности
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
