"use client";

import Container from "./Container";
import ClientErrorBoundary from "./ClientErrorBoundary";
import ImageCarousel, { type CarouselSlide } from "./ImageCarousel";

export default function CatalogPageCarousel({
  title,
  subtitle,
  slides,
  emptyText,
}: {
  title: string;
  subtitle?: string;
  slides: CarouselSlide[];
  emptyText: string;
}) {
  return (
    <section className="py-16">
      <Container className="max-w-[1320px]">
        <div className="max-w-2xl">
          <h1 className="text-[34px] font-black tracking-tight text-[var(--mp-ink)] sm:text-[44px]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 text-sm text-black/55 sm:text-base">{subtitle}</p>
          ) : null}
        </div>

        <div className="mt-8 sm:mt-10">
          {slides.length === 0 ? (
            <div className="rounded-[28px] bg-white/60 py-16 text-center text-black/45 ring-1 ring-black/5">
              {emptyText}
            </div>
          ) : (
            <ClientErrorBoundary>
              <ImageCarousel slides={slides} label={title} />
            </ClientErrorBoundary>
          )}
        </div>
      </Container>
    </section>
  );
}
