import prisma from "@/lib/prisma";
import {
  DEFAULT_HOME_CONTENT,
  HOME_SECTION_KEYS,
  type HomeSectionContent,
} from "@/lib/home-content";

/**
 * Читает блоки главной из базы. Пока админ ничего не менял (или база
 * недоступна), страница показывает исходные тексты из DEFAULT_HOME_CONTENT.
 */
export async function getHomeSections(): Promise<Record<string, HomeSectionContent>> {
  const result: Record<string, HomeSectionContent> = { ...DEFAULT_HOME_CONTENT };

  try {
    const [sections, cards] = await Promise.all([
      prisma.homeSection.findMany({ where: { key: { in: HOME_SECTION_KEYS } } }),
      prisma.homeCard.findMany({
        where: { sectionKey: { in: HOME_SECTION_KEYS }, active: true },
        orderBy: [{ order: "asc" }, { id: "asc" }],
      }),
    ]);

    for (const key of HOME_SECTION_KEYS) {
      const fallback = DEFAULT_HOME_CONTENT[key];
      const stored = sections.find((section) => section.key === key);
      const storedCards = cards.filter((card) => card.sectionKey === key);

      if (!stored && storedCards.length === 0) continue;

      result[key] = {
        key,
        title: stored?.title || fallback.title,
        subtitle: stored ? stored.subtitle : fallback.subtitle,
        cards: storedCards.length
          ? storedCards.map((card) => ({
              icon: card.icon,
              title: card.title,
              text: card.text,
            }))
          : fallback.cards,
      };
    }
  } catch (error) {
    console.error("Error loading home sections:", error);
  }

  result.hero = {
    ...result.hero,
    subtitle:
      "К каждому празднику — индивидуальный подход. Мы адаптируем программу исходя из характера Вашего ребенка и атмосферы праздника.",
  };

  result.quests = {
    ...result.quests,
    title: "Квесты: Вместе в приключение!",
    subtitle: "Идеальный способ сплотить детей в одну команду.",
  };

  result.workshops = {
    ...result.workshops,
    title: "Мастер-классы: создаем красоту своими руками",
    subtitle:
      "Переключите внимание детей на творчество! Увлекательный мастер-класс станет отличным дополнением к программе и подарком для гостей — каждый унесет с собой поделку.",
  };

  result.why = {
    ...result.why,
    cards: (result.why.cards ?? []).map((card) =>
      card.title === "Авторская концепция"
        ? {
            ...card,
            text: "Мы адаптируем программу исходя из характера Вашего ребенка и атмосферы праздника.",
          }
        : card
    ),
  };

  result.invitations = {
    ...result.invitations,
    subtitle:
      "Специально для Ваших гостей мы создадим персонализированные пригласительные в едином стиле праздника! Пригласительные помогут создать нужное настроение и позвать тех, кто вам по-настоящему дорог — родных, друзей и самых близких.",
    cards: (result.invitations.cards ?? []).map((card) => {
      if (card.title === "Индивидуальный дизайн") {
        return { ...card, text: "В тематике праздника" };
      }
      if (card.title === "Любой формат" || card.title === "Персонализация") {
        return {
          ...card,
          title: "Персонализация",
          text: "Именно для Ваших гостей",
        };
      }
      if (card.title === "Быстрая подготовка") {
        return { ...card, text: "В течение 1–2 дней" };
      }
      if (card.title === "Доступная цена" || card.title === "Абсолютно бесплатно") {
        return {
          ...card,
          title: "Абсолютно бесплатно",
          text: "Подарок для наших клиентов",
        };
      }
      return card;
    }),
  };

  return result;
}
