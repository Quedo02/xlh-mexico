/*
  Warnings:

  - You are about to drop the column `creadoEn` on the `Solicitudespecialista` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Solicitudespecialista` DROP COLUMN `creadoEn`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
