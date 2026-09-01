import { Injectable,UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PaginasService } from "src/tables/paginas/paginas.service";

@Injectable()
export class PegarPaginaService{
    constructor(private readonly prisma:PrismaService){}

    async pegarPagina(){
//        const resultados=await PaginasService.listarTodasPaginas()
        const resultados=await this.prisma.paginas.listarTodasPaginas();
        let paginas: object[] = [];
        resultados.forEach(resultado => {
            paginas.push({idPagina:resultado.idPagina,nomePagina:resultado.nomePagina})
        });
        return paginas;
    }
}