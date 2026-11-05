import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailService } from './email.service';
import { gerarHashSenha } from './senha.util';
import { gerarToken, hashToken } from './totp.util';
import { PrismaService } from '../../prisma/prisma.service';

const validadeMinutos = 30;

@Injectable()
export class RecuperarSenhaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly email: EmailService,
  ) {}

  // nunca revela se o email existe, quem chama sempre recebe a mesma resposta
  async solicitar(email: string) {
    const usuario = await this.prisma.usuario.findFirst({ where: { email } });
    if (!usuario) return;

    // já pediu há menos de 1 minuto? não manda outro, evita spam na caixa de entrada
    const pedidoRecente =
      usuario.resetExpiraEm &&
      usuario.resetExpiraEm.getTime() - Date.now() >
        (validadeMinutos - 1) * 60_000;
    if (pedidoRecente) return;

    const token = gerarToken();
    await this.prisma.usuario.update({
      where: { idUsuario: usuario.idUsuario },
      data: {
        resetTokenHash: hashToken(token),
        resetExpiraEm: new Date(Date.now() + validadeMinutos * 60_000),
      },
    });

    const base = (process.env.FRONTEND_URL ?? 'http://localhost:3000')
      .split(',')[0]
      .trim();
    const link = `${base.replace(/\/$/, '')}/esqueci-senha?token=${token}`;

    try {
      await this.email.enviarRecuperacaoSenha(
        usuario.email,
        usuario.nome,
        link,
        validadeMinutos,
      );
    } catch (erro) {
      // falha de SMTP não pode aparecer para quem pediu (revelaria que o email existe)
      console.error('Falha ao enviar email de recuperação:', erro);
    }
  }

  async redefinir(token: string, novaSenha: string) {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        resetTokenHash: hashToken(token),
        resetExpiraEm: { gt: new Date() },
      },
    });
    if (!usuario) {
      throw new BadRequestException('Link inválido ou expirado. Peça um novo');
    }

    await this.prisma.usuario.update({
      where: { idUsuario: usuario.idUsuario },
      data: {
        senha: await gerarHashSenha(novaSenha),
        resetTokenHash: null,
        resetExpiraEm: null,
        tentativasFalhas: 0,
        bloqueadoAte: null,
      },
    });
  }
}
