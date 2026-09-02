"use client";

import { useEffect, useState } from "react";
import CatalogCarouselSection, {
  type CatalogCardItem,
} from "./CatalogCarouselSection";

type MasterClass = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  duration: number;
  minAge: number;
  popular: boolean;
  active: boolean;
};

export default function WorkshopsSection() {
  const [items, setItems] = useState<CatalogCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkshops() {
      try {
        const popularRes = await fetch("/api/master-classes?popular=true");
        let data: MasterClass[] = popularRes.ok ? await popularRes.json() : [];

        if (data.length === 0) {
          const allRes = await fetch("/api/master-classes");
          if (allRes.ok) data = await allRes.json();
        }

        setItems(
          data.map((workshop) => ({
            id: workshop.id,
            title: workshop.name,
            imageUrl: workshop.imageUrl,
            price: workshop.price,
            popular: workshop.popular,
            meta: [`от ${workshop.minAge}+`, `${workshop.duration} мин`],
          }))
        );
      } catch (error) {
        console.error("Error fetching workshops:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkshops();
  }, []);

  return (
    <CatalogCarouselSection
      id="workshops"
      title="Мастер‑классы"
      subtitle="Коротко, ярко и с результатом: ребёнок уходит с готовой работой."
      allHref="/workshops"
      allLabel="Все мастер‑классы"
      items={items}
      loading={loading}
      emptyText="Нет мастер-классов"
      accent="lavender"
    />
  );
}
