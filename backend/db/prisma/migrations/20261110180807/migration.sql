/*
  Warnings:

  - Added the required column `id_sala` to the `horarios_aula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `horarios_aula` ADD COLUMN `id_sala` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `horarios_aula` ADD CONSTRAINT `horarios_aula_id_sala_fkey` FOREIGN KEY (`id_sala`) REFERENCES `salas`(`id_sala`) ON DELETE RESTRICT ON UPDATE CASCADE;
