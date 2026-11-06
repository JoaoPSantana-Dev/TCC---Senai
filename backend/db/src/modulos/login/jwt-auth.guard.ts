import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import type { PayloadToken } from './login.service';
import { PrismaService } from '../../prisma/prisma.service';

export interface RequisicaoAutenticada extends Request {
  usuario: { id: number; funcao: string };
}

// exige "Authorization: Bearer <token de sessão>"
// a função é lida do banco a cada requisição, então rebaixar ou apagar um usuário vale na hora
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(contexto: ExecutionContext): Promise<boolean> {
    const requisicao = contexto
      .switchToHttp()
      .getRequest<RequisicaoAutenticada>();
    const [tipo, token] = (requisicao.headers.authorization ?? '').split(' ');

    if (tipo !== 'Bearer' || !token) {
      throw new UnauthorizedException('Faça login para continuar');
    }

    try {
      const payload = await this.jwtService.verifyAsync<PayloadToken>(token);
      if (payload.tipo !== 'sessao') throw new Error('token não é de sessão');

      const usuario = await this.prisma.usuario.findUnique({
        where: { idUsuario: Number(payload.sub) },
        select: { idUsuario: true, funcao: true },
      });
      if (!usuario) throw new Error('usuário não existe mais');

      requisicao.usuario = { id: usuario.idUsuario, funcao: usuario.funcao };
      return true;
    } catch {
      throw new UnauthorizedException('Sessão inválida ou expirada');
    }
  }
}

// usar depois do JwtAuthGuard: @UseGuards(JwtAuthGuard, AdministradorGuard)
@Injectable()
export class AdministradorGuard implements CanActivate {
  canActivate(contexto: ExecutionContext): boolean {
    const requisicao = contexto
      .switchToHttp()
      .getRequest<RequisicaoAutenticada>();
    if (requisicao.usuario?.funcao !== 'Administrador') {
      throw new ForbiddenException('Apenas administradores podem fazer isso');
    }
    return true;
  }
}
