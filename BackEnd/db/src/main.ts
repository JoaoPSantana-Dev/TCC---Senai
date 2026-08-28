import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7a6c7928f51c1cd4cbafcc6507eb3107e0d84ead
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform:true
    })
  )

   await app.listen(process.env.PORT ?? 3000);
   
<<<<<<< HEAD
=======

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
>>>>>>> f73f59e093b1ac1acfa55dee60ffc83685591ebd
=======
>>>>>>> 7a6c7928f51c1cd4cbafcc6507eb3107e0d84ead
}
bootstrap();
