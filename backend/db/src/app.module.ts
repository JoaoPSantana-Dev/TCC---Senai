import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HorariosAulaModule } from './tables/horarios-aula/horarios-aula.module';
import { PaginasModule } from './tables/paginas/paginas.module';
import { SalasModule } from './tables/salas/salas.module';
import { VagasCursoModule } from './tables/vagas-curso/vagas-curso.module';
import { VagasEmpregoModule } from './tables/vagas-emprego/vagas-emprego.module';
import { VagasEstagioModule } from './tables/vagas-estagio/vagas-estagio.module';
import { UsuariosModule } from './tables/usuarios/usuarios.module';
import { LoginModule } from './modulos/login/login.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HorariosAulaModule,
    PaginasModule,
    SalasModule,
    VagasCursoModule,
    VagasEmpregoModule,
    VagasEstagioModule,
    UsuariosModule,
    LoginModule,
  ],
})
export class AppModule {}
