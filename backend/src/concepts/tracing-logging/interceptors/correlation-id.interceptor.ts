import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

/**
 * Correlation ID Interceptor
 * Adds correlation ID to requests for distributed tracing
 */
@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    // Generate or use existing correlation ID
    const correlationId = request.headers['x-correlation-id'] || uuidv4();
    
    // Attach to request object
    request.correlationId = correlationId;
    
    // Set response header
    const response = context.switchToHttp().getResponse();
    response.setHeader('X-Correlation-ID', correlationId);
    
    return next.handle();
  }
}

