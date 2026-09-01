import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HorariosAulaModule } from './tables/horarios-aula/horarios-aula.module';
import { PaginasModule } from './tables/paginas/paginas.module';
import { SalasModule } from './tables/salas/salas.module';
import { TextosModule } from './tables/textos/textos.module';
import { VagasEmpregoModule } from './tables/vagas-emprego/vagas-emprego.module';
import { VagasEstagioModule } from './tables/vagas-estagio/vagas-estagio.module';
import { UsuariosModule} from './tables/usuarios/usuarios.module';
import { LoginModule } from './modulos/login/login.module';
import { PegarPaginaModule } from './modulos/pegarPagina/pegarPagina.module';

@Module({
  imports: [
    PrismaModule,
    HorariosAulaModule,
    PaginasModule,
    SalasModule,
    TextosModule,
    VagasEmpregoModule,
    VagasEstagioModule,
    UsuariosModule,
    LoginModule,
    PegarPaginaModule
  ],
})

export class AppModule {}