ALTER TABLE "Quest"
  ADD COLUMN "imageUrls" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "priceFrom" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "Show"
  ADD COLUMN "imageUrls" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "priceFrom" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "MasterClass"
  ADD COLUMN "imageUrls" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "priceFrom" BOOLEAN NOT NULL DEFAULT false;

-- Keep the existing cover as the first photo of each program.
UPDATE "Quest" SET "imageUrls" = ARRAY[regexp_replace("imageUrl", '^/uploads/', '/api/uploads/')]
  WHERE "imageUrl" IS NOT NULL AND "imageUrl" <> '';
UPDATE "Show" SET "imageUrls" = ARRAY[regexp_replace("imageUrl", '^/uploads/', '/api/uploads/')]
  WHERE "imageUrl" IS NOT NULL AND "imageUrl" <> '';
UPDATE "MasterClass" SET "imageUrls" = ARRAY[regexp_replace("imageUrl", '^/uploads/', '/api/uploads/')]
  WHERE "imageUrl" IS NOT NULL AND "imageUrl" <> '';
