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
import { VagasCursoService } from './vagas-curso.service';
import { CreateVagaCursoDto } from '../dto/create-vaga-curso.dto';
import { UpdateVagaCursoDto } from '../dto/update-vaga-curso.dto';
import {
  AdministradorGuard,
  JwtAuthGuard,
} from '../../modulos/login/jwt-auth.guard';

@Controller('vagas-curso')
export class VagasCursoController {
  constructor(private readonly vagasCursoService: VagasCursoService) {}

  // a leitura é pública e o totem busca por aqui, escrever exige administrador

  @Get()
  listarTodasVagasCurso() {
    return this.vagasCursoService.listarTodasVagasCurso();
  }

  @Get(':id')
  listarUmaVagaCurso(@Param('id', ParseIntPipe) id: number) {
    return this.vagasCursoService.listarUmaVagaCurso(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  criarVagaCurso(@Body() dto: CreateVagaCursoDto) {
    return this.vagasCursoService.criarVagaCurso(dto);
  }

  @Post('lote')
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  criarVariasVagasCurso(
    @Body(new ParseArrayPipe({ items: CreateVagaCursoDto }))
    dtos: CreateVagaCursoDto[],
  ) {
    return this.vagasCursoService.criarVariasVagasCurso(dtos);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  updateVagaCurso(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVagaCursoDto,
  ) {
    return this.vagasCursoService.updateVagaCurso(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  apagarVagaCurso(@Param('id', ParseIntPipe) id: number) {
    return this.vagasCursoService.apagarVagaCurso(id);
  }
}
