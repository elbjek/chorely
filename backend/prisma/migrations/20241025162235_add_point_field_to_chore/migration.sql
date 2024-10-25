/*
  Warnings:

  - Added the required column `point` to the `chore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chore" ADD COLUMN     "point" INTEGER NOT NULL;
