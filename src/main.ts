import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from 'node_modules/@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from 'node_modules/@nestjs/swagger/dist/swagger-module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configservice = app.get(ConfigService);
  const origin = configservice.get<string>('CORS_ORIGINS')?.split(',') || '*';
  const config = new DocumentBuilder()
    .setTitle('Assignments Service API')
    .setDescription('API documentation for Assignments  Service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('inventory-system', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: origin,
    methods: 'GET,PUT,PATCH,POST,HEAD',
    Credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
