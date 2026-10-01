export type NavItem = {
  label: string;
  href: string;
};

/** Единое меню для шапок сайта. Якоря ведут на блоки главной страницы. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Аниматоры", href: "#services" },
  { label: "Шоу", href: "#shows" },
  { label: "Квесты", href: "#quests" },
  { label: "Мастер-классы", href: "#workshops" },
  { label: "Готовые программы", href: "#combo-programs" },
  { label: "Конструктор праздника", href: "#service-builder" },
  { label: "Фотогалерея", href: "/gallery" },
  { label: "Контакты", href: "#contacts" },
];
