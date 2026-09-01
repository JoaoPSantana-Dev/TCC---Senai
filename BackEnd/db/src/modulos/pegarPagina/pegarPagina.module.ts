import { Module } from '@nestjs/common';
import { PegarPaginaController } from './pegarPagina.controller';
import { PegarPaginaService } from './pegarPagina.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PegarPaginaController],
  providers: [PegarPaginaService],
})
export class PegarPaginaModule {}

