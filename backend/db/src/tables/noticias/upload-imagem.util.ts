import { BadRequestException } from '@nestjs/common';
import { del, put } from '@vercel/blob';
import { randomUUID } from 'crypto';
import { memoryStorage } from 'multer';

const extensoes: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

// limite de 4mb
export const tamanhoMaximoImagem = 4 * 1024 * 1024;

export const opcoesUploadImagem = {
  storage: memoryStorage(),
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

// envia para o Vercel Blob e devolve a URL pública
export async function enviarImagemNoticia(arquivo: Express.Multer.File) {
  const { url } = await put(
    `noticias/${randomUUID()}${extensoes[arquivo.mimetype]}`,
    arquivo.buffer,
    { access: 'public', contentType: arquivo.mimetype },
  );
  return url;
}

// só apaga o que está no Blob; nomes antigos e caminhos da pasta public são ignorados
const urlBlob = /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//;

export async function removerArquivoNoticia(imagem?: string | null) {
  if (!imagem || !urlBlob.test(imagem)) return;
  await del(imagem).catch(() => {});
}
