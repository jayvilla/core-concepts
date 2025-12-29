import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  // Swagger/OpenAPI Documentation Configuration
  const config = new DocumentBuilder()
    .setTitle('Core Concepts API')
    .setDescription(
      `Comprehensive API documentation for Core Concepts learning platform.
      
This API demonstrates various backend concepts including:
- REST API principles and best practices
- TypeORM database operations and relationships
- Event-Driven Architecture patterns
- Saga Pattern for distributed transactions
- Tracing and Logging implementation
- Data Modeling concepts and patterns

Each module provides interactive examples and detailed explanations of core backend concepts.`,
    )
    .setVersion('1.0.0')
    .addTag(
      'REST API',
      'Demonstrates RESTful API principles, HTTP methods, status codes, pagination, filtering, and sorting',
    )
    .addTag(
      'TypeORM',
      'Demonstrates TypeORM features: repositories, query builder, relationships, transactions',
    )
    .addTag(
      'Event-Driven',
      'Demonstrates event-driven architecture with NestJS EventEmitter',
    )
    .addTag(
      'Saga Pattern',
      'Demonstrates orchestration and choreography-based saga patterns for distributed transactions',
    )
    .addTag(
      'Tracing & Logging',
      'Demonstrates structured logging, correlation IDs, and distributed tracing',
    )
    .addTag(
      'Data Modeling',
      'Demonstrates data modeling concepts: relationships, normalization, patterns',
    )
    .addTag('App', 'Application health and information endpoints')
    .addServer(
      `http://localhost:${process.env.PORT ?? 8000}`,
      'Development Server',
    )
    .addServer('http://localhost:8000', 'Default Development Server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Core Concepts API Documentation',
    customfavIcon: '/favicon.ico',
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    },
  });

  const port = process.env.PORT ?? 8000;
  await app.listen(port);
  console.log(`🚀 Backend server running on http://localhost:${port}`);
  console.log(
    `📚 Swagger API Documentation available at http://localhost:${port}/api`,
  );
  console.log(
    `📖 REST API examples available at http://localhost:${port}/concepts/rest-api`,
  );
}
void bootstrap();
