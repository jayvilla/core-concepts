import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Logging Interceptor
 * Logs all HTTP requests and responses
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url, body, query, params } = request;
    const correlationId = request.correlationId || 'no-correlation-id';
    const startTime = Date.now();

    // Log incoming request
    this.logger.log(
      `→ ${method} ${url} [CorrelationID: ${correlationId}]`,
    );
    this.logger.debug('Request details:', {
      method,
      url,
      body: method !== 'GET' ? body : undefined,
      query,
      params,
      correlationId,
    });

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = Date.now() - startTime;
          const statusCode = response.statusCode;

          // Log successful response
          this.logger.log(
            `← ${method} ${url} ${statusCode} ${duration}ms [CorrelationID: ${correlationId}]`,
          );
          this.logger.debug('Response details:', {
            statusCode,
            duration: `${duration}ms`,
            correlationId,
          });
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          const statusCode = error.status || 500;

          // Log error response
          this.logger.error(
            `← ${method} ${url} ${statusCode} ${duration}ms [CorrelationID: ${correlationId}]`,
            error.stack,
          );
          this.logger.error('Error details:', {
            statusCode,
            duration: `${duration}ms`,
            error: error.message,
            correlationId,
          });
        },
      }),
    );
  }
}

