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

  return result;
}
