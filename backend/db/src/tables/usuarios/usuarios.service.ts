import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { AtualizarPerfilDto } from '../dto/perfil-usuario.dto';
import { conferirSenha, gerarHashSenha } from '../../modulos/login/senha.util';
import { PrismaService } from '../../prisma/prisma.service';

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
    return this.prisma.usuario.findMany({
      select: selecaoPublica,
      orderBy: { nome: 'asc' },
    });
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

  private async garantirEmailLivre(email: string, idDoDono: number) {
    const emUso = await this.prisma.usuario.findFirst({
      where: { email, idUsuario: { not: idDoDono } },
    });
    if (emUso) throw new ConflictException('Este email já está cadastrado');
  }

  async apagarUsuario(id: number) {
    const usuario = await this.listarUmUsuario(id);
    if (usuario.funcao === 'Administrador')
      await this.garantirOutroAdministrador(id);

    await this.prisma.usuario.delete({ where: { idUsuario: id } });
    return { mensagem: 'Usuário apagado!' };
  }

  // administrador editando qualquer usuário
  async updateUsuario(id: number, dto: UpdateUsuarioDto) {
    const usuario = await this.listarUmUsuario(id);

    if (
      usuario.funcao === 'Administrador' &&
      dto.funcao &&
      dto.funcao !== 'Administrador'
    ) {
      await this.garantirOutroAdministrador(id);
    }
    if (dto.email && dto.email !== usuario.email) {
      await this.garantirEmailLivre(dto.email, id);
    }

    return this.prisma.usuario.update({
      where: { idUsuario: id },
      data: {
        nome: dto.nome,
        email: dto.email,
        unidade: dto.unidade,
        funcao: dto.funcao,
      },
      select: selecaoPublica,
    });
  }

  // ---------- a própria pessoa (rotas /usuarios/eu) ----------

  buscarPerfil(id: number) {
    return this.listarUmUsuario(id);
  }

  async atualizarPerfil(id: number, dto: AtualizarPerfilDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { idUsuario: id },
    });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    // trocar o email muda a forma de entrar e de recuperar a conta, pede a senha atual
    if (dto.email !== undefined && dto.email !== usuario.email) {
      if (!dto.senhaAtual) {
        throw new BadRequestException(
          'Informe a senha atual para trocar o email',
        );
      }
      const { ok } = await conferirSenha(dto.senhaAtual, usuario.senha);
      if (!ok) throw new UnauthorizedException('Senha atual incorreta');

      await this.garantirEmailLivre(dto.email, id);
    }

    return this.prisma.usuario.update({
      where: { idUsuario: id },
      data: { nome: dto.nome, email: dto.email, unidade: dto.unidade },
      select: selecaoPublica,
    });
  }

  async alterarSenha(id: number, senhaAtual: string, novaSenha: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { idUsuario: id },
    });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    const { ok } = await conferirSenha(senhaAtual, usuario.senha);
    if (!ok) throw new UnauthorizedException('Senha atual incorreta');
    if (senhaAtual === novaSenha) {
      throw new BadRequestException(
        'A nova senha precisa ser diferente da atual',
      );
    }

    await this.prisma.usuario.update({
      where: { idUsuario: id },
      data: { senha: await gerarHashSenha(novaSenha) },
    });
    return { mensagem: 'Senha alterada com sucesso!' };
  }
}
