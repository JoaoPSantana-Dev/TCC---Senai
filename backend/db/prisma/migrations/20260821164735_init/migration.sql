-- CreateTable
CREATE TABLE `usuarios` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `senha` VARCHAR(191) NULL,
    `funcao` VARCHAR(191) NULL,
    `unidade` VARCHAR(191) NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `paginas` (
    `id_paginas` INTEGER NOT NULL AUTO_INCREMENT,
    `nomePagina` VARCHAR(191) NULL,
    `tipoPagina` VARCHAR(191) NULL,

    PRIMARY KEY (`id_paginas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `textos` (
    `id_texto` INTEGER NOT NULL AUTO_INCREMENT,
    `texto` VARCHAR(191) NULL,
    `tipoTexto` VARCHAR(191) NULL,
    `id_paginas` INTEGER NOT NULL,

    PRIMARY KEY (`id_texto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vagas_empregos` (
    `id_emprego` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeEmpresa` VARCHAR(191) NULL,
    `cargo` VARCHAR(191) NULL,
    `requisitos` VARCHAR(191) NULL,
    `salario` VARCHAR(191) NULL,
    `beneficios` VARCHAR(191) NULL,
    `descricao` VARCHAR(191) NULL,
    `localizacao` VARCHAR(191) NULL,
    `contato` VARCHAR(191) NULL,
    `areaEmprego` VARCHAR(191) NULL,

    PRIMARY KEY (`id_emprego`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vagas_estagio` (
    `id_estagio` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeEmpresa` VARCHAR(191) NULL,
    `cargo` VARCHAR(191) NULL,
    `requisitos` VARCHAR(191) NULL,
    `salario` VARCHAR(191) NULL,
    `beneficios` VARCHAR(191) NULL,
    `descricao` VARCHAR(191) NULL,
    `localizacao` VARCHAR(191) NULL,
    `contato` VARCHAR(191) NULL,
    `areaEstagio` VARCHAR(191) NULL,

    PRIMARY KEY (`id_estagio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salas` (
    `id_sala` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeSala` VARCHAR(191) NULL,
    `andar` VARCHAR(191) NULL,
    `bloco` VARCHAR(191) NULL,
    `imagem` VARCHAR(191) NULL,

    PRIMARY KEY (`id_sala`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `horarios_aula` (
    `id_horarios_aula` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeCurso` VARCHAR(191) NULL,
    `turno` VARCHAR(191) NULL,
    `id_sala` INTEGER NOT NULL,

    PRIMARY KEY (`id_horarios_aula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `textos` ADD CONSTRAINT `textos_id_paginas_fkey` FOREIGN KEY (`id_paginas`) REFERENCES `paginas`(`id_paginas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `horarios_aula` ADD CONSTRAINT `horarios_aula_id_sala_fkey` FOREIGN KEY (`id_sala`) REFERENCES `salas`(`id_sala`) ON DELETE RESTRICT ON UPDATE CASCADE;
