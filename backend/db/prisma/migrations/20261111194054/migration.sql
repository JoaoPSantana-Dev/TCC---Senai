/*
  Warnings:

  - You are about to drop the column `nomeAula` on the `horarios_aula` table. All the data in the column will be lost.
  - Added the required column `materia` to the `horarios_aula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `horarios_aula` DROP COLUMN `nomeAula`,
    ADD COLUMN `materia` VARCHAR(191) NOT NULL;
