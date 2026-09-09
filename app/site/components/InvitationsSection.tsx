import Container from "./Container";
import Image from "next/image";
import { buttonClassName } from "./Button";
import Reveal from "./Reveal";

import PriglImage from "../../img/prigl2.png";
import {
  DEFAULT_HOME_CONTENT,
  INVITATIONS_SECTION,
  type HomeSectionContent,
} from "@/lib/home-content";

export default function InvitationsSection({
  section = DEFAULT_HOME_CONTENT[INVITATIONS_SECTION],
}: {
  section?: HomeSectionContent;
}) {
  const telegramText =
    "Здравствуйте, хочу заказать у вас пригласительные для нашего праздника! (Описание)";
  const telegramHref = `https://t.me/orlixina333?text=${encodeURIComponent(telegramText)}`;

  return (
    <section id="invitations" className="py-14">
      <Container className="max-w-[1320px]">
        <Reveal className="relative overflow-hidden rounded-[40px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] p-8 sm:p-12">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(175,206,188,0.35)_0%,rgba(255,255,255,0.88)_55%,rgba(175,206,188,0.18)_100%)]" />
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#afcebc]/25 blur-3xl" />
          <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-white/70 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="mt-4 text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
                {section.title}
              </h2>
              {section.subtitle ? (
                <p className="mt-4 text-sm sm:text-base text-black/60">{section.subtitle}</p>
              ) : null}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {section.cards.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10 text-xl">
                      {feature.icon ?? "•"}
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--mp-ink)]">{feature.title}</div>
                      <div className="mt-1 text-sm text-black/60">{feature.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href={telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClassName({ variant: "primary", size: "lg" })}
                >
                  Заказать пригласительные
                </a>
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
        </Reveal>
      </Container>
    </section>
  );
}
