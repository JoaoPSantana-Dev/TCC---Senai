import { Module } from '@nestjs/common';
import { LoginModule } from '../../modulos/login/login.module';
import { NoticiasController } from './noticias.controller';
import { NoticiasService } from './noticias.service';

@Module({
  imports: [LoginModule], // traz o JwtService e os guards
  controllers: [NoticiasController],
  providers: [NoticiasService],
})
export class NoticiasModule {}
