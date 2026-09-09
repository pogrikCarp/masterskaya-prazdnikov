"use client";

import { useEffect, useState } from "react";
import CatalogCarouselSection, {
  type CatalogCardItem,
} from "./CatalogCarouselSection";
import {
  DEFAULT_HOME_CONTENT,
  QUESTS_SECTION,
  type HomeSectionContent,
} from "@/lib/home-content";

type Quest = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  duration: number;
  minAge: number;
  popular: boolean;
};

export default function QuestsSection({
  section = DEFAULT_HOME_CONTENT[QUESTS_SECTION],
}: {
  section?: HomeSectionContent;
}) {
  const [items, setItems] = useState<CatalogCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuests() {
      try {
        const popularRes = await fetch("/api/quests?popular=true");
        let data: Quest[] = popularRes.ok ? await popularRes.json() : [];

        if (data.length === 0) {
          const allRes = await fetch("/api/quests");
          if (allRes.ok) data = await allRes.json();
        }

        setItems(
          data.map((quest) => ({
            id: quest.id,
            title: quest.name,
            imageUrl: quest.imageUrl,
            price: quest.price,
            popular: quest.popular,
            meta: [`от ${quest.minAge}+`, `${quest.duration} мин`],
          }))
        );
      } catch (error) {
        console.error("Error fetching quests:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuests();
  }, []);

  return (
    <CatalogCarouselSection
      id="quests"
      title={section.title}
      subtitle={section.subtitle ?? ""}
      allHref="/quests"
      allLabel="Все квесты"
      items={items}
      loading={loading}
      emptyText="Нет квестов"
      accent="lavender"
      layout="fullBleed"
    />
  );
}
