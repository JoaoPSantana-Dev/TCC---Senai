import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HorariosAulaModule } from './tables/horarios-aula/horarios-aula.module';
import { PaginasModule } from './tables/paginas/paginas.module';
import { SalasModule } from './tables/salas/salas.module';
import { VagasEmpregoModule } from './tables/vagas-emprego/vagas-emprego.module';
import { VagasEstagioModule } from './tables/vagas-estagio/vagas-estagio.module';
import { UsuariosModule } from './tables/usuarios/usuarios.module';
import { LoginModule } from './modulos/login/login.module';
import { PegarPaginaModule } from './modulos/pegarPagina/pegarPagina.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HorariosAulaModule,
    PaginasModule,
    SalasModule,
    VagasEmpregoModule,
    VagasEstagioModule,
    UsuariosModule,
    LoginModule,
    PegarPaginaModule,
  ],
})
export class AppModule {}
