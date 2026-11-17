import { Module } from '@nestjs/common';
import { VagasEmpregoController } from './vagas-emprego.controller';
import { VagasEmpregoService } from './vagas-emprego.service';
import { LoginModule } from '../../modulos/login/login.module';

@Module({
  imports: [LoginModule], // traz o JwtService e os guards
  controllers: [VagasEmpregoController],
  providers: [VagasEmpregoService],
})
export class VagasEmpregoModule {}
