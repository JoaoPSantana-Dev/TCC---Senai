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
}