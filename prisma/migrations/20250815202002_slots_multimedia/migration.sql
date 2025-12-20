/*
  Warnings:

  - You are about to drop the column `mediaId` on the `MediaSlot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `MediaSlot` DROP FOREIGN KEY `MediaSlot_mediaId_fkey`;

-- DropIndex
DROP INDEX `MediaSlot_mediaId_fkey` ON `MediaSlot`;

-- AlterTable
ALTER TABLE `MediaSlot` DROP COLUMN `mediaId`;

-- CreateTable
CREATE TABLE `SlotMedia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slotId` INTEGER NOT NULL,
    `mediaId` INTEGER NOT NULL,
    `orden` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SlotMedia` ADD CONSTRAINT `SlotMedia_slotId_fkey` FOREIGN KEY (`slotId`) REFERENCES `MediaSlot`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SlotMedia` ADD CONSTRAINT `SlotMedia_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `Media`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
