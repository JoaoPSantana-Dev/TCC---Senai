/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { removerArquivoNoticia } from './upload-imagem.util';
@Injectable()
export class NoticiasService {
  constructor(private prisma: PrismaService) {}

  // as mais novas primeiro, a primeira aparece em destaque na homepage
  listar() {
    return this.prisma.noticia.findMany({ orderBy: { idNoticia: 'desc' } });
  }

  async buscar(id: number) {
    const noticia = await this.prisma.noticia.findUnique({
      where: { idNoticia: id },
    });
    if (!noticia) throw new NotFoundException(`A notícia '${id}' não existe`);
    return noticia;
  }

  criar(titulo: string, imagem: string) {
    return this.prisma.noticia.create({ data: { titulo, imagem } });
  }

  async atualizar(id: number, dados: { titulo?: string; imagem?: string }) {
    const atual = await this.buscar(id);
    const salva = await this.prisma.noticia.update({
      where: { idNoticia: id },
      data: dados,
    });
    // trocou a imagem, a antiga não serve mais
    if (dados.imagem && dados.imagem !== atual.imagem) {
      await removerArquivoNoticia(atual.imagem);
    }
    return salva;
  }

  async apagar(id: number) {
    const atual = await this.buscar(id);
    await this.prisma.noticia.delete({ where: { idNoticia: id } });
    await removerArquivoNoticia(atual.imagem);
    return atual;
  }
}
