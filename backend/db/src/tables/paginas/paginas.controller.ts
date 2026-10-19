import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { PaginasService } from './paginas.service';
import { UpdatePaginaDto } from '../dto/update-pagina.dto';
import { CreatePaginaDto } from '../dto/create-pagina.dto';

@Controller('paginas')
export class PaginasController {
  constructor(private readonly paginasService: PaginasService) {}

  @Post()
  create(@Body() createPaginaDto: CreatePaginaDto) {
    return this.paginasService.criarPagina(createPaginaDto);
  }

  @Get()
  listarTodasPaginas() {
    return this.paginasService.listarTodasPaginas();
  }

  @Get(':slug')
  listarUmaPaginaPorSlug(@Param('slug') slug: string) {
    return this.paginasService.listarUmaPaginaPorSlug(slug);
  }

  @Delete(':id')
  apagarPagina(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () =>
          new BadRequestException('Id da página inválido'),
      }),
    )
    id: number,
  ) {
    return this.paginasService.apagarPagina(id);
  }

  @Patch(':slug')
  updatePagina(
    @Param('slug') slug: string,
    @Body() updatePaginaDto: UpdatePaginaDto,
  ) {
    return this.paginasService.updatePaginaPorSlug(slug, updatePaginaDto);
  }
}
