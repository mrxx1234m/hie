import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import createSuperAdmin from './script/create.supder.admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // faqat DTO da belgilangan propertylarni ruxsat beradi
      forbidNonWhitelisted: true, // ruxsat etilmagan property bo'lsa xato beradi
      transform: true, // kiruvchi ma'lumotlarni DTO klassiga o'zgartiradi
    }),
  );
  const swaggerConfig = new DocumentBuilder()
  .setTitle('My API')
  .setDescription('Product API with image upload')
  .setVersion('1.0')
  .addBearerAuth()
  .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api', app, document);
  await createSuperAdmin()
  app.enableCors()

  await app.listen(process.env.PORT ?? 3000);
  console.log(`http://localhost:${process.env.PORT || 3000}/api `);
  
}
bootstrap();
