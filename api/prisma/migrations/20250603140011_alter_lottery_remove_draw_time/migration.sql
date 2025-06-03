/*
  Warnings:

  - You are about to drop the column `draw_time` on the `Lottery` table. All the data in the column will be lost.
  - Changed the type of `draw_date` on the `Lottery` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Lottery" DROP COLUMN "draw_time",
DROP COLUMN "draw_date",
ADD COLUMN     "draw_date" TIMESTAMP(3) NOT NULL;
