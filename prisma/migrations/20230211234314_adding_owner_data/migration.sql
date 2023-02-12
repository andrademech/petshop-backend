/*
  Warnings:

  - You are about to drop the column `owner` on the `PetData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PetData" DROP COLUMN "owner";

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PetData" ADD CONSTRAINT "PetData_id_fkey" FOREIGN KEY ("id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
