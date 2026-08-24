import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DadosModule } from './dados/usuarios/dados.module';

@Module({
  imports: [PrismaModule, DadosModule],
  
  
})

export class AppModule {}
