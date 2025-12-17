import { Injectable } from '@nestjs/common';
import { LoggingService } from './services/logging.service';

/**
 * Tracing and Logging Service
 * Demonstrates various logging and tracing scenarios
 */
@Injectable()
export class TracingLoggingService {
  private requestCount = 0;

  constructor(private readonly loggingService: LoggingService) {}

  /**
   * Simulate a business operation with logging
   */
  async performOperation(
    operationName: string,
    correlationId: string,
    userId?: number,
  ): Promise<{ result: string; duration: number }> {
    const startTime = Date.now();

    // Log operation start
    this.loggingService.info(`Starting operation: ${operationName}`, 'TracingLoggingService', {
      correlationId,
      userId,
    });

    // Simulate work
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

    const duration = Date.now() - startTime;

    // Log operation completion with performance metrics
    this.loggingService.logPerformance(
      operationName,
      duration,
      correlationId,
      { userId },
    );

    // Log structured data
    this.loggingService.logStructured({
      level: 'info',
      message: `Operation ${operationName} completed`,
      correlationId,
      userId,
      metadata: {
        duration: `${duration}ms`,
        success: true,
      },
    });

    return {
      result: `Operation ${operationName} completed successfully`,
      duration,
    };
  }

  /**
   * Simulate an operation that might fail
   */
  async performOperationWithError(
    operationName: string,
    correlationId: string,
    shouldFail: boolean = false,
  ): Promise<{ result: string }> {
    this.loggingService.info(`Starting operation: ${operationName}`, 'TracingLoggingService', {
      correlationId,
    });

    if (shouldFail) {
      const error = new Error(`Operation ${operationName} failed`);
      this.loggingService.error(
        `Operation ${operationName} failed`,
        error.stack,
        'TracingLoggingService',
        {
          correlationId,
          error: error.message,
        },
      );
      throw error;
    }

    this.loggingService.info(`Operation ${operationName} succeeded`, 'TracingLoggingService', {
      correlationId,
    });

    return { result: `Operation ${operationName} completed` };
  }

  /**
   * Demonstrate different log levels
   */
  demonstrateLogLevels(correlationId: string) {
    this.loggingService.debug('This is a DEBUG message', 'TracingLoggingService', {
      correlationId,
      detail: 'Debug information for development',
    });

    this.loggingService.info('This is an INFO message', 'TracingLoggingService', {
      correlationId,
      detail: 'General information',
    });

    this.loggingService.warn('This is a WARN message', 'TracingLoggingService', {
      correlationId,
      detail: 'Warning - something might be wrong',
    });

    this.loggingService.error(
      'This is an ERROR message',
      'Error stack trace here',
      'TracingLoggingService',
      {
        correlationId,
        detail: 'Error occurred',
      },
    );
  }

  /**
   * Get request statistics
   */
  getRequestStats() {
    this.requestCount++;
    return {
      totalRequests: this.requestCount,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Simulate distributed tracing scenario
   */
  async simulateDistributedOperation(correlationId: string) {
    // Service A operation
    this.loggingService.logWithCorrelation(
      'info',
      'Service A: Processing request',
      correlationId,
      { service: 'service-a', step: 1 },
    );

    await new Promise((resolve) => setTimeout(resolve, 100));

    // Service B operation (simulated)
    this.loggingService.logWithCorrelation(
      'info',
      'Service B: Processing request',
      correlationId,
      { service: 'service-b', step: 2 },
    );

    await new Promise((resolve) => setTimeout(resolve, 150));

    // Service C operation (simulated)
    this.loggingService.logWithCorrelation(
      'info',
      'Service C: Processing request',
      correlationId,
      { service: 'service-c', step: 3 },
    );

    return {
      message: 'Distributed operation completed',
      correlationId,
      services: ['service-a', 'service-b', 'service-c'],
    };
  }
}

