/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reset_token_hash]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `paginas` ADD COLUMN `iconeMenu` JSON NULL,
    ADD COLUMN `mostrarNoMenu` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `ordemMenu` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `bloqueado_ate` DATETIME(3) NULL,
    ADD COLUMN `codigos_recuperacao` JSON NULL,
    ADD COLUMN `reset_expira_em` DATETIME(3) NULL,
    ADD COLUMN `reset_token_hash` VARCHAR(191) NULL,
    ADD COLUMN `tentativas_falhas` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `totp_ativo` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `totp_segredo` TEXT NULL,
    ADD COLUMN `totp_ultimo_passo` INTEGER NULL;

-- CreateTable
CREATE TABLE `vagas_curso` (
    `id_curso` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeCurso` VARCHAR(191) NOT NULL,
    `areaCurso` VARCHAR(191) NULL,
    `descricao` TEXT NULL,
    `requisitos` TEXT NULL,
    `cargaHoraria` VARCHAR(191) NULL,
    `turno` VARCHAR(191) NULL,
    `contato` VARCHAR(191) NULL,

    PRIMARY KEY (`id_curso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_email_key` ON `usuarios`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_reset_token_hash_key` ON `usuarios`(`reset_token_hash`);
