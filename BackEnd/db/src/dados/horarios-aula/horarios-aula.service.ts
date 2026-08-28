import { CreateHorarioAulaDto } from "../dto/create-horario-aula.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class HorariosAulaService{
    constructor(private prisma: PrismaService){}

    criarHorarioAula(createHorarioAulaDto:CreateHorarioAulaDto){
        return this.prisma.horarioAula.create({
            data: createHorarioAulaDto
        });
    }

    listarTodosHorarios(){
        return this.prisma.horarioAula.findMany({
            include: {sala:true,},
        });
    }
}