import Container from "./Container";
import Link from "next/link";
import Image from "next/image";

import PriglImage from "../../img/prigl2.png";

export default function InvitationsSection() {
  const telegramText =
    "Здравствуйте, хочу заказать у вас пригласительные для нашего праздника! (Описание)";
  const telegramHref = `https://t.me/orlixina333?text=${encodeURIComponent(telegramText)}`;

  return (
    <section id="invitations" className="py-14">
      <Container className="max-w-[1320px]">
        <div className="relative overflow-hidden rounded-[40px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] p-8 sm:p-12">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(175,206,188,0.35)_0%,rgba(255,255,255,0.88)_55%,rgba(175,206,188,0.18)_100%)]" />
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#afcebc]/25 blur-3xl" />
          <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-white/70 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="mt-4 text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
                Пригласительные для вашего праздника
              </h2>
              <p className="mt-4 text-sm sm:text-base text-black/60">
                Создаём красивые пригласительные в едином стиле с праздником — печатные или
                электронные. Любой формат, любая тематика.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10 text-xl">
                    🎨
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--mp-ink)]">Индивидуальный дизайн</div>
                    <div className="mt-1 text-sm text-black/60">Под тематику праздника</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10 text-xl">
                    📱
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--mp-ink)]">Любой формат</div>
                    <div className="mt-1 text-sm text-black/60">Печатные или электронные</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10 text-xl">
                    ⚡
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--mp-ink)]">Быстрая подготовка</div>
                    <div className="mt-1 text-sm text-black/60">2–3 дня на макет</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10 text-xl">
                    💰
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--mp-ink)]">Доступная цена</div>
                    <div className="mt-1 text-sm text-black/60">от 500 ₽ за дизайн</div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href={telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex h-14 sm:h-16 min-w-[240px] items-center justify-center gap-3 rounded-full px-8 sm:px-10 text-sm sm:text-[15px] font-semibold text-white bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.92)_0%,rgb(var(--mp-lavender-rgb)_/_0.72)_42%,rgba(255,107,138,0.90)_100%)] bg-[length:220%_220%] bg-[position:0%_50%] shadow-[0_24px_70px_rgba(17,24,39,0.18)] ring-1 ring-white/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_90px_rgba(17,24,39,0.22)] hover:bg-[position:100%_50%] active:translate-y-0"
                >
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.12)_28%,rgba(0,0,0,0.12)_100%)]" />
                  <span className="pointer-events-none absolute -top-10 left-6 h-16 w-44 rotate-[18deg] rounded-full bg-white/30 blur-2xl transition-transform duration-500 group-hover:translate-x-10" />
                  <span className="pointer-events-none absolute -inset-1 rounded-full bg-white/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative">Заказать пригласительные</span>
                  <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/18 ring-1 ring-white/30 transition-transform duration-300 group-hover:translate-x-0.5">
                    <span className="text-lg leading-none">→</span>
                  </span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[28px] bg-white/60 ring-1 ring-black/10 shadow-[0_22px_60px_rgba(17,24,39,0.10)] p-6">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] ring-1 ring-black/5">
                  <div className="absolute inset-0 p-6 sm:p-10">
                    <div className="relative mx-auto h-full w-full max-w-[340px] overflow-hidden rounded-[18px] bg-white">
                      <Image
                        src={PriglImage}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(min-width: 1024px) 420px, 90vw"
                        className="object-contain"
                        quality={100}
                        priority={false}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.0)_60%)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
