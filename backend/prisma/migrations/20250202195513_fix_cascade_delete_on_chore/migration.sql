-- DropForeignKey
ALTER TABLE "household_chore" DROP CONSTRAINT "household_chore_choreId_fkey";

-- DropForeignKey
ALTER TABLE "household_chore" DROP CONSTRAINT "household_chore_householdId_fkey";

-- AddForeignKey
ALTER TABLE "household_chore" ADD CONSTRAINT "household_chore_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "household"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "household_chore" ADD CONSTRAINT "household_chore_choreId_fkey" FOREIGN KEY ("choreId") REFERENCES "chore"("id") ON DELETE CASCADE ON UPDATE CASCADE;
