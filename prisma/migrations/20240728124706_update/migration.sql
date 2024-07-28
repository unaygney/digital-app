/*
  Warnings:

  - Added the required column `size` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "size" DOUBLE PRECISION NOT NULL;
