import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationEvent } from '../events/notification.event';

/**
 * Notification Event Handler
 * Demonstrates handling notification events
 */
@Injectable()
export class NotificationHandler {
  private readonly logger = new Logger(NotificationHandler.name);

  @OnEvent('notification')
  handleNotification(event: NotificationEvent) {
    this.logger.log(`Sending ${event.type} notification to user ${event.userId}`);
    this.logger.log(`Message: ${event.message}`);
    
    // Simulate different notification types
    switch (event.type) {
      case 'email':
        this.logger.log(`📧 Email sent to user ${event.userId}`);
        break;
      case 'sms':
        this.logger.log(`📱 SMS sent to user ${event.userId}`);
        break;
      case 'push':
        this.logger.log(`🔔 Push notification sent to user ${event.userId}`);
        break;
    }
    
    return {
      handled: true,
      event: 'notification',
      userId: event.userId,
      type: event.type,
    };
  }
}

