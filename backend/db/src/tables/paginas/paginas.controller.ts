import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PaginasService } from './paginas.service';
import { CreatePaginaDto } from '../dto/create-pagina.dto';
import { UpdatePaginaDto } from '../dto/update-pagina.dto';

@Controller('paginas')
export class PaginasController {
  constructor(private readonly paginaService: PaginasService) {}

  @Post()
  criarPagina(@Body() createPaginaDto: CreatePaginaDto) {
    return this.paginaService.criarPagina(createPaginaDto);
  }

  @Get()
  listarTodasPaginas() {
    return this.paginaService.listarTodasPaginas();
  }

  @Get(':id')
  listarUmaPaginaPorId(@Param('id', ParseIntPipe) id: number) {
    return this.paginaService.listarUmaPaginaPorId(id);
  }

  @Get(':nomePagina')
  listarUmaPaginaPorNome(@Param('nomePagina') nomePagina: string) {
    return this.paginaService.listarUmaPaginaPorNome(nomePagina);
  }

  @Delete(':id')
  apagarPagina(@Param('id') id: number) {
    return this.paginaService.apagarPagina(+id);
  }
  @Patch(':id')
  updatePagina(
    @Param('id') id: number,
    @Body() updatePaginaDto: UpdatePaginaDto,
  ) {
    return this.paginaService.updatePagina(+id, updatePaginaDto);
  }
}
