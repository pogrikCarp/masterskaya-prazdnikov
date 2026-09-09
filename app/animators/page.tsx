import SiteShell from "../site/components/SiteShell";
import CatalogPageCarousel from "../site/components/CatalogPageCarousel";
import prisma from "@/lib/prisma";

async function getAnimators() {
  return prisma.animator.findMany({
    where: { active: true },
    orderBy: [{ popular: "desc" }, { id: "desc" }],
  });
}

export default async function AnimatorsPage() {
  const animators = await getAnimators();

  return (
    <SiteShell>
      <CatalogPageCarousel
        title="Все аниматоры"
        slides={animators.map((animator) => ({
          id: animator.id,
          title: animator.name,
          imageUrl: animator.imageUrl,
          price: animator.pricePerHour,
          priceSuffix: "/час",
          popular: animator.popular,
          description: animator.description,
        }))}
        emptyText="Нет аниматоров"
      />
    </SiteShell>
  );
}
