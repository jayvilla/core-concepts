import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable global validation pipe for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Enable implicit type conversion
      },
    }),
  );

  // Enable CORS for frontend integration
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Backend server running on http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 REST API examples available at http://localhost:${process.env.PORT ?? 3000}/concepts/rest-api`);
}
bootstrap();
