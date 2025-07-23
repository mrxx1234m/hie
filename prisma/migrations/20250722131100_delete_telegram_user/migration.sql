/*
  Warnings:

  - You are about to drop the `TelegramUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "telegramChatId" TEXT;

-- DropTable
DROP TABLE "TelegramUser";
