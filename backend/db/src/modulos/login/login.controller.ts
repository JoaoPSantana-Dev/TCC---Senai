import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Login2faDto, LoginDto } from './login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.loginService.login(dto.email, dto.senha);
  }

  @Post('2fa')
  @HttpCode(200)
  segundoFator(@Body() dto: Login2faDto) {
    return this.loginService.loginComSegundoFator(
      dto.tokenTemporario,
      dto.codigo,
    );
  }
}
