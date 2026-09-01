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

<<<<<<< HEAD
  app.enableCors();
  await app.listen(process.env.PORT ?? 3001);
=======
   app.enableCors();
   await app.listen(process.env.PORT ?? 3001);
   
>>>>>>> e5514b67202a9b50258c8311be7da4caff6a798a
}
bootstrap();