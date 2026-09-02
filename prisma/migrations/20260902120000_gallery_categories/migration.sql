-- CreateTable
CREATE TABLE "GalleryCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GalleryCategory_name_key" ON "GalleryCategory"("name");

-- AlterTable
ALTER TABLE "GalleryItem" ADD COLUMN "categoryId" INTEGER;

-- Migrate existing free-text categories into GalleryCategory
INSERT INTO "GalleryCategory" ("name", "order", "active", "createdAt", "updatedAt")
SELECT DISTINCT TRIM("category"), 0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "GalleryItem"
WHERE "category" IS NOT NULL AND TRIM("category") <> '';

UPDATE "GalleryItem" AS gi
SET "categoryId" = gc."id"
FROM "GalleryCategory" AS gc
WHERE gi."category" IS NOT NULL
  AND TRIM(gi."category") = gc."name";

-- Drop legacy free-text category column
ALTER TABLE "GalleryItem" DROP COLUMN "category";

-- AddForeignKey
ALTER TABLE "GalleryItem" ADD CONSTRAINT "GalleryItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GalleryCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
