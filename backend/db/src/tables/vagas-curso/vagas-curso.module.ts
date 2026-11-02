import { Module } from '@nestjs/common';
import { VagasCursoController } from './vagas-curso.controller';
import { VagasCursoService } from './vagas-curso.service';
import { LoginModule } from '../../modulos/login/login.module';

@Module({
  imports: [LoginModule], // traz o JwtService e os guards
  controllers: [VagasCursoController],
  providers: [VagasCursoService],
})
export class VagasCursoModule {}
