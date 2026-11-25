import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVagaEstagioDto } from '../dto/create-vaga-estagio.dto';
import { UpdateVagaEstagioDto } from '../dto/update-vaga-estagio.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VagasEstagioService {
  constructor(private prisma: PrismaService) {}

  criarVagaEstagio(dto: CreateVagaEstagioDto) {
    return this.prisma.vagaEstagio.create({ data: dto });
  }

  criarVariasVagasEstagios(dtos: CreateVagaEstagioDto[]) {
    return this.prisma.vagaEstagio.createMany({ data: dtos });
  }

  // na ordem em que foram cadastradas
  listarTodasVagasEstagio() {
    return this.prisma.vagaEstagio.findMany({ orderBy: { idEstagio: 'asc' } });
  }

  async listarUmaVagaEstagio(id: number) {
    const vaga = await this.prisma.vagaEstagio.findUnique({
      where: { idEstagio: id },
    });
    if (!vaga)
      throw new NotFoundException(`O estágio '${id}' não foi encontrado`);
    return vaga;
  }

  async apagarVagaEstagio(id: number) {
    await this.listarUmaVagaEstagio(id);
    return this.prisma.vagaEstagio.delete({ where: { idEstagio: id } });
  }

  async updateVagaEstagio(id: number, dto: UpdateVagaEstagioDto) {
    await this.listarUmaVagaEstagio(id);
    return this.prisma.vagaEstagio.update({
      where: { idEstagio: id },
      data: dto,
    });
  }
}
