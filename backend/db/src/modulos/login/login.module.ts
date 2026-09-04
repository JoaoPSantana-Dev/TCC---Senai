import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}

