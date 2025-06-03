/*
  Warnings:

  - Added the required column `coupon_price` to the `Lottery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lottery" ADD COLUMN     "coupon_price" DOUBLE PRECISION NOT NULL;
