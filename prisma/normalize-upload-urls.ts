import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const tables = [
    "Animator",
    "Quest",
    "Show",
    "MasterClass",
    "AdditionalService",
    "GalleryItem",
  ];

  for (const table of tables) {
    await prisma.$executeRawUnsafe(`
      UPDATE "${table}"
      SET "imageUrl" = REPLACE("imageUrl", '/uploads/', '/api/uploads/')
      WHERE "imageUrl" LIKE '/uploads/%'
    `);
  }
}

main()
  .catch((error) => {
    console.error("Unable to normalize upload URLs:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
