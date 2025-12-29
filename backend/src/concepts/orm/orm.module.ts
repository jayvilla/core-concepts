import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmController } from './orm.controller';
import { OrmService } from './orm.service';
// TypeORM entities
import { User as TypeORMUser } from './entities/typeorm/user.entity';
import { Profile as TypeORMProfile } from './entities/typeorm/profile.entity';
import { Post as TypeORMPost } from './entities/typeorm/post.entity';
import { Tag as TypeORMTag } from './entities/typeorm/tag.entity';

/**
 * ORM Module
 * Demonstrates Prisma, TypeORM, and Sequelize
 */
@Module({
  imports: [
    // TypeORM entities for the 'orm' connection
    TypeOrmModule.forFeature(
      [TypeORMUser, TypeORMProfile, TypeORMPost, TypeORMTag],
      'orm', // Named connection
    ),
  ],
  controllers: [OrmController],
  providers: [OrmService],
  exports: [OrmService],
})
export class OrmModule {}

