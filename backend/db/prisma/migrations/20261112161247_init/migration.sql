/*
  Warnings:

  - Added the required column `materia` to the `horarios_aula` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professor` to the `horarios_aula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `horarios_aula` ADD COLUMN `materia` VARCHAR(191) NOT NULL,
    ADD COLUMN `professor` VARCHAR(191) NOT NULL;
