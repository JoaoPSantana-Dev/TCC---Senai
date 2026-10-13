import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Prisma } from '../../../generated/prisma/client';
import { CreatePaginaDto } from '../dto/create-pagina.dto';
import { UpdatePaginaDto } from '../dto/update-pagina.dto';
import {
  slugsDoSistema,
  slugsReservados,
  validarPropsComponente,
} from './paginas.constantes';

function temCodigo(erro: unknown, codigo: string) {
  return (
    typeof erro === 'object' &&
    erro !== null &&
    (erro as { code?: string }).code === codigo
  );
}

@Injectable()
export class PaginasService {
  constructor(private prisma: PrismaService) {}

  // valida as props de cada componente
  private validarConteudo(conteudo: CreatePaginaDto['conteudo']) {
    const erros = conteudo.flatMap((componente, posicao) =>
      validarPropsComponente(componente.type, componente.props, posicao),
    );

    if (erros.length > 0) throw new BadRequestException(erros);
  }

  // garante que o JSON salvo no banco é um objeto simples, sem classes do class-transformer
  private paraJson(conteudo: CreatePaginaDto['conteudo']) {
    return JSON.parse(JSON.stringify(conteudo)) as Prisma.InputJsonValue;
  }

  async criarPagina(dto: CreatePaginaDto) {
    if (slugsReservados.includes(dto.slug)) {
      throw new BadRequestException(
        `O slug "${dto.slug}" é reservado pelo sistema, escolha outro nome para a página`,
      );
    }

    this.validarConteudo(dto.conteudo);

    const jaExiste = await this.prisma.pagina.findUnique({
      where: { slug: dto.slug },
      select: { idPaginas: true },
    });

    if (jaExiste) {
      throw new ConflictException('Já existe uma página com esse slug');
    }

    try {
      return await this.prisma.pagina.create({
        data: {
          slug: dto.slug,
          nomePagina: dto.nomePagina,
          tipoPagina: dto.tipoPagina,
          conteudo: this.paraJson(dto.conteudo),
        },
      });
    } catch (erro) {
      // duas pessoas criando o mesmo slug ao mesmo tempo
      if (temCodigo(erro, 'P2002')) {
        throw new ConflictException('Já existe uma página com esse slug');
      }
      throw erro;
    }
  }

  // a listagem não precisa do conteúdo
  async listarTodasPaginas() {
    const paginas = await this.prisma.pagina.findMany({
      select: {
        idPaginas: true,
        slug: true,
        nomePagina: true,
        tipoPagina: true,
      },
      orderBy: { nomePagina: 'asc' },
    });

    return paginas.map((pagina) => ({
      ...pagina,
      protegida: slugsDoSistema.includes(pagina.slug),
    }));
  }

  async listarUmaPaginaPorSlug(slug: string) {
    const pagina = await this.prisma.pagina.findUnique({
      where: { slug },
    });
    if (!pagina) throw new NotFoundException('Página não encontrada');
    return pagina;
  }

  async apagarPagina(id: number) {
    const pagina = await this.prisma.pagina.findUnique({
      where: { idPaginas: id },
      select: { idPaginas: true, slug: true },
    });

    if (!pagina) throw new NotFoundException('Página não encontrada');

    if (slugsDoSistema.includes(pagina.slug)) {
      throw new ConflictException(
        `A página "${pagina.slug}" é usada pelo totem e não pode ser excluída`,
      );
    }

    return this.prisma.pagina.delete({
      where: { idPaginas: pagina.idPaginas },
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

    if (updatePaginaDto.conteudo) {
      this.validarConteudo(updatePaginaDto.conteudo);
    }

    return this.prisma.pagina.update({
      where: { idPaginas: pagina.idPaginas },
      data: {
        nomePagina: updatePaginaDto.nomePagina,
        tipoPagina: updatePaginaDto.tipoPagina,
        conteudo: updatePaginaDto.conteudo
          ? this.paraJson(updatePaginaDto.conteudo)
          : undefined,
      },
    });
  }
}
