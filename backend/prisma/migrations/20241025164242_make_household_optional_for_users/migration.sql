-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_householdId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "householdId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "household"("id") ON DELETE SET NULL ON UPDATE CASCADE;
