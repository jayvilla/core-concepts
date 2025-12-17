import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { SagaService } from './saga.service';
import { PaymentService } from './services/payment.service';
import { InventoryService } from './services/inventory.service';
import { ShippingService } from './services/shipping.service';

/**
 * Saga Pattern Controller
 * Demonstrates Saga pattern through HTTP endpoints
 *
 * Route: /concepts/saga
 */
@ApiTags('Saga Pattern')
@Controller('concepts/saga')
export class SagaController {
  constructor(
    private readonly sagaService: SagaService,
    private readonly paymentService: PaymentService,
    private readonly inventoryService: InventoryService,
    private readonly shippingService: ShippingService,
  ) {}

  /**
   * POST /concepts/saga/orders/orchestration
   * Create order with orchestrated saga
   */
  @Post('orders/orchestration')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create order (Orchestration Saga)',
    description: `Create an order using orchestration-based saga pattern.

**Features demonstrated:**
- Central orchestrator coordinates all steps
- Sequential execution of saga steps
- Compensation transactions on failure
- Distributed transaction management
- Saga state tracking

**Saga Steps:**
1. Reserve inventory
2. Process payment
3. Create shipping
4. Complete order

If any step fails, previous steps are compensated (rolled back).`,
  })
  @ApiBody({
    description: 'Order data',
    schema: {
      example: {
        userId: 1,
        items: [
          { productId: 'prod-1', quantity: 2, price: 29.99 },
          { productId: 'prod-2', quantity: 1, price: 49.99 },
        ],
      },
    },
  })
  @ApiCreatedResponse({ description: 'Order created via orchestration saga' })
  async createOrderWithOrchestration(
    @Body()
    orderData: {
      userId: number;
      items: Array<{ productId: string; quantity: number; price: number }>;
    },
  ) {
    return await this.sagaService.createOrderWithOrchestration(orderData);
  }

  /**
   * POST /concepts/saga/orders/choreography
   * Create order with choreography-based saga
   */
  @Post('orders/choreography')
  @HttpCode(HttpStatus.CREATED)
  createOrderWithChoreography(
    @Body()
    orderData: {
      userId: number;
      items: Array<{ productId: string; quantity: number; price: number }>;
    },
  ) {
    return this.sagaService.createOrderWithChoreography(orderData);
  }

  /**
   * GET /concepts/saga/orders
   * Get all orders
   */
  @Get('orders')
  getAllOrders() {
    return this.sagaService.getAllOrders();
  }

  /**
   * GET /concepts/saga/status/:sagaId
   * Get saga status (orchestration)
   */
  @Get('status/:sagaId')
  getSagaStatus(@Param('sagaId') sagaId: string): any {
    return this.sagaService.getSagaStatus(sagaId);
  }

  /**
   * GET /concepts/saga/sagas
   * Get all sagas (orchestration)
   */
  @Get('sagas')
  getAllSagas(): any[] {
    return this.sagaService.getAllSagas();
  }

  /**
   * GET /concepts/saga/inventory
   * Get inventory status
   */
  @Get('inventory')
  getInventory() {
    return this.inventoryService.getInventory();
  }

  /**
   * GET /concepts/saga/features
   * Get Saga pattern features explanation
   */
  @Get('features')
  getFeatures() {
    return {
      sagaPattern: {
        description:
          'Pattern for managing distributed transactions across multiple services',
        purpose:
          'Ensures data consistency in microservices without distributed transactions',
      },
      orchestration: {
        description:
          'Central orchestrator coordinates all saga steps sequentially',
        benefits: [
          'Centralized control and visibility',
          'Easier to understand workflow',
          'Better error handling',
        ],
        drawbacks: [
          'Single point of failure (orchestrator)',
          'Tighter coupling',
          'Orchestrator can become bottleneck',
        ],
        example: 'POST /concepts/saga/orders/orchestration',
      },
      choreography: {
        description:
          'Services coordinate through events - no central orchestrator',
        benefits: [
          'Decoupled services',
          'No single point of failure',
          'More scalable',
        ],
        drawbacks: [
          'Harder to track saga state',
          'More complex debugging',
          'Less visibility into overall flow',
        ],
        example: 'POST /concepts/saga/orders/choreography',
      },
      compensation: {
        description: 'Rollback mechanism - each step has a compensating action',
        examples: [
          'Payment → Refund',
          'Inventory Reserve → Release',
          'Shipping → Cancel',
        ],
      },
      steps: {
        typical: [
          '1. Reserve Inventory',
          '2. Process Payment',
          '3. Ship Order',
        ],
        compensation: [
          'If payment fails → Release inventory',
          'If shipping fails → Refund payment + Release inventory',
        ],
      },
    };
  }
}
