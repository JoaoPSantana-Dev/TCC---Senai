import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

  listarUmUsuario(id:number){
    return this.prisma.usuario.findUnique({
      where:{idUsuario:id}
    });
  }

  apagarUsuario(id:number){
    return this.prisma.usuario.delete({
      where:{idUsuario:id}
    });
  }

  updateUsuario(id:number, updateUsuarioDTO: CreateUsuarioDto){
    return this.prisma.usuario.update({
      where:{idUsuario:id},
      data: updateUsuarioDTO
    });
  }
}

