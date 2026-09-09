"use client";

import { buttonClassName } from "./site/components/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-[28px] font-black tracking-tight text-[var(--mp-ink)] sm:text-[36px]">
        Страница не открылась
      </h1>
      <p className="mt-3 max-w-md text-sm text-black/55 sm:text-base">
        Обновите страницу — если ошибка повторится, напишите нам в Telegram.
      </p>
      <button
        type="button"
        onClick={reset}
        className={`mt-6 ${buttonClassName({ variant: "primary", size: "md" })}`}
      >
        Обновить
      </button>
    </div>
  );
}
