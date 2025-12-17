/**
 * Notification Event
 * Generic event for notifications
 */
export class NotificationEvent {
  constructor(
    public readonly userId: number,
    public readonly type: 'email' | 'sms' | 'push',
    public readonly message: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}
