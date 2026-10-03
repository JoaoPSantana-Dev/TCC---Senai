import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaginasService } from './paginas.service';
// import { CreatePaginaDto } from '../dto/create-pagina.dto';
import { UpdatePaginaDto } from '../dto/update-pagina.dto';

@Controller('paginas')
export class PaginasController {
  constructor(private readonly paginasService: PaginasService) {}

  // @Post()
  // criarPagina(@Body() createPaginaDto: CreatePaginaDto) {
  //   return this.paginasService.criarPagina(createPaginaDto);
  // }

  @Post()
  create(
    @Body()
    body: {
      slug: string;
      nomePagina: string;
      tipoPagina: string;
      conteudo: any;
    },
  ) {
    return this.paginasService.criarPagina(body);
  }

  @Get()
  listarTodasPaginas() {
    return this.paginasService.listarTodasPaginas();
  }

  // @Get(':id')
  // listarUmaPaginaPorId(@Param('id', ParseIntPipe) id: number) {
  //   return this.paginasService.listarUmaPaginaPorId(id);
  // }

  @Get(':slug')
  listarUmaPaginaPorSlug(@Param('slug') slug: string) {
    return this.paginasService.listarUmaPaginaPorSlug(slug);
  }

  @Delete(':id')
  apagarPagina(@Param('id') id: number) {
    return this.paginasService.apagarPagina(+id);
  }

  @Patch(':slug')
  updatePagina(
    @Param('slug') slug: string,
    @Body() updatePaginaDto: UpdatePaginaDto,
  ) {
    return this.paginasService.updatePaginaPorSlug(slug, updatePaginaDto);
  }
}
