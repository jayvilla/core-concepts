/**
 * User Updated Event
 * Fired when a user is updated
 */
export class UserUpdatedEvent {
  constructor(
    public readonly userId: number,
    public readonly changes: Record<string, any>,
    public readonly timestamp: Date = new Date(),
  ) {}
}
