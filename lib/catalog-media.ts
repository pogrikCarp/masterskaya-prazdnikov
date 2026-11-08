export const MAX_PROGRAM_IMAGES = 20;

type CatalogMedia = { imageUrl?: string | null; imageUrls?: string[] | null };

function normalizeImageUrl(url: string) {
  return url.trim().replace(/^\/uploads\//, "/api/uploads/");
}

export function getCatalogImages(item?: CatalogMedia | null): string[] {
  const images = [...(item?.imageUrl ? [item.imageUrl] : []), ...(item?.imageUrls ?? [])];
  return [...new Set(images.map(normalizeImageUrl).filter(Boolean))];
}

export function formatCatalogPrice(price: unknown, priceFrom = false): string | null {
  if (price == null || price === "") return null;
  const value = typeof price === "number" ? price : Number(price);
  if (!Number.isFinite(value) || value < 0) return null;
  return `${priceFrom ? "от " : ""}${value.toLocaleString("ru-RU")} ₽`;
}

export class CatalogInputError extends Error {}

/** Omitted fields stay unchanged on PUT, including requests from an older admin tab. */
export function catalogMediaInput(data: Record<string, unknown>) {
  const result: { imageUrls?: string[]; imageUrl?: string | null; priceFrom?: boolean } = {};
  if (data.imageUrls !== undefined || data.imageUrl !== undefined) {
    const raw = data.imageUrls !== undefined ? data.imageUrls : data.imageUrl ? [data.imageUrl] : [];
    if (!Array.isArray(raw) || raw.length > MAX_PROGRAM_IMAGES || raw.some(url => typeof url !== "string")) {
      throw new CatalogInputError(`Укажите не более ${MAX_PROGRAM_IMAGES} фотографий`);
    }
    const images = raw.map(url => normalizeImageUrl(url as string)).filter(Boolean);
    if (images.some(url => !/^\/(?!\/)/.test(url) && !/^https?:\/\/[^\s]+$/i.test(url))) {
      throw new CatalogInputError("Недопустимый адрес фотографии");
    }
    // Older clients submit only the cover; preserve the rest of the stored gallery.
    if (data.imageUrls !== undefined) result.imageUrls = [...new Set(images)];
    result.imageUrl = images[0] ?? null;
  }
  if (data.priceFrom !== undefined) {
    if (typeof data.priceFrom !== "boolean") throw new CatalogInputError("Неверное значение «Цена от»");
    result.priceFrom = data.priceFrom;
  }
  return result;
}
