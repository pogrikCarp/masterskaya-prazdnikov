"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ANIMATOR_AUDIENCES, ANIMATOR_AGE_GROUPS, type AnimatorSummary } from "@/lib/animator-filters";
import AnimatorCard from "./AnimatorCard";

const filterClass = "min-h-[44px] rounded-full border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

export default function AnimatorCatalog({ animators }: { animators: AnimatorSummary[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const audience = ANIMATOR_AUDIENCES.find(item => item.value === params.get("audience"))?.value;
  const age = ANIMATOR_AGE_GROUPS.find(item => item.value === params.get("age"))?.value;
  const filtered = animators.filter(animator => (
    (!audience || animator.audience === audience || (audience !== "UNIVERSAL" && animator.audience === "UNIVERSAL")) &&
    (!age || animator.ageGroups.includes(age))
  ));

  function selectFilter(key: string, value?: string) {
    const query = new URLSearchParams(params.toString());
    if (value) query.set(key, value);
    else query.delete(key);
    router.replace(`/animators${query.size ? `?${query}` : ""}`, { scroll: false });
  }

  return (
    <>
      <div className="mt-8 grid gap-6 rounded-[28px] bg-white/80 p-5 ring-1 ring-black/5 sm:p-7 lg:grid-cols-2">
        <fieldset>
          <legend className="mb-3 text-lg font-black text-[var(--mp-ink)]">Для кого</legend>
          <div className="flex flex-wrap gap-2">
            {[{ value: undefined, label: "Все" }, ...ANIMATOR_AUDIENCES].map(item => (
              <button type="button" key={item.value ?? "all"} aria-pressed={audience === item.value} onClick={() => selectFilter("audience", item.value)} className={`${filterClass} ${audience === item.value ? "border-transparent bg-[var(--mp-lavender)] text-white" : "border-black/10 bg-white text-[var(--mp-ink)] hover:border-[var(--mp-lavender)]"}`}>
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-lg font-black text-[var(--mp-ink)]">Возраст ребёнка</legend>
          <div className="flex flex-wrap gap-2">
            {[{ value: undefined, label: "Любой" }, ...ANIMATOR_AGE_GROUPS].map(item => (
              <button type="button" key={item.value ?? "all"} aria-pressed={age === item.value} onClick={() => selectFilter("age", item.value)} className={`${filterClass} ${age === item.value ? "border-transparent bg-[var(--mp-lavender)] text-white" : "border-black/10 bg-white text-[var(--mp-ink)] hover:border-[var(--mp-lavender)]"}`}>
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4 text-sm text-black/60">
        <p role="status">Найдено героев — {filtered.length}</p>
        {(audience || age) && <button type="button" className="min-h-[44px] font-semibold text-[var(--mp-ink)] underline underline-offset-4" onClick={() => router.replace("/animators", { scroll: false })}>Сбросить фильтры</button>}
      </div>
      {filtered.length ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(animator => <AnimatorCard key={animator.id} animator={animator} />)}
        </div>
      ) : (
        <div className="mt-5 rounded-[28px] bg-white/70 p-8 text-center text-black/60">
          По выбранным параметрам пока нет героев. Попробуйте изменить фильтры или уточните программу у менеджера.
        </div>
      )}
    </>
  );
}
