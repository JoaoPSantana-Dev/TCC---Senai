import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VagasEstagioService } from './vagas-estagio.service';
import { CreateVagaEstagioDto } from '../dto/create-vaga-estagio.dto';
import { UpdateVagaEstagioDto } from '../dto/update-vaga-estagio.dto';
import {
  AdministradorGuard,
  JwtAuthGuard,
} from '../../modulos/login/jwt-auth.guard';

@Controller('vagas-estagio')
export class VagasEstagioController {
  constructor(private readonly vagasEstagioService: VagasEstagioService) {}

  // leitura é pública e o totem busca por aqui, escrever exige administrador

  @Get()
  listarTodasVagasEstagio() {
    return this.vagasEstagioService.listarTodasVagasEstagio();
  }

  @Get(':id')
  listarUmaVagaEstagio(@Param('id', ParseIntPipe) id: number) {
    return this.vagasEstagioService.listarUmaVagaEstagio(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  criarVagaEstagio(@Body() dto: CreateVagaEstagioDto) {
    return this.vagasEstagioService.criarVagaEstagio(dto);
  }

  @Post('lote')
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  criarVariasVagasEstagio(
    @Body(new ParseArrayPipe({ items: CreateVagaEstagioDto, whitelist: true }))
    dtos: CreateVagaEstagioDto[],
  ) {
    return this.vagasEstagioService.criarVariasVagasEstagios(dtos);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  updateVagaEstagio(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVagaEstagioDto,
  ) {
    return this.vagasEstagioService.updateVagaEstagio(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  apagarVagaEstagio(@Param('id', ParseIntPipe) id: number) {
    return this.vagasEstagioService.apagarVagaEstagio(id);
  }
}
