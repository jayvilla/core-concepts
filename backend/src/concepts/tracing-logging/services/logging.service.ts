import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

/**
 * Logging Service
 * Demonstrates structured logging with Winston
 */
@Injectable()
export class LoggingService implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.prettyPrint(),
      ),
      defaultMeta: { service: 'core-concepts' },
      transports: [
        // Console transport
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, ...meta }) => {
              return `${timestamp} [${level}]: ${message} ${
                Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
              }`;
            }),
          ),
        }),
        // File transport (optional - for production)
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'combined.log' }),
      ],
    });
  }

  /**
   * Log with DEBUG level
   */
  debug(message: string, context?: string, meta?: Record<string, any>) {
    this.logger.debug(message, { context, ...meta });
  }

  /**
   * Log with INFO level
   */
  log(message: string, context?: string, meta?: Record<string, any>) {
    this.logger.info(message, { context, ...meta });
  }

  /**
   * Log with INFO level (alias)
   */
  info(message: string, context?: string, meta?: Record<string, any>) {
    this.logger.info(message, { context, ...meta });
  }

  /**
   * Log with WARN level
   */
  warn(message: string, context?: string, meta?: Record<string, any>) {
    this.logger.warn(message, { context, ...meta });
  }

  /**
   * Log with ERROR level
   */
  error(message: string, trace?: string, context?: string, meta?: Record<string, any>) {
    this.logger.error(message, {
      trace,
      context,
      ...meta,
    });
  }

  /**
   * Log with correlation ID
   */
  logWithCorrelation(
    level: 'debug' | 'info' | 'warn' | 'error',
    message: string,
    correlationId: string,
    meta?: Record<string, any>,
  ) {
    this.logger[level](message, {
      correlationId,
      ...meta,
    });
  }

  /**
   * Log performance metrics
   */
  logPerformance(
    operation: string,
    duration: number,
    correlationId?: string,
    meta?: Record<string, any>,
  ) {
    this.logger.info(`Performance: ${operation}`, {
      operation,
      duration: `${duration}ms`,
      correlationId,
      ...meta,
    });
  }

  /**
   * Log structured data
   */
  logStructured(data: {
    level: 'debug' | 'info' | 'warn' | 'error';
    message: string;
    correlationId?: string;
    userId?: number;
    requestId?: string;
    metadata?: Record<string, any>;
  }) {
    this.logger[data.level](data.message, {
      correlationId: data.correlationId,
      userId: data.userId,
      requestId: data.requestId,
      ...data.metadata,
    });
  }
}

