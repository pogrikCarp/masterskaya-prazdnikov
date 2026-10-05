import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const HERO_SUBTITLE =
  "К каждому празднику — индивидуальный подход. Мы адаптируем программу исходя из характера Вашего ребенка и атмосферы праздника.";

const WHY_CONCEPT =
  "Мы адаптируем программу исходя из характера Вашего ребенка и атмосферы праздника.";

async function main() {
  await prisma.homeSection.updateMany({
    where: { key: "hero" },
    data: { subtitle: HERO_SUBTITLE },
  });

  await prisma.homeSection.updateMany({
    where: { key: "quests" },
    data: {
      title: "Квесты: Вместе в приключение!",
      subtitle: "Идеальный способ сплотить детей в одну команду.",
    },
  });

  await prisma.homeSection.updateMany({
    where: { key: "workshops" },
    data: {
      title: "Мастер-классы: создаем красоту своими руками",
      subtitle:
        "Переключите внимание детей на творчество! Увлекательный мастер-класс станет отличным дополнением к программе и подарком для гостей — каждый унесет с собой поделку.",
    },
  });

  await prisma.homeSection.updateMany({
    where: { key: "invitations" },
    data: {
      subtitle:
        "Специально для Ваших гостей мы создадим персонализированные пригласительные в едином стиле праздника! Пригласительные помогут создать нужное настроение и позвать тех, кто вам по-настоящему дорог — родных, друзей и самых близких.",
    },
  });

  await prisma.homeSection.updateMany({
    where: { key: "builder" },
    data: {
      subtitle:
        "Настройте программу под себя: выберите формат, наполнение программы и дополнительные опции — калькулятор сразу покажет итоговую стоимость, а мы подскажем лучшие сочетания!",
    },
  });

  await prisma.homeCard.updateMany({
    where: { sectionKey: "why", title: "Авторская концепция" },
    data: { text: WHY_CONCEPT },
  });

  await prisma.homeCard.updateMany({
    where: { sectionKey: "invitations", title: "Индивидуальный дизайн" },
    data: { text: "В тематике праздника" },
  });

  await prisma.homeCard.updateMany({
    where: { sectionKey: "invitations", title: { in: ["Любой формат", "Персонализация"] } },
    data: { title: "Персонализация", text: "Именно для Ваших гостей" },
  });

  await prisma.homeCard.updateMany({
    where: { sectionKey: "invitations", title: "Быстрая подготовка" },
    data: { text: "В течение 1–2 дней" },
  });

  await prisma.homeCard.updateMany({
    where: {
      sectionKey: "invitations",
      title: { in: ["Доступная цена", "Абсолютно бесплатно"] },
    },
    data: { title: "Абсолютно бесплатно", text: "Подарок для наших клиентов" },
  });

  console.log("Homepage copy synced");
}

main()
  .catch((error) => {
    console.error("Unable to sync homepage copy:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
