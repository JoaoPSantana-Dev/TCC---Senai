/*
  Warnings:

  - You are about to drop the column `materia` on the `horarios_aula` table. All the data in the column will be lost.
  - You are about to drop the column `professor` on the `horarios_aula` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `horarios_aula` DROP COLUMN `materia`,
    DROP COLUMN `professor`;
