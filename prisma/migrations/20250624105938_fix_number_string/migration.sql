/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Paciente` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Paciente` MODIFY `edad` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Paciente_email_key` ON `Paciente`(`email`);
