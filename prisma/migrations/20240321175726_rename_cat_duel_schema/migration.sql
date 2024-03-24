-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "cat_duel";

-- CreateTable
CREATE TABLE "cat_duel"."Cat" (
    "id" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 1400,

    CONSTRAINT "Cat_pkey" PRIMARY KEY ("id")
);
