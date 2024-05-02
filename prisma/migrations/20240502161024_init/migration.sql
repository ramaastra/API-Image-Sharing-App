-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);
