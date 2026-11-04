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
