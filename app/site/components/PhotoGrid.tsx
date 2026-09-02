"use client";

import { useMemo, useState } from "react";
import Lightbox from "./Lightbox";

type FilterId = string;

export type GalleryGridItem = {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  category: string;
  place: string;
};

export default function PhotoGrid({
  galleryItems = [],
  categories,
  initialFilter = "all",
  title = "Фотогалерея",
  subtitle = "Яркие кадры, живые эмоции и аккуратная визуальная подача",
  emptyText = "Пока нет фотографий",
}: {
  galleryItems?: GalleryGridItem[];
  categories?: string[];
  initialFilter?: FilterId;
  title?: string;
  subtitle?: string;
  emptyText?: string;
}) {
  const [filter, setFilter] = useState<FilterId>(initialFilter);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const galleryCategories = useMemo(() => {
    const fromAdmin =
      categories?.length
        ? categories
        : Array.from(new Set(galleryItems.map((item) => item.category))).filter(Boolean);

    return [
      { id: "all", label: "Все" },
      ...fromAdmin.map((category) => ({ id: category, label: category })),
    ];
  }, [categories, galleryItems]);

  const items = useMemo(() => {
    if (filter === "all") return galleryItems;
    return galleryItems.filter((i) => i.category === filter);
  }, [filter, galleryItems]);

  const onPrev = () => {
    setActiveIndex((idx) => {
      if (idx == null) return idx;
      return (idx - 1 + items.length) % items.length;
    });
  };

  const onNext = () => {
    setActiveIndex((idx) => {
      if (idx == null) return idx;
      return (idx + 1) % items.length;
    });
  };

  return (
    <section className="py-12">
      {(title || subtitle) && (
        <div className="text-center">
          {title ? (
            <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="mt-3 text-sm sm:text-base text-black/60 max-w-2xl mx-auto">
              {subtitle}
            </p>
          ) : null}
        </div>
      )}

      {galleryCategories.length > 1 ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {galleryCategories.map((c) => {
            const active = c.id === filter;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id)}
                className={`h-10 rounded-full px-4 text-sm font-semibold transition-all ring-1 ring-black/10 ${
                  active
                    ? "bg-[var(--mp-accent)] text-[var(--mp-ink)] shadow-[0_12px_24px_rgba(255,196,0,0.18)]"
                    : "bg-white/70 text-[var(--mp-text)] hover:bg-white"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      ) : null}

      {items.length === 0 ? (
        <div className="mt-10 rounded-[28px] bg-white/60 px-6 py-16 text-center text-sm text-black/50 ring-1 ring-black/5">
          {emptyText}
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className="group text-left"
            >
              <div className="relative overflow-hidden rounded-[28px] ring-1 ring-black/10 bg-white">
                <div className="relative aspect-[4/3]">
                  <img
                    src={item.thumb}
                    alt={item.alt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute left-4 top-4">
                  <div className="inline-flex rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-black/75 ring-1 ring-black/10">
                    {item.category}
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="text-sm font-bold text-white">{item.alt}</div>
                    <div className="text-xs text-white/75">{item.place}</div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {activeIndex != null && items.length > 0 ? (
        <Lightbox
          items={items.map((i) => ({ src: i.src, alt: i.alt, place: i.place }))}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onPrev={onPrev}
          onNext={onNext}
        />
      ) : null}
    </section>
  );
}
