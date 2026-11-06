import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { LoginModule } from '../../modulos/login/login.module';

@Module({
  imports: [LoginModule], // traz o JwtService e os guards
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
