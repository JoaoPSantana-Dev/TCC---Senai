-- AlterTable
ALTER TABLE `vagas_empregos` MODIFY `requisitos` TEXT NOT NULL,
    MODIFY `beneficios` TEXT NOT NULL,
    MODIFY `descricao` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `vagas_estagio` MODIFY `requisitos` TEXT NOT NULL,
    MODIFY `beneficios` TEXT NOT NULL,
    MODIFY `descricao` TEXT NOT NULL;
