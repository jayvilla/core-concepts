import { Module } from '@nestjs/common';
import { TracingLoggingController } from './tracing-logging.controller';
import { TracingLoggingService } from './tracing-logging.service';
import { LoggingService } from './services/logging.service';

/**
 * Tracing and Logging Module
 * Demonstrates logging and tracing patterns
 */
@Module({
  controllers: [TracingLoggingController],
  providers: [TracingLoggingService, LoggingService],
  exports: [LoggingService, TracingLoggingService],
})
export class TracingLoggingModule {}

