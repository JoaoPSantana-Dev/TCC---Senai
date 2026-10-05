import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePaginaDto } from '../dto/update-pagina.dto';

@Injectable()
export class PaginasService {
  constructor(private prisma: PrismaService) {}

  async criarPagina(data: {
    slug: string;
    nomePagina: string;
    tipoPagina: string;
    conteudo: any;
  }) {
    return this.prisma.pagina.create({
      data: {
        slug: data.slug,
        nomePagina: data.nomePagina,
        tipoPagina: data.tipoPagina,
        conteudo: data.conteudo ?? [],
      },
    });
  }

  listarTodasPaginas() {
    return this.prisma.pagina.findMany({});
  }

  async listarUmaPaginaPorSlug(slug: string) {
    const pagina = await this.prisma.pagina.findUnique({
      where: { slug },
    });
    if (!pagina) throw new NotFoundException('Página não encontrada');
    return pagina;
  }

  apagarPagina(id: number) {
    return this.prisma.pagina.delete({
      where: { idPaginas: id },
    });
  }

  async updatePaginaPorSlug(slug: string, updatePaginaDto: UpdatePaginaDto) {
    const pagina = await this.prisma.pagina.findUnique({
      where: { slug },
      select: { idPaginas: true },
    });

    if (!pagina) {
      throw new NotFoundException('Página não encontrada');
    }

    return this.prisma.pagina.update({
      where: { idPaginas: pagina.idPaginas },
      data: updatePaginaDto,
    });
  }
}
