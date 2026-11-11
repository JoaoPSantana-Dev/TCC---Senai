import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVagaEmpregoDto } from '../dto/create-vaga-emprego.dto';
import { UpdateVagaEmpregoDto } from '../dto/update-vaga-emprego.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VagasEmpregoService {
  constructor(private prisma: PrismaService) {}

  criarVagaEmprego(dto: CreateVagaEmpregoDto) {
    return this.prisma.vagaEmprego.create({ data: dto });
  }

  criarVariasVagasEmprego(dtos: CreateVagaEmpregoDto[]) {
    return this.prisma.vagaEmprego.createMany({ data: dtos });
  }

  // na ordem em que foram cadastradas
  listarTodasVagasEmprego() {
    return this.prisma.vagaEmprego.findMany({ orderBy: { idEmprego: 'asc' } });
  }

  async listarUmaVagaEmprego(id: number) {
    const vaga = await this.prisma.vagaEmprego.findUnique({
      where: { idEmprego: id },
    });
    if (!vaga)
      throw new NotFoundException(`O emprego '${id}' não foi encontrado`);
    return vaga;
  }

  async apagarVagaEmprego(id: number) {
    await this.listarUmaVagaEmprego(id);
    return this.prisma.vagaEmprego.delete({ where: { idEmprego: id } });
  }

  async updateVagaEmprego(id: number, dto: UpdateVagaEmpregoDto) {
    await this.listarUmaVagaEmprego(id);
    return this.prisma.vagaEmprego.update({
      where: { idEmprego: id },
      data: dto,
    });
  }
}
