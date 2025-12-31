import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'; // Necesario para tu Auth
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // Para la documentación

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  /*const app = await NestFactory.create(AppModule,{
    cors:{
      origin: process.env.allowedOrigin,
      credentials: true
    }
    
     app.use(cookieParser());

    const config = new DocumentBuilder()
    .setTitle('Oerlikon Inventory API')
    .setDescription('Api for oerlikon inventory management')
    .setVersion('0.9')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

    */

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
