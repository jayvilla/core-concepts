/**
 * Payment Processed Event
 * Fired when a payment is processed
 */
export class PaymentProcessedEvent {
  constructor(
    public readonly paymentId: string,
    public readonly orderId: string,
    public readonly amount: number,
    public readonly status: 'success' | 'failed',
    public readonly timestamp: Date = new Date(),
  ) {}
}
