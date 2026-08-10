"use client";

import { useState } from "react";
import Container from "./Container";

type ServiceOption = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: "base" | "animator" | "show" | "workshop" | "extra";
};

const serviceOptions: ServiceOption[] = [
  // Базовые пакеты
  { id: "express", title: "Экспресс-поздравление", description: "20 минут с аниматором", price: 3990, category: "base" },
  { id: "standard", title: "Стандарт", description: "1 час программы", price: 7990, category: "base" },
  { id: "premium", title: "Премиум", description: "2 часа программы", price: 14990, category: "base" },
  { id: "full", title: "Праздник под ключ", description: "3+ часа, всё включено", price: 29990, category: "base" },
  
  // Аниматоры
  { id: "animator-1", title: "+1 аниматор", description: "Дополнительный персонаж", price: 4000, category: "animator" },
  { id: "animator-2", title: "+2 аниматора", description: "Два дополнительных персонажа", price: 7500, category: "animator" },
  
  // Шоу-программы
  { id: "soap-show", title: "Мыльное шоу", description: "30 минут", price: 5000, category: "show" },
  { id: "paper-show", title: "Бумажное шоу", description: "20 минут", price: 4500, category: "show" },
  { id: "science-show", title: "Научное шоу", description: "40 минут", price: 6000, category: "show" },
  
  // Мастер-классы
  { id: "cookies", title: "Роспись пряников", description: "30 минут", price: 3000, category: "workshop" },
  { id: "slime", title: "Слаймы", description: "25 минут", price: 2500, category: "workshop" },
  
  // Дополнительно
  { id: "aquagrim", title: "Аквагрим", description: "На всех гостей", price: 2000, category: "extra" },
  { id: "balloons", title: "Фигуры из шаров", description: "На всех гостей", price: 1500, category: "extra" },
  { id: "photo", title: "Фотограф", description: "1 час съёмки", price: 5000, category: "extra" },
  { id: "music", title: "Музыкальное сопровождение", description: "Аппаратура + треки", price: 3000, category: "extra" },
];

