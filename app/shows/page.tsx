import SiteShell from "../site/components/SiteShell";
import CatalogPageCarousel from "../site/components/CatalogPageCarousel";
import prisma from "@/lib/prisma";

async function getShows() {
  return prisma.show.findMany({
    where: { active: true },
    orderBy: [{ popular: "desc" }, { id: "desc" }],
  });
}

export default async function ShowsPage() {
  const shows = await getShows();

  return (
    <SiteShell>
      <CatalogPageCarousel
        title="Все шоу‑программы"
        slides={shows.map((show) => ({
          id: show.id,
          title: show.name,
          imageUrl: show.imageUrl,
          price: show.price,
          popular: show.popular,
          description: show.description,
          meta: [`${show.duration} мин`],
        }))}
        emptyText="Нет шоу-программ"
      />
    </SiteShell>
  );
}
