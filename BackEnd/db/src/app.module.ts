import { Module } from '@nestjs/common';
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
})
export class AppModule {}
