import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PaymentProcessedEvent } from '../events/payment-processed.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

/**
 * Payment Processed Event Handler
 * Demonstrates handling payment events and triggering notifications
 */
@Injectable()
export class PaymentProcessedHandler {
  private readonly logger = new Logger(PaymentProcessedHandler.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  @OnEvent('payment.processed')
  handlePaymentProcessed(event: PaymentProcessedEvent) {
    this.logger.log(`Payment ${event.paymentId} processed for order ${event.orderId}`);
    this.logger.log(`Amount: $${event.amount}, Status: ${event.status}`);
    
    if (event.status === 'success') {
      // Simulate order fulfillment
      this.logger.log(`Order ${event.orderId} ready for fulfillment`);
      
      // Emit notification event (event chaining)
      this.eventEmitter.emit('notification', {
        userId: 1, // In real app, get from order
        type: 'email' as const,
        message: `Your payment of $${event.amount} was successful!`,
      });
    } else {
      this.logger.error(`Payment ${event.paymentId} failed`);
      
      // Emit notification for failed payment
      this.eventEmitter.emit('notification', {
        userId: 1,
        type: 'email' as const,
        message: `Payment failed. Please try again.`,
      });
    }
    
    return {
      handled: true,
      event: 'payment.processed',
      paymentId: event.paymentId,
      status: event.status,
    };
  }
}

