import { CreateSalaDto } from "../dto/create-sala.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SalasService{
    constructor(private prisma: PrismaService){}

    criarSala(createSalaDto: CreateSalaDto){
        return this.prisma.sala.create({
            data: createSalaDto
        });
    }

    listarTodasSalas(){
        return this.prisma.sala.findMany({
            include: {horarios:true,},
        }
        );
    }

    listarUmaSala(id:number){
        return this.prisma.sala.findUnique({
            where:{idSala:id},
            include: {horarios:true,}
        });
    }
    
    apagarSala(id:number){
        return this.prisma.sala.delete({
            where:{idSala:id}
        });
    }
            
    updateSala(id:number,updateSalaDto:CreateSalaDto){
        return this.prisma.sala.update({
            where:{idSala:id},
            data:updateSalaDto
        });
    }
}