import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * HTTP Exception Filter
 * Catches and logs all HTTP exceptions
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const correlationId = (request as any).correlationId || 'no-correlation-id';

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Log the exception
    this.logger.error(
      `${request.method} ${request.url} - ${status} [CorrelationID: ${correlationId}]`,
      exception instanceof Error ? exception.stack : String(exception),
    );

    this.logger.error('Exception details:', {
      status,
      message,
      correlationId,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
    });

    // Send error response
    response.status(status).json({
      statusCode: status,
      message: typeof message === 'string' ? message : (message as any).message || message,
      correlationId,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

