import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { TracingLoggingService } from './tracing-logging.service';
import { LoggingService } from './services/logging.service';
import { CorrelationIdInterceptor } from './interceptors/correlation-id.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import type { Request } from 'express';

/**
 * Tracing and Logging Controller
 * Demonstrates logging and tracing patterns
 * 
 * Route: /concepts/tracing-logging
 */
@Controller('concepts/tracing-logging')
@UseInterceptors(CorrelationIdInterceptor, LoggingInterceptor)
export class TracingLoggingController {
  constructor(
    private readonly tracingLoggingService: TracingLoggingService,
    private readonly loggingService: LoggingService,
  ) {}

  /**
   * GET /concepts/tracing-logging/operation/:name
   * Perform an operation with logging
   */
  @Get('operation/:name')
  async performOperation(@Param('name') name: string, @Req() request: Request) {
    const correlationId = (request as any).correlationId;
    const result = await this.tracingLoggingService.performOperation(
      name,
      correlationId,
    );
    return result;
  }

  /**
   * POST /concepts/tracing-logging/operation
   * Perform operation with custom correlation ID
   */
  @Post('operation')
  @HttpCode(HttpStatus.OK)
  async performOperationWithBody(
    @Body() data: { operationName: string; userId?: number },
    @Req() request: Request,
  ) {
    const correlationId = (request as any).correlationId;
    const result = await this.tracingLoggingService.performOperation(
      data.operationName,
      correlationId,
      data.userId,
    );
    return result;
  }

  /**
   * POST /concepts/tracing-logging/operation/error
   * Simulate an operation that might fail
   */
  @Post('operation/error')
  @HttpCode(HttpStatus.OK)
  async performOperationWithError(
    @Body() data: { operationName: string; shouldFail?: boolean },
    @Req() request: Request,
  ) {
    const correlationId = (request as any).correlationId;
    return await this.tracingLoggingService.performOperationWithError(
      data.operationName,
      correlationId,
      data.shouldFail,
    );
  }

  /**
   * GET /concepts/tracing-logging/log-levels
   * Demonstrate different log levels
   */
  @Get('log-levels')
  demonstrateLogLevels(@Req() request: Request) {
    const correlationId = (request as any).correlationId;
    this.tracingLoggingService.demonstrateLogLevels(correlationId);
    return {
      message: 'Check console for different log levels',
      correlationId,
      levels: ['DEBUG', 'INFO', 'WARN', 'ERROR'],
    };
  }

  /**
   * GET /concepts/tracing-logging/stats
   * Get request statistics
   */
  @Get('stats')
  getStats() {
    return this.tracingLoggingService.getRequestStats();
  }

  /**
   * GET /concepts/tracing-logging/distributed
   * Simulate distributed tracing scenario
   */
  @Get('distributed')
  async simulateDistributedOperation(@Req() request: Request) {
    const correlationId = (request as any).correlationId;
    return await this.tracingLoggingService.simulateDistributedOperation(
      correlationId,
    );
  }

  /**
   * GET /concepts/tracing-logging/features
   * Get tracing and logging features explanation
   */
  @Get('features')
  getFeatures() {
    return {
      structuredLogging: {
        description: 'Logs with structured data (JSON format)',
        benefits: [
          'Easy to parse and search',
          'Better for log aggregation tools',
          'Consistent format across services',
        ],
        example: {
          timestamp: '2024-01-01T00:00:00Z',
          level: 'info',
          message: 'Operation completed',
          correlationId: 'uuid-here',
          userId: 123,
        },
      },
      logLevels: {
        DEBUG: 'Detailed information for debugging',
        INFO: 'General informational messages',
        WARN: 'Warning messages for potential issues',
        ERROR: 'Error messages for failures',
      },
      correlationIds: {
        description: 'Unique identifier for tracking requests across services',
        purpose: 'Enable distributed tracing',
        usage: 'Passed in headers, logged with every request',
        example: 'X-Correlation-ID: 550e8400-e29b-41d4-a716-446655440000',
      },
      distributedTracing: {
        description: 'Track requests across multiple services',
        howItWorks: [
          'Correlation ID generated at entry point',
          'ID propagated through all service calls',
          'All logs include the same correlation ID',
          'Can trace entire request flow',
        ],
      },
      interceptors: {
        correlationId: 'Adds correlation ID to requests',
        logging: 'Logs all HTTP requests and responses',
      },
      filters: {
        exceptionFilter: 'Catches and logs all exceptions',
      },
      bestPractices: [
        'Use structured logging (JSON)',
        'Include correlation IDs in all logs',
        'Log at appropriate levels',
        'Log performance metrics',
        'Log errors with stack traces',
        'Use log aggregation tools in production',
      ],
    };
  }
}

