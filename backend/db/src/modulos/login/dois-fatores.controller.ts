import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CodigoDto, DesativarDoisFatoresDto } from './login.dto';
import { DoisFatoresService } from './dois-fatores.service';
import { JwtAuthGuard, type RequisicaoAutenticada } from './jwt-auth.guard';

@Controller('2fa')
@UseGuards(JwtAuthGuard)
export class DoisFatoresController {
  constructor(private readonly doisFatores: DoisFatoresService) {}

  @Get('status')
  status(@Req() req: RequisicaoAutenticada) {
    return this.doisFatores.status(req.usuario.id);
  }

  @Post('configurar')
  @HttpCode(200)
  configurar(@Req() req: RequisicaoAutenticada) {
    return this.doisFatores.configurar(req.usuario.id);
  }

  @Post('ativar')
  @HttpCode(200)
  ativar(@Req() req: RequisicaoAutenticada, @Body() dto: CodigoDto) {
    return this.doisFatores.ativar(req.usuario.id, dto.codigo);
  }

  @Post('desativar')
  @HttpCode(200)
  async desativar(
    @Req() req: RequisicaoAutenticada,
    @Body() dto: DesativarDoisFatoresDto,
  ) {
    await this.doisFatores.desativar(req.usuario.id, dto.senha, dto.codigo);
    return { mensagem: 'Verificação em duas etapas desativada' };
  }
}
