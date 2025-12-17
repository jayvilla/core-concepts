import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestApiModule } from './concepts/rest-api/rest-api.module';
import { TypeormModule } from './concepts/typeorm/typeorm.module';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
