import { CreateVagaEstagioDto } from "../dto/create.vaga-estagio.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class VagasEstagioService{
    constructor(private prisma: PrismaService){}

    criarVagaEstagio(createVagaEstagioDto: CreateVagaEstagioDto){
        return this.prisma.vagaEstagio.create({
            data: createVagaEstagioDto
        });
    }

    listarTodasVagasEstagio(){
        return this.prisma.vagaEstagio.findMany();
    }
}