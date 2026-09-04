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

    listarUmaPagina(id:number){
        return this.prisma.pagina.findUnique({
            where:{idPaginas:id},
            include: {textos:true,}
        });
    }
        
    apagarPagina(id:number){
        return this.prisma.pagina.delete({
            where:{idPaginas:id}
        });
    }
                
    updatePagina(id:number,updatePaginaDto:CreatePaginaDto){
        return this.prisma.pagina.update({
            where:{idPaginas:id},
            data:updatePaginaDto
        });
    }
}