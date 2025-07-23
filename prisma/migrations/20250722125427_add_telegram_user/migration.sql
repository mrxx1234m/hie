-- CreateTable
CREATE TABLE "TelegramUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "telegramChatId" TEXT NOT NULL,
    "telegramUserName" TEXT NOT NULL,

    CONSTRAINT "TelegramUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser_email_key" ON "TelegramUser"("email");
