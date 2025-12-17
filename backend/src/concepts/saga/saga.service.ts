import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SagaOrchestratorService } from './orchestrators/saga-orchestrator.service';
import { OrderCreatedEvent } from './events/order-created.event';

/**
 * Saga Service
 * Main service for Saga pattern demonstrations
 */
@Injectable()
export class SagaService {
  private readonly logger = new Logger(SagaService.name);
  private orders: Array<{
    id: string;
    userId: number;
    items: Array<{ productId: string; quantity: number; price: number }>;
    total: number;
  }> = [];

  constructor(
    private readonly sagaOrchestrator: SagaOrchestratorService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * Create order and start orchestrated saga
   */
  async createOrderWithOrchestration(orderData: {
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

    // Execute orchestrated saga
    const sagaResult = await this.sagaOrchestrator.executeSaga({
      orderId,
      userId: orderData.userId,
      items: orderData.items,
      totalAmount,
    });

    return {
      order,
      saga: sagaResult,
    };
  }

  /**
   * Create order and start choreography-based saga
   */
  createOrderWithChoreography(orderData: {
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

    // Emit order created event - choreography saga will handle it
    const event = new OrderCreatedEvent(
      orderId,
      orderData.userId,
      orderData.items,
      totalAmount,
    );
    this.eventEmitter.emit('order.created', event);

    this.logger.log(
      `Order created: ${orderId}. Choreography saga started via events.`,
    );

    return {
      order,
      message:
        'Order created. Choreography saga will process asynchronously via events.',
    };
  }

  /**
   * Get all orders
   */
  getAllOrders() {
    return this.orders;
  }

  /**
   * Get saga status (orchestration)
   */
  getSagaStatus(sagaId: string): any {
    return this.sagaOrchestrator.getSagaStatus(sagaId);
  }

  /**
   * Get all sagas (orchestration)
   */
  getAllSagas(): any[] {
    return this.sagaOrchestrator.getAllSagas();
  }
}
