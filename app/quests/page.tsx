import SiteShell from "../site/components/SiteShell";
import CatalogPageCarousel from "../site/components/CatalogPageCarousel";
import prisma from "@/lib/prisma";

async function getQuests() {
  return prisma.quest.findMany({
    where: { active: true },
    orderBy: [{ popular: "desc" }, { id: "desc" }],
  });
}

export default async function QuestsPage() {
  const quests = await getQuests();

  return (
    <SiteShell>
      <CatalogPageCarousel
        title="Все квесты"
        subtitle="Сюжетные игры с заданиями — вовлекают детей и держат темп."
        slides={quests.map((quest) => ({
          id: quest.id,
          title: quest.name,
          imageUrl: quest.imageUrl,
          price: quest.price,
          popular: quest.popular,
          description: quest.description,
          meta: [`от ${quest.minAge}+`, `${quest.duration} мин`],
        }))}
        emptyText="Нет квестов"
      />
    </SiteShell>
  );
}
