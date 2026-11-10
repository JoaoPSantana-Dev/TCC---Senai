/*
  Warnings:

  - You are about to drop the column `id_sala` on the `horarios_aula` table. All the data in the column will be lost.
  - Added the required column `nomeAula` to the `horarios_aula` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profesor` to the `horarios_aula` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `horarios_aula` DROP FOREIGN KEY `horarios_aula_id_sala_fkey`;

-- DropIndex
DROP INDEX `horarios_aula_id_sala_fkey` ON `horarios_aula`;

-- AlterTable
ALTER TABLE `horarios_aula` DROP COLUMN `id_sala`,
    ADD COLUMN `nomeAula` VARCHAR(191) NOT NULL,
    ADD COLUMN `profesor` VARCHAR(191) NOT NULL;
