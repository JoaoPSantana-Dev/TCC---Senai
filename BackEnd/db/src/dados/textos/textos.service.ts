import { CreateTextoDto } from "../dto/create-texto.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

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
}