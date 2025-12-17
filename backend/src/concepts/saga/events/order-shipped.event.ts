/**
 * Order Shipped Event
 * Event indicating order was shipped
 */
export class OrderShippedEvent {
  constructor(
    public readonly orderId: string,
    public readonly trackingNumber: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}
