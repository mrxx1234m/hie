/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,language]` on the table `CategoryTranslate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CategoryTranslate_categoryId_language_key" ON "CategoryTranslate"("categoryId", "language");
