import { Get, Body, Controller, Post } from '@nestjs/common';
import { PegarPaginaService } from './pegarPagina.service';

@Controller('pegarPagina')
export class PegarPaginaController{
  constructor(private readonly pegarPaginaService: PegarPaginaService) {}

  @Get()
  pegarPagina(){
    return this.pegarPaginaService.pegarPagina();
  }
}