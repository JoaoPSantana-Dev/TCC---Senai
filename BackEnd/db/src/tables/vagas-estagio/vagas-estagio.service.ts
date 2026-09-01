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

     listarUmaVagaEstagio(id:number){
            return this.prisma.vagaEstagio.findUnique({
                where:{idEstagio:id}
            });
        }
    
        apagarVagaEstagio(id:number){
            return this.prisma.vagaEstagio.delete({
                where:{idEstagio:id}
            });
        }
    
        updateVagaEstagio(id:number, updateVagaEstagioDTO:CreateVagaEstagioDto){
            return this.prisma.vagaEstagio.update({
                where:{idEstagio:id},
                data:updateVagaEstagioDTO
            });
        }
}