/*
  Warnings:

  - A unique constraint covering the columns `[bloco,andar,nomeSala]` on the table `salas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Professor` to the `horarios_aula` table without a default value. This is not possible if the table is not empty.
  - Added the required column `materia` to the `horarios_aula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `horarios_aula` ADD COLUMN `Professor` VARCHAR(191) NOT NULL,
    ADD COLUMN `materia` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `salas` MODIFY `imagem` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `salas_bloco_andar_nomeSala_key` ON `salas`(`bloco`, `andar`, `nomeSala`);
