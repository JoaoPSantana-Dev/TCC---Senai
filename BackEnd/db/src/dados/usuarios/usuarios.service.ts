import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  criar(createUsuarioDto: CreateUsuarioDto) {
    return this.prisma.usuario.create({
      data: createUsuarioDto,
    });
  }

  listarTodos() {
    return this.prisma.usuario.findMany();
  }
}

/*
  findOne(id: number) {
    return `This action returns a #${id} dado`;
  }

  /*
  update(id: number, updateDadoDto: UpdateDadoDto) {
    return `This action updates a #${id} dado`;
  }


  remove(id: number) {
    return `This action removes a #${id} dado`;
  }
}
*/