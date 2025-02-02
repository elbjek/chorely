-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_householdId_fkey";

-- CreateTable
CREATE TABLE "_UserHouseholds" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserHouseholds_AB_unique" ON "_UserHouseholds"("A", "B");

-- CreateIndex
CREATE INDEX "_UserHouseholds_B_index" ON "_UserHouseholds"("B");

-- AddForeignKey
ALTER TABLE "_UserHouseholds" ADD CONSTRAINT "_UserHouseholds_A_fkey" FOREIGN KEY ("A") REFERENCES "household"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserHouseholds" ADD CONSTRAINT "_UserHouseholds_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
