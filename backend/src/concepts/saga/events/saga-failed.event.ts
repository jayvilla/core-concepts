/**
 * Saga Failed Event
 * Event indicating the saga failed and compensation is needed
 */
export class SagaFailedEvent {
  constructor(
    public readonly orderId: string,
    public readonly sagaId: string,
    public readonly failedStep: string,
    public readonly reason: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}

