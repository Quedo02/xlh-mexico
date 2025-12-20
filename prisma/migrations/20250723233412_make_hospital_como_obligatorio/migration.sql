/*
  Warnings:

  - Made the column `comoConocieron` on table `Especialista` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hospital` on table `Especialista` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Especialista` MODIFY `comoConocieron` VARCHAR(191) NOT NULL,
    MODIFY `hospital` VARCHAR(191) NOT NULL;
