import { CreateHorarioAulaDto } from "../dto/create-horario-aula.dto";
import { Injectable } from "@nestjs/common";
import { UpdateHorarioAulaDto } from "../dto/update-horario-aula.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class HorariosAulaService{
    constructor(private prisma: PrismaService){}

    criarHorarioAula(createHorarioAulaDto:CreateHorarioAulaDto){
        return this.prisma.horarioAula.create({
            data: createHorarioAulaDto
        });
    }

    criarVariosHorariosAula(createHorarioAulaDto:CreateHorarioAulaDto[]){
        return this.prisma.horarioAula.createMany({
            data: createHorarioAulaDto
        });
    }

    listarTodosHorarios(){
        return this.prisma.horarioAula.findMany({
            include: {sala:true,},
        });
    }
    listarUmHorario(id:number){
        return this.prisma.horarioAula.findUnique({
            where:{idHorariosAula:id},
            include: {sala:true,},
        });
    }

    apagarAula(id:number){
        return this.prisma.horarioAula.delete({
            where:{idHorariosAula:id}
        });
    }

    updateAula(id:number,updateAulaDto:UpdateHorarioAulaDto){
        return this.prisma.horarioAula.update({
            where:{idHorariosAula:id},
            data:updateAulaDto
        });
    }
}