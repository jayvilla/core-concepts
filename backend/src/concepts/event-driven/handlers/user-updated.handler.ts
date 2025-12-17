import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserUpdatedEvent } from '../events/user-updated.event';

/**
 * User Updated Event Handler
 * Demonstrates handling update events
 */
@Injectable()
export class UserUpdatedHandler {
  private readonly logger = new Logger(UserUpdatedHandler.name);

  @OnEvent('user.updated')
  handleUserUpdated(event: UserUpdatedEvent) {
    this.logger.log(`User ${event.userId} was updated`);
    this.logger.log(`Changes: ${JSON.stringify(event.changes)}`);
    
    // Simulate cache invalidation
    this.logger.log(`Invalidating cache for user ${event.userId}`);
    
    // Simulate audit log
    this.logger.log(`Audit log: User ${event.userId} updated at ${event.timestamp}`);
    
    return {
      handled: true,
      event: 'user.updated',
      userId: event.userId,
      changes: event.changes,
    };
  }
}

