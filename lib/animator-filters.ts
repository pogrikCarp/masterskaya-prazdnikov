export const ANIMATOR_AUDIENCES = [
  { value: "UNIVERSAL", label: "Универсальные" },
  { value: "BOYS", label: "Для мальчиков" },
  { value: "GIRLS", label: "Для девочек" },
] as const;

export const ANIMATOR_AGE_GROUPS = [
  { value: "UP_TO_3", label: "До 3 лет" },
  { value: "AGE_4_8", label: "4–8 лет" },
  { value: "AGE_9_PLUS", label: "От 9 лет" },
] as const;

export type AnimatorAudience = (typeof ANIMATOR_AUDIENCES)[number]["value"];
export type AnimatorAgeGroup = (typeof ANIMATOR_AGE_GROUPS)[number]["value"];

export type AnimatorSummary = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  pricePerHour: number;
  popular: boolean;
  audience: AnimatorAudience;
  ageGroups: AnimatorAgeGroup[];
};

export function parseAnimatorFilters(data: { audience?: unknown; ageGroups?: unknown }) {
  if (data.audience !== undefined && !ANIMATOR_AUDIENCES.some(item => item.value === data.audience)) {
    throw new Error("Выберите категорию аниматора из списка");
  }
  if (data.ageGroups !== undefined && (
    !Array.isArray(data.ageGroups) ||
    data.ageGroups.some(value => !ANIMATOR_AGE_GROUPS.some(item => item.value === value))
  )) {
    throw new Error("Выберите возрастные группы из списка");
  }
  return {
    audience: data.audience as AnimatorAudience | undefined,
    ageGroups: data.ageGroups === undefined ? undefined : [...new Set(data.ageGroups as AnimatorAgeGroup[])],
  };
}
