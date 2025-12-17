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
import { DataModelingModule } from './concepts/data-modeling/data-modeling.module';
import { CorrelationIdInterceptor } from './concepts/tracing-logging/interceptors/correlation-id.interceptor';
import { LoggingInterceptor } from './concepts/tracing-logging/interceptors/logging.interceptor';
import { HttpExceptionFilter } from './concepts/tracing-logging/filters/http-exception.filter';
// TypeORM entities for typeorm concept (SQLite)
import { User } from './concepts/typeorm/entities/user.entity';
import { Profile } from './concepts/typeorm/entities/profile.entity';
import { Post } from './concepts/typeorm/entities/post.entity';
import { Tag } from './concepts/typeorm/entities/tag.entity';
// Data Modeling entities (PostgreSQL)
import { User as DataModelingUser } from './concepts/data-modeling/entities/relationships/user.entity';
import { UserProfile } from './concepts/data-modeling/entities/relationships/user-profile.entity';
import { Post as DataModelingPost } from './concepts/data-modeling/entities/relationships/post.entity';
import { Comment } from './concepts/data-modeling/entities/relationships/comment.entity';
import { Tag as DataModelingTag } from './concepts/data-modeling/entities/relationships/tag.entity';
import { Category } from './concepts/data-modeling/entities/relationships/category.entity';
import { Product } from './concepts/data-modeling/entities/ecommerce/product.entity';
import { Order } from './concepts/data-modeling/entities/ecommerce/order.entity';
import { OrderItem } from './concepts/data-modeling/entities/ecommerce/order-item.entity';
import { SoftDeleteExample } from './concepts/data-modeling/entities/advanced/soft-delete.entity';
import { AuditTrailExample } from './concepts/data-modeling/entities/advanced/audit-trail.entity';

@Module({
  imports: [
    // TypeORM Configuration for TypeORM concept (SQLite)
    TypeOrmModule.forRoot({
      name: 'default', // Default connection name
      type: 'sqlite',
      database: 'typeorm-demo.db',
      entities: [User, Profile, Post, Tag],
      synchronize: true, // Auto-create tables (disable in production, use migrations)
      logging: true, // Log SQL queries (disable in production)
    }),
    // TypeORM Configuration for Data Modeling concept (PostgreSQL)
    TypeOrmModule.forRoot({
      name: 'dataModeling', // Named connection for data modeling
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'core_concepts',
      entities: [
        DataModelingUser,
        UserProfile,
        DataModelingPost,
        Comment,
        DataModelingTag,
        Category,
        Product,
        Order,
        OrderItem,
        SoftDeleteExample,
        AuditTrailExample,
      ],
      synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables (disable in production, use migrations)
      logging: process.env.NODE_ENV !== 'production', // Log SQL queries (disable in production)
    }),
    // Feature Modules
    RestApiModule,
    TypeormModule,
    EventDrivenModule,
    SagaModule,
    TracingLoggingModule,
    DataModelingModule,
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
