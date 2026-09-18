import { CreateTextoDto } from "../dto/create-texto.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateTextoDto } from "../dto/update-texto.dto";

@Injectable()
export class TextosService{
    constructor(private prisma: PrismaService){}

    criarTexto(createTextoDto:CreateTextoDto){
        return this.prisma.texto.create({
            data: createTextoDto
        });
    }

    listarTodosTextos(){
        return this.prisma.texto.findMany({
            include: {pagina:true,}
        });
    }
    listarUmTexto(id:number){
        return this.prisma.texto.findUnique({
            where:{idTextos:id},
            include: {pagina:true,}
        });
    }

    apagarTexto(id:number){
        return this.prisma.texto.delete({
            where:{idTextos:id}
        });
    }
        
    updateTexto(id:number,updateTextoDto:UpdateTextoDto){
        return this.prisma.texto.update({
            where:{idTextos:id},
            data:updateTextoDto
        });
    }
}