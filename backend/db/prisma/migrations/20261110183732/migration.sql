/*
  Warnings:

  - You are about to drop the column `profesor` on the `horarios_aula` table. All the data in the column will be lost.
  - Added the required column `professor` to the `horarios_aula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `horarios_aula` DROP COLUMN `profesor`,
    ADD COLUMN `professor` VARCHAR(191) NOT NULL;
