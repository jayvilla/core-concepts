/**
 * Order Created Event
 * Initial event that starts the saga
 */
export class OrderCreatedEvent {
  constructor(
    public readonly orderId: string,
    public readonly userId: number,
    public readonly items: Array<{
      productId: string;
      quantity: number;
      price: number;
    }>,
    public readonly totalAmount: number,
    public readonly timestamp: Date = new Date(),
  ) {}
}
