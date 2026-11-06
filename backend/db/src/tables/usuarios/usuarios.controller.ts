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
  Req,
  HttpCode,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import {
  AdministradorGuard,
  JwtAuthGuard,
} from '../../modulos/login/jwt-auth.guard';
import type { RequisicaoAutenticada } from '../../modulos/login/jwt-auth.guard';
import { AlterarSenhaDto, AtualizarPerfilDto } from '../dto/perfil-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // cadastro público
  @Post()
  create(@Body() dto: CreateUsuarioDto) {
    return this.usuariosService.criarUsuario(dto);
  }

  // ---------- a própria pessoa logada ----------

  @Get('eu')
  @UseGuards(JwtAuthGuard)
  perfil(@Req() req: RequisicaoAutenticada) {
    return this.usuariosService.buscarPerfil(req.usuario.id);
  }

  @Patch('eu')
  @UseGuards(JwtAuthGuard)
  atualizarPerfil(
    @Req() req: RequisicaoAutenticada,
    @Body() dto: AtualizarPerfilDto,
  ) {
    return this.usuariosService.atualizarPerfil(req.usuario.id, dto);
  }

  @Post('eu/senha')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  alterarSenha(
    @Req() req: RequisicaoAutenticada,
    @Body() dto: AlterarSenhaDto,
  ) {
    return this.usuariosService.alterarSenha(
      req.usuario.id,
      dto.senhaAtual,
      dto.novaSenha,
    );
  }

  // ---------- só administrador ----------

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
