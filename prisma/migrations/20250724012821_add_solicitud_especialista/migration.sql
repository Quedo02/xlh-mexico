/*
  Warnings:

  - You are about to drop the column `creadoEn` on the `solicitudespecialista` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `solicitudespecialista` DROP COLUMN `creadoEn`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
