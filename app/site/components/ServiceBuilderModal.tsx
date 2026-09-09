"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "./Icon";
import { buttonClassName } from "./Button";

type Animator = {
  id: number;
  name: string;
  description: string | null;
  pricePerHour: number;
  popular: boolean;
};

type Quest = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  popular: boolean;
};

type Show = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  popular: boolean;
};

type MasterClass = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  popular: boolean;
};

type AdditionalService = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  popular: boolean;
};

const DURATION_OPTIONS = [
  { value: 1, label: "1 час" },
  { value: 1.5, label: "1.5 часа" },
  { value: 2, label: "2 часа" },
  { value: 2.5, label: "2.5 часа" },
  { value: 3, label: "3 часа" },
];

const selectClass =
  "w-full rounded-xl border border-black/10 bg-white/80 px-4 py-3 text-sm font-medium text-[var(--mp-ink)] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mp-lavender-rgb))]";

export default function ServiceBuilderModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Data from API
  const [animators, setAnimators] = useState<Animator[]>([]);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [masterClasses, setMasterClasses] = useState<MasterClass[]>([]);
  const [additionalServices, setAdditionalServices] = useState<AdditionalService[]>([]);
  const [loading, setLoading] = useState(true);

  // Selection state
  const [selectedAnimator, setSelectedAnimator] = useState<number | null>(null);
  const [duration, setDuration] = useState<number>(1);
  const [twoAnimators, setTwoAnimators] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<number | null>(null);
  const [selectedMasterClass, setSelectedMasterClass] = useState<number | null>(null);
  const [selectedShows, setSelectedShows] = useState<Set<number>>(new Set());
  const [selectedServices, setSelectedServices] = useState<Set<number>>(new Set());

  const asList = <T,>(payload: unknown): T[] => (Array.isArray(payload) ? payload : []);

  // Fetch data from API — полный каталог из админки, не только «хиты»
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [animatorsRes, questsRes, showsRes, masterClassesRes, servicesRes] = await Promise.all([
        fetch("/api/animators"),
        fetch("/api/quests"),
        fetch("/api/shows"),
        fetch("/api/master-classes"),
        fetch("/api/additional-services"),
      ]);

      const [animatorsData, questsData, showsData, masterClassesData, servicesData] = await Promise.all([
        animatorsRes.json(),
        questsRes.json(),
        showsRes.json(),
        masterClassesRes.json(),
        servicesRes.json(),
      ]);

      setAnimators(asList<Animator>(animatorsData));
      setQuests(asList<Quest>(questsData));
      setShows(asList<Show>(showsData));
      setMasterClasses(asList<MasterClass>(masterClassesData));
      setAdditionalServices(asList<AdditionalService>(servicesData));
    } catch (error) {
      console.error("Error fetching data:", error);
      setAnimators([]);
      setQuests([]);
      setShows([]);
      setMasterClasses([]);
      setAdditionalServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open, fetchData]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const toggleShow = (id: number) => {
    const newSet = new Set(selectedShows);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedShows(newSet);
  };

  const toggleService = (id: number) => {
    const newSet = new Set(selectedServices);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedServices(newSet);
  };

  // Calculate total price
  const total = useMemo(() => {
    let t = 0;

    // Animator price
    if (selectedAnimator) {
      const animator = animators.find((a) => a.id === selectedAnimator);
      if (animator) {
        t += animator.pricePerHour * duration * (twoAnimators ? 2 : 1);
      }
    }

    // Quest price
    if (selectedQuest) {
      const quest = quests.find((q) => q.id === selectedQuest);
      if (quest) t += quest.price;
    }

    // Master class price
    if (selectedMasterClass) {
      const mc = masterClasses.find((m) => m.id === selectedMasterClass);
      if (mc) t += mc.price;
    }

    // Shows price
    selectedShows.forEach((id) => {
      const show = shows.find((s) => s.id === id);
      if (show) t += show.price;
    });

    // Additional services price
    selectedServices.forEach((id) => {
      const service = additionalServices.find((s) => s.id === id);
      if (service) t += service.price;
    });

    return t;
  }, [
    selectedAnimator,
    animators,
    duration,
    twoAnimators,
    selectedQuest,
    quests,
    selectedMasterClass,
    masterClasses,
    selectedShows,
    shows,
    selectedServices,
    additionalServices,
  ]);

  const hasSelections =
    selectedAnimator != null ||
    selectedQuest != null ||
    selectedMasterClass != null ||
    selectedShows.size > 0 ||
    selectedServices.size > 0;

  // Build summary items
  const summaryItems = useMemo(() => {
    const items: { name: string; price: number }[] = [];

    if (selectedAnimator) {
      const animator = animators.find((a) => a.id === selectedAnimator);
      if (animator) {
        const animatorPrice = animator.pricePerHour * duration * (twoAnimators ? 2 : 1);
        items.push({
          name: `${animator.name} (${duration} ч${twoAnimators ? ", 2 аниматора" : ""})`,
          price: animatorPrice,
        });
      }
    }

    if (selectedQuest) {
      const quest = quests.find((q) => q.id === selectedQuest);
      if (quest) items.push({ name: quest.name, price: quest.price });
    }

    if (selectedMasterClass) {
      const mc = masterClasses.find((m) => m.id === selectedMasterClass);
      if (mc) items.push({ name: mc.name, price: mc.price });
    }

    selectedShows.forEach((id) => {
      const show = shows.find((s) => s.id === id);
      if (show) items.push({ name: show.name, price: show.price });
    });

    selectedServices.forEach((id) => {
      const service = additionalServices.find((s) => s.id === id);
      if (service) items.push({ name: service.name, price: service.price });
    });

    return items;
  }, [
    selectedAnimator,
    animators,
    duration,
    twoAnimators,
    selectedQuest,
    quests,
    selectedMasterClass,
    masterClasses,
    selectedShows,
    shows,
    selectedServices,
    additionalServices,
  ]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="min-h-full w-full flex items-start sm:items-center justify-center p-4">
        <div className="relative w-full max-w-[1100px] my-6">
          <div className="relative overflow-hidden rounded-[34px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.20)] max-h-[calc(100vh-3rem)] flex flex-col">
            <div className="absolute inset-0 opacity-90 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.20)_0%,rgba(255,255,255,0.88)_52%,rgba(214,249,239,0.40)_100%)]" />

            <div className="relative px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-black/10 bg-white/10 backdrop-blur-sm sticky top-0 z-[1]">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/5 text-black/80 hover:bg-black/10"
                aria-label="Закрыть"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>

              <div className="text-center">
                <div className="mt-4 text-[28px] sm:text-[36px] font-black tracking-tight text-[var(--mp-ink)]">
                  Соберите свой праздник
                </div>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 overflow-y-auto px-6 sm:px-8 pb-6 sm:pb-8">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-[rgb(var(--mp-lavender-rgb)_/_0.3)] border-t-[rgb(var(--mp-lavender-rgb))]" />
                </div>
              ) : (
                <div className="mt-6 grid gap-6 lg:grid-cols-12">
                  <div className="lg:col-span-8 space-y-7">
                    {/* Аниматор */}
                    <div>
                      <div className="mb-4">
                        <div className="text-lg font-black tracking-tight text-[var(--mp-ink)]">
                          Аниматор
                        </div>
                        <div className="mt-1 text-sm text-black/60">Выберите персонажа для праздника</div>
                      </div>

                      {animators.length === 0 ? (
                        <div className="rounded-xl bg-white/70 px-4 py-3 text-sm text-black/50 ring-1 ring-black/10">
                          Аниматоры появятся после добавления в админке
                        </div>
                      ) : (
                        <select
                          value={selectedAnimator ?? ""}
                          onChange={(e) =>
                            setSelectedAnimator(e.target.value ? Number(e.target.value) : null)
                          }
                          className={selectClass}
                        >
                          <option value="">Выберите аниматора</option>
                          {animators.map((animator) => (
                            <option key={animator.id} value={animator.id}>
                              {animator.name} — {animator.pricePerHour.toLocaleString("ru-RU")} ₽/ч
                            </option>
                          ))}
                        </select>
                      )}

                      {selectedAnimator && (
                        <div className="mt-4 flex flex-wrap gap-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-black/70">Длительность:</span>
                            <select
                              value={duration}
                              onChange={(e) => setDuration(Number(e.target.value))}
                              className="rounded-xl border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-[var(--mp-ink)] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mp-lavender-rgb))]"
                            >
                              {DURATION_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={twoAnimators}
                              onChange={(e) => setTwoAnimators(e.target.checked)}
                              className="h-5 w-5 rounded border-black/20 text-[rgb(var(--mp-lavender-rgb))] focus:ring-[rgb(var(--mp-lavender-rgb))]"
                            />
                            <span className="text-sm text-black/70">2 аниматора</span>
                          </label>
                        </div>
                      )}
                    </div>

                    {/* Квест */}
                    <div>
                      <div className="mb-4">
                        <div className="text-lg font-black tracking-tight text-[var(--mp-ink)]">
                          Квест
                        </div>
                        <div className="mt-1 text-sm text-black/60">Добавьте увлекательный квест</div>
                      </div>

                      <select
                        value={selectedQuest ?? ""}
                        onChange={(e) => setSelectedQuest(e.target.value ? Number(e.target.value) : null)}
                        className={selectClass}
                      >
                        <option value="">Без квеста</option>
                        {quests.map((quest) => (
                          <option key={quest.id} value={quest.id}>
                            {quest.name} — {quest.price.toLocaleString("ru-RU")} ₽
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Мастер-класс */}
                    <div>
                      <div className="mb-4">
                        <div className="text-lg font-black tracking-tight text-[var(--mp-ink)]">
                          Мастер-класс
                        </div>
                        <div className="mt-1 text-sm text-black/60">Творческие активности для детей</div>
                      </div>

                      <select
                        value={selectedMasterClass ?? ""}
                        onChange={(e) =>
                          setSelectedMasterClass(e.target.value ? Number(e.target.value) : null)
                        }
                        className={selectClass}
                      >
                        <option value="">Без мастер-класса</option>
                        {masterClasses.map((mc) => (
                          <option key={mc.id} value={mc.id}>
                            {mc.name} — {mc.price.toLocaleString("ru-RU")} ₽
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Шоу-программы */}
                    <div>
                      <div className="mb-4">
                        <div className="text-lg font-black tracking-tight text-[var(--mp-ink)]">
                          Шоу-программы
                        </div>
                        <div className="mt-1 text-sm text-black/60">Выберите одно или несколько шоу</div>
                      </div>

                      {shows.length === 0 ? (
                        <div className="rounded-xl bg-white/70 px-4 py-3 text-sm text-black/50 ring-1 ring-black/10">
                          Шоу появятся после добавления в админке
                        </div>
                      ) : (
                        <div className="overflow-hidden rounded-xl bg-white/80 ring-1 ring-black/10">
                          {shows.map((show, idx) => {
                            const checked = selectedShows.has(show.id);
                            return (
                              <label
                                key={show.id}
                                className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors ${
                                  idx > 0 ? "border-t border-black/8" : ""
                                } ${checked ? "bg-[rgb(var(--mp-lavender-rgb)_/_0.10)]" : "hover:bg-black/[0.03]"}`}
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleShow(show.id)}
                                  className="h-5 w-5 shrink-0 rounded border-black/20 accent-[var(--mp-lavender)]"
                                />
                                <span className="min-w-0 flex-1 text-sm font-semibold text-[var(--mp-ink)]">
                                  {show.name}
                                  <span className="mt-0.5 block text-xs font-normal text-black/50">
                                    {show.description || `${show.duration} мин`}
                                  </span>
                                </span>
                                <span className="shrink-0 text-sm font-black text-[var(--mp-ink)]">
                                  {show.price.toLocaleString("ru-RU")} ₽
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Дополнительные услуги */}
                    <div>
                      <div className="mb-4">
                        <div className="text-lg font-black tracking-tight text-[var(--mp-ink)]">
                          Дополнительные услуги
                        </div>
                        <div className="mt-1 text-sm text-black/60">Сделайте праздник ещё ярче</div>
                      </div>

                      {additionalServices.length === 0 ? (
                        <div className="rounded-xl bg-white/70 px-4 py-3 text-sm text-black/50 ring-1 ring-black/10">
                          Доп. услуги появятся после добавления в админке
                        </div>
                      ) : (
                        <div className="overflow-hidden rounded-xl bg-white/80 ring-1 ring-black/10">
                          {additionalServices.map((service, idx) => {
                            const checked = selectedServices.has(service.id);
                            return (
                              <label
                                key={service.id}
                                className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors ${
                                  idx > 0 ? "border-t border-black/8" : ""
                                } ${checked ? "bg-[rgb(var(--mp-lavender-rgb)_/_0.10)]" : "hover:bg-black/[0.03]"}`}
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleService(service.id)}
                                  className="h-5 w-5 shrink-0 rounded border-black/20 accent-[var(--mp-lavender)]"
                                />
                                <span className="min-w-0 flex-1 text-sm font-semibold text-[var(--mp-ink)]">
                                  {service.name}
                                  {service.description ? (
                                    <span className="mt-0.5 block text-xs font-normal text-black/50">
                                      {service.description}
                                    </span>
                                  ) : null}
                                </span>
                                <span className="shrink-0 text-sm font-black text-[var(--mp-ink)]">
                                  {service.price.toLocaleString("ru-RU")} ₽
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary sidebar */}
                  <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-6">
                      <div className="relative overflow-hidden rounded-[34px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] p-7">
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.18)_0%,rgba(255,255,255,0.85)_55%,rgba(255,107,138,0.08)_100%)]" />

                        <div className="relative">
                          <div className="text-xl font-black tracking-tight text-[var(--mp-ink)]">
                            Ваш праздник
                          </div>

                          {!hasSelections ? (
                            <div className="mt-3 text-sm text-black/60">
                              Выберите услуги, чтобы увидеть итоговую стоимость.
                            </div>
                          ) : (
                            <>
                              <div className="mt-5 space-y-2">
                                {summaryItems.map((item, idx) => (
                                  <div key={idx} className="flex items-center justify-between text-sm">
                                    <span className="text-black/70">{item.name}</span>
                                    <span className="font-semibold text-[var(--mp-ink)]">
                                      {item.price.toLocaleString()} ₽
                                    </span>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-5 border-t border-black/10 pt-5">
                                <div className="flex items-baseline justify-between">
                                  <span className="text-sm text-black/60">Итого:</span>
                                  <span className="text-3xl font-black text-[var(--mp-ink)]">
                                    {total.toLocaleString()} ₽
                                  </span>
                                </div>
                              </div>

                              <a
                                href={`https://t.me/masterskaya_prazdnika?text=${encodeURIComponent(
                                  `Здравствуйте! Хочу заказать праздник:\n${summaryItems
                                    .map((i) => `• ${i.name}`)
                                    .join("\n")}\n\nИтого: ${total.toLocaleString()} ₽`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={buttonClassName({
                                  variant: "primary",
                                  size: "lg",
                                  className: "mt-6 w-full",
                                })}
                              >
                                Оформить заказ
                              </a>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 text-xs text-black/45 text-center">
                        Закрыть: Esc или клик по фону
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
