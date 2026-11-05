-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `role` ENUM('temporario', 'administrador', 'visitante') NOT NULL DEFAULT 'temporario';
