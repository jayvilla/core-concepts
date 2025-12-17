import { Injectable, Logger } from '@nestjs/common';

/**
 * Shipping Service
 * Simulates shipping for Saga pattern
 */
@Injectable()
export class ShippingService {
  private readonly logger = new Logger(ShippingService.name);
  private shippedOrders = new Map<string, any>();

  /**
   * Ship order
   */
  async shipOrder(orderId: string): Promise<{
    success: boolean;
    trackingNumber?: string;
    error?: string;
  }> {
    this.logger.log(`Shipping order ${orderId}`);

    // Simulate shipping (95% success rate for demo)
    const success = Math.random() > 0.05;

    if (success) {
      const trackingNumber = `TRACK_${Date.now()}`;
      this.shippedOrders.set(orderId, {
        trackingNumber,
        shippedAt: new Date(),
      });

      this.logger.log(`Order ${orderId} shipped with tracking ${trackingNumber}`);
      return { success: true, trackingNumber };
    } else {
      this.logger.error(`Shipping failed for order ${orderId}`);
      return { success: false, error: 'Shipping service unavailable' };
    }
  }

  /**
   * Compensate (cancel) shipping
   */
  async compensateShipping(orderId: string): Promise<{ success: boolean }> {
    this.logger.log(`Compensating shipping for order ${orderId}`);

    const shipment = this.shippedOrders.get(orderId);
    if (shipment) {
      this.logger.log(`Canceling shipment ${shipment.trackingNumber} for order ${orderId}`);
      this.shippedOrders.delete(orderId);
      return { success: true };
    }

    this.logger.warn(`No shipment found to compensate for order ${orderId}`);
    return { success: false };
  }

  /**
   * Get shipping status
   */
  getShippingStatus(orderId: string) {
    return this.shippedOrders.get(orderId);
  }
}

