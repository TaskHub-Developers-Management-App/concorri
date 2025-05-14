/*
  Warnings:

  - Added the required column `draw_time` to the `Lottery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lottery" ADD COLUMN     "draw_time" TEXT NOT NULL,
ALTER COLUMN "draw_date" SET DATA TYPE TEXT;
