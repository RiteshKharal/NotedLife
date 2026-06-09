-- CreateTable
CREATE TABLE "save" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "save_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "save" ADD CONSTRAINT "save_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "save" ADD CONSTRAINT "save_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
