import { Injectable, Logger } from '@nestjs/common';

/**
 * Inventory Service
 * Simulates inventory management for Saga pattern
 */
@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);
  private inventory = new Map<string, number>([
    ['prod_123', 10],
    ['prod_456', 5],
    ['prod_789', 20],
  ]);
  private reservedItems = new Map<string, Array<{ productId: string; quantity: number }>>();

  /**
   * Reserve inventory
   */
  async reserveInventory(
    orderId: string,
    items: Array<{ productId: string; quantity: number }>,
  ): Promise<{ success: boolean; error?: string }> {
    this.logger.log(`Reserving inventory for order ${orderId}`);

    // Check if all items are available
    for (const item of items) {
      const available = this.inventory.get(item.productId) || 0;
      if (available < item.quantity) {
        this.logger.error(
          `Insufficient inventory for product ${item.productId}. Available: ${available}, Required: ${item.quantity}`,
        );
        return {
          success: false,
          error: `Insufficient inventory for product ${item.productId}`,
        };
      }
    }

    // Reserve items (reduce inventory)
    for (const item of items) {
      const current = this.inventory.get(item.productId) || 0;
      this.inventory.set(item.productId, current - item.quantity);
    }

    // Track reserved items
    this.reservedItems.set(orderId, items);

    this.logger.log(`Inventory reserved successfully for order ${orderId}`);
    return { success: true };
  }

  /**
   * Compensate (release) inventory
   */
  async compensateInventory(orderId: string): Promise<{ success: boolean }> {
    this.logger.log(`Compensating inventory for order ${orderId}`);

    const reserved = this.reservedItems.get(orderId);
    if (reserved) {
      // Release items back to inventory
      for (const item of reserved) {
        const current = this.inventory.get(item.productId) || 0;
        this.inventory.set(item.productId, current + item.quantity);
      }

      this.reservedItems.delete(orderId);
      this.logger.log(`Inventory released for order ${orderId}`);
      return { success: true };
    }

    this.logger.warn(`No reserved inventory found for order ${orderId}`);
    return { success: false };
  }

  /**
   * Get inventory status
   */
  getInventory() {
    return Object.fromEntries(this.inventory);
  }

  /**
   * Get reserved items for an order
   */
  getReservedItems(orderId: string) {
    return this.reservedItems.get(orderId);
  }
}

