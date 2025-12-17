import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormController } from './typeorm.controller';
import { TypeormService } from './typeorm.service';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Post } from './entities/post.entity';
import { Tag } from './entities/tag.entity';

/**
 * TypeORM Module
 * Demonstrates TypeORM integration with NestJS
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Post, Tag]),
  ],
  controllers: [TypeormController],
  providers: [TypeormService],
  exports: [TypeormService],
})
export class TypeormModule {}

