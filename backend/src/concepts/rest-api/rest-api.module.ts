import { Module } from '@nestjs/common';
import { RestApiController } from './rest-api.controller';
import { RestApiService } from './rest-api.service';

/**
 * REST API Module
 * Demonstrates NestJS module structure and separation of concerns
 */
@Module({
  controllers: [RestApiController],
  providers: [RestApiService],
  exports: [RestApiService], // Export if other modules need to use this service
})
export class RestApiModule {}

