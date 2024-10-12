/*
  Warnings:

  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quantity",
ALTER COLUMN "price" SET DATA TYPE TEXT,
ALTER COLUMN "stock" SET DATA TYPE TEXT;
