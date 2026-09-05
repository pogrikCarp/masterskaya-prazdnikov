import SiteShell from "../site/components/SiteShell";
import Container from "../site/components/Container";
import PhotoGrid from "../site/components/PhotoGrid";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const [galleryFromDatabase, categories] = await Promise.all([
    prisma.galleryItem.findMany({
      where: { active: true },
      include: { category: true },
      orderBy: [{ order: "asc" }, { id: "desc" }],
    }),
    prisma.galleryCategory.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { name: "asc" }],
    }),
  ]);

  const galleryItems = galleryFromDatabase.map((item) => ({
    id: String(item.id),
    src: item.imageUrl,
    thumb: item.imageUrl,
    alt: item.title || "Фотография с праздника",
    category: item.category?.name || "Без категории",
    place: item.description || "",
  }));

  const categoryLabels = categories.map((category) => category.name);

  return (
    <SiteShell>
      <section className="pt-10">
        <Container>
          <div className="rounded-[34px] bg-white/70 ring-1 ring-black/10 px-6 py-10 sm:px-10">
            <div className="text-center">
              <h1 className="mt-4 text-[32px] sm:text-[54px] font-black tracking-tight text-[var(--mp-ink)]">
                Фотогалерея
              </h1>
              <p className="mt-3 text-sm sm:text-base text-black/60 max-w-2xl mx-auto">
                Реальные кадры с праздников. Категории и фото добавляются из админ-панели.
              </p>
            </div>

            <PhotoGrid
              galleryItems={galleryItems}
              categories={categoryLabels}
              emptyText="Пока нет фотографий. Добавьте категорию и фото во вкладке «Галерея» в /admin."
              title=""
              subtitle=""
            />
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
