import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: `file:${process.cwd()}/prisma/dev.db`,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Аниматоры
  const animators = [
    { name: "Человек-паук", description: "Супергерой для активных праздников", pricePerHour: 5000, popular: true },
    { name: "Эльза", description: "Принцесса из Холодного сердца", pricePerHour: 5000, popular: true },
    { name: "Пират Джек Воробей", description: "Капитан пиратского корабля", pricePerHour: 5500, popular: true },
    { name: "Единорог", description: "Волшебный персонаж для девочек", pricePerHour: 4500, popular: true },
    { name: "Minecraft Стив", description: "Герой популярной игры", pricePerHour: 5000, popular: true },
    { name: "Among Us", description: "Космический персонаж", pricePerHour: 5000, popular: true },
    { name: "Леди Баг", description: "Супергероиня из мультфильма", pricePerHour: 5000, popular: false },
    { name: "Щенячий патруль", description: "Герои мультсериала", pricePerHour: 4500, popular: false },
  ];

  for (const animator of animators) {
    await prisma.animator.upsert({
      where: { id: animators.indexOf(animator) + 1 },
      update: animator,
      create: animator,
    });
  }

  // Квесты
  const quests = [
    { name: "Форт Боярд", description: "Испытания на ловкость и смекалку", price: 8000, duration: 90, minAge: 7, popular: true },
    { name: "Детективный квест", description: "Расследование загадочного дела", price: 7500, duration: 60, minAge: 8, popular: true },
    { name: "Квест Minecraft", description: "Приключения в мире кубов", price: 7000, duration: 60, minAge: 6, popular: true },
    { name: "Квест Among Us", description: "Найди предателя среди нас", price: 7000, duration: 60, minAge: 7, popular: true },
    { name: "Пиратский квест", description: "Поиск сокровищ", price: 7500, duration: 75, minAge: 6, popular: false },
    { name: "Квест Гарри Поттер", description: "Магические испытания", price: 8000, duration: 90, minAge: 7, popular: false },
  ];

  for (const quest of quests) {
    await prisma.quest.upsert({
      where: { id: quests.indexOf(quest) + 1 },
      update: quest,
      create: quest,
    });
  }

  // Шоу-программы
  const shows = [
    { name: "Крио-шоу", description: "Шоу с жидким азотом", price: 6000, duration: 30, popular: true },
    { name: "Тесла-шоу", description: "Электрическое шоу", price: 7000, duration: 30, popular: true },
    { name: "Химическое шоу", description: "Яркие химические опыты", price: 5500, duration: 30, popular: true },
    { name: "Бумажное шоу", description: "Море бумажных конфетти", price: 4000, duration: 20, popular: true },
    { name: "Шоу мыльных пузырей", description: "Гигантские мыльные пузыри", price: 4500, duration: 25, popular: true },
    { name: "Фокусы", description: "Магическое шоу иллюзий", price: 5000, duration: 30, popular: false },
    { name: "Неоновое шоу", description: "Светящееся представление", price: 6000, duration: 25, popular: false },
  ];

  for (const show of shows) {
    await prisma.show.upsert({
      where: { id: shows.indexOf(show) + 1 },
      update: show,
      create: show,
    });
  }

  // Мастер-классы
  const masterClasses = [
    { name: "Слаймы", description: "Создание слаймов своими руками", price: 3500, duration: 45, minAge: 5, popular: true },
    { name: "Роспись футболок", description: "Роспись футболок акриловыми красками", price: 4000, duration: 60, minAge: 6, popular: true },
    { name: "Мыловарение", description: "Создание мыла ручной работы", price: 3500, duration: 45, minAge: 6, popular: true },
    { name: "Свечеварение", description: "Изготовление свечей", price: 3500, duration: 45, minAge: 7, popular: true },
    { name: "Роспись пряников", description: "Декорирование пряников глазурью", price: 3000, duration: 40, minAge: 5, popular: false },
    { name: "Создание украшений", description: "Бижутерия своими руками", price: 3500, duration: 50, minAge: 7, popular: false },
  ];

  for (const mc of masterClasses) {
    await prisma.masterClass.upsert({
      where: { id: masterClasses.indexOf(mc) + 1 },
      update: mc,
      create: mc,
    });
  }

  // Дополнительные услуги
  const additionalServices = [
    { name: "Аквагрим", description: "Рисунки на лице", price: 3000, popular: true },
    { name: "Фотограф", description: "Профессиональная фотосъёмка", price: 5000, popular: true },
    { name: "Видеосъёмка", description: "Видеозапись праздника", price: 7000, popular: false },
    { name: "Шарики с гелием", description: "Воздушные шары (10 шт)", price: 1500, popular: true },
    { name: "Пиньята", description: "Пиньята с конфетами", price: 2500, popular: true },
    { name: "Candy Bar", description: "Сладкий стол", price: 5000, popular: false },
    { name: "Торт на заказ", description: "Тематический торт", price: 4000, popular: false },
    { name: "Аренда костюмов", description: "Костюмы для гостей", price: 3000, popular: false },
  ];

  for (const service of additionalServices) {
    await prisma.additionalService.upsert({
      where: { id: additionalServices.indexOf(service) + 1 },
      update: service,
      create: service,
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
