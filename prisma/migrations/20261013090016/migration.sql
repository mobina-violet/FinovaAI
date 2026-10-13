/*
  Warnings:

  - You are about to drop the column `category` on the `Business` table. All the data in the column will be lost.
  - Changed the type of `role` on the `ChatMessage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ChatRole" AS ENUM ('USER', 'ASSISTANT');

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "category",
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "role",
ADD COLUMN     "role" "ChatRole" NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "topic" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactMessage_phone_createdAt_idx" ON "ContactMessage"("phone", "createdAt");
