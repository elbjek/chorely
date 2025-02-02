-- AlterTable
ALTER TABLE "chore" ADD COLUMN     "completedById" INTEGER;

-- AddForeignKey
ALTER TABLE "chore" ADD CONSTRAINT "chore_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
