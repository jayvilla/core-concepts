import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  Check,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

/**
 * ORDER ITEM ENTITY - E-commerce Example (Junction Table Pattern)
 *
 * Demonstrates:
 * - Many-to-One: OrderItem belongs to Order
 * - Many-to-One: OrderItem references Product
 * - Junction table pattern (Order ↔ Product)
 * - Historical price storage (denormalization)
 *
 * DESIGN PATTERN: Junction Table with Additional Data
 *
 * This is more than a simple junction table:
 * - Stores quantity (how many)
 * - Stores price at time of order (historical snapshot)
 * - Links Order and Product
 *
 * DENORMALIZATION:
 * - Price stored here (not just from Product)
 * - Why? Product price might change
 * - Order should reflect price at time of purchase
 * - Historical accuracy for accounting/refunds
 */
@Entity('data_modeling_order_items')
@Index('idx_order_item_order', ['orderId']) // Index for order lookups
@Index('idx_order_item_product', ['productId']) // Index for product lookups
@Check(`"quantity" > 0`) // Ensure quantity is positive
@Check(`"price" >= 0`) // Ensure price is non-negative
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * QUANTITY - How many of this product
   *
   * Check constraint ensures quantity > 0
   * Integer for whole units
   */
  @Column({ type: 'int' })
  quantity: number;

  /**
   * PRICE AT TIME OF ORDER - Historical snapshot
   *
   * DENORMALIZATION:
   * - Product.price might be $10.00 today
   * - But when ordered, it was $9.99
   * - Store $9.99 here for historical accuracy
   *
   * Why important?
   * - Accurate order history
   * - Refund calculations
   * - Accounting and reporting
   * - Price change tracking
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  /**
   * SUBTOTAL - Calculated field (quantity * price)
   *
   * DENORMALIZATION:
   * - Could calculate: quantity * price
   * - Stored for:
   *   - Performance (no calculation needed)
   *   - Data integrity (explicit value)
   *   - Historical accuracy
   *
   * Application should ensure: subtotal = quantity * price
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  /**
   * FOREIGN KEY - References Order.id
   *
   * OrderItem belongs to Order
   * NOT NULL ensures every item has an order
   */
  @Column({ type: 'int' })
  orderId: number;

  /**
   * FOREIGN KEY - References Product.id
   *
   * OrderItem references Product
   *
   * onDelete: 'RESTRICT' or 'SET NULL'?
   * - RESTRICT: Can't delete product if ordered
   * - SET NULL: Product deleted but order item remains
   *
   * Here we use RESTRICT to maintain data integrity
   */
  @Column({ type: 'int' })
  productId: number;

  /**
   * MANY-TO-ONE RELATIONSHIP
   *
   * OrderItem belongs to Order
   *
   * onDelete: 'CASCADE'
   * - Deleting order deletes all items
   * - Maintains referential integrity
   */
  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  /**
   * MANY-TO-ONE RELATIONSHIP
   *
   * OrderItem references Product
   *
   * onDelete: 'RESTRICT'
   * - Prevents deleting product if it has orders
   * - Maintains historical accuracy
   * - Alternative: SET NULL (if you want to allow deletion)
   */
  @ManyToOne(() => Product, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
