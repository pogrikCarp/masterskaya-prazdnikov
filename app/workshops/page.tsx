import SiteShell from "../site/components/SiteShell";
import CatalogPageCarousel from "../site/components/CatalogPageCarousel";
import prisma from "@/lib/prisma";

async function getMasterClasses() {
  return prisma.masterClass.findMany({
    where: { active: true },
    orderBy: [{ popular: "desc" }, { id: "desc" }],
  });
}

export default async function WorkshopsPage() {
  const workshops = await getMasterClasses();

  return (
    <SiteShell>
      <CatalogPageCarousel
        title="Все мастер‑классы"
        subtitle="Творческие активности для детей и взрослых — создаём что‑то своими руками и забираем с собой."
        slides={workshops.map((workshop) => ({
          id: workshop.id,
          title: workshop.name,
          imageUrl: workshop.imageUrl,
          price: workshop.price,
          popular: workshop.popular,
          description: workshop.description,
          meta: [`от ${workshop.minAge}+`, `${workshop.duration} мин`],
        }))}
        emptyText="Нет мастер-классов"
      />
    </SiteShell>
  );
}
