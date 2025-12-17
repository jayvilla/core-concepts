import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, IsNull } from 'typeorm';
import { User } from './entities/relationships/user.entity';
import { UserProfile } from './entities/relationships/user-profile.entity';
import { Post } from './entities/relationships/post.entity';
import { Comment } from './entities/relationships/comment.entity';
import { Tag } from './entities/relationships/tag.entity';
import { Category } from './entities/relationships/category.entity';
import { Product } from './entities/ecommerce/product.entity';
import { Order } from './entities/ecommerce/order.entity';
import { OrderItem } from './entities/ecommerce/order-item.entity';
import { SoftDeleteExample } from './entities/advanced/soft-delete.entity';
import { AuditTrailExample } from './entities/advanced/audit-trail.entity';

/**
 * Data Modeling Service
 * Demonstrates various data modeling concepts and patterns
 */
@Injectable()
export class DataModelingService {
  constructor(
    @InjectRepository(User, 'dataModeling')
    private userRepository: Repository<User>,
    @InjectRepository(UserProfile, 'dataModeling')
    private profileRepository: Repository<UserProfile>,
    @InjectRepository(Post, 'dataModeling')
    private postRepository: Repository<Post>,
    @InjectRepository(Comment, 'dataModeling')
    private commentRepository: Repository<Comment>,
    @InjectRepository(Tag, 'dataModeling')
    private tagRepository: Repository<Tag>,
    @InjectRepository(Category, 'dataModeling')
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product, 'dataModeling')
    private productRepository: Repository<Product>,
    @InjectRepository(Order, 'dataModeling')
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem, 'dataModeling')
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(SoftDeleteExample, 'dataModeling')
    private softDeleteRepository: Repository<SoftDeleteExample>,
    @InjectRepository(AuditTrailExample, 'dataModeling')
    private auditTrailRepository: Repository<AuditTrailExample>,
    private dataSource: DataSource,
  ) {}

  /**
   * ONE-TO-ONE: Create user with profile
   *
   * Demonstrates:
   * - Creating parent (User) with child (Profile)
   * - Cascade save
   * - One-to-one relationship
   */
  async createUserWithProfile(userData: {
    name: string;
    email: string;
    profile: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      bio?: string;
    };
  }) {
    const user = this.userRepository.create({
      name: userData.name,
      email: userData.email,
      profile: this.profileRepository.create(userData.profile),
    });

    return await this.userRepository.save(user);
  }

  /**
   * ONE-TO-MANY: Create user with posts
   *
   * Demonstrates:
   * - Creating parent (User) with multiple children (Posts)
   * - Cascade save
   * - One-to-many relationship
   */
  async createUserWithPosts(userData: {
    name: string;
    email: string;
    posts: Array<{ title: string; content: string }>;
  }) {
    const user = this.userRepository.create({
      name: userData.name,
      email: userData.email,
      posts: userData.posts.map((postData) =>
        this.postRepository.create(postData),
      ),
    });

    return await this.userRepository.save(user);
  }

  /**
   * MANY-TO-MANY: Add tags to user
   *
   * Demonstrates:
   * - Many-to-many relationship
   * - Junction table usage
   * - Adding relationships to existing entity
   */
  async addTagsToUser(userId: number, tagNames: string[]) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['tags'],
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Find or create tags
    const tags = await Promise.all(
      tagNames.map(async (name) => {
        let tag = await this.tagRepository.findOne({ where: { name } });
        if (!tag) {
          tag = this.tagRepository.create({ name });
          tag = await this.tagRepository.save(tag);
        }
        return tag;
      }),
    );

    // Add tags to user (many-to-many)
    user.tags = [...(user.tags || []), ...tags];
    return await this.userRepository.save(user);
  }

  /**
   * SELF-REFERENCING: Create category hierarchy
   *
   * Demonstrates:
   * - Self-referencing relationship
   * - Hierarchical data structure
   * - Tree building
   */
  async createCategoryHierarchy(categories: Array<{
    name: string;
    description?: string;
    parentName?: string;
  }>) {
    const createdCategories = new Map<string, Category>();

    for (const catData of categories) {
      const category = this.categoryRepository.create({
        name: catData.name,
        description: catData.description,
      });

      if (catData.parentName) {
        const parent = createdCategories.get(catData.parentName);
        if (parent) {
          category.parent = parent;
        }
      }

      const saved = await this.categoryRepository.save(category);
      createdCategories.set(catData.name, saved);
    }

    return Array.from(createdCategories.values());
  }

  /**
   * E-COMMERCE: Create order with items
   *
   * Demonstrates:
   * - Complex relationship (Order → OrderItems → Product)
   * - Historical price storage (denormalization)
   * - Total calculation
   */
  async createOrder(orderData: {
    userId: number;
    orderNumber: string;
    shippingAddress: string;
    items: Array<{
      productId: number;
      quantity: number;
    }>;
  }) {
    // Get products and calculate totals
    const products = await Promise.all(
      orderData.items.map((item) =>
        this.productRepository.findOne({ where: { id: item.productId } }),
      ),
    );

    if (products.some((p) => !p)) {
      throw new Error('One or more products not found');
    }

    // Create order items with historical prices
    const orderItems = orderData.items.map((item, index) => {
      const product = products[index]!;
      const price = product.price;
      const subtotal = price * item.quantity;

      return this.orderItemRepository.create({
        quantity: item.quantity,
        price: price, // Historical price at time of order
        subtotal: subtotal,
        product: product,
      });
    });

    // Calculate total
    const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

    // Create order
    const order = this.orderRepository.create({
      orderNumber: orderData.orderNumber,
      userId: orderData.userId,
      status: 'pending',
      total: total,
      shippingAddress: orderData.shippingAddress,
      orderItems: orderItems,
    });

    return await this.orderRepository.save(order);
  }

  /**
   * SOFT DELETE: Demonstrate soft delete pattern
   */
  async createSoftDeleteRecord(data: { name: string; description?: string }) {
    const record = this.softDeleteRepository.create(data);
    return await this.softDeleteRepository.save(record);
  }

  async softDeleteRecord(id: number) {
    // TypeORM's softDelete method
    await this.softDeleteRepository.softDelete(id);
    return { message: 'Record soft deleted', id };
  }

  async restoreSoftDeletedRecord(id: number) {
    // TypeORM's restore method
    await this.softDeleteRepository.restore(id);
    return { message: 'Record restored', id };
  }

  async getSoftDeletedRecords() {
    // Get all records including soft deleted
    return await this.softDeleteRepository.find({ withDeleted: true });
  }

  /**
   * AUDIT TRAIL: Demonstrate audit trail pattern
   */
  async createAuditTrailRecord(data: {
    name: string;
    description?: string;
    createdBy: string;
  }) {
    const record = this.auditTrailRepository.create(data);
    return await this.auditTrailRepository.save(record);
  }

  async updateAuditTrailRecord(
    id: number,
    data: { name?: string; description?: string; updatedBy: string },
  ) {
    const record = await this.auditTrailRepository.findOne({ where: { id } });
    if (!record) {
      throw new Error(`Record with ID ${id} not found`);
    }

    Object.assign(record, data);
    return await this.auditTrailRepository.save(record);
  }

  /**
   * Get user with all relationships (eager loading)
   */
  async getUserWithRelations(userId: number) {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile', 'posts', 'tags', 'following', 'followers'],
    });
  }

  /**
   * Get category tree (hierarchical structure)
   */
  async getCategoryTree() {
    // Get all root categories (no parent)
    // Use IsNull() operator for null checks in TypeORM queries
    const roots = await this.categoryRepository.find({
      where: { parentId: IsNull() },
      relations: ['children'],
    });

    // Recursively load children
    const loadChildren = async (category: Category) => {
      if (category.children && category.children.length > 0) {
        category.children = await Promise.all(
          category.children.map(async (child) => {
            const fullChild = await this.categoryRepository.findOne({
              where: { id: child.id },
              relations: ['children'],
            });
            if (fullChild) {
              return await loadChildren(fullChild);
            }
            return child;
          }),
        );
      }
      return category;
    };

    return await Promise.all(roots.map(loadChildren));
  }

  /**
   * Get order with items and products
   */
  async getOrderWithDetails(orderId: number) {
    return await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['orderItems', 'orderItems.product'],
    });
  }

  /**
   * Demonstrate normalization concepts
   */
  getNormalizationExamples() {
    return {
      firstNormalForm: {
        description:
          'Each column contains atomic values, no repeating groups',
        before: {
          table: 'orders',
          columns: ['id', 'orderNum', 'items'], // items is array - BAD
          example: { id: 1, orderNum: 'ORD-001', items: ['item1', 'item2'] },
        },
        after: {
          tables: ['orders', 'order_items'],
          example: {
            orders: { id: 1, orderNum: 'ORD-001' },
            order_items: [
              { id: 1, orderId: 1, productId: 1 },
              { id: 2, orderId: 1, productId: 2 },
            ],
          },
        },
      },
      secondNormalForm: {
        description:
          'Remove partial dependencies - all attributes depend on full primary key',
        example:
          'If order has (orderId, productId) as composite key, price should depend on both, not just productId',
      },
      thirdNormalForm: {
        description:
          'Remove transitive dependencies - non-key attributes depend only on primary key',
        example:
          'If order has customerName, and customerName → customerAddress, then customerAddress transitively depends on orderId. Should separate into customers table.',
      },
    };
  }
}

