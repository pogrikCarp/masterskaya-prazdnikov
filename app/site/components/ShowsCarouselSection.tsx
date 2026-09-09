"use client";

import { useEffect, useState } from "react";
import CatalogCarouselSection, {
  type CatalogCardItem,
} from "./CatalogCarouselSection";
import {
  DEFAULT_HOME_CONTENT,
  SHOWS_SECTION,
  type HomeSectionContent,
} from "@/lib/home-content";

type Show = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  duration: number;
  popular: boolean;
};

export default function ShowsCarouselSection({
  section = DEFAULT_HOME_CONTENT[SHOWS_SECTION],
}: {
  section?: HomeSectionContent;
}) {
  const [items, setItems] = useState<CatalogCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShows() {
      try {
        const popularRes = await fetch("/api/shows?popular=true");
        let data: Show[] = popularRes.ok ? await popularRes.json() : [];

        if (data.length === 0) {
          const allRes = await fetch("/api/shows");
          if (allRes.ok) data = await allRes.json();
        }

        setItems(
          data.map((show) => ({
            id: show.id,
            title: show.name,
            imageUrl: show.imageUrl,
            price: show.price,
            popular: show.popular,
            meta: [`${show.duration} мин`],
          }))
        );
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchShows();
  }, []);

  return (
    <CatalogCarouselSection
      id="shows"
      title={section.title}
      subtitle={section.subtitle ?? ""}
      allHref="/shows"
      allLabel="Все шоу"
      items={items}
      loading={loading}
      emptyText="Нет шоу-программ"
    />
  );
}
