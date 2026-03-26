/*
  Warnings:

  - You are about to drop the column `estimatedValue` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the `AssetPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssetPrice" DROP CONSTRAINT "AssetPrice_assetId_fkey";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "estimatedValue";

-- DropTable
DROP TABLE "AssetPrice";
