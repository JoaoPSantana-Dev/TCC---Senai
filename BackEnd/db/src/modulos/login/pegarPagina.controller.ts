import { Body, Controller, Post } from '@nestjs/common';
import { PegarPaginaService } from './pegarPagina.service';

@Controller('pegarPagina')
export class PegarPaginaController{
  constructor(private readonly pegarPaginaService: PegarPaginaService) {}

  @Post()
  pegarPagina(){
    return this.pegarPaginaService.pegarPagina();
  }
}