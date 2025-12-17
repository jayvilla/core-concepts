import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataModelingController } from './data-modeling.controller';
import { DataModelingService } from './data-modeling.service';
// Relationship entities
import { User } from './entities/relationships/user.entity';
import { UserProfile } from './entities/relationships/user-profile.entity';
import { Post } from './entities/relationships/post.entity';
import { Comment } from './entities/relationships/comment.entity';
import { Tag } from './entities/relationships/tag.entity';
import { Category } from './entities/relationships/category.entity';
// E-commerce entities
import { Product } from './entities/ecommerce/product.entity';
import { Order } from './entities/ecommerce/order.entity';
import { OrderItem } from './entities/ecommerce/order-item.entity';
// Advanced pattern entities
import { SoftDeleteExample } from './entities/advanced/soft-delete.entity';
import { AuditTrailExample } from './entities/advanced/audit-trail.entity';

/**
 * Data Modeling Module
 * Demonstrates data modeling concepts with TypeORM and PostgreSQL
 */
@Module({
  imports: [
    // Use the 'dataModeling' connection (PostgreSQL) for these entities
    TypeOrmModule.forFeature(
      [
        // Relationship entities
        User,
        UserProfile,
        Post,
        Comment,
        Tag,
        Category,
        // E-commerce entities
        Product,
        Order,
        OrderItem,
        // Advanced pattern entities
        SoftDeleteExample,
        AuditTrailExample,
      ],
      'dataModeling', // Named connection for PostgreSQL
    ),
  ],
  controllers: [DataModelingController],
  providers: [DataModelingService],
  exports: [DataModelingService],
})
export class DataModelingModule {}

