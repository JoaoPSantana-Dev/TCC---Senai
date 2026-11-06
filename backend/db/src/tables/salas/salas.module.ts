import { Module } from '@nestjs/common';
import { SalasController } from './salas.controller';
import { SalasService } from './salas.service';

@Module({
  controllers: [SalasController],
  providers: [SalasService],
})
export class SalasModule {}
