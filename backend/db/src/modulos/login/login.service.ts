import { Injectable,UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LoginService{
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
}
