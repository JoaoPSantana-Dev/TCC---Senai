import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { DoisFatoresService } from './dois-fatores.service';
import { conferirSenha, gerarHashSenha } from './senha.util';
import { Usuario } from '../../../generated/prisma/browser';

const maximoFalhas = 5;
const bloqueioMinutos = 15;

export interface PayloadToken {
  sub: number;
  tipo: 'sessao' | '2fa';
  funcao?: string;
}

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly doisFatores: DoisFatoresService,
  ) {}

  async login(email: string, senha: string) {
    const usuario = await this.prisma.usuario.findFirst({
      where: { email },
    });
    if (usuario) this.verificarBloqueio(usuario);

    const { ok, precisaAtualizar } = await conferirSenha(
      senha,
      usuario?.senha ?? null,
    );
    if (!usuario || !ok) {
      if (usuario) await this.registrarFalha(usuario);
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    // senha antiga em texto puro: regrava com hash agora que sabemos a senha certa
    if (precisaAtualizar) {
      await this.prisma.usuario.update({
        where: { idUsuario: usuario.idUsuario },
        data: { senha: await gerarHashSenha(senha) },
      });
    }

    if (usuario.totpAtivo) {
      // senha certa, falta o segundo fator: token curto que NÃO serve como sessão
      const tokenTemporario = await this.jwtService.signAsync(
        { sub: usuario.idUsuario, tipo: '2fa' } satisfies PayloadToken,
        { expiresIn: '5m' },
      );
      return { precisa2fa: true as const, tokenTemporario };
    }

    return this.concluirLogin(usuario);
  }

  async loginComSegundoFator(tokenTemporario: string, codigo: string) {
    let payload: PayloadToken;
    try {
      payload =
        await this.jwtService.verifyAsync<PayloadToken>(tokenTemporario);
    } catch {
      throw this.preAutenticacaoExpirada();
    }
    if (payload.tipo !== '2fa') throw this.preAutenticacaoExpirada();

    const usuario = await this.prisma.usuario.findUnique({
      where: { idUsuario: Number(payload.sub) },
    });
    if (!usuario || !usuario.totpAtivo) throw this.preAutenticacaoExpirada();

    this.verificarBloqueio(usuario);

    if (!(await this.doisFatores.consumirCodigo(usuario, codigo))) {
      await this.registrarFalha(usuario);
      throw new UnauthorizedException('Código inválido ou expirado');
    }

    return this.concluirLogin(usuario);
  }

  private preAutenticacaoExpirada() {
    return new UnauthorizedException({
      message: 'Sua verificação expirou. Entre novamente',
      codigo: 'PRE_2FA_EXPIRADO',
    });
  }

  private verificarBloqueio(usuario: Usuario) {
    if (usuario.bloqueadoAte && usuario.bloqueadoAte.getTime() > Date.now()) {
      const minutos = Math.ceil(
        (usuario.bloqueadoAte.getTime() - Date.now()) / 60000,
      );
      throw new HttpException(
        `Muitas tentativas incorretas. Tente de novo em ${minutos} minuto(s)`,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }

  private async registrarFalha(usuario: Usuario) {
    const falhas = usuario.tentativasFalhas + 1;
    const bloquear = falhas >= maximoFalhas;

    await this.prisma.usuario.update({
      where: { idUsuario: usuario.idUsuario },
      data: bloquear
        ? {
            tentativasFalhas: 0,
            bloqueadoAte: new Date(Date.now() + bloqueioMinutos * 60_000),
          }
        : { tentativasFalhas: falhas },
    });
  }

  private async concluirLogin(usuario: Usuario) {
    if (usuario.tentativasFalhas > 0 || usuario.bloqueadoAte) {
      await this.prisma.usuario.update({
        where: { idUsuario: usuario.idUsuario },
        data: { tentativasFalhas: 0, bloqueadoAte: null },
      });
    }

    const tokenAcesso = await this.jwtService.signAsync({
      sub: usuario.idUsuario,
      tipo: 'sessao',
      funcao: usuario.funcao,
    } satisfies PayloadToken);

    return {
      mensagem: 'Login realizado com sucesso',
      tokenAcesso,
      usuario: {
        id: usuario.idUsuario,
        nome: usuario.nome,
        email: usuario.email,
        funcao: usuario.funcao,
      },
    };
  }
}
