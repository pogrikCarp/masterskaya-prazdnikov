export const HERO_SECTION = "hero";
export const STORY_SECTION = "story";
export const WHY_SECTION = "why";
export const ANIMATORS_SECTION = "animators";
export const SHOWS_SECTION = "shows";
export const QUESTS_SECTION = "quests";
export const WORKSHOPS_SECTION = "workshops";
export const EXTRA_SERVICES_SECTION = "extra-services";
export const BUILDER_SECTION = "builder";
export const INVITATIONS_SECTION = "invitations";
export const BUSINESS_SECTION = "business";
export const BUSINESS_BENEFITS_SECTION = "business-benefits";
export const CONTACT_SECTION = "contact";
export const GALLERY_SECTION = "gallery-cta";

export type HomeCardContent = {
  icon: string | null;
  title: string;
  text: string;
};

export type HomeSectionContent = {
  key: string;
  title: string;
  subtitle: string | null;
  cards: HomeCardContent[];
};

/** Иконки блока «Почему лучшие» рисуются в компоненте по этим ключам */
export const WHY_ICONS = ["balloon", "note", "bulb", "masks"] as const;

type SectionMeta = {
  /** Как блок называется в админке */
  label: string;
  /** Подсказка для поля «Иконка» */
  iconHint: string;
  /** Есть ли внутри блока карточки */
  hasCards: boolean;
  /** Подпись под заголовком */
  hasSubtitle: boolean;
};

export const HOME_SECTION_META: Record<string, SectionMeta> = {
  [HERO_SECTION]: {
    label: "Первый экран",
    iconHint: "не используется",
    hasCards: true,
    hasSubtitle: true,
  },
  [STORY_SECTION]: {
    label: "Ваш праздник — наша история",
    iconHint: "Эмодзи, например ✨ или ❤️",
    hasCards: true,
    hasSubtitle: true,
  },
  [WHY_SECTION]: {
    label: "Почему наши праздники «лучшие»",
    iconHint: "balloon, note, bulb, masks или эмодзи",
    hasCards: true,
    hasSubtitle: true,
  },
  [ANIMATORS_SECTION]: {
    label: "Аниматоры",
    iconHint: "не используется",
    hasCards: false,
    hasSubtitle: true,
  },
  [SHOWS_SECTION]: {
    label: "Шоу-программы",
    iconHint: "не используется",
    hasCards: false,
    hasSubtitle: true,
  },
  [QUESTS_SECTION]: {
    label: "Квесты",
    iconHint: "не используется",
    hasCards: false,
    hasSubtitle: true,
  },
  [WORKSHOPS_SECTION]: {
    label: "Мастер-классы",
    iconHint: "не используется",
    hasCards: false,
    hasSubtitle: true,
  },
  [EXTRA_SERVICES_SECTION]: {
    label: "Дополнительные услуги",
    iconHint: "Эмодзи, например 🎨",
    hasCards: true,
    hasSubtitle: true,
  },
  [BUILDER_SECTION]: {
    label: "Конструктор праздника",
    iconHint: "Эмодзи, например 🎉",
    hasCards: true,
    hasSubtitle: true,
  },
  [INVITATIONS_SECTION]: {
    label: "Пригласительные",
    iconHint: "Эмодзи, например 🎨",
    hasCards: true,
    hasSubtitle: true,
  },
  [BUSINESS_SECTION]: {
    label: "Для бизнеса — кому подходит",
    iconHint: "Эмодзи, например 🏫",
    hasCards: true,
    hasSubtitle: true,
  },
  [BUSINESS_BENEFITS_SECTION]: {
    label: "Для бизнеса — условия работы",
    iconHint: "не используется",
    hasCards: true,
    hasSubtitle: false,
  },
  [CONTACT_SECTION]: {
    label: "Форма заявки",
    iconHint: "не используется",
    hasCards: true,
    hasSubtitle: true,
  },
  [GALLERY_SECTION]: {
    label: "Приглашение в галерею",
    iconHint: "не используется",
    hasCards: false,
    hasSubtitle: true,
  },
};

