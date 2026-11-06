import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVagaCursoDto } from '../dto/create-vaga-curso.dto';
import { UpdateVagaCursoDto } from '../dto/update-vaga-curso.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VagasCursoService {
  constructor(private prisma: PrismaService) {}

  criarVagaCurso(dto: CreateVagaCursoDto) {
    return this.prisma.vagaCurso.create({ data: dto });
  }

  criarVariasVagasCurso(dtos: CreateVagaCursoDto[]) {
    return this.prisma.vagaCurso.createMany({ data: dtos });
  }

  // na ordem em que foram cadastrados
  listarTodasVagasCurso() {
    return this.prisma.vagaCurso.findMany({ orderBy: { idCurso: 'asc' } });
  }

  async listarUmaVagaCurso(id: number) {
    const curso = await this.prisma.vagaCurso.findUnique({
      where: { idCurso: id },
    });
    if (!curso)
      throw new NotFoundException(`O curso '${id}' não foi encontrado`);
    return curso;
  }

  async apagarVagaCurso(id: number) {
    await this.listarUmaVagaCurso(id);
    return this.prisma.vagaCurso.delete({ where: { idCurso: id } });
  }

  async updateVagaCurso(id: number, dto: UpdateVagaCursoDto) {
    await this.listarUmaVagaCurso(id);
    return this.prisma.vagaCurso.update({ where: { idCurso: id }, data: dto });
  }
}
