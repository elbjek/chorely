/*
  Warnings:

  - You are about to drop the `_ChoreHouseholds` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ChoreHouseholds" DROP CONSTRAINT "_ChoreHouseholds_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChoreHouseholds" DROP CONSTRAINT "_ChoreHouseholds_B_fkey";

-- DropTable
DROP TABLE "_ChoreHouseholds";

-- CreateTable
CREATE TABLE "household_chore" (
    "householdId" INTEGER NOT NULL,
    "choreId" INTEGER NOT NULL,

    CONSTRAINT "household_chore_pkey" PRIMARY KEY ("householdId","choreId")
);

-- AddForeignKey
ALTER TABLE "household_chore" ADD CONSTRAINT "household_chore_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "household"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "household_chore" ADD CONSTRAINT "household_chore_choreId_fkey" FOREIGN KEY ("choreId") REFERENCES "chore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
