import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EventDrivenService } from './event-driven.service';

/**
 * Event-Driven Architecture Controller
 * Demonstrates event-driven patterns through HTTP endpoints
 * 
 * Route: /concepts/event-driven
 */
@Controller('concepts/event-driven')
export class EventDrivenController {
  constructor(private readonly eventDrivenService: EventDrivenService) {}

  /**
   * POST /concepts/event-driven/users
   * Create user - emits user.created event
   */
  @Post('users')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() userData: { name: string; email: string; age: number }) {
    return this.eventDrivenService.createUser(userData);
  }

  /**
   * PUT /concepts/event-driven/users/:id
   * Update user - emits user.updated event
   */
  @Put('users/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: Record<string, any>,
  ) {
    return this.eventDrivenService.updateUser(id, changes);
  }

  /**
   * GET /concepts/event-driven/users
   * Get all users
   */
  @Get('users')
  getAllUsers() {
    return this.eventDrivenService.getAllUsers();
  }

  /**
   * POST /concepts/event-driven/orders
   * Place order - emits order.placed event (triggers payment processing)
   */
  @Post('orders')
  @HttpCode(HttpStatus.CREATED)
  placeOrder(
    @Body()
    orderData: {
      userId: number;
      items: Array<{ productId: string; quantity: number; price: number }>;
    },
  ) {
    return this.eventDrivenService.placeOrder(orderData);
  }

  /**
   * POST /concepts/event-driven/orders/complete
   * Complete order workflow - demonstrates event chaining
   */
  @Post('orders/complete')
  @HttpCode(HttpStatus.CREATED)
  completeOrderWorkflow(
    @Body()
    orderData: {
      userId: number;
      items: Array<{ productId: string; quantity: number; price: number }>;
    },
  ) {
    return this.eventDrivenService.completeOrderWorkflow(orderData);
  }

  /**
   * GET /concepts/event-driven/orders
   * Get all orders
   */
  @Get('orders')
  getAllOrders() {
    return this.eventDrivenService.getAllOrders();
  }

  /**
   * POST /concepts/event-driven/payments
   * Process payment - emits payment.processed event
   */
  @Post('payments')
  @HttpCode(HttpStatus.CREATED)
  processPayment(
    @Body()
    paymentData: {
      orderId: string;
      amount: number;
      status: 'success' | 'failed';
    },
  ) {
    return this.eventDrivenService.processPayment(paymentData);
  }

  /**
   * POST /concepts/event-driven/notifications
   * Send notification - emits notification event
   */
  @Post('notifications')
  @HttpCode(HttpStatus.CREATED)
  sendNotification(
    @Body()
    notificationData: {
      userId: number;
      type: 'email' | 'sms' | 'push';
      message: string;
    },
  ) {
    return this.eventDrivenService.sendNotification(notificationData);
  }

  /**
   * GET /concepts/event-driven/features
   * Get event-driven architecture features explanation
   */
  @Get('features')
  getFeatures() {
    return {
      eventEmitter: {
        description: 'NestJS EventEmitter for publishing and subscribing to events',
        usage: 'EventEmitter2.emit() to publish, @OnEvent() to subscribe',
      },
      eventHandlers: {
        description: 'Handlers that respond to events automatically',
        decorator: '@OnEvent("event.name")',
        examples: [
          'UserCreatedHandler - handles user.created events',
          'OrderPlacedHandler - handles order.placed events',
          'PaymentProcessedHandler - handles payment.processed events',
        ],
      },
      eventChaining: {
        description: 'Events can trigger other events, creating workflows',
        example: 'order.placed -> payment.processed -> notification',
      },
      benefits: {
        decoupling: 'Services communicate through events, not direct calls',
        scalability: 'Easy to add new handlers without modifying existing code',
        async: 'Events are processed asynchronously',
        flexibility: 'Multiple handlers can respond to the same event',
      },
      patterns: {
        pubSub: 'Publish-Subscribe pattern',
        eventSourcing: 'Store events as source of truth',
        saga: 'Orchestrate distributed transactions with events',
        cqrs: 'Command Query Responsibility Segregation',
      },
    };
  }
}

