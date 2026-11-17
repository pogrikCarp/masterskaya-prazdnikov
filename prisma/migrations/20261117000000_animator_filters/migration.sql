BEGIN;
SET LOCAL lock_timeout = '5s';

CREATE TYPE "AnimatorAudience" AS ENUM ('UNIVERSAL', 'BOYS', 'GIRLS');
CREATE TYPE "AnimatorAgeGroup" AS ENUM ('UP_TO_3', 'AGE_4_8', 'AGE_9_PLUS');

ALTER TABLE "Animator"
  ADD COLUMN "audience" "AnimatorAudience" NOT NULL DEFAULT 'UNIVERSAL',
  ADD COLUMN "ageGroups" "AnimatorAgeGroup"[] NOT NULL DEFAULT ARRAY[]::"AnimatorAgeGroup"[];

COMMIT;
