/*
  Warnings:

  - You are about to drop the column `componentes` on the `paginas` table. All the data in the column will be lost.
  - You are about to drop the `textos` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `paginas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `conteudo` to the `paginas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `paginas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `textos` DROP FOREIGN KEY `textos_id_paginas_fkey`;

-- AlterTable
ALTER TABLE `paginas` DROP COLUMN `componentes`,
    ADD COLUMN `conteudo` JSON NOT NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `textos`;

-- CreateIndex
CREATE UNIQUE INDEX `paginas_slug_key` ON `paginas`(`slug`);
