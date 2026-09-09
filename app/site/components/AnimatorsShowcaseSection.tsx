"use client";

import { useEffect, useState } from "react";
import CatalogCarouselSection, {
  type CatalogCardItem,
} from "./CatalogCarouselSection";
import {
  ANIMATORS_SECTION,
  DEFAULT_HOME_CONTENT,
  type HomeSectionContent,
} from "@/lib/home-content";

type Animator = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  pricePerHour: number;
  popular: boolean;
  active: boolean;
};

export default function AnimatorsShowcaseSection({
  showAllLink = true,
  section = DEFAULT_HOME_CONTENT[ANIMATORS_SECTION],
}: {
  showAllLink?: boolean;
  section?: HomeSectionContent;
}) {
  const [items, setItems] = useState<CatalogCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimators() {
      try {
        const res = await fetch("/api/animators");
        if (res.ok) {
          const data: Animator[] = await res.json();
          setItems(
            data.map((animator) => ({
              id: animator.id,
              title: animator.name,
              imageUrl: animator.imageUrl,
              price: animator.pricePerHour,
              priceSuffix: "/час",
              popular: animator.popular,
              description: animator.description,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching animators:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimators();
  }, []);

  return (
    <CatalogCarouselSection
      id="services"
      title={section.title}
      subtitle={section.subtitle ?? ""}
      allHref={showAllLink ? "/animators" : undefined}
      allLabel={showAllLink ? "Все аниматоры" : undefined}
      items={items}
      loading={loading}
      emptyText="Нет аниматоров"
    />
  );
}
