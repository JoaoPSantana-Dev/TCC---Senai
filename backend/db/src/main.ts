import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // FRONTEND_URL aceita mais de um endereço separado por vírgula
  // exemplo: FRONTEND_URL=http://localhost:3000,http://192.168.0.10:3000
  const origens = (process.env.FRONTEND_URL ?? 'http://localhost:3000')
    .split(',')
    .map((origem) => origem.trim().replace(/\/$/, ''));

  app.enableCors({ origin: origens });
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
