/*
  Warnings:

  - You are about to drop the `save` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "save" DROP CONSTRAINT "save_postId_fkey";

-- DropForeignKey
ALTER TABLE "save" DROP CONSTRAINT "save_userId_fkey";

-- DropTable
DROP TABLE "save";

-- CreateTable
CREATE TABLE "saves" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "saves_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "saves_userId_idx" ON "saves"("userId");

-- CreateIndex
CREATE INDEX "saves_postId_idx" ON "saves"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "saves_userId_postId_key" ON "saves"("userId", "postId");

-- AddForeignKey
ALTER TABLE "saves" ADD CONSTRAINT "saves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saves" ADD CONSTRAINT "saves_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
