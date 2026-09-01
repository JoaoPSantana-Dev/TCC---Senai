import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async criarUsuario(createUsuarioDto: CreateUsuarioDto) {
    const emailexistente = await this.prisma.usuario.findFirst({
      where:{email: createUsuarioDto.email}
    })
    if (emailexistente)
        throw new ConflictException("este email ja esta cadastrado")
    
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
      throw new NotFoundException(`Produto '${id}' não foi encontrado`)

    return buscar
  }

  async apagarUsuario(id:number){

    await this.listarUmUsuario(id)

    return this.prisma.usuario.delete({
      where:{idUsuario:id}
    });
  }

  async updateUsuario(id:number, updateUsuarioDTO: CreateUsuarioDto){
    await this.listarUmUsuario(id)

    return this.prisma.usuario.update({
      where:{idUsuario:id},
      data: updateUsuarioDTO
    });
  }
}

