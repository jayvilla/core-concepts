/**
 * Saga Completed Event
 * Event indicating the entire saga completed successfully
 */
export class SagaCompletedEvent {
  constructor(
    public readonly orderId: string,
    public readonly sagaId: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}

