"use client";

import { useRef, useState } from "react";
import { getCatalogImages } from "@/lib/catalog-media";
import { Chevron } from "./CarouselNav";

export default function ProgramGallery({ title, imageUrl, imageUrls, controlsPosition = "bottom", onInteract }: {
  title: string;
  imageUrl?: string | null;
  imageUrls?: string[];
  controlsPosition?: "top" | "bottom";
  onInteract?: () => void;
}) {
  const images = getCatalogImages({ imageUrl, imageUrls });
  const [index, setIndex] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const current = images.length ? index % images.length : 0;
  const multiple = images.length > 1;

  function move(direction: number) {
    onInteract?.();
    setIndex((current + direction + images.length) % images.length);
  }

  return (
    <div
      role="group"
      aria-label={`Фотографии: ${title}`}
      className="absolute inset-0 overflow-hidden rounded-[inherit] bg-white/40"
      style={{ touchAction: multiple ? "pan-y" : undefined }}
      onKeyDown={event => {
        if (!multiple || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
        event.stopPropagation();
        move(event.key === "ArrowRight" ? 1 : -1);
      }}
      onTouchStart={event => {
        if (!multiple) return;
        event.stopPropagation();
        onInteract?.();
        touch.current = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
      }}
      onTouchEnd={event => {
        if (!multiple) return;
        event.stopPropagation();
        const start = touch.current;
        touch.current = null;
        if (!start) return;
        const dx = event.changedTouches[0].clientX - start.x;
        const dy = event.changedTouches[0].clientY - start.y;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
      }}
    >
      {images[current] ? <img src={images[current]} alt={multiple ? `${title} — фото ${current + 1} из ${images.length}` : title} className="absolute inset-0 w-full object-cover" style={{ height: "100%" }} loading="lazy" /> : <div className="absolute inset-0 flex items-center justify-center text-3xl text-black/20">✦</div>}
      {multiple && (
        <div className={`absolute left-3 z-20 flex items-center gap-1 rounded-full bg-white/95 p-1 text-[#2a245e] shadow ring-1 ring-black/10 ${controlsPosition === "top" ? "top-3" : "bottom-3"}`}>
          <button type="button" onClick={() => move(-1)} aria-label={`Предыдущее фото: ${title}`} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5"><Chevron direction="prev" /></button>
          <span aria-live="polite" className="min-w-12 text-center text-xs font-semibold">{current + 1} / {images.length}</span>
          <button type="button" onClick={() => move(1)} aria-label={`Следующее фото: ${title}`} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5"><Chevron direction="next" /></button>
        </div>
      )}
    </div>
  );
}
