import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DadosService } from './dados.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('dados')
export class DadosController {
  constructor(private readonly dadosService: DadosService) {}

  @Post()
  create(@Body() CreateUsuarioDto: CreateUsuarioDto) {
    return this.dadosService.criar(CreateUsuarioDto);
  }

  @Get()
  listarTodos() {
    return this.dadosService.listarTodos();
  }
}

/* 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dadosService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dadosService.remove(+id);
  }
}
*/