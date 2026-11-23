import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { mkdirSync } from 'fs';
import { rm } from 'fs/promises';
import { diskStorage } from 'multer';
import { join } from 'path';

// imagens das notícias ficam em backend/db/uploads/noticias
export const pastaNoticias = join(process.cwd(), 'uploads', 'noticias');

// a extensão do arquivo salvo vem desta lista e nunca do nome que o usuário mandou
// svg fica de fora de propósito, pode carregar script
const extensoes: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

export const tamanhoMaximoImagem = 5 * 1024 * 1024; // 5 MB

export const opcoesUploadImagem = {
  storage: diskStorage({
    destination: (_req, _arquivo, cb) => {
      mkdirSync(pastaNoticias, { recursive: true });
      cb(null, pastaNoticias);
    },
    filename: (_req, arquivo, cb) =>
      cb(null, `${randomUUID()}${extensoes[arquivo.mimetype]}`),
  }),
  limits: { fileSize: tamanhoMaximoImagem, files: 1 },
  fileFilter: (
    _req: unknown,
    arquivo: { mimetype: string },
    cb: (erro: Error | null, aceitar: boolean) => void,
  ) =>
    extensoes[arquivo.mimetype]
      ? cb(null, true)
      : cb(
          new BadRequestException('Envie uma imagem JPG, PNG, WEBP ou GIF'),
          false,
        ),
};

// só apaga arquivos que o próprio upload criou, nunca caminhos da pasta public do front
const nomeGerado = /^[a-f0-9-]{36}\.(jpg|png|webp|gif)$/;

export async function removerArquivoNoticia(nome?: string | null) {
  if (!nome || !nomeGerado.test(nome)) return;
  await rm(join(pastaNoticias, nome), { force: true });
}
