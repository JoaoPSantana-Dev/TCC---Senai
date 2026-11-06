import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DoisFatoresController } from './dois-fatores.controller';
import { RecuperarSenhaController } from './recuperar-senha.controller';
import { DoisFatoresService } from './dois-fatores.service';
import { RecuperarSenhaService } from './recuperar-senha.service';
import { EmailService } from './email.service';
import { AdministradorGuard, JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [
    LoginController,
    DoisFatoresController,
    RecuperarSenhaController,
  ],
  providers: [
    LoginService,
    DoisFatoresService,
    RecuperarSenhaService,
    EmailService,
    JwtAuthGuard,
    AdministradorGuard,
  ],
  exports: [JwtModule, JwtAuthGuard, AdministradorGuard],
})
export class LoginModule {}
