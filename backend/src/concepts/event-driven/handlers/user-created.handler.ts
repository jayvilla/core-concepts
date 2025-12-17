import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../events/user-created.event';

/**
 * User Created Event Handler
 * Demonstrates event handling with @OnEvent decorator
 */
@Injectable()
export class UserCreatedHandler {
  private readonly logger = new Logger(UserCreatedHandler.name);

  /**
   * Handle user created event
   * This handler is automatically called when UserCreatedEvent is emitted
   */
  @OnEvent('user.created')
  handleUserCreated(event: UserCreatedEvent) {
    this.logger.log(`User created: ${event.name} (${event.email})`);
    
    // Simulate sending welcome email
    this.logger.log(`Sending welcome email to ${event.email}`);
    
    // Simulate creating user profile
    this.logger.log(`Creating profile for user ${event.userId}`);
    
    // Simulate analytics tracking
    this.logger.log(`Tracking user registration: ${event.userId}`);
    
    return {
      handled: true,
      event: 'user.created',
      userId: event.userId,
      timestamp: event.timestamp,
    };
  }
}

