/*
  Warnings:

  - You are about to drop the column `portfolioId` on the `PortfolioSnapshot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,date]` on the table `PortfolioSnapshot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `PortfolioSnapshot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PortfolioSnapshot" DROP CONSTRAINT "PortfolioSnapshot_portfolioId_fkey";

-- DropIndex
DROP INDEX "PortfolioSnapshot_portfolioId_date_key";

-- DropIndex
DROP INDEX "PortfolioSnapshot_portfolioId_idx";

-- AlterTable
ALTER TABLE "PortfolioSnapshot" DROP COLUMN "portfolioId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "PortfolioSnapshot_userId_idx" ON "PortfolioSnapshot"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioSnapshot_userId_date_key" ON "PortfolioSnapshot"("userId", "date");

-- AddForeignKey
ALTER TABLE "PortfolioSnapshot" ADD CONSTRAINT "PortfolioSnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
