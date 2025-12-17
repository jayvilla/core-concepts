import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { RestApiService } from './rest-api.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParamsDto } from './dto/query-params.dto';

/**
 * REST API Controller
 * Demonstrates all HTTP methods and RESTful principles
 * 
 * Route: /concepts/rest-api
 */
@Controller('concepts/rest-api')
export class RestApiController {
  constructor(private readonly restApiService: RestApiService) {}

  /**
   * GET /concepts/rest-api/users
   * Retrieve all users with pagination, filtering, and sorting
   * Status: 200 OK
   */
  @Get('users')
  @HttpCode(HttpStatus.OK)
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.restApiService.findAll(queryParams);
  }

  /**
   * GET /concepts/rest-api/users/:id
   * Retrieve a single user by ID
   * Status: 200 OK (or 404 Not Found)
   */
  @Get('users/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.restApiService.findOne(id);
  }

  /**
   * POST /concepts/rest-api/users
   * Create a new user
   * Status: 201 Created (or 409 Conflict)
   */
  @Post('users')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.restApiService.create(createUserDto);
  }

  /**
   * PUT /concepts/rest-api/users/:id
   * Replace an entire user (full update)
   * Status: 200 OK (or 404 Not Found, 409 Conflict)
   */
  @Put('users/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.restApiService.update(id, updateUserDto);
  }

  /**
   * PATCH /concepts/rest-api/users/:id
   * Partially update a user
   * Status: 200 OK (or 404 Not Found, 409 Conflict)
   */
  @Patch('users/:id')
  @HttpCode(HttpStatus.OK)
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.restApiService.patch(id, updateUserDto);
  }

  /**
   * DELETE /concepts/rest-api/users/:id
   * Delete a user
   * Status: 200 OK (or 404 Not Found)
   */
  @Delete('users/:id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.restApiService.remove(id);
  }

  /**
   * GET /concepts/rest-api/status-codes
   * Demonstrates different HTTP status codes
   */
  @Get('status-codes')
  getStatusCodes() {
    return {
      success: {
        '200 OK': 'Request succeeded',
        '201 Created': 'Resource created successfully',
        '204 No Content': 'Request succeeded but no content to return',
      },
      clientError: {
        '400 Bad Request': 'Invalid request syntax',
        '401 Unauthorized': 'Authentication required',
        '403 Forbidden': 'Access denied',
        '404 Not Found': 'Resource not found',
        '409 Conflict': 'Resource conflict (e.g., duplicate email)',
        '422 Unprocessable Entity': 'Validation failed',
      },
      serverError: {
        '500 Internal Server Error': 'Unexpected server error',
        '502 Bad Gateway': 'Invalid response from upstream',
        '503 Service Unavailable': 'Service temporarily unavailable',
      },
    };
  }

  /**
   * GET /concepts/rest-api/methods
   * Explains HTTP methods and their usage
   */
  @Get('methods')
  getHttpMethods() {
    return {
      GET: {
        description: 'Retrieve data',
        idempotent: true,
        safe: true,
        examples: ['GET /users', 'GET /users/1'],
      },
      POST: {
        description: 'Create new resource',
        idempotent: false,
        safe: false,
        examples: ['POST /users', 'POST /users/login'],
      },
      PUT: {
        description: 'Replace entire resource (full update)',
        idempotent: true,
        safe: false,
        examples: ['PUT /users/1'],
      },
      PATCH: {
        description: 'Partially update resource',
        idempotent: false,
        safe: false,
        examples: ['PATCH /users/1'],
      },
      DELETE: {
        description: 'Remove resource',
        idempotent: true,
        safe: false,
        examples: ['DELETE /users/1'],
      },
    };
  }
}

