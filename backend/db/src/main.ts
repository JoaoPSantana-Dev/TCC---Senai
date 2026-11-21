import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // imagens enviadas pelo gerenciador ficam em backend/db/uploads e saem em /uploads/...
  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads/' });

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