export default function ServiceBuilderSection() {
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());

  const toggleOption = (id: string, category: string) => {
    if (category === "base") {
      setSelectedBase(selectedBase === id ? null : id);
    } else {
      const newSet = new Set(selectedOptions);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      setSelectedOptions(newSet);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    if (selectedBase) {
      const baseOption = serviceOptions.find(opt => opt.id === selectedBase);
      if (baseOption) total += baseOption.price;
    }
    selectedOptions.forEach(id => {
      const option = serviceOptions.find(opt => opt.id === id);
      if (option) total += option.price;
    });
    return total;
  };

  const total = calculateTotal();
  const hasSelections = selectedBase || selectedOptions.size > 0;

  const categories = [
    { key: "base", title: "Базовый пакет", subtitle: "Выберите один вариант" },
    { key: "animator", title: "Дополнительные аниматоры", subtitle: "Опционально" },
    { key: "show", title: "Шоу-программы", subtitle: "Добавьте по желанию" },
    { key: "workshop", title: "Мастер-классы", subtitle: "Творческие активности" },
    { key: "extra", title: "Дополнительные услуги", subtitle: "Сделайте праздник ярче" },
  ];

  return (
    <section id="service-builder" className="py-16 bg-[linear-gradient(180deg,rgb(var(--mp-lavender-rgb)_/_0.12)_0%,rgb(var(--mp-bg-rgb)_/_0)_100%)]">
      <Container className="max-w-[1320px]">
        <div className="text-center">
          <div className="inline-flex rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-black/70 ring-1 ring-black/10">
            Конструктор
          </div>
          <h2 className="mt-4 text-[34px] sm:text-[44px] font-black tracking-tight text-[var(--mp-ink)]">
            Соберите свой праздник
          </h2>
          <p className="mt-3 text-sm sm:text-base text-black/60 max-w-2xl mx-auto">
            От экспресс‑поздравления за 20 минут до праздника под ключ — выбирайте опции и
            смотрите итоговую стоимость.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {categories.map((cat) => {
              const options = serviceOptions.filter(opt => opt.category === cat.key);
              return (
                <div key={cat.key} className="mb-8">
                  <div className="mb-4">
                    <h3 className="text-xl font-black tracking-tight text-[var(--mp-ink)]">
                      {cat.title}
                    </h3>
                    <p className="mt-1 text-sm text-black/60">{cat.subtitle}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {options.map((option) => {
                      const isSelected = cat.key === "base" 
                        ? selectedBase === option.id 
                        : selectedOptions.has(option.id);

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => toggleOption(option.id, cat.key)}
                          className={`relative overflow-hidden rounded-[24px] p-5 text-left transition-all ${
                            isSelected
                              ? "bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.22)_0%,rgba(255,255,255,0.95)_100%)] ring-2 ring-[rgb(var(--mp-lavender-rgb)_/_1)] shadow-[0_18px_50px_rgb(var(--mp-lavender-rgb)_/_0.22)]"
                              : "bg-white/70 ring-1 ring-black/10 hover:bg-white hover:shadow-[0_12px_35px_rgba(17,24,39,0.08)]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="text-base font-black tracking-tight text-[var(--mp-ink)]">
                                {option.title}
                              </div>
                              <div className="mt-1 text-sm text-black/60">
                                {option.description}
                              </div>
                            </div>
                            <div className="shrink-0 text-base font-black text-[var(--mp-ink)]">
                              {option.price.toLocaleString()} ₽
                            </div>
                          </div>

                          {isSelected && (
                            <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[rgb(var(--mp-lavender-rgb)_/_1)] text-white">
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="relative overflow-hidden rounded-[34px] bg-white/70 ring-1 ring-black/10 shadow-[0_26px_80px_rgba(17,24,39,0.10)] p-7">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(var(--mp-lavender-rgb)_/_0.18)_0%,rgba(255,255,255,0.85)_55%,rgba(255,107,138,0.08)_100%)]" />
                
                <div className="relative">
                  <h3 className="text-xl font-black tracking-tight text-[var(--mp-ink)]">
                    Ваш праздник
                  </h3>

                  {!hasSelections ? (
                    <p className="mt-3 text-sm text-black/60">
                      Выберите базовый пакет и дополнительные опции, чтобы увидеть итоговую
                      стоимость.
                    </p>
                  ) : (
                    <>
                      <div className="mt-5 space-y-2">
                        {selectedBase && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-black/70">
                              {serviceOptions.find(opt => opt.id === selectedBase)?.title}
                            </span>
                            <span className="font-semibold text-[var(--mp-ink)]">
                              {serviceOptions.find(opt => opt.id === selectedBase)?.price.toLocaleString()} ₽
                            </span>
                          </div>
                        )}
                        {Array.from(selectedOptions).map(id => {
                          const option = serviceOptions.find(opt => opt.id === id);
                          return option ? (
                            <div key={id} className="flex items-center justify-between text-sm">
                              <span className="text-black/70">{option.title}</span>
                              <span className="font-semibold text-[var(--mp-ink)]">
                                {option.price.toLocaleString()} ₽
                              </span>
                            </div>
                          ) : null;
                        })}
                      </div>

                      <div className="mt-5 border-t border-black/10 pt-5">
                        <div className="flex items-baseline justify-between">
                          <span className="text-sm text-black/60">Итого:</span>
                          <span className="text-3xl font-black text-[var(--mp-ink)]">
                            {total.toLocaleString()} ₽
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="mt-6 w-full inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold bg-[var(--mp-accent)] text-[var(--mp-ink)] shadow-[0_18px_40px_rgba(255,196,0,0.25)] hover:shadow-[0_22px_50px_rgba(255,196,0,0.35)] transition-shadow"
                      >
                        Оформить заказ
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
