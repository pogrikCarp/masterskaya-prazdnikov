import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer id="contacts" className="mt-20">
      <div className="bg-[#111] text-[#eaeaea]">
        <Container className="max-w-[1320px]">
          <div className="grid gap-10 py-[60px] sm:py-[72px] lg:grid-cols-3">
            <div>
              <div className="text-[16px] sm:text-[18px] font-semibold tracking-tight">
                О компании
              </div>
              <div className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[#a0a0a0] max-w-md">
                «Мастерская праздников» — команда, которая берёт на себя организацию под ключ:
                сценарий, реквизит, аниматоров и визуальную подачу, чтобы вы наслаждались
                событием.
              </div>
            </div>

            <div>
              <div className="text-[16px] sm:text-[18px] font-semibold tracking-tight">
                Контакты
              </div>
              <div className="mt-4 grid gap-3 text-[14px] sm:text-[15px] text-[#a0a0a0]">
                <a
                  href="tel:+74957771234"
                  className="inline-flex items-center gap-2 text-[#eaeaea] hover:text-white transition-colors"
                >
                  <span aria-hidden="true" className="text-[#a0a0a0]">
                    ☎
                  </span>
                  +7 (495) 777-12-34
                </a>
                <a
                  href="mailto:hello@prazdniki.studio"
                  className="inline-flex items-center gap-2 text-[#eaeaea] hover:text-white transition-colors"
                >
                  <span aria-hidden="true" className="text-[#a0a0a0]">
                    ✉
                  </span>
                  hello@prazdniki.studio
                </a>
                <div className="inline-flex items-start gap-2">
                  <span aria-hidden="true" className="text-[#a0a0a0]">
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
              <div className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[#a0a0a0]">
                Ежедневно 09:00–21:00
                <div className="mt-3">
                  Перезвоним в течение дня и предложим 2–3 варианта программы.
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10">
            <div className="flex flex-col gap-2 py-5 sm:py-6 text-[12px] text-[#888] sm:flex-row sm:items-center sm:justify-between">
              <div>© {new Date().getFullYear()} Мастерская праздников</div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <Link
                  href="/personal-data-policy"
                  className="hover:text-white transition-colors"
                >
                  Политика обработки персональных данных
                </Link>
                <span aria-hidden="true">·</span>
                <Link
                  href="/personal-data-consent"
                  className="hover:text-white transition-colors"
                >
                  Согласие на обработку персональных данных
                </Link>
                <span aria-hidden="true">·</span>
                <Link href="/privacy" className="hover:text-white transition-colors">
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
