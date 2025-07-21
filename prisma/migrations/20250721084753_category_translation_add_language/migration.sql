/*
  Warnings:

  - Added the required column `language` to the `CategoryTranslate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CategoryTranslate" ADD COLUMN     "language" TEXT NOT NULL;
