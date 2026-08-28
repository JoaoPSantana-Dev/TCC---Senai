import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HorariosAulaModule } from './dados/horarios-aula/horarios-aula.module';
import { PaginasModule } from './dados/paginas/paginas.module';
import { SalasModule } from './dados/salas/salas.module';
import { TextosModule } from './dados/textos/textos.module';
import { VagasEmpregoModule } from './dados/vagas-emprego/vagas-emprego.module';
import { VagasEstagioModule } from './dados/vagas-estagio/vagas-estagio.module';
import { UsuariosModule} from './dados/usuarios/usuarios.module';

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
  ],
})

