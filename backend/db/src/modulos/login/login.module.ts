import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config"

@Module({
  imports:[
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory:(config: ConfigService) => ({
        secret:config.get<string>("JWT_SECRET"),
        signOptions: {expiresIn: "7d"},
      })
    })
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [JwtModule],
})
export class LoginModule {}

