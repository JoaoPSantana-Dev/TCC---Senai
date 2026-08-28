import { CreatePaginaDto } from "../dto/create-pagina.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PaginasService{
    constructor(private prisma: PrismaService){}

    criarPagina(createPaginaDto:CreatePaginaDto){
        return this.prisma.pagina.create({
            data: createPaginaDto
        });
    }

    listarTodasPaginas(){
        return this.prisma.pagina.findMany({
            include: {textos:true,}
        });
    }
}