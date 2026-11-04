import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RecuperarSenhaService } from './recuperar-senha.service';
import { RedefinirSenhaDto, SolicitarRecuperacaoDto } from './login.dto';

@Controller('recuperar-senha')
export class RecuperarSenhaController {
  constructor(private readonly recuperarSenha: RecuperarSenhaService) {}

  @Post('solicitar')
  @HttpCode(200)
  async solicitar(@Body() dto: SolicitarRecuperacaoDto) {
    await this.recuperarSenha.solicitar(dto.email);
    return {
      mensagem:
        'Se o email estiver cadastrado, enviamos um link para redefinir a senha.',
    };
  }

  @Post('redefinir')
  @HttpCode(200)
  async redefinir(@Body() dto: RedefinirSenhaDto) {
    await this.recuperarSenha.redefinir(dto.token, dto.senha);
    return { mensagem: 'Senha alterada com sucesso' };
  }
}
