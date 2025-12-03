import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Borra campos que no estén en el DTO (limpieza)
      forbidNonWhitelisted: true, //// Lanza error si mandan campos extra (seguridad estricta)
      transform: true, // Convierte tipos automáticamente (ej: string a number en params)
    })
  )
  await app.listen(3005);
}
bootstrap();
