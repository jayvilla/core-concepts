/**
 * Inventory Reserved Event
 * Event indicating inventory was reserved
 */
export class InventoryReservedEvent {
  constructor(
    public readonly orderId: string,
    public readonly items: Array<{
      productId: string;
      quantity: number;
    }>,
    public readonly status: 'reserved' | 'failed',
    public readonly timestamp: Date = new Date(),
  ) {}
}
