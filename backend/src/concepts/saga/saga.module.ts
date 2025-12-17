import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SagaController } from './saga.controller';
import { SagaService } from './saga.service';
import { SagaOrchestratorService } from './orchestrators/saga-orchestrator.service';
import { PaymentService } from './services/payment.service';
import { InventoryService } from './services/inventory.service';
import { ShippingService } from './services/shipping.service';
import { ChoreographySagaHandler } from './handlers/choreography-saga.handler';

/**
 * Saga Pattern Module
 * Demonstrates Saga pattern for distributed transactions
 */
@Module({
  imports: [EventEmitterModule],
  controllers: [SagaController],
  providers: [
    SagaService,
    SagaOrchestratorService,
    PaymentService,
    InventoryService,
    ShippingService,
    ChoreographySagaHandler,
  ],
  exports: [SagaService],
})
export class SagaModule {}
