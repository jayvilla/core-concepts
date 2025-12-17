import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  Check,
} from 'typeorm';
import { Category } from '../relationships/category.entity';
import { OrderItem } from './order-item.entity';

/**
 * PRODUCT ENTITY - E-commerce Example
 *
 * Demonstrates:
 * - Many-to-One: Product belongs to Category
 * - One-to-Many: Product has many OrderItems
 * - Check constraints for data validation
 * - Indexes for performance
 *
 * NORMALIZATION:
 * - Product table stores product information
 * - Category stored separately (normalized)
 * - Price stored in Product (not in OrderItem) for historical accuracy
 *
 * DESIGN DECISIONS:
 * - SKU: Stock Keeping Unit (unique identifier for inventory)
 * - Price: Stored as decimal for accuracy (not float)
 * - Stock: Integer for quantity tracking
 */
@Entity('data_modeling_products')
@Index('idx_product_sku', ['sku'], { unique: true }) // Unique index for SKU lookups
@Index('idx_product_category', ['categoryId']) // Index for category filtering
@Index('idx_product_price', ['price']) // Index for price range queries
@Check(`"price" >= 0`) // Ensure price is non-negative
@Check(`"stock" >= 0`) // Ensure stock is non-negative
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * SKU - Stock Keeping Unit
   *
   * Unique identifier for inventory management
   * Format examples: "PROD-12345", "BOOK-ISBN-123"
   *
   * Why unique?
   * - Prevents duplicate products
   * - Used in inventory systems
   * - Barcode/QR code mapping
   */
  @Column({ type: 'varchar', length: 50, unique: true })
  sku: string;

  /**
   * PRODUCT NAME
   */
  @Column({ type: 'varchar', length: 200 })
  name: string;

  /**
   * DESCRIPTION - Text field for product details
   */
  @Column({ type: 'text', nullable: true })
  description: string | null;

  /**
   * PRICE - Decimal for accuracy
   *
   * Using DECIMAL instead of FLOAT:
   * - FLOAT has precision issues (0.1 + 0.2 ≠ 0.3)
   * - DECIMAL is exact (important for money)
   * - Precision: 10 digits total, 2 after decimal
   *
   * Example: 99999999.99 (max price)
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  /**
   * STOCK QUANTITY
   *
   * Integer for whole units
   * Check constraint ensures non-negative
   */
  @Column({ type: 'int', default: 0 })
  stock: number;

  /**
   * ACTIVE FLAG
   *
   * Soft enable/disable product
   * - true: Product is available for purchase
   * - false: Product is hidden but not deleted
   *
   * Different from soft delete:
   * - Active=false: Temporarily unavailable
   * - Deleted: Permanently removed
   */
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * FOREIGN KEY - References Category.id
   *
   * Product belongs to a Category
   * Nullable because product might not be categorized yet
   */
  @Column({ type: 'int', nullable: true })
  categoryId: number | null;

  /**
   * MANY-TO-ONE RELATIONSHIP
   *
   * Product belongs to Category
   *
   * onDelete: 'SET NULL'
   * - If category is deleted, product category is set to NULL
   * - Product remains but uncategorized
   * - Alternative: RESTRICT (prevent category deletion if products exist)
   */
  @ManyToOne(() => Category, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoryId' })
  category: Category | null;

  /**
   * ONE-TO-MANY RELATIONSHIP
   *
   * Product has many OrderItems
   *
   * Note: We don't cascade delete here because:
   * - OrderItems are part of order history
   * - Should persist even if product is deleted
   */
  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}

