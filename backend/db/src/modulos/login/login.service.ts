import { Injectable,UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from '@nestjs/jwt';
import { access } from "fs";

@Injectable()
export class LoginService{
    constructor(
        private readonly prisma:PrismaService,
        private readonly jwtService: JwtService
    ){}

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

        const token = await this.jwtService.signAsync({sub: usuario.idUsuario})

        return {
            mensagem:"Login realizado com sucesso",
            tokenAcesso: token,
            usuario:{
                id: usuario.idUsuario,
                nome: usuario.nome,
                email:usuario.email,
                funcao:usuario.funcao,
            },
        };
    }
}
