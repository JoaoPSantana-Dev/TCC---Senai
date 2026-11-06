import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
import type { Usuario } from '../../../generated/prisma/client';
import { conferirSenha } from './senha.util';
import {
  cifrar,
  decifrar,
  gerarCodigosRecuperacao,
  gerarSegredoTotp,
  hashCodigoRecuperacao,
  montarUriTotp,
  verificarTotp,
} from './totp.util';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DoisFatoresService {
  constructor(private readonly prisma: PrismaService) {}

  private async buscar(idUsuario: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { idUsuario },
    });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return usuario;
  }

  private codigosRestantes(usuario: Usuario) {
    return ((usuario.codigosRecuperacao as unknown as string[] | null) ?? [])
      .length;
  }

  async status(idUsuario: number) {
    const usuario = await this.buscar(idUsuario);
    return {
      ativo: usuario.totpAtivo,
      codigosRecuperacaoRestantes: this.codigosRestantes(usuario),
    };
  }

  // passo 1: gera o segredo que ainda não vale até confirmar com um código
  async configurar(idUsuario: number) {
    const usuario = await this.buscar(idUsuario);
    if (usuario.totpAtivo) {
      throw new ConflictException('A verificação em duas etapas já está ativa');
    }

    const segredo = gerarSegredoTotp();
    await this.prisma.usuario.update({
      where: { idUsuario },
      data: { totpSegredo: cifrar(segredo), totpUltimoPasso: null },
    });

    return { segredo, uri: montarUriTotp(segredo, usuario.email) };
  }

  // passo 2: confirma com o primeiro código do app e entrega os códigos de recuperação uma única vez
  async ativar(idUsuario: number, codigo: string) {
    const usuario = await this.buscar(idUsuario);
    if (usuario.totpAtivo) {
      throw new ConflictException('A verificação em duas etapas já está ativa');
    }
    if (!usuario.totpSegredo) {
      throw new BadRequestException('Gere o QR code antes de confirmar');
    }

    const passo = verificarTotp(
      decifrar(usuario.totpSegredo),
      codigo.trim(),
      null,
    );
    if (passo === null) {
      throw new BadRequestException(
        'Código inválido. Confira se o horário do celular está automático e tente de novo',
      );
    }

    const codigos = gerarCodigosRecuperacao();
    await this.prisma.usuario.update({
      where: { idUsuario },
      data: {
        totpAtivo: true,
        totpUltimoPasso: passo,
        codigosRecuperacao: codigos.map(hashCodigoRecuperacao),
      },
    });

    return { codigosRecuperacao: codigos };
  }

  async desativar(idUsuario: number, senha: string, codigo: string) {
    const usuario = await this.buscar(idUsuario);
    if (!usuario.totpAtivo) {
      throw new BadRequestException(
        'A verificação em duas etapas não está ativa',
      );
    }

    const { ok } = await conferirSenha(senha, usuario.senha);
    if (!ok) throw new UnauthorizedException('Senha incorreta');

    if (!(await this.consumirCodigo(usuario, codigo))) {
      throw new UnauthorizedException('Código inválido ou expirado');
    }

    await this.prisma.usuario.update({
      where: { idUsuario },
      data: {
        totpAtivo: false,
        totpSegredo: null,
        totpUltimoPasso: null,
        codigosRecuperacao: Prisma.JsonNull,
      },
    });
  }

  // confere o código do app ou um código de recuperação e já "gasta" o código usado
  async consumirCodigo(usuario: Usuario, entrada: string): Promise<boolean> {
    if (!usuario.totpSegredo) return false;
    const codigo = entrada.trim();

    if (/^\d{6}$/.test(codigo)) {
      const passo = verificarTotp(
        decifrar(usuario.totpSegredo),
        codigo,
        usuario.totpUltimoPasso,
      );
      if (passo === null) return false;

      // só grava se o passo ainda for maior que o último usado e barra o mesmo código em requisições paralelas
      const resultado = await this.prisma.usuario.updateMany({
        where: {
          idUsuario: usuario.idUsuario,
          OR: [{ totpUltimoPasso: null }, { totpUltimoPasso: { lt: passo } }],
        },
        data: { totpUltimoPasso: passo },
      });
      return resultado.count === 1;
    }

    const hash = hashCodigoRecuperacao(codigo);
    const lista =
      (usuario.codigosRecuperacao as unknown as string[] | null) ?? [];
    if (!lista.includes(hash)) return false;

    await this.prisma.usuario.update({
      where: { idUsuario: usuario.idUsuario },
      data: { codigosRecuperacao: lista.filter((item) => item !== hash) },
    });
    return true;
  }
}
