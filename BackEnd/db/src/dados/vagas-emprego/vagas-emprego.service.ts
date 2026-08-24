import { CreateVagaEmpregoDto } from "../dto/create-vaga-emprego.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class VagasEmpregoService{
    constructor(private prisma: PrismaService){}

    criarVagaEmprego(createVagaEmpregoDto: CreateVagaEmpregoDto){
        return this.prisma.vagaEmprego.create({
            data: createVagaEmpregoDto
        });
    }

    listarTodasVagasEmprego(){
        return this.prisma.vagaEmprego.findMany();
    }
}