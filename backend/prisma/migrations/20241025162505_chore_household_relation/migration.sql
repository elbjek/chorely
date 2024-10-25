/*
  Warnings:

  - You are about to drop the `_ChoreToHousehold` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ChoreToHousehold" DROP CONSTRAINT "_ChoreToHousehold_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChoreToHousehold" DROP CONSTRAINT "_ChoreToHousehold_B_fkey";

-- DropTable
DROP TABLE "_ChoreToHousehold";

-- CreateTable
CREATE TABLE "_ChoreHouseholds" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChoreHouseholds_AB_unique" ON "_ChoreHouseholds"("A", "B");

-- CreateIndex
CREATE INDEX "_ChoreHouseholds_B_index" ON "_ChoreHouseholds"("B");

-- AddForeignKey
ALTER TABLE "_ChoreHouseholds" ADD CONSTRAINT "_ChoreHouseholds_A_fkey" FOREIGN KEY ("A") REFERENCES "chore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChoreHouseholds" ADD CONSTRAINT "_ChoreHouseholds_B_fkey" FOREIGN KEY ("B") REFERENCES "household"("id") ON DELETE CASCADE ON UPDATE CASCADE;
