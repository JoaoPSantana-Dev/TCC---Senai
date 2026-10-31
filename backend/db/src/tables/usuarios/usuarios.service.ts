import { PrismaService } from '../../prisma/prisma.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { gerarHashSenha } from '../../modulos/login/senha.util';

// campos que podem sair da API
// os campos da senha, segredo do 2fa e tokens nunca aparecem
const selecaoPublica = {
  idUsuario: true,
  nome: true,
  email: true,
  funcao: true,
  unidade: true,
  totpAtivo: true,
} as const;

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async criarUsuario(dto: CreateUsuarioDto) {
    const existente = await this.prisma.usuario.findFirst({
      where: { email: dto.email },
    });
    if (existente) throw new ConflictException('Esse email já está cadastrado');

    // o primeiro usuário vira administrador, todos os outros entram como Visitante
    // para promover alguém, um administrador altera a função depois
    const total = await this.prisma.usuario.count();
    const funcao = total === 0 ? 'Administrador' : 'Visitante';

    return this.prisma.usuario.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        unidade: dto.unidade,
        funcao,
        senha: await gerarHashSenha(dto.senha),
      },
      select: selecaoPublica,
    });
  }

  listarTodosUsuarios() {
    return this.prisma.usuario.findMany({ select: selecaoPublica });
  }

  async listarUmUsuario(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { idUsuario: id },
      select: selecaoPublica,
    });
    if (!usuario)
      throw new NotFoundException(`Usuario '${id}' não foi encontrado`);

    return usuario;
  }

  private async garantirOutroAdministrador(id: number) {
    const outros = await this.prisma.usuario.count({
      where: { funcao: 'Administrador', idUsuario: { not: id } },
    });
    if (outros === 0) {
      throw new ConflictException(
        'Precisa existir pelo menos um administrador',
      );
    }
  }

  async apagarUsuario(id: number) {
    const usuario = await this.listarUmUsuario(id);
    if (usuario.funcao === 'Administrador')
      await this.garantirOutroAdministrador(id);

    await this.prisma.usuario.delete({ where: { idUsuario: id } });
    return { mensagem: 'Usuário apagado' };
  }

  async updateUsuario(id: number, dto: UpdateUsuarioDto) {
    const usuario = await this.listarUmUsuario(id);
    if (
      usuario.funcao === 'Administrador' &&
      dto.funcao &&
      dto.funcao !== 'Administrador'
    ) {
      await this.garantirOutroAdministrador(id);
    }

    return this.prisma.usuario.update({
      where: { idUsuario: id },
      data: dto,
      select: selecaoPublica,
    });
  }
}
