/*
  Warnings:

  - You are about to drop the `Chore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Household` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Points` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HouseholdToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chore" DROP CONSTRAINT "Chore_userId_fkey";

-- DropForeignKey
ALTER TABLE "Points" DROP CONSTRAINT "Points_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ChoreToHousehold" DROP CONSTRAINT "_ChoreToHousehold_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChoreToHousehold" DROP CONSTRAINT "_ChoreToHousehold_B_fkey";

-- DropForeignKey
ALTER TABLE "_HouseholdToUser" DROP CONSTRAINT "_HouseholdToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_HouseholdToUser" DROP CONSTRAINT "_HouseholdToUser_B_fkey";

-- DropTable
DROP TABLE "Chore";

-- DropTable
DROP TABLE "Household";

-- DropTable
DROP TABLE "Points";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_HouseholdToUser";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "householdId" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chore" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "chore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "household" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "household_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "point" (
    "id" SERIAL NOT NULL,
    "points" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "point_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "household"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chore" ADD CONSTRAINT "chore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point" ADD CONSTRAINT "point_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChoreToHousehold" ADD CONSTRAINT "_ChoreToHousehold_A_fkey" FOREIGN KEY ("A") REFERENCES "chore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChoreToHousehold" ADD CONSTRAINT "_ChoreToHousehold_B_fkey" FOREIGN KEY ("B") REFERENCES "household"("id") ON DELETE CASCADE ON UPDATE CASCADE;
