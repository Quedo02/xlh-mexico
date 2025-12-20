/*
  Warnings:

  - Made the column `telefono` on table `Especialista` required. This step will fail if there are existing NULL values in that column.
  - Made the column `correo` on table `Especialista` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Especialista` ADD COLUMN `comoConocieron` VARCHAR(191) NULL,
    ADD COLUMN `hospital` VARCHAR(191) NULL,
    MODIFY `telefono` VARCHAR(191) NOT NULL,
    MODIFY `correo` VARCHAR(191) NOT NULL,
    MODIFY `foto` VARCHAR(191) NULL;
