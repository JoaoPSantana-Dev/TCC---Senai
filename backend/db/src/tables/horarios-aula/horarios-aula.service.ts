import { CreateHorarioAulaDto } from '../dto/create-horario-aula.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateHorarioAulaDto } from '../dto/update-horario-aula.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HorariosAulaService {
  constructor(private prisma: PrismaService) { }

  async criarHorarioAula(createHorarioAulaDto: CreateHorarioAulaDto) {
    if (createHorarioAulaDto.idSala) {
      const sala = await this.prisma.sala.findUnique({
        where: { idSala: createHorarioAulaDto.idSala }
      })

      if (!sala) throw new NotFoundException("Sala nao encontrada")
    }
    return this.prisma.horarioAula.create({
      data: createHorarioAulaDto,
    });
  }

  criarVariosHorariosAula(createHorarioAulaDto: CreateHorarioAulaDto[]) {
    return this.prisma.horarioAula.createMany({
      data: createHorarioAulaDto,
    });
  }

  listarTodosHorarios() {
    return this.prisma.horarioAula.findMany({
      include: { sala: true },
    });
  }
  async listarUmHorario(id: number) {
    const buscarIdHorario = await this.prisma.horarioAula.findUnique({
      where: { idHorariosAula: id },
      include: { sala: true },
    });
    if (!buscarIdHorario) {
      throw new NotFoundException("Sala nao encontrada")
    }
    return buscarIdHorario;
  }

  async apagarAula(id: number) {
    await this.listarUmHorario(id);
    return this.prisma.horarioAula.delete({
      where: { idHorariosAula: id },
    });
  }

  async updateAula(id: number, updateAulaDto: UpdateHorarioAulaDto) {
    await this.listarUmHorario(id);
    if (updateAulaDto.idSala) {
      const sala = await this.prisma.sala.findUnique({
        where: { idSala: updateAulaDto.idSala }
      })
      if (!sala) throw new NotFoundException("Sala nao encontrada")
    }
    return this.prisma.horarioAula.update({
      where: { idHorariosAula: id },
      data: updateAulaDto,
    });
  }
}
