/**
 * User Created Event
 * Fired when a new user is created
 */
export class UserCreatedEvent {
  constructor(
    public readonly userId: number,
    public readonly email: string,
    public readonly name: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}
