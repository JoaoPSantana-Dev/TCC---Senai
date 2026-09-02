import { CreateVagaEmpregoDto } from "../dto/create-vaga-emprego.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
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

    async listarUmaVagaEmprego(id:number){
        const buscar = await this.prisma.vagaEmprego.findUnique({
            where:{idEmprego:id}
        });
        if(!buscar)
              throw new NotFoundException(`O emprego '${id}' não foi encontrado`)

        return buscar
    }

    async apagarVagaEmprego(id:number){

        await this.listarUmaVagaEmprego(id)

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