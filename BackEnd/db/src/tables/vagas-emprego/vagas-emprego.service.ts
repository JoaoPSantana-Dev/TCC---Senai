import { CreateVagaEmpregoDto } from "../dto/create-vaga-emprego.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class VagasEmpregoService{
    constructor(private prisma: PrismaService){}

    criarVariasVagas(createVagaEmpregoDto: CreateVagaEmpregoDto){
        return this.prisma.vagaEmprego.createMany({
            data: createVagaEmpregoDto
        })
    }

    criarVagaEmprego(createVagaEmpregoDto: CreateVagaEmpregoDto){
        return this.prisma.vagaEmprego.create({
            data: createVagaEmpregoDto
        });
    }

    criarVagasEmprego(createVagaEmpregoDto: CreateVagaEmpregoDto[]){
        return this.prisma.vagaEmprego.createMany({
            data:createVagaEmpregoDto
        });
    }

    listarTodasVagasEmprego(){
        return this.prisma.vagaEmprego.findMany();
    }

    listarUmaVagaEmprego(id:number){
        return this.prisma.vagaEmprego.findUnique({
            where:{idEmprego:id}
        });
    }

    apagarVagaEmprego(id:number){
        return this.prisma.vagaEmprego.delete({
            where:{idEmprego:id}
        });
    }

    updateVagaEmprego(id:number, updateVagaEmpregoDTO:CreateVagaEmpregoDto){
        return this.prisma.vagaEmprego.update({
            where:{idEmprego:id},
            data:updateVagaEmpregoDTO
        });
    }
}