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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
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
@ApiTags('REST API')
@Controller('concepts/rest-api')
export class RestApiController {
  constructor(private readonly restApiService: RestApiService) {}

  /**
   * GET /concepts/rest-api/users
   * Retrieve all users with pagination, filtering, and sorting
   * Status: 200 OK
   */
  @Get('users')
  @ApiOperation({
    summary: 'Get all users',
    description: `Retrieve a paginated list of users with optional filtering and sorting.
    
**Features demonstrated:**
- Pagination (page, limit)
- Search/filtering (by name or email)
- Sorting (by any field, ascending or descending)
- Query parameter validation

**Example queries:**
- \`/users?page=1&limit=10\` - First page, 10 items
- \`/users?search=john&sortBy=name&sortOrder=asc\` - Search and sort
- \`/users?page=2&limit=5&sortBy=age&sortOrder=desc\` - Pagination with sorting`,
  })
  @ApiOkResponse({
    description: 'Successfully retrieved users',
    schema: {
      example: {
        data: [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            age: 25,
            bio: 'Software developer',
          },
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 100,
          totalPages: 10,
        },
      },
    },
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (starts at 1)', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (1-100)', example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search by name or email', example: 'john' })
  @ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Field to sort by', example: 'name' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'Sort order', example: 'asc' })
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
  @ApiOperation({
    summary: 'Get user by ID',
    description: `Retrieve a single user by their unique identifier.

**Features demonstrated:**
- Path parameter validation
- 404 Not Found response for non-existent resources
- RESTful resource retrieval`,
  })
  @ApiParam({ name: 'id', type: Number, description: 'User ID', example: 1 })
  @ApiOkResponse({
    description: 'User found and returned',
    schema: {
      example: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        age: 25,
        bio: 'Software developer',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'User with ID 999 not found',
        error: 'Not Found',
      },
    },
  })
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
  @ApiOperation({
    summary: 'Create a new user',
    description: `Create a new user in the system.

**Features demonstrated:**
- POST method for resource creation
- Request body validation (DTO)
- 201 Created status code
- 409 Conflict for duplicate emails
- Data validation with class-validator`,
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User created successfully',
    schema: {
      example: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        age: 25,
        bio: 'Software developer',
      },
    },
  })
  @ApiConflictResponse({
    description: 'User with this email already exists',
    schema: {
      example: {
        statusCode: 409,
        message: 'User with email john@example.com already exists',
        error: 'Conflict',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    schema: {
      example: {
        statusCode: 400,
        message: ['name must be longer than or equal to 2 characters', 'email must be an email'],
        error: 'Bad Request',
      },
    },
  })
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
  @ApiOperation({
    summary: 'Replace entire user (PUT)',
    description: `Replace all fields of an existing user. This is a full update operation.

**Features demonstrated:**
- PUT method for full resource replacement
- Idempotent operation (same request can be repeated safely)
- All fields must be provided (even if unchanged)
- 404 for non-existent resources
- 409 for email conflicts`,
  })
  @ApiParam({ name: 'id', type: Number, description: 'User ID', example: 1 })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({
    description: 'User updated successfully',
    schema: {
      example: {
        id: 1,
        name: 'John Doe Updated',
        email: 'john.updated@example.com',
        age: 26,
        bio: 'Updated bio',
      },
    },
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'Email already exists' })
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
  @ApiOperation({
    summary: 'Partially update user (PATCH)',
    description: `Update only the provided fields of an existing user. This is a partial update operation.

**Features demonstrated:**
- PATCH method for partial updates
- Only provided fields are updated
- Other fields remain unchanged
- More efficient than PUT for small changes
- 404 for non-existent resources
- 409 for email conflicts`,
  })
  @ApiParam({ name: 'id', type: Number, description: 'User ID', example: 1 })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({
    description: 'User partially updated successfully',
    schema: {
      example: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        age: 26, // Only age was updated
        bio: 'Software developer',
      },
    },
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'Email already exists' })
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
  @ApiOperation({
    summary: 'Delete user',
    description: `Permanently delete a user from the system.

**Features demonstrated:**
- DELETE method for resource removal
- Idempotent operation (deleting non-existent resource returns 404, not error)
- 404 for non-existent resources`,
  })
  @ApiParam({ name: 'id', type: Number, description: 'User ID', example: 1 })
  @ApiOkResponse({
    description: 'User deleted successfully',
    schema: {
      example: {
        message: 'User with ID 1 deleted successfully',
      },
    },
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.restApiService.remove(id);
  }

  /**
   * GET /concepts/rest-api/status-codes
   * Demonstrates different HTTP status codes
   */
  @Get('status-codes')
  @ApiOperation({
    summary: 'Get HTTP status codes reference',
    description: `Returns a comprehensive reference of HTTP status codes and their meanings.

**Categories:**
- Success (2xx): Request succeeded
- Client Error (4xx): Client made an invalid request
- Server Error (5xx): Server encountered an error`,
  })
  @ApiOkResponse({
    description: 'Status codes reference',
  })
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
  @ApiOperation({
    summary: 'Get HTTP methods reference',
    description: `Returns a reference explaining HTTP methods, their properties, and usage.

**Key concepts:**
- Idempotent: Same request can be repeated safely
- Safe: Request doesn't modify server state
- Examples of each method`,
  })
  @ApiOkResponse({
    description: 'HTTP methods reference',
  })
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

