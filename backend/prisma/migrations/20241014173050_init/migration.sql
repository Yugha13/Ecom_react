/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shipping" TEXT NOT NULL DEFAULT '30',
ADD COLUMN     "subtotal" TEXT,
ALTER COLUMN "totalAmount" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "quantity" TEXT NOT NULL DEFAULT '1';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
ADD COLUMN     "pincode" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "street" TEXT;