/** Порядок блоков в админке совпадает с порядком на странице */
export const HOME_SECTION_KEYS = [
  HERO_SECTION,
  STORY_SECTION,
  WHY_SECTION,
  ANIMATORS_SECTION,
  SHOWS_SECTION,
  QUESTS_SECTION,
  WORKSHOPS_SECTION,
  EXTRA_SERVICES_SECTION,
  BUILDER_SECTION,
  INVITATIONS_SECTION,
  BUSINESS_SECTION,
  BUSINESS_BENEFITS_SECTION,
  CONTACT_SECTION,
  GALLERY_SECTION,
];

export const DEFAULT_HOME_CONTENT: Record<string, HomeSectionContent> = {
  [HERO_SECTION]: {
    key: HERO_SECTION,
    title: "Подарите ребенку сказку, а себе — отдых",
    subtitle: "Индивидуальные сценарии под психотип и особенности характера ребенка",
    cards: [
      { icon: null, title: "5,0", text: "средняя оценка по отзывам" },
      { icon: null, title: "24/7", text: "поддержка до и после праздника" },
    ],
  },
  [STORY_SECTION]: {
    key: STORY_SECTION,
    title: "Ваш праздник — наша история",
    subtitle: null,
    cards: [
      {
        icon: "✨",
        title: "Магия без хлопот",
        text: "В «Мастерской праздника Орлихиной и Сергиенко» мы не просто проводим праздники, а создаем историю, которая понравится именно вашему ребёнку. Наша цель — счастливый именинник и отдохнувшие родители, которые могут спокойно пообщаться, пока мы берем все заботы на себя.",
      },
      {
        icon: "❤️",
        title: "Индивидуальный подход",
        text: "В основе нашей работы — индивидуальный подход. Мы не используем шаблонные сценарии. Перед программой мы общаемся с Вами, чтобы узнать характер, интересы и особенности вашего ребенка. Это позволяет нам подобрать аниматора, который говорит с ребенком на одном языке, и создать сценарий, который вовлечет всех гостей.",
      },
    ],
  },
  [WHY_SECTION]: {
    key: WHY_SECTION,
    title: "Почему дети и родители называют наши праздники «лучшими»?",
    subtitle: null,
    cards: [
      {
        icon: "balloon",
        title: "Гибкость форматов",
        text: "Соберем праздник под любой бюджет: от 20-минутного экспресс-поздравления любимого героя до полной организации «под ключ» с поиском локации, кейтерингом и декором.",
      },
      {
        icon: "note",
        title: "Авторская концепция",
        text: "Индивидуальная программа праздника: мы учитываем психотип и характер вашего ребенка.",
      },
      {
        icon: "bulb",
        title: "Креативные идеи",
        text: "Мы постоянно улучшаем наши программы, исходя из трендов и современных новинок",
      },
      {
        icon: "masks",
        title: "Профессиональная команда",
        text: "За плечами наших аниматоров — педагогическое или актерское образование и сотни проведенных праздников.",
      },
    ],
  },
  [ANIMATORS_SECTION]: {
    key: ANIMATORS_SECTION,
    title: "Аниматоры - те самые любимые герои, только вживую",
    subtitle: "В нашей команде — только чуткие, веселые и опытные артисты.",
    cards: [],
  },
  [SHOWS_SECTION]: {
    key: SHOWS_SECTION,
    title: "Шоу, от которых ахает весь зал",
    subtitle:
      "Бумага, пузыри, свет и музыка — короткие вау‑номера, которые держат темп праздника.",
    cards: [],
  },
  [QUESTS_SECTION]: {
    key: QUESTS_SECTION,
    title: "Квесты с историей, а не набор конкурсов",
    subtitle:
      "Легенда, испытания и финал с наградой — дети проживают приключение, а не просто бегают по точкам.",
    cards: [],
  },
  [WORKSHOPS_SECTION]: {
    key: WORKSHOPS_SECTION,
    title: "Мастер‑классы",
    subtitle: "Коротко, ярко и с результатом: ребёнок уходит с готовой работой.",
    cards: [],
  },
  [EXTRA_SERVICES_SECTION]: {
    key: EXTRA_SERVICES_SECTION,
    title: "Дополнительные услуги",
    subtitle:
      "Добавьте к празднику дополнительные опции — соберите идеальную программу под ваш бюджет.",
    cards: [
      {
        icon: "🎨",
        title: "Аквагрим",
        text: "Профессиональный аквагрим — любой образ от простого до сложного.",
      },
      {
        icon: "💌",
        title: "Пригласительные для вашего праздника",
        text: "Красивый дизайн в стиле праздника — печатные или электронные.",
      },
      {
        icon: "🎉",
        title: "Календарные праздники",
        text: "Сезонные программы: Новый год, Масленица, 8 Марта и другие даты.",
      },
      {
        icon: "🎈",
        title: "Фигуры из шаров",
        text: "Твистинг — создаём фигуры из шаров: животные, цветы, мечи.",
      },
      {
        icon: "📸",
        title: "Фотограф",
        text: "Репортажная съёмка праздника — живые эмоции и кадры.",
      },
      {
        icon: "🎤",
        title: "Ведущий",
        text: "Профессиональный ведущий для программы любого формата.",
      },
    ],
  },
  [BUILDER_SECTION]: {
    key: BUILDER_SECTION,
    title: "Соберите идеальный праздник за пару минут",
    subtitle:
      "Выбирайте формат, возраст и дополнительные опции — мы сразу покажем итоговую стоимость и подскажем лучшие сочетания.",
    cards: [
      { icon: "🎉", title: "Выберите базовую программу", text: "" },
      { icon: "🧪", title: "Добавьте шоу, анимацию или мастер‑класс", text: "" },
      { icon: "💰", title: "Сразу увидите итоговую стоимость", text: "" },
    ],
  },
  [INVITATIONS_SECTION]: {
    key: INVITATIONS_SECTION,
    title: "Пригласительные для вашего праздника",
    subtitle:
      "Создаём красивые пригласительные в едином стиле с праздником — печатные или электронные. Любой формат, любая тематика.",
    cards: [
      { icon: "🎨", title: "Индивидуальный дизайн", text: "Под тематику праздника" },
      { icon: "📱", title: "Любой формат", text: "Печатные или электронные" },
      { icon: "⚡", title: "Быстрая подготовка", text: "2–3 дня на макет" },
      { icon: "💰", title: "Доступная цена", text: "от 500 ₽ за дизайн" },
    ],
  },
  [BUSINESS_SECTION]: {
    key: BUSINESS_SECTION,
    title: "Для бизнеса и организаций",
    subtitle:
      "Проводим праздники в детских садах, школах, развивающих центрах и на корпоративных мероприятиях. Работаем по договору, предоставляем все документы.",
    cards: [
      {
        icon: "🏫",
        title: "Детские сады",
        text: "Утренники, выпускные, тематические праздники для групп любого возраста.",
      },
      {
        icon: "📚",
        title: "Школы",
        text: "Праздники для начальных классов, выпускные, День знаний и другие события.",
      },
      {
        icon: "🎨",
        title: "Развивающие центры",
        text: "Регулярные мероприятия, мастер-классы, шоу-программы для ваших учеников.",
      },
      {
        icon: "🏢",
        title: "Корпоративы",
        text: "Семейные корпоративные праздники с детской программой и развлечениями.",
      },
    ],
  },
  [BUSINESS_BENEFITS_SECTION]: {
    key: BUSINESS_BENEFITS_SECTION,
    title: "Условия работы с организациями",
    subtitle: null,
    cards: [
      { icon: null, title: "Работа по договору", text: "Все документы и отчётность" },
      { icon: null, title: "Гибкие условия", text: "Скидки при регулярном сотрудничестве" },
      { icon: null, title: "Опытная команда", text: "Работаем с организациями 5+ лет" },
    ],
  },
  [CONTACT_SECTION]: {
    key: CONTACT_SECTION,
    title: "Поможем организовать праздник",
    subtitle:
      "Оставьте заявку — мы свяжемся с вами в течение 15 минут, обсудим детали и подберём идеальную программу под ваш бюджет и пожелания.",
    cards: [
      { icon: null, title: "Быстрый ответ", text: "Перезвоним в течение 15 минут" },
      { icon: null, title: "Индивидуальный подход", text: "Учтём все ваши пожелания" },
      { icon: null, title: "Прозрачная стоимость", text: "Без скрытых платежей" },
    ],
  },
  [GALLERY_SECTION]: {
    key: GALLERY_SECTION,
    title: "Посмотрите, как проходит праздник",
    subtitle:
      "Визуальный стиль — ключ к «вау‑эффекту». Подборка фото и видео помогает выбрать формат без лишних звонков.",
    cards: [],
  },
};
