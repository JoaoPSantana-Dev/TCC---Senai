import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  criarUsuario(createUsuarioDto: CreateUsuarioDto) {
    return this.prisma.usuario.create({
      data: createUsuarioDto,
    });
  }

  listarTodosUsuarios() {
    return this.prisma.usuario.findMany();
  }

  async listarUmUsuario(id:number){
    const buscar = await this.prisma.usuario.findUnique({
      where:{idUsuario:id}
    })
    if(!buscar)
      throw new NotFoundException(`O usuario '${id}' não foi encontrado`)

    return buscar
  }

  async apagarUsuario(id:number){

    await this.listarUmUsuario(id)

    return this.prisma.usuario.delete({
      where:{idUsuario:id}
    });
  }

  updateUsuario(id: number, updateUsuarioDTO: UpdateUsuarioDto) {
    return this.prisma.usuario.update({
      where: { idUsuario: id },
      data: updateUsuarioDTO,
    });
  }
}
