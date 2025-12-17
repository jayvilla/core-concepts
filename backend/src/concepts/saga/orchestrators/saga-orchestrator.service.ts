import { Injectable, Logger } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { InventoryService } from '../services/inventory.service';
import { ShippingService } from '../services/shipping.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

/**
 * Saga Orchestrator
 * Orchestration-based Saga pattern
 * Central coordinator that manages the entire saga workflow
 */
@Injectable()
export class SagaOrchestratorService {
  private readonly logger = new Logger(SagaOrchestratorService.name);
  private activeSagas = new Map<string, any>();

  constructor(
    private readonly paymentService: PaymentService,
    private readonly inventoryService: InventoryService,
    private readonly shippingService: ShippingService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * Execute orchestrated saga
   * Step-by-step execution with compensation on failure
   */
  async executeSaga(orderData: {
    orderId: string;
    userId: number;
    items: Array<{ productId: string; quantity: number; price: number }>;
    totalAmount: number;
  }): Promise<{
    success: boolean;
    sagaId: string;
    completedSteps: string[];
    error?: string;
  }> {
    const sagaId = `saga_${Date.now()}`;
    const completedSteps: string[] = [];

    this.logger.log(
      `Starting orchestrated saga ${sagaId} for order ${orderData.orderId}`,
    );

    // Track saga state
    this.activeSagas.set(sagaId, {
      orderId: orderData.orderId,
      status: 'in_progress',
      steps: [],
    });

    try {
      // Step 1: Reserve Inventory
      this.logger.log(`[Saga ${sagaId}] Step 1: Reserving inventory...`);
      const inventoryResult = await this.inventoryService.reserveInventory(
        orderData.orderId,
        orderData.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      );

      if (!inventoryResult.success) {
        throw new Error(
          `Inventory reservation failed: ${inventoryResult.error}`,
        );
      }

      completedSteps.push('inventory_reserved');
      this.logger.log(
        `[Saga ${sagaId}] Step 1: Inventory reserved successfully`,
      );

      // Step 2: Process Payment
      this.logger.log(`[Saga ${sagaId}] Step 2: Processing payment...`);
      const paymentResult = await this.paymentService.processPayment(
        orderData.orderId,
        orderData.totalAmount,
      );

      if (!paymentResult.success) {
        // Compensate: Release inventory
        this.logger.log(
          `[Saga ${sagaId}] Payment failed. Compensating inventory...`,
        );
        await this.inventoryService.compensateInventory(orderData.orderId);
        throw new Error(`Payment processing failed: ${paymentResult.error}`);
      }

      completedSteps.push('payment_processed');
      this.logger.log(
        `[Saga ${sagaId}] Step 2: Payment processed successfully`,
      );

      // Step 3: Ship Order
      this.logger.log(`[Saga ${sagaId}] Step 3: Shipping order...`);
      const shippingResult = await this.shippingService.shipOrder(
        orderData.orderId,
      );

      if (!shippingResult.success) {
        // Compensate: Refund payment and release inventory
        this.logger.log(
          `[Saga ${sagaId}] Shipping failed. Compensating payment and inventory...`,
        );
        await this.paymentService.compensatePayment(orderData.orderId);
        await this.inventoryService.compensateInventory(orderData.orderId);
        throw new Error(`Shipping failed: ${shippingResult.error}`);
      }

      completedSteps.push('order_shipped');
      this.logger.log(`[Saga ${sagaId}] Step 3: Order shipped successfully`);

      // Saga completed successfully
      this.activeSagas.set(sagaId, {
        ...this.activeSagas.get(sagaId),
        status: 'completed',
        steps: completedSteps,
      });

      this.eventEmitter.emit('saga.completed', {
        orderId: orderData.orderId,
        sagaId,
      });

      this.logger.log(`[Saga ${sagaId}] Saga completed successfully!`);

      return {
        success: true,
        sagaId,
        completedSteps,
      };
    } catch (error: unknown) {
      // Saga failed - compensation already handled in try block
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.activeSagas.set(sagaId, {
        ...this.activeSagas.get(sagaId),
        status: 'failed',
        steps: completedSteps,
        error: errorMessage,
      });

      this.eventEmitter.emit('saga.failed', {
        orderId: orderData.orderId,
        sagaId,
        failedStep:
          completedSteps.length > 0
            ? completedSteps[completedSteps.length - 1]
            : 'unknown',
        reason: errorMessage,
      });

      this.logger.error(`[Saga ${sagaId}] Saga failed: ${errorMessage}`);

      return {
        success: false,
        sagaId,
        completedSteps,
        error: errorMessage,
      };
    }
  }

  /**
   * Get saga status
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
  getSagaStatus(sagaId: string): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const saga: any = this.activeSagas.get(sagaId);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return saga || null;
  }

  /**
   * Get all active sagas
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  getAllSagas(): any[] {
    return Array.from(this.activeSagas.entries()).map(
      ([id, saga]: [string, any]) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const sagaData: any = saga;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return {
          sagaId: id,
          ...sagaData,
        };
      },
    );
  }
}
