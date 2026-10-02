// import { CreatePaginaDto } from '../dto/create-pagina.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePaginaDto } from '../dto/update-pagina.dto';

@Injectable()
export class PaginasService {
  constructor(private prisma: PrismaService) {}

  // comentei essa parte pra fazer um novo testando o componente

  // criarPagina(createPaginaDto: CreatePaginaDto) {
  //   return this.prisma.pagina.create({
  //     data: createPaginaDto,
  //   });
  // }

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
        conteudo: data.conteudo,
      },
    });
  }

  listarTodasPaginas() {
    return this.prisma.pagina.findMany({
      // include: { textos: true },
    });
  }

  // comentei essa parte pra testar o listar por slug

  // listarUmaPaginaPorId(id: number) {
  //   return this.prisma.pagina.findUnique({
  //     where: { idPaginas: id },
  //     include: { textos: true },
  //   });
  // }

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

  updatePagina(id: number, updatePaginaDto: UpdatePaginaDto) {
    return this.prisma.pagina.update({
      where: { idPaginas: id },
      data: updatePaginaDto,
    });
  }
}
