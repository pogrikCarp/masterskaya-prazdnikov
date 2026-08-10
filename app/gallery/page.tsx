import SiteShell from "../site/components/SiteShell";
import Container from "../site/components/Container";
import PhotoGrid from "../site/components/PhotoGrid";
import { galleryItems as fallbackGalleryItems } from "../site/content/gallery";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const galleryFromDatabase = await prisma.galleryItem.findMany({
    where: { active: true },
    orderBy: [{ order: "asc" }, { id: "desc" }],
  });

  const galleryItems = galleryFromDatabase.length
    ? galleryFromDatabase.map((item) => ({
        id: String(item.id),
        src: item.imageUrl,
        thumb: item.imageUrl,
        alt: item.title || "Фотография с праздника",
        category: item.category || "Без категории",
        place: item.description || "",
      }))
    : fallbackGalleryItems;

  return (
    <SiteShell>
      <section className="pt-10">
        <Container>
          <div className="rounded-[34px] bg-white/70 ring-1 ring-black/10 px-6 py-10 sm:px-10">
            <div className="text-center">
              <h1 className="mt-4 text-[40px] sm:text-[54px] font-black tracking-tight text-[var(--mp-ink)]">
                Фотогалерея
              </h1>
              <p className="mt-3 text-sm sm:text-base text-black/60 max-w-2xl mx-auto">
                Подборка снимков в едином стиле: свет, эмоции, детали декора и динамика.
              </p>
            </div>

            <PhotoGrid
              galleryItems={galleryItems}
              title=""
              subtitle=""
            />
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
