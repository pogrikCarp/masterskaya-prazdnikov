"use client";

import { useState } from "react";
import { MAX_PROGRAM_IMAGES } from "@/lib/catalog-media";

export default function CatalogImageManager({ images, onChange, onUploadingChange }: {
  images: string[];
  onChange: (images: string[]) => void;
  onUploadingChange: (uploading: boolean) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;
    if (images.length + files.length > MAX_PROGRAM_IMAGES) {
      setError(`Можно добавить до ${MAX_PROGRAM_IMAGES} фото. Сейчас добавлено: ${images.length}.`);
      return;
    }
    setUploading(true);
    onUploadingChange(true);
    setError("");
    const added: string[] = [];
    const failed: string[] = [];
    try {
      for (const file of files) {
        try {
          const body = new FormData();
          body.append("file", file);
          const response = await fetch("/api/admin/upload", { method: "POST", body });
          const data = await response.json();
          if (!response.ok || typeof data.url !== "string") throw new Error("Upload failed");
          added.push(data.url);
        } catch {
          failed.push(file.name);
        }
      }
      if (added.length) onChange([...images, ...added]);
      if (failed.length) setError(`Не удалось загрузить: ${failed.join(", ")}. Остальные фото добавлены.`);
    } finally {
      setUploading(false);
      onUploadingChange(false);
    }
  }

  function move(index: number, direction: -1 | 1) {
    const next = [...images];
    [next[index], next[index + direction]] = [next[index + direction], next[index]];
    onChange(next);
  }

  return (
    <fieldset disabled={uploading} className="space-y-3">
      <legend className="mb-1 text-sm font-medium text-gray-700">Фотографии программы</legend>
      <p className="text-xs text-gray-500">Первое фото — обложка. Можно выбрать несколько файлов сразу и изменить их порядок.</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((url, index) => (
          <div key={url} className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <div className="relative aspect-square">
              <img src={url} alt={`Фото ${index + 1}`} className="absolute inset-0 w-full object-contain" style={{ height: "100%" }} />
              {index === 0 && <span className="absolute bottom-1 left-1 rounded bg-indigo-600 px-1.5 py-0.5 text-[10px] text-white">Обложка</span>}
            </div>
            <div className="flex justify-between gap-1 p-1">
              <button type="button" disabled={index === 0} onClick={() => move(index, -1)} aria-label={`Переместить фото ${index + 1} влево`} className="rounded px-2 py-1 text-sm hover:bg-white disabled:opacity-25">←</button>
              <button type="button" disabled={index === images.length - 1} onClick={() => move(index, 1)} aria-label={`Переместить фото ${index + 1} вправо`} className="rounded px-2 py-1 text-sm hover:bg-white disabled:opacity-25">→</button>
              <button type="button" onClick={() => onChange(images.filter((_, i) => i !== index))} aria-label={`Убрать фото ${index + 1}`} className="rounded px-2 py-1 text-sm text-red-600 hover:bg-white">×</button>
            </div>
          </div>
        ))}
      </div>
      <label className="inline-flex cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200">
        {uploading ? "Загрузка фотографий…" : "Добавить фотографии"}
        <input type="file" accept="image/*" multiple disabled={uploading} onChange={upload} aria-label="Добавить фотографии" className="hidden" />
      </label>
      <span className="ml-3 text-xs text-gray-500">{images.length} / {MAX_PROGRAM_IMAGES}</span>
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
    </fieldset>
  );
}
