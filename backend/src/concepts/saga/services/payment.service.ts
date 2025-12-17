import { Injectable, Logger } from '@nestjs/common';

/**
 * Payment Service
 * Simulates payment processing for Saga pattern
 */
@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private processedPayments = new Map<string, any>();

  /**
   * Process payment
   * Returns success or failure
   */
  async processPayment(orderId: string, amount: number): Promise<{
    success: boolean;
    paymentId?: string;
    error?: string;
  }> {
    this.logger.log(`Processing payment for order ${orderId}, amount: $${amount}`);

    // Simulate payment processing (90% success rate for demo)
    const success = Math.random() > 0.1;

    if (success) {
      const paymentId = `pay_${Date.now()}`;
      this.processedPayments.set(orderId, {
        paymentId,
        amount,
        status: 'success',
        timestamp: new Date(),
      });

      this.logger.log(`Payment successful: ${paymentId}`);
      return { success: true, paymentId };
    } else {
      this.logger.error(`Payment failed for order ${orderId}`);
      return { success: false, error: 'Insufficient funds' };
    }
  }

  /**
   * Compensate (refund) payment
   */
  async compensatePayment(orderId: string): Promise<{ success: boolean }> {
    this.logger.log(`Compensating payment for order ${orderId}`);

    const payment = this.processedPayments.get(orderId);
    if (payment) {
      this.logger.log(`Refunding payment ${payment.paymentId} for order ${orderId}`);
      this.processedPayments.delete(orderId);
      return { success: true };
    }

    this.logger.warn(`No payment found to compensate for order ${orderId}`);
    return { success: false };
  }

  /**
   * Check if payment was processed
   */
  getPayment(orderId: string) {
    return this.processedPayments.get(orderId);
  }
}

