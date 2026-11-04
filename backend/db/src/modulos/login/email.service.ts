import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

function escapar(texto: string) {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  // sem SMTP_HOST no .env o email não é enviado, o link aparece no log do backend em modo desenvolvimento
  private readonly transporte = process.env.SMTP_HOST
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
      })
    : null;

  async enviarRecuperacaoSenha(
    para: string,
    nome: string,
    link: string,
    validadeMin: number,
  ) {
    const assunto = 'Recuperação de senha - Totem SENAI';
    const texto =
      `Olá, ${nome}\n\n` +
      `Recebemos um pedido para redefinir sua senha. Abra o link abaixo (vale por ${validadeMin} minutos):\n\n` +
      `${link}\n\n` +
      `Se não foi você, ignore este email: sua senha continua a mesma`;
    const html =
      `<p>Olá, ${escapar(nome)}</p>` +
      `<p>Recebemos um pedido para redefinir sua senha. O link vale por ${validadeMin} minutos:</p>` +
      `<p><a href="${escapar(link)}">Redefinir minha senha</a></p>` +
      `<p>Se não foi você, ignore este email: sua senha continua a mesma</p>`;

    if (!this.transporte) {
      this.logger.warn(`SMTP não configurado. Email para ${para}:\n${texto}`);
      return;
    }

    await this.transporte.sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to: para,
      subject: assunto,
      text: texto,
      html,
    });
  }
}
