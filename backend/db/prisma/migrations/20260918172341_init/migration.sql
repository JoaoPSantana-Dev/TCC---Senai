/*
  Warnings:

  - Added the required column `dia` to the `horarios_aula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `horarios_aula` ADD COLUMN `dia` VARCHAR(191) NOT NULL;
