"use client";

import Container from "./Container";
import { ButtonLink } from "./Button";
import ClientErrorBoundary from "./ClientErrorBoundary";
import ImageCarousel, { type CarouselSlide } from "./ImageCarousel";

export type CatalogCardItem = CarouselSlide;

export default function CatalogCarouselSection({
  id,
  title,
  subtitle,
  allHref,
  allLabel,
  items,
  loading,
  emptyText,
}: {
  id: string;
  title: string;
  subtitle: string;
  allHref?: string;
  allLabel?: string;
  items: CatalogCardItem[];
  loading: boolean;
  emptyText: string;
}) {
  return (
    <section id={id} className="py-14">
      <Container className="max-w-[1320px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-3 text-sm sm:text-base text-black/55">{subtitle}</p>
            ) : null}
          </div>

          {allHref && allLabel ? (
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <ButtonLink href={allHref} variant="primary" size="md">
                {allLabel}
              </ButtonLink>
            </div>
          ) : null}
        </div>

        <div className="mt-8 sm:mt-10">
          {loading ? (
            <div className="flex aspect-[16/9] items-center justify-center rounded-[28px] bg-white/60 ring-1 ring-black/5">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[rgb(var(--mp-lavender-rgb)_/_0.25)] border-t-[rgb(var(--mp-lavender-rgb))]" />
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-[28px] bg-white/60 py-16 text-center text-black/45 ring-1 ring-black/5">
              {emptyText}
            </div>
          ) : (
            <ClientErrorBoundary>
              <ImageCarousel slides={items} label={title} />
            </ClientErrorBoundary>
          )}
        </div>
      </Container>
    </section>
  );
}
