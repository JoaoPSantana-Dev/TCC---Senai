import { Injectable,UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PaginasService } from "src/tables/paginas/paginas.service";

@Injectable()
export class PegarPaginaService{
    constructor(private readonly prisma:PrismaService){}

    async login(email: string, senha:string){
        const usuario = await this.prisma.usuario.findFirst({
            where:{email:email},
        });

        if(!usuario){
            throw new UnauthorizedException(
                "Email ou senha incorretos",
            );
        }

        if(usuario.senha!==senha){
            throw new UnauthorizedException(
                "Email ou senha incorretos",
            )
        }

        return {
            mensagem:"Login realizado com sucesso",
            usuario:{
                id: usuario.idUsuario,
                nome: usuario.nome,
                email:usuario.email,
            },
        };
    }
    async pegarPagina(){
//        const paginas=await PaginasService.listarTodasPaginas()
        const resultados=await this.prisma.paginas.listarTodasPaginas();
        let paginas: string[] = [];
        resultados.forEach(resultado => {
            paginas.push(resultado)
        });
        return paginas;
    }
}