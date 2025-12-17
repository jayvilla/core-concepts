import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
  Check,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

/**
 * ORDER ENTITY - E-commerce Example
 *
 * Demonstrates:
 * - One-to-Many: Order has many OrderItems
 * - Order status management
 * - Total calculation (can be denormalized for performance)
 *
 * NORMALIZATION:
 * - Order table: Order header information
 * - OrderItem table: Order line items (normalized)
 * - Total: Could be calculated from OrderItems, but denormalized for performance
 *
 * DESIGN PATTERN: Header-Detail pattern
 * - Order (header): One record per order
 * - OrderItem (detail): Multiple records per order
 */
@Entity('data_modeling_orders')
@Index('idx_order_user', ['userId']) // Index for user order lookups
@Index('idx_order_status', ['status']) // Index for status filtering
@Index('idx_order_created', ['createdAt']) // Index for date sorting
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * ORDER NUMBER - Human-readable identifier
   *
   * Format examples: "ORD-2024-001234", "INV-12345"
   *
   * Why separate from ID?
   * - ID is internal (auto-increment)
   * - Order number is customer-facing
   * - Can be formatted, include date, etc.
   * - Better for customer service
   */
  @Column({ type: 'varchar', length: 50, unique: true })
  orderNumber: string;

  /**
   * USER ID - References the customer
   *
   * In real system, this would be a foreign key to User table
   * Storing as integer for simplicity
   */
  @Column({ type: 'int' })
  userId: number;

  /**
   * ORDER STATUS - Enum-like using VARCHAR
   *
   * Status values:
   * - 'pending': Order created, payment pending
   * - 'paid': Payment received
   * - 'processing': Order being prepared
   * - 'shipped': Order shipped
   * - 'delivered': Order delivered
   * - 'cancelled': Order cancelled
   *
   * In PostgreSQL, could use ENUM type for better validation
   */
  @Column({
    type: 'varchar',
    length: 20,
    default: 'pending',
  })
  status: string;

  /**
   * TOTAL AMOUNT - Denormalized for performance
   *
   * DENORMALIZATION DECISION:
   * - Could calculate: SUM(orderItems.price * quantity)
   * - Stored here for:
   *   - Fast queries (don't need to join OrderItems)
   *   - Historical accuracy (price might change)
   *   - Performance (no aggregation needed)
   *
   * Trade-off:
   * - Must keep in sync with OrderItems
   * - Application logic ensures consistency
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  /**
   * SHIPPING ADDRESS - Denormalized
   *
   * DENORMALIZATION DECISION:
   * - Could reference Address table
   * - Stored here because:
   *   - Address might change over time
   *   - Need historical record of shipping address
   *   - Order is immutable snapshot
   *
   * This is a common pattern in e-commerce:
   * - Store snapshot of data at time of order
   * - Preserves order history even if data changes
   */
  @Column({ type: 'text' })
  shippingAddress: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * ONE-TO-MANY RELATIONSHIP
   *
   * Order has many OrderItems
   *
   * cascade: true
   * - Creating order with items creates items
   * - Deleting order deletes items (maintains integrity)
   */
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];
}

