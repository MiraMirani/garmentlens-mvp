-- CreateEnum
CREATE TYPE "GarmentStatus" AS ENUM ('processing', 'classified');

-- CreateTable
CREATE TABLE "Garment" (
    "id" SERIAL NOT NULL,
    "imagePath" TEXT NOT NULL,
    "status" "GarmentStatus" NOT NULL DEFAULT 'processing',
    "type" TEXT,
    "damage" TEXT,
    "material" TEXT,
    "complexity" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Garment_pkey" PRIMARY KEY ("id")
);
