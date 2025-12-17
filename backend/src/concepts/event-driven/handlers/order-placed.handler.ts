import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderPlacedEvent } from '../events/order-placed.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

/**
 * Order Placed Event Handler
 * Demonstrates event chaining - one event triggering another
 */
@Injectable()
export class OrderPlacedHandler {
  private readonly logger = new Logger(OrderPlacedHandler.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  @OnEvent('order.placed')
  async handleOrderPlaced(event: OrderPlacedEvent) {
    this.logger.log(`Order ${event.orderId} placed by user ${event.userId}`);
    this.logger.log(`Total amount: $${event.totalAmount}`);
    
    // Simulate inventory update
    this.logger.log(`Updating inventory for order ${event.orderId}`);
    
    // Simulate payment processing
    this.logger.log(`Processing payment for order ${event.orderId}`);
    
    // Emit payment processed event (event chaining)
    setTimeout(() => {
      this.eventEmitter.emit('payment.processed', {
        paymentId: `pay_${Date.now()}`,
        orderId: event.orderId,
        amount: event.totalAmount,
        status: 'success' as const,
      });
    }, 1000);
    
    // Simulate sending order confirmation
    this.logger.log(`Sending order confirmation to user ${event.userId}`);
    
    return {
      handled: true,
      event: 'order.placed',
      orderId: event.orderId,
      timestamp: event.timestamp,
    };
  }
}

