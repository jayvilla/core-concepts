import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../events/order-created.event';
import { PaymentProcessedEvent } from '../events/payment-processed.event';
import { InventoryReservedEvent } from '../events/inventory-reserved.event';
import { InventoryService } from '../services/inventory.service';
import { PaymentService } from '../services/payment.service';
import { ShippingService } from '../services/shipping.service';

/**
 * Choreography-Based Saga Handler
 * Each service reacts to events and publishes new events
 * No central orchestrator - services coordinate through events
 */
@Injectable()
export class ChoreographySagaHandler {
  private readonly logger = new Logger(ChoreographySagaHandler.name);
  private sagaState = new Map<string, any>();

  constructor(
    private readonly inventoryService: InventoryService,
    private readonly paymentService: PaymentService,
    private readonly shippingService: ShippingService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * Handle order created - start saga
   */
  @OnEvent('order.created')
  async handleOrderCreated(event: OrderCreatedEvent) {
    this.logger.log(
      `[Choreography Saga] Order created: ${event.orderId}. Starting saga...`,
    );

    // Initialize saga state
    this.sagaState.set(event.orderId, {
      orderId: event.orderId,
      status: 'in_progress',
      steps: [],
    });

    // Step 1: Reserve inventory
    const inventoryResult = await this.inventoryService.reserveInventory(
      event.orderId,
      event.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    );

    if (inventoryResult.success) {
      this.logger.log(
        `[Choreography Saga] Inventory reserved for order ${event.orderId}`,
      );
      this.eventEmitter.emit('inventory.reserved', {
        orderId: event.orderId,
        items: event.items,
        status: 'reserved',
      });
    } else {
      this.logger.error(
        `[Choreography Saga] Inventory reservation failed for order ${event.orderId}`,
      );
      this.eventEmitter.emit('saga.failed', {
        orderId: event.orderId,
        sagaId: `saga_${event.orderId}`,
        failedStep: 'inventory_reservation',
        reason: inventoryResult.error,
      });
    }
  }

  /**
   * Handle inventory reserved - process payment
   */
  @OnEvent('inventory.reserved')
  async handleInventoryReserved(event: InventoryReservedEvent) {
    if (event.status !== 'reserved') {
      return;
    }

    this.logger.log(
      `[Choreography Saga] Inventory reserved for order ${event.orderId}. Processing payment...`,
    );

    // Get order details (in real app, fetch from order service)
    const orderAmount = 100; // Simplified for demo

    const paymentResult = await this.paymentService.processPayment(
      event.orderId,
      orderAmount,
    );

    if (paymentResult.success) {
      this.logger.log(
        `[Choreography Saga] Payment processed for order ${event.orderId}`,
      );
      this.eventEmitter.emit('payment.processed', {
        orderId: event.orderId,
        paymentId: paymentResult.paymentId,
        amount: orderAmount,
        status: 'success',
      });
    } else {
      this.logger.error(
        `[Choreography Saga] Payment failed for order ${event.orderId}. Compensating...`,
      );
      // Compensate: Release inventory
      await this.inventoryService.compensateInventory(event.orderId);
      this.eventEmitter.emit('saga.failed', {
        orderId: event.orderId,
        sagaId: `saga_${event.orderId}`,
        failedStep: 'payment_processing',
        reason: paymentResult.error,
      });
    }
  }

  /**
   * Handle payment processed - ship order
   */
  @OnEvent('payment.processed')
  async handlePaymentProcessed(event: PaymentProcessedEvent) {
    if (event.status !== 'success') {
      return;
    }

    this.logger.log(
      `[Choreography Saga] Payment processed for order ${event.orderId}. Shipping...`,
    );

    const shippingResult = await this.shippingService.shipOrder(event.orderId);

    if (shippingResult.success) {
      this.logger.log(
        `[Choreography Saga] Order shipped for order ${event.orderId}`,
      );
      this.eventEmitter.emit('order.shipped', {
        orderId: event.orderId,
        trackingNumber: shippingResult.trackingNumber,
      });
      this.eventEmitter.emit('saga.completed', {
        orderId: event.orderId,
        sagaId: `saga_${event.orderId}`,
      });
    } else {
      this.logger.error(
        `[Choreography Saga] Shipping failed for order ${event.orderId}. Compensating...`,
      );
      // Compensate: Refund payment and release inventory
      await this.paymentService.compensatePayment(event.orderId);
      await this.inventoryService.compensateInventory(event.orderId);
      this.eventEmitter.emit('saga.failed', {
        orderId: event.orderId,
        sagaId: `saga_${event.orderId}`,
        failedStep: 'shipping',
        reason: shippingResult.error,
      });
    }
  }

  /**
   * Get saga state
   */
  getSagaState(orderId: string): any {
    return this.sagaState.get(orderId) || null;
  }
}
