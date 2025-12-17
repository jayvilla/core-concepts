import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './events/user-created.event';
import { UserUpdatedEvent } from './events/user-updated.event';
import { OrderPlacedEvent } from './events/order-placed.event';
import { PaymentProcessedEvent } from './events/payment-processed.event';
import { NotificationEvent } from './events/notification.event';

/**
 * Event-Driven Service
 * Demonstrates emitting events and event-driven architecture patterns
 */
@Injectable()
export class EventDrivenService {
  private readonly logger = new Logger(EventDrivenService.name);
  private users: Array<{
    id: number;
    name: string;
    email: string;
    age: number;
  }> = [];
  private orders: Array<{
    id: string;
    userId: number;
    items: any[];
    total: number;
  }> = [];
  private nextUserId = 1;

  constructor(private readonly eventEmitter: EventEmitter2) {}

  /**
   * Create user and emit event
   */
  createUser(userData: { name: string; email: string; age: number }) {
    const user = {
      id: this.nextUserId++,
      ...userData,
    };

    this.users.push(user);

    // Emit user created event
    const event = new UserCreatedEvent(user.id, user.email, user.name);
    this.eventEmitter.emit('user.created', event);

    this.logger.log(`User created and event emitted: ${user.id}`);

    return user;
  }

  /**
   * Update user and emit event
   */
  updateUser(userId: number, changes: Record<string, any>) {
    const userIndex = this.users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      throw new Error(`User with ID ${userId} not found`);
    }

    this.users[userIndex] = { ...this.users[userIndex], ...changes };

    // Emit user updated event
    const event = new UserUpdatedEvent(userId, changes);
    this.eventEmitter.emit('user.updated', event);

    this.logger.log(`User updated and event emitted: ${userId}`);

    return this.users[userIndex];
  }

  /**
   * Place order and emit event (demonstrates event-driven workflow)
   */
  placeOrder(orderData: {
    userId: number;
    items: Array<{ productId: string; quantity: number; price: number }>;
  }) {
    const orderId = `order_${Date.now()}`;
    const totalAmount = orderData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = {
      id: orderId,
      userId: orderData.userId,
      items: orderData.items,
      total: totalAmount,
    };

    this.orders.push(order);

    // Emit order placed event
    const event = new OrderPlacedEvent(
      orderId,
      orderData.userId,
      orderData.items,
      totalAmount,
    );
    this.eventEmitter.emit('order.placed', event);

    this.logger.log(`Order placed and event emitted: ${orderId}`);

    return order;
  }

  /**
   * Process payment and emit event
   */
  processPayment(paymentData: {
    orderId: string;
    amount: number;
    status: 'success' | 'failed';
  }) {
    const paymentId = `pay_${Date.now()}`;

    // Emit payment processed event
    const event = new PaymentProcessedEvent(
      paymentId,
      paymentData.orderId,
      paymentData.amount,
      paymentData.status,
    );
    this.eventEmitter.emit('payment.processed', event);

    this.logger.log(`Payment processed and event emitted: ${paymentId}`);

    return { paymentId, ...paymentData };
  }

  /**
   * Send notification and emit event
   */
  sendNotification(notificationData: {
    userId: number;
    type: 'email' | 'sms' | 'push';
    message: string;
  }) {
    const event = new NotificationEvent(
      notificationData.userId,
      notificationData.type,
      notificationData.message,
    );
    this.eventEmitter.emit('notification', event);

    this.logger.log(
      `Notification event emitted for user ${notificationData.userId}`,
    );

    return { sent: true, ...notificationData };
  }

  /**
   * Get all users
   */
  getAllUsers() {
    return this.users;
  }

  /**
   * Get all orders
   */
  getAllOrders() {
    return this.orders;
  }

  /**
   * Demonstrate event chaining - complete order workflow
   */
  completeOrderWorkflow(orderData: {
    userId: number;
    items: Array<{ productId: string; quantity: number; price: number }>;
  }) {
    this.logger.log('Starting complete order workflow...');

    // Step 1: Place order (emits order.placed event)
    const order = this.placeOrder(orderData);

    // Step 2: Process payment (emits payment.processed event)
    // This will be triggered by the order.placed handler in a real scenario
    // For demo, we'll call it directly
    setTimeout(() => {
      this.processPayment({
        orderId: order.id,
        amount: order.total,
        status: 'success',
      });
    }, 500);

    return {
      message:
        'Order workflow initiated. Events will be processed asynchronously.',
      order,
    };
  }
}
