import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController{
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() body: { email: string; senha: string }) {
    return this.loginService.login(body.email, body.senha);
  }
}
