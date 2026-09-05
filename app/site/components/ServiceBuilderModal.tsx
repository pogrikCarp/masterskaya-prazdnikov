"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "./Icon";

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

  // Fetch data from API
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [animatorsRes, questsRes, showsRes, masterClassesRes, servicesRes] = await Promise.all([
        fetch("/api/animators?popular=true"),
        fetch("/api/quests?popular=true"),
        fetch("/api/shows"),
        fetch("/api/master-classes?popular=true"),
        fetch("/api/additional-services"),
      ]);

      const [animatorsData, questsData, showsData, masterClassesData, servicesData] = await Promise.all([
        animatorsRes.json(),
        questsRes.json(),
        showsRes.json(),
        masterClassesRes.json(),
        servicesRes.json(),
      ]);

      setAnimators(animatorsData);
      setQuests(questsData);
      setShows(showsData);
      setMasterClasses(masterClassesData);
      setAdditionalServices(servicesData);
    } catch (error) {
      console.error("Error fetching data:", error);
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

                      <div className="grid gap-3 sm:grid-cols-2">
                        {animators.map((animator) => (
                          <button
                            key={animator.id}
                            type="button"
                            onClick={() =>
                              setSelectedAnimator(selectedAnimator === animator.id ? null : animator.id)
                            }
                            className={`relative overflow-hidden rounded-[24px] p-5 text-left transition-all ${
                              selectedAnimator === animator.id
                                ? "bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.22)_0%,rgba(255,255,255,0.95)_100%)] ring-2 ring-[rgb(var(--mp-lavender-rgb)_/_1)] shadow-[0_18px_50px_rgb(var(--mp-lavender-rgb)_/_0.22)]"
                                : "bg-white/70 ring-1 ring-black/10 hover:bg-white hover:shadow-[0_12px_35px_rgba(17,24,39,0.08)]"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="text-base font-black tracking-tight text-[var(--mp-ink)]">
                                  {animator.name}
                                </div>
                                <div className="mt-1 text-sm text-black/60">
                                  {animator.description || "Популярный персонаж"}
                                </div>
                              </div>
                              <div className="shrink-0 text-base font-black text-[var(--mp-ink)]">
                                {animator.pricePerHour.toLocaleString()} ₽/ч
                              </div>
                            </div>
                            {selectedAnimator === animator.id && (
                              <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_1)] text-white">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>

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
                        className="w-full rounded-xl border border-black/10 bg-white/80 px-4 py-3 text-sm font-medium text-[var(--mp-ink)] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mp-lavender-rgb))]"
                      >
                        <option value="">Без квеста</option>
                        {quests.map((quest) => (
                          <option key={quest.id} value={quest.id}>
                            {quest.name} — {quest.price.toLocaleString()} ₽
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
                        className="w-full rounded-xl border border-black/10 bg-white/80 px-4 py-3 text-sm font-medium text-[var(--mp-ink)] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mp-lavender-rgb))]"
                      >
                        <option value="">Без мастер-класса</option>
                        {masterClasses.map((mc) => (
                          <option key={mc.id} value={mc.id}>
                            {mc.name} — {mc.price.toLocaleString()} ₽
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

                      <div className="grid gap-3 sm:grid-cols-2">
                        {shows.map((show) => (
                          <button
                            key={show.id}
                            type="button"
                            onClick={() => toggleShow(show.id)}
                            className={`relative overflow-hidden rounded-[24px] p-5 text-left transition-all ${
                              selectedShows.has(show.id)
                                ? "bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.22)_0%,rgba(255,255,255,0.95)_100%)] ring-2 ring-[rgb(var(--mp-lavender-rgb)_/_1)] shadow-[0_18px_50px_rgb(var(--mp-lavender-rgb)_/_0.22)]"
                                : "bg-white/70 ring-1 ring-black/10 hover:bg-white hover:shadow-[0_12px_35px_rgba(17,24,39,0.08)]"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="text-base font-black tracking-tight text-[var(--mp-ink)]">
                                  {show.name}
                                </div>
                                <div className="mt-1 text-sm text-black/60">
                                  {show.description || `${show.duration} мин`}
                                </div>
                              </div>
                              <div className="shrink-0 text-base font-black text-[var(--mp-ink)]">
                                {show.price.toLocaleString()} ₽
                              </div>
                            </div>
                            {selectedShows.has(show.id) && (
                              <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_1)] text-white">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Дополнительные услуги */}
                    <div>
                      <div className="mb-4">
                        <div className="text-lg font-black tracking-tight text-[var(--mp-ink)]">
                          Дополнительные услуги
                        </div>
                        <div className="mt-1 text-sm text-black/60">Сделайте праздник ещё ярче</div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {additionalServices.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => toggleService(service.id)}
                            className={`relative overflow-hidden rounded-[24px] p-5 text-left transition-all ${
                              selectedServices.has(service.id)
                                ? "bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.22)_0%,rgba(255,255,255,0.95)_100%)] ring-2 ring-[rgb(var(--mp-lavender-rgb)_/_1)] shadow-[0_18px_50px_rgb(var(--mp-lavender-rgb)_/_0.22)]"
                                : "bg-white/70 ring-1 ring-black/10 hover:bg-white hover:shadow-[0_12px_35px_rgba(17,24,39,0.08)]"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="text-base font-black tracking-tight text-[var(--mp-ink)]">
                                  {service.name}
                                </div>
                                <div className="mt-1 text-sm text-black/60">
                                  {service.description || "Дополнительная услуга"}
                                </div>
                              </div>
                              <div className="shrink-0 text-base font-black text-[var(--mp-ink)]">
                                {service.price.toLocaleString()} ₽
                              </div>
                            </div>
                            {selectedServices.has(service.id) && (
                              <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_1)] text-white">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
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
                                className="mt-6 w-full inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold bg-[var(--mp-accent)] text-[var(--mp-ink)] shadow-[0_18px_40px_rgba(255,196,0,0.25)] hover:shadow-[0_22px_50px_rgba(255,196,0,0.35)] transition-shadow"
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
