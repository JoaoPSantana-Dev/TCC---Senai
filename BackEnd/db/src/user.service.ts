import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    let mensagem : string = "Hoje é um belo dia para estudar no SENAI e jogar volei";
    return mensagem;
  }
}