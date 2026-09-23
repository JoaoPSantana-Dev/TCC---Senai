/*
  Warnings:

  - Added the required column `href` to the `paginas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `paginas` ADD COLUMN `componentes` JSON NULL,
    ADD COLUMN `href` VARCHAR(191) NOT NULL;
