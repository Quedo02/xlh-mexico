/*
  Warnings:

  - Made the column `comoConocieron` on table `especialista` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hospital` on table `especialista` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `especialista` MODIFY `comoConocieron` VARCHAR(191) NOT NULL,
    MODIFY `hospital` VARCHAR(191) NOT NULL;
