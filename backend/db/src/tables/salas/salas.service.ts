import { CreateSalaDto } from '../dto/create-sala.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateSalaDto } from '../dto/update-sala.dto';
import { equals } from 'class-validator';

@Injectable()
export class SalasService {
  constructor(private prisma: PrismaService) { }

  criarSala(createSalaDto: CreateSalaDto) {
    return this.prisma.sala.create({
      data: createSalaDto,
    });
  }

  criarVariasSalas(createSalaDto: CreateSalaDto[]) {
    return this.prisma.sala.createMany({
      data: createSalaDto,
    });
  }

  listarTodasSalas() {
    return this.prisma.sala.findMany({
      include: { horarios: true },
    });
  }

  listarUmaSala(id: number) {
    return this.prisma.sala.findUnique({
      where: { idSala: id },
      include: { horarios: true },
    });
  }

  apagarSala(id: number) {
    return this.prisma.sala.delete({
      where: { idSala: id },
    });
  }

  updateSala(id: number, updateSalaDto: UpdateSalaDto) {
    return this.prisma.sala.update({
      where: { idSala: id },
      data: updateSalaDto,
    });
  }

  async getMapaSalas(cursoId?: string) {
    const salas = await this.prisma.sala.findMany({
      include: {
        horarios: cursoId
          ? { where: { nomeCurso: { equals: cursoId } } }
          : true
      },
    });

    return salas.map((sala) => ({
      idSala: sala.idSala,
      nomeSala: sala.nomeSala,
      bloco: sala.bloco,
      andar: sala.andar,
      imagem: sala.imagem,
      destaque: sala.horarios && sala.horarios.length > 0
    }));
  }
}
