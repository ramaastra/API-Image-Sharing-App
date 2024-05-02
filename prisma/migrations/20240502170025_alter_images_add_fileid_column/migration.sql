/*
  Warnings:

  - Added the required column `file_id` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" ADD COLUMN     "file_id" TEXT NOT NULL;
