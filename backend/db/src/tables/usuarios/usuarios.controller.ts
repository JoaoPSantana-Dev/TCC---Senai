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
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import {
  AdministradorGuard,
  JwtAuthGuard,
} from '../../modulos/login/jwt-auth.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // cadastro é público; todo o resto exige administrador
  @Post()
  create(@Body() dto: CreateUsuarioDto) {
    return this.usuariosService.criarUsuario(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  listarTodos() {
    return this.usuariosService.listarTodosUsuarios();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  listarUmUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.listarUmUsuario(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  updateUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.updateUsuario(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  apagarUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.apagarUsuario(id);
  }
}
