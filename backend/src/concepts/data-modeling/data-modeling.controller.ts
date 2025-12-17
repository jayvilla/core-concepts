import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DataModelingService } from './data-modeling.service';

/**
 * Data Modeling Controller
 * Demonstrates data modeling concepts through HTTP endpoints
 *
 * Route: /concepts/data-modeling
 */
@Controller('concepts/data-modeling')
export class DataModelingController {
  constructor(private readonly dataModelingService: DataModelingService) {}

  /**
   * POST /concepts/data-modeling/users/one-to-one
   * Create user with profile (One-to-One relationship)
   */
  @Post('users/one-to-one')
  @HttpCode(HttpStatus.CREATED)
  async createUserWithProfile(
    @Body()
    data: {
      name: string;
      email: string;
      profile: {
        firstName?: string;
        lastName?: string;
        phone?: string;
        bio?: string;
      };
    },
  ) {
    return await this.dataModelingService.createUserWithProfile(data);
  }

  /**
   * POST /concepts/data-modeling/users/one-to-many
   * Create user with posts (One-to-Many relationship)
   */
  @Post('users/one-to-many')
  @HttpCode(HttpStatus.CREATED)
  async createUserWithPosts(
    @Body()
    data: {
      name: string;
      email: string;
      posts: Array<{ title: string; content: string }>;
    },
  ) {
    return await this.dataModelingService.createUserWithPosts(data);
  }

