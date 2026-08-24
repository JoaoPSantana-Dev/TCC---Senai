import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.criar(createUsuarioDto);
  }

  @Get()
  listarTodos() {
    return this.usuariosService.listarTodos();
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