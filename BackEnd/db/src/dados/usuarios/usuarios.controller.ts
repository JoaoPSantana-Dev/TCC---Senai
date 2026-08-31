import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.criarUsuario(createUsuarioDto);
  }

  @Get()
  listarTodos() {
    return this.usuariosService.listarTodosUsuarios();
  }

  @Get(":id")
  listarUmUsuario(@Param("id") id:number){
    return this.usuariosService.listarUmUsuario(+id);
  }

  @Delete(":id")
  apagarUsuario(@Param("id") id:number){
    return this.usuariosService.apagarUsuario(+id);
  }

  @Patch(":id")
  updateUsuario(@Param("id") id:number, @Body() updateUsuarioDTO: CreateUsuarioDto){
    return this.usuariosService.updateUsuario(+id, updateUsuarioDTO);
  }
}
