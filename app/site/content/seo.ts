/** Канонический URL сайта. Задаётся в .env через deploy/setup-domain.sh */

const FALLBACK_SITE_URL = "https://masterskaya-prazdnika-msk.ru";

export function getSiteUrl(): string {
  const raw =
    process.env.SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    FALLBACK_SITE_URL;

  return raw.replace(/\/+$/, "");
}

export const siteSeo = {
  name: "Мастерская праздников",
  locale: "ru_RU",
  defaultTitle: "Мастерская праздников — детские праздники в Москве",
  titleTemplate: "%s | Мастерская праздников",
  description:
    "Организация детских праздников под ключ в Москве: аниматоры, шоу-программы, квесты, мастер-классы, декор и фотогалерея.",
} as const;
