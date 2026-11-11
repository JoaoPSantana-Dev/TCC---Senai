import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  ParseArrayPipe,
} from '@nestjs/common';
import { VagasEmpregoService } from './vagas-emprego.service';
import { CreateVagaEmpregoDto } from '../dto/create-vaga-emprego.dto';
import { UpdateVagaEmpregoDto } from '../dto/update-vaga-emprego.dto';
import {
  AdministradorGuard,
  JwtAuthGuard,
} from '../../modulos/login/jwt-auth.guard';

@Controller('vagas-emprego')
export class VagasEmpregoController {
  constructor(private readonly vagasEmpregoService: VagasEmpregoService) {}

  // leitura é pública e o totem busca por aqui, escrever exige administrador

  @Get()
  listarTodasVagasEmprego() {
    return this.vagasEmpregoService.listarTodasVagasEmprego();
  }

  @Get(':id')
  listarUmaVagaEmprego(@Param('id', ParseIntPipe) id: number) {
    return this.vagasEmpregoService.listarUmaVagaEmprego(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  criarVagaEmprego(@Body() dto: CreateVagaEmpregoDto) {
    return this.vagasEmpregoService.criarVagaEmprego(dto);
  }

  @Post('lote')
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  criarVariasVagasEmprego(
    @Body(new ParseArrayPipe({ items: CreateVagaEmpregoDto, whitelist: true }))
    dtos: CreateVagaEmpregoDto[],
  ) {
    return this.vagasEmpregoService.criarVariasVagasEmprego(dtos);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  updateVagaEmprego(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVagaEmpregoDto,
  ) {
    return this.vagasEmpregoService.updateVagaEmprego(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  apagarVagaEmprego(@Param('id', ParseIntPipe) id: number) {
    return this.vagasEmpregoService.apagarVagaEmprego(id);
  }
}
