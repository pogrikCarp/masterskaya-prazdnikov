import Link from "next/link";
import type { AnimatorSummary } from "@/lib/animator-filters";
import AnimatorPhoto from "./AnimatorPhoto";
import { badgeClassName } from "./Button";

export default function AnimatorCard({ animator }: { animator: AnimatorSummary }) {
  const href = `/animators/${animator.id}`;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_14px_45px_rgba(100,76,150,0.09)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_20px_55px_rgba(100,76,150,0.16)]">
      <Link href={href} className="relative block focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-indigo-600" aria-label={`Подробнее: ${animator.name}`}>
        <AnimatorPhoto imageUrl={animator.imageUrl} name={animator.name} className="aspect-[4/5] w-full" />
        {animator.popular && <span className={`absolute right-4 top-4 ${badgeClassName("hit")}`}>Хит</span>}
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <h3 className="text-xl font-black leading-tight tracking-tight text-[var(--mp-ink)] [overflow-wrap:anywhere]">
          <Link href={href}>{animator.name}</Link>
        </h3>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-semibold text-[var(--mp-ink)]">{animator.pricePerHour.toLocaleString("ru-RU")} ₽/час</span>
          <Link href={href} className="inline-flex min-h-[44px] items-center rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_0.13)] px-4 text-sm font-semibold text-[var(--mp-ink)] transition-colors hover:bg-[rgb(var(--mp-lavender-rgb)_/_0.25)] focus-visible:outline-2 focus-visible:outline-indigo-600">
            Подробнее <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