  /**
   * POST /concepts/data-modeling/users/:id/tags
   * Add tags to user (Many-to-Many relationship)
   */
  @Post('users/:id/tags')
  @HttpCode(HttpStatus.OK)
  async addTagsToUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() data: { tags: string[] },
  ) {
    return await this.dataModelingService.addTagsToUser(userId, data.tags);
  }

  /**
   * GET /concepts/data-modeling/users/:id/relations
   * Get user with all relationships
   */
  @Get('users/:id/relations')
  async getUserWithRelations(@Param('id', ParseIntPipe) userId: number) {
    return await this.dataModelingService.getUserWithRelations(userId);
  }

  /**
   * POST /concepts/data-modeling/categories/hierarchy
   * Create category hierarchy (Self-Referencing relationship)
   */
  @Post('categories/hierarchy')
  @HttpCode(HttpStatus.CREATED)
  async createCategoryHierarchy(
    @Body()
    data: {
      categories: Array<{
        name: string;
        description?: string;
        parentName?: string;
      }>;
    },
  ) {
    return await this.dataModelingService.createCategoryHierarchy(
      data.categories,
    );
  }

  /**
   * GET /concepts/data-modeling/categories/tree
   * Get category tree structure
   */
  @Get('categories/tree')
  async getCategoryTree() {
    return await this.dataModelingService.getCategoryTree();
  }

  /**
   * POST /concepts/data-modeling/orders
   * Create order with items (E-commerce example)
   */
  @Post('orders')
  @HttpCode(HttpStatus.CREATED)
  async createOrder(
    @Body()
    data: {
      userId: number;
      orderNumber: string;
      shippingAddress: string;
      items: Array<{ productId: number; quantity: number }>;
    },
  ) {
    return await this.dataModelingService.createOrder(data);
  }

  /**
   * GET /concepts/data-modeling/orders/:id
   * Get order with details
   */
  @Get('orders/:id')
  async getOrderWithDetails(@Param('id', ParseIntPipe) orderId: number) {
    return await this.dataModelingService.getOrderWithDetails(orderId);
  }

  /**
   * POST /concepts/data-modeling/soft-delete
   * Create record for soft delete demonstration
   */
  @Post('soft-delete')
  @HttpCode(HttpStatus.CREATED)
  async createSoftDeleteRecord(
    @Body() data: { name: string; description?: string },
  ) {
    return await this.dataModelingService.createSoftDeleteRecord(data);
  }

  /**
   * DELETE /concepts/data-modeling/soft-delete/:id
   * Soft delete a record
   */
  @Post('soft-delete/:id/delete')
  @HttpCode(HttpStatus.OK)
  async softDeleteRecord(@Param('id', ParseIntPipe) id: number) {
    return await this.dataModelingService.softDeleteRecord(id);
  }

  /**
   * POST /concepts/data-modeling/soft-delete/:id/restore
   * Restore a soft deleted record
   */
  @Post('soft-delete/:id/restore')
  @HttpCode(HttpStatus.OK)
  async restoreSoftDeletedRecord(@Param('id', ParseIntPipe) id: number) {
    return await this.dataModelingService.restoreSoftDeletedRecord(id);
  }

  /**
   * GET /concepts/data-modeling/soft-delete
   * Get all records including soft deleted
   */
  @Get('soft-delete')
  async getSoftDeletedRecords() {
    return await this.dataModelingService.getSoftDeletedRecords();
  }

  /**
   * POST /concepts/data-modeling/audit-trail
   * Create record with audit trail
   */
  @Post('audit-trail')
  @HttpCode(HttpStatus.CREATED)
  async createAuditTrailRecord(
    @Body() data: { name: string; description?: string; createdBy: string },
  ) {
    return await this.dataModelingService.createAuditTrailRecord(data);
  }

  /**
   * PUT /concepts/data-modeling/audit-trail/:id
   * Update record (demonstrates version tracking)
   */
  @Post('audit-trail/:id/update')
  @HttpCode(HttpStatus.OK)
  async updateAuditTrailRecord(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { name?: string; description?: string; updatedBy: string },
  ) {
    return await this.dataModelingService.updateAuditTrailRecord(id, data);
  }

  /**
   * GET /concepts/data-modeling/normalization
   * Get normalization examples and explanations
   */
  @Get('normalization')
  getNormalizationExamples() {
    return this.dataModelingService.getNormalizationExamples();
  }

  /**
   * GET /concepts/data-modeling/features
   * Get data modeling features explanation
   */
  @Get('features')
  getFeatures() {
    return {
      relationships: {
        oneToOne: {
          description: 'One entity relates to exactly one other entity',
          example: 'User → UserProfile',
          useCase: 'Optional extended data, separate for performance',
          implementation: 'Foreign key in one table, unique constraint',
        },
        oneToMany: {
          description: 'One entity relates to many other entities',
          example: 'User → Posts, Order → OrderItems',
          useCase: 'Parent-child relationships',
          implementation: 'Foreign key in "many" side table',
        },
        manyToMany: {
          description: 'Many entities relate to many other entities',
          example: 'User ↔ Tags, Student ↔ Courses',
          useCase: 'Tagging, associations, memberships',
          implementation: 'Junction table with foreign keys to both tables',
        },
        selfReferencing: {
          description: 'Entity relates to itself',
          example: 'Category → Subcategories, User follows Users',
          useCase: 'Hierarchical data, trees, networks',
          implementation: 'Foreign key references same table',
        },
      },
      normalization: {
        firstNormalForm: {
          description: 'Atomic values, no repeating groups',
          rule: 'Each column contains single, atomic values',
        },
        secondNormalForm: {
          description: 'Remove partial dependencies',
          rule: 'All non-key attributes fully depend on primary key',
        },
        thirdNormalForm: {
          description: 'Remove transitive dependencies',
          rule: 'Non-key attributes depend only on primary key',
        },
        denormalization: {
          description: 'Intentionally adding redundancy for performance',
          when: 'Read-heavy workloads, performance critical',
          examples: ['Storing calculated totals', 'Historical snapshots'],
        },
      },
      patterns: {
        softDelete: {
          description: 'Mark records as deleted instead of removing',
          benefits: ['Data recovery', 'Audit trail', 'Referential integrity'],
          implementation: 'deletedAt timestamp column',
        },
        auditTrail: {
          description: 'Track who and when created/modified records',
          fields: ['createdBy', 'updatedBy', 'createdAt', 'updatedAt'],
          useCase: 'Compliance, debugging, change tracking',
        },
        historicalSnapshot: {
          description: 'Store data as it was at a point in time',
          example: 'Order stores product price at time of order',
          why: 'Product price might change, but order should reflect original',
        },
      },
      indexes: {
        purpose: 'Improve query performance',
        whenToUse: [
          'Foreign keys (for joins)',
          'Frequently queried columns',
          'Columns used in WHERE clauses',
          'Columns used for sorting',
        ],
        tradeOffs: ['Faster reads', 'Slower writes', 'More storage'],
      },
    };
  }
}

