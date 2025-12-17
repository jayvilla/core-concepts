/**
 * Payment Processed Event
 * Event indicating payment was processed
 */
export class PaymentProcessedEvent {
  constructor(
    public readonly orderId: string,
    public readonly paymentId: string,
    public readonly amount: number,
    public readonly status: 'success' | 'failed',
    public readonly timestamp: Date = new Date(),
  ) {}
}

