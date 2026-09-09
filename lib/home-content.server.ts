import prisma from "@/lib/prisma";
import { DEFAULT_HOME_CONTENT, type HomeSectionContent } from "@/lib/home-content";

/**
 * Читает блок из базы. Пока админ ничего не менял (или база недоступна),
 * страница показывает исходные тексты из DEFAULT_HOME_CONTENT.
 */
export async function getHomeSection(key: string): Promise<HomeSectionContent> {
  const fallback = DEFAULT_HOME_CONTENT[key];

  try {
    const [section, cards] = await Promise.all([
      prisma.homeSection.findUnique({ where: { key } }),
      prisma.homeCard.findMany({
        where: { sectionKey: key, active: true },
        orderBy: [{ order: "asc" }, { id: "asc" }],
      }),
    ]);

    if (!section && cards.length === 0) return fallback;

    return {
      key,
      title: section?.title || fallback.title,
      subtitle: section?.subtitle ?? fallback.subtitle,
      cards: cards.length
        ? cards.map((card) => ({
            icon: card.icon,
            title: card.title,
            text: card.text,
          }))
        : fallback.cards,
    };
  } catch (error) {
    console.error(`Error loading home section "${key}":`, error);
    return fallback;
  }
}
