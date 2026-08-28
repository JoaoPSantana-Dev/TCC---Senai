import { Module } from '@nestjs/common';
<<<<<<< HEAD
<<<<<<< HEAD
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
=======
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> c46527942d9503b75216e7293b25506472198f79
=======
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
>>>>>>> 7a6c7928f51c1cd4cbafcc6507eb3107e0d84ead
})

export class AppModule {}
