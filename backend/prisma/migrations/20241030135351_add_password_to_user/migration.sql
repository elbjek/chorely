/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "password" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_password_key" ON "user"("password");
