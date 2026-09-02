/*
  Warnings:

  - Made the column `nomeCurso` on table `horarios_aula` required. This step will fail if there are existing NULL values in that column.
  - Made the column `turno` on table `horarios_aula` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nomePagina` on table `paginas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tipoPagina` on table `paginas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nomeSala` on table `salas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `andar` on table `salas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bloco` on table `salas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imagem` on table `salas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `texto` on table `textos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tipoTexto` on table `textos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nome` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `senha` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `funcao` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `unidade` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nomeEmpresa` on table `vagas_empregos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cargo` on table `vagas_empregos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `requisitos` on table `vagas_empregos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `salario` on table `vagas_empregos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `beneficios` on table `vagas_empregos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descricao` on table `vagas_empregos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `localizacao` on table `vagas_empregos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contato` on table `vagas_empregos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `areaEmprego` on table `vagas_empregos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nomeEmpresa` on table `vagas_estagio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cargo` on table `vagas_estagio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `requisitos` on table `vagas_estagio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `salario` on table `vagas_estagio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `beneficios` on table `vagas_estagio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descricao` on table `vagas_estagio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `localizacao` on table `vagas_estagio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contato` on table `vagas_estagio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `areaEstagio` on table `vagas_estagio` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `horarios_aula` MODIFY `nomeCurso` VARCHAR(191) NOT NULL,
    MODIFY `turno` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `paginas` MODIFY `nomePagina` VARCHAR(191) NOT NULL,
    MODIFY `tipoPagina` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `salas` MODIFY `nomeSala` VARCHAR(191) NOT NULL,
    MODIFY `andar` VARCHAR(191) NOT NULL,
    MODIFY `bloco` VARCHAR(191) NOT NULL,
    MODIFY `imagem` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `textos` MODIFY `texto` VARCHAR(191) NOT NULL,
    MODIFY `tipoTexto` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `nome` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `senha` VARCHAR(191) NOT NULL,
    MODIFY `funcao` VARCHAR(191) NOT NULL,
    MODIFY `unidade` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `vagas_empregos` MODIFY `nomeEmpresa` VARCHAR(191) NOT NULL,
    MODIFY `cargo` VARCHAR(191) NOT NULL,
    MODIFY `requisitos` VARCHAR(191) NOT NULL,
    MODIFY `salario` VARCHAR(191) NOT NULL,
    MODIFY `beneficios` VARCHAR(191) NOT NULL,
    MODIFY `descricao` VARCHAR(191) NOT NULL,
    MODIFY `localizacao` VARCHAR(191) NOT NULL,
    MODIFY `contato` VARCHAR(191) NOT NULL,
    MODIFY `areaEmprego` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `vagas_estagio` MODIFY `nomeEmpresa` VARCHAR(191) NOT NULL,
    MODIFY `cargo` VARCHAR(191) NOT NULL,
    MODIFY `requisitos` VARCHAR(191) NOT NULL,
    MODIFY `salario` VARCHAR(191) NOT NULL,
    MODIFY `beneficios` VARCHAR(191) NOT NULL,
    MODIFY `descricao` VARCHAR(191) NOT NULL,
    MODIFY `localizacao` VARCHAR(191) NOT NULL,
    MODIFY `contato` VARCHAR(191) NOT NULL,
    MODIFY `areaEstagio` VARCHAR(191) NOT NULL;
