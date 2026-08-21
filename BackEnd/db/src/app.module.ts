import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DadosModule } from './dados/dados.module';

@Module({
  imports: [PrismaModule, DadosModule],
  
  
})

export class AppModule {}
