import { Module } from '@nestjs/common';
import { VagasEstagioController } from './vagas-estagio.controller';
import { VagasEstagioService } from './vagas-estagio.service';
import { LoginModule } from '../../modulos/login/login.module';

@Module({
  imports: [LoginModule], // traz o JwtService e os guards
  controllers: [VagasEstagioController],
  providers: [VagasEstagioService],
})
export class VagasEstagioModule {}
