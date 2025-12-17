import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventDrivenController } from './event-driven.controller';
import { EventDrivenService } from './event-driven.service';
import { UserCreatedHandler } from './handlers/user-created.handler';
import { UserUpdatedHandler } from './handlers/user-updated.handler';
import { OrderPlacedHandler } from './handlers/order-placed.handler';
import { PaymentProcessedHandler } from './handlers/payment-processed.handler';
import { NotificationHandler } from './handlers/notification.handler';

/**
 * Event-Driven Architecture Module
 * Demonstrates event-driven patterns in NestJS
 */
@Module({
  imports: [
    // Configure EventEmitter with global options
    EventEmitterModule.forRoot({
      // Use wildcards for event matching
      wildcard: false,
      // Delimiter for namespaced events
      delimiter: '.',
      // Maximum number of listeners
      maxListeners: 10,
      // Show verbose memory leak warnings
      verboseMemoryLeak: false,
      // Ignore errors in listeners
      ignoreErrors: false,
    }),
  ],
  controllers: [EventDrivenController],
  providers: [
    EventDrivenService,
    // Event handlers are providers
    UserCreatedHandler,
    UserUpdatedHandler,
    OrderPlacedHandler,
    PaymentProcessedHandler,
    NotificationHandler,
  ],
  exports: [EventDrivenService],
})
export class EventDrivenModule {}
