import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestApiModule } from './concepts/rest-api/rest-api.module';
import { TypeormModule } from './concepts/typeorm/typeorm.module';
import { EventDrivenModule } from './concepts/event-driven/event-driven.module';
import { SagaModule } from './concepts/saga/saga.module';
import { TracingLoggingModule } from './concepts/tracing-logging/tracing-logging.module';
import { CorrelationIdInterceptor } from './concepts/tracing-logging/interceptors/correlation-id.interceptor';
import { LoggingInterceptor } from './concepts/tracing-logging/interceptors/logging.interceptor';
import { HttpExceptionFilter } from './concepts/tracing-logging/filters/http-exception.filter';
import { User } from './concepts/typeorm/entities/user.entity';
import { Profile } from './concepts/typeorm/entities/profile.entity';
import { Post } from './concepts/typeorm/entities/post.entity';
import { Tag } from './concepts/typeorm/entities/tag.entity';

@Module({
  imports: [
    // TypeORM Configuration
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'typeorm-demo.db',
      entities: [User, Profile, Post, Tag],
      synchronize: true, // Auto-create tables (disable in production, use migrations)
      logging: true, // Log SQL queries (disable in production)
    }),
    // Feature Modules
    RestApiModule,
    TypeormModule,
    EventDrivenModule,
    SagaModule,
    TracingLoggingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Global interceptors for tracing and logging
    {
      provide: APP_INTERCEPTOR,
      useClass: CorrelationIdInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // Global exception filter
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
