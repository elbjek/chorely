-- AlterTable
ALTER TABLE "_UserHouseholds" ADD CONSTRAINT "_UserHouseholds_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_UserHouseholds_AB_unique";
