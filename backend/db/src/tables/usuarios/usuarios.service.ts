import { PrismaService } from '../../prisma/prisma.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '../../../generated/prisma/enums';

//==================================================================================
//Busca as roles/niveis de acesso
const acharRole:Record<string,Role>={
  administrador: Role.administrador,
  visitante: Role.visitante
};
//==================================================================================
//atribui a role de acordo com a função do usuario
function atribuindoRole(funcao?: string):Role{
  return acharRole[funcao?.trim().toLowerCase() ?? ""] ?? Role.temporario
}
//==================================================================================

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async criarUsuario(createUsuarioDto: CreateUsuarioDto) {
    const emailexistente = await this.prisma.usuario.findFirst({
      where: { email: createUsuarioDto.email },
    });
    if (emailexistente)
      throw new ConflictException('Este email já está cadastrado');

    return this.prisma.usuario.create({
      data: {
        ...createUsuarioDto,
        role: atribuindoRole(createUsuarioDto.funcao)
      }  
    });
  }

  listarTodosUsuarios() {
    return this.prisma.usuario.findMany();
  }

  async listarUmUsuario(id: number) {
    const buscar = await this.prisma.usuario.findUnique({
      where: { idUsuario: id },
    });
    if (!buscar)
      throw new NotFoundException(`Produto '${id}' não foi encontrado`);

    return buscar;
  }

  async apagarUsuario(id: number) {
    await this.listarUmUsuario(id);

    return this.prisma.usuario.delete({
      where: { idUsuario: id },
    });
  }

  async updateUsuario(id: number, updateUsuarioDTO: CreateUsuarioDto) {
    await this.listarUmUsuario(id);

    if (updateUsuarioDTO.email) {
      const emailEncontrado = await this.prisma.usuario.findFirst({
        where: {
          email: updateUsuarioDTO.email,
        },
      });
      if (emailEncontrado!)
        throw new ConflictException('O email não pode ser alterado');
    }
    return this.prisma.usuario.update({
      where: { idUsuario: id },
      data: updateUsuarioDTO,
    });
  }
}
