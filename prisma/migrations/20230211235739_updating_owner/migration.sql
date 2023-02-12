/*
  Warnings:

  - You are about to drop the `Owner` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `owner` to the `PetData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PetData" DROP CONSTRAINT "PetData_id_fkey";

-- AlterTable
ALTER TABLE "PetData" ADD COLUMN     "owner" TEXT NOT NULL;

-- DropTable
DROP TABLE "Owner";
