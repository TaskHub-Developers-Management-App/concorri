/*
  Warnings:

  - Added the required column `purchase_price` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "purchase_price" DOUBLE PRECISION NOT NULL;
