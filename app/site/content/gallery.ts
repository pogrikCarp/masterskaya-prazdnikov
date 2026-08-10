export type GalleryCategory =
  | "Домашние мероприятия"
  | "Выносные мероприятия"
  | "Уличные мероприятия"
  | "Тематические вечеринки";

export type GalleryItem = {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  category: GalleryCategory;
  place: string;
};

export const galleryCategories: { id: "all" | GalleryCategory; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "Домашние мероприятия", label: "Домашние мероприятия" },
  { id: "Выносные мероприятия", label: "Выносные мероприятия" },
  { id: "Уличные мероприятия", label: "Уличные мероприятия" },
  { id: "Тематические вечеринки", label: "Тематические вечеринки" },
];

const u = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: u("photo-1513151233558-d860c5398176", 2200, 1500),
    thumb: u("photo-1513151233558-d860c5398176", 900, 600),
    alt: "Шоу-программа на празднике",
    category: "Тематические вечеринки",
    place: "Москва",
  },
  {
    id: "g2",
    src: u("photo-1527529482837-4698179dc6ce", 2200, 1600),
    thumb: u("photo-1527529482837-4698179dc6ce", 900, 650),
    alt: "Декор и атмосфера",
    category: "Домашние мероприятия",
    place: "Подмосковье",
  },
  {
    id: "g3",
    src: u("photo-1529626455594-4ff0802cfb7e", 2200, 1700),
    thumb: u("photo-1529626455594-4ff0802cfb7e", 900, 700),
    alt: "Портрет в тёплом свете",
    category: "Домашние мероприятия",
    place: "Студия",
  },
  {
    id: "g4",
    src: u("photo-1526481280695-3c687fd5432c", 2200, 1500),
    thumb: u("photo-1526481280695-3c687fd5432c", 900, 610),
    alt: "Движение и эмоции",
    category: "Выносные мероприятия",
    place: "Выездная площадка",
  },
  {
    id: "g5",
    src: u("photo-1517457373958-b7bdd4587205", 2200, 1600),
    thumb: u("photo-1517457373958-b7bdd4587205", 900, 650),
    alt: "Закат и праздничные огни",
    category: "Уличные мероприятия",
    place: "Открытая терраса",
  },
  {
    id: "g6",
    src: u("photo-1520975916090-3105956dac38", 2200, 1700),
    thumb: u("photo-1520975916090-3105956dac38", 900, 700),
    alt: "Командная работа",
    category: "Выносные мероприятия",
    place: "Москва",
  },
  {
    id: "g7",
    src: u("photo-1520975693411-6d94e4d0e04b", 2200, 1550),
    thumb: u("photo-1520975693411-6d94e4d0e04b", 900, 635),
    alt: "Портрет у окна",
    category: "Домашние мероприятия",
    place: "Лофт",
  },
  {
    id: "g8",
    src: u("photo-1500530855697-b586d89ba3ee", 2200, 1650),
    thumb: u("photo-1500530855697-b586d89ba3ee", 900, 675),
    alt: "Танцы и движение",
    category: "Тематические вечеринки",
    place: "Танцпол",
  },
  {
    id: "g9",
    src: u("photo-1500534314209-a25ddb2bd429", 2200, 1600),
    thumb: u("photo-1500534314209-a25ddb2bd429", 900, 650),
    alt: "Силуэты на фоне света",
    category: "Уличные мероприятия",
    place: "Парк",
  },
  {
    id: "g10",
    src: u("photo-1519677100203-a0e668c92439", 2200, 1500),
    thumb: u("photo-1519677100203-a0e668c92439", 900, 610),
    alt: "Праздничный стол",
    category: "Домашние мероприятия",
    place: "Ресторан",
  }
];
