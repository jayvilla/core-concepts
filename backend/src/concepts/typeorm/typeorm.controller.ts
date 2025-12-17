import {
  Controller,
  Get,
  Post as PostDecorator,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { TypeormService } from './typeorm.service';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Post } from './entities/post.entity';

/**
 * TypeORM Controller
 * Demonstrates TypeORM features through HTTP endpoints
 *
 * Route: /concepts/typeorm
 */
@ApiTags('TypeORM')
@Controller('concepts/typeorm')
export class TypeormController {
  constructor(private readonly typeormService: TypeormService) {}

  /**
   * GET /concepts/typeorm/users
   * Get all users using Repository
   */
  @Get('users')
  @ApiOperation({
    summary: 'Get all users (Repository)',
    description: `Retrieve all users using TypeORM Repository pattern.

**Features demonstrated:**
- Repository.find() method
- Simple data retrieval
- Repository pattern usage`,
  })
  @ApiOkResponse({ description: 'List of all users' })
  async findAllUsers() {
    return await this.typeormService.findAllUsers();
  }

  /**
   * GET /concepts/typeorm/users/:id
   * Get user by ID
   */
  @Get('users/:id')
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.typeormService.findUserById(id);
  }

  /**
   * GET /concepts/typeorm/users/:id/relations
   * Get user with all relationships (eager loading)
   */
  @Get('users/:id/relations')
  @ApiOperation({
    summary: 'Get user with relationships (Eager Loading)',
    description: `Retrieve a user with all related entities loaded.

**Features demonstrated:**
- Eager loading with relations option
- One-to-One relationship (Profile)
- One-to-Many relationship (Posts)
- Many-to-Many relationship (Tags)`,
  })
  @ApiParam({ name: 'id', type: Number, description: 'User ID', example: 1 })
  @ApiOkResponse({ description: 'User with all relationships loaded' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async findUserWithRelations(@Param('id', ParseIntPipe) id: number) {
    return await this.typeormService.findUserWithRelations(id);
  }

  /**
   * POST /concepts/typeorm/users
   * Create user using Repository
   */
  @PostDecorator('users')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() userData: Partial<User>) {
    return await this.typeormService.createUser(userData);
  }

  /**
   * PUT /concepts/typeorm/users/:id
   * Update user
   */
  @Put('users/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: Partial<User>,
  ) {
    return await this.typeormService.updateUser(id, userData);
  }

  /**
   * DELETE /concepts/typeorm/users/:id
   * Delete user
   */
  @Delete('users/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.typeormService.deleteUser(id);
  }

  /**
   * GET /concepts/typeorm/users/stats/post-count
   * Query Builder example - Users with post count
   */
  @Get('users/stats/post-count')
  @ApiOperation({
    summary: 'Get users with post count (Query Builder)',
    description: `Retrieve users with aggregated post counts using Query Builder.

**Features demonstrated:**
- Query Builder with LEFT JOIN
- COUNT aggregation
- GROUP BY clause
- Alias usage`,
  })
  @ApiOkResponse({ description: 'Users with post counts' })
  async getUsersWithPostCount() {
    return await this.typeormService.findUsersWithPostCount();
  }

  /**
   * GET /concepts/typeorm/users/age-range
   * Query Builder example - Filter by age range
   */
  @Get('users/age-range')
  async getUsersByAgeRange(
    @Query('min', ParseIntPipe) minAge: number,
    @Query('max', ParseIntPipe) maxAge: number,
  ) {
    return await this.typeormService.findUsersByAgeRange(minAge, maxAge);
  }

  /**
   * GET /concepts/typeorm/users/with-published-posts
   * Query Builder example - Join with posts
   */
  @Get('users/with-published-posts')
  async getUsersWithPublishedPosts() {
    return await this.typeormService.findUsersWithPublishedPosts();
  }

  /**
   * GET /concepts/typeorm/users/top-posters
   * Advanced Query - Subquery example
   */
  @Get('users/top-posters')
  async getTopPosters(@Query('limit', ParseIntPipe) limit: number = 5) {
    return await this.typeormService.findUsersWithMostPosts(limit);
  }

  /**
   * POST /concepts/typeorm/users/with-profile
   * One-to-One relationship example
   */
  @PostDecorator('users/with-profile')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create user with profile (One-to-One)',
    description: `Create a user with a related profile in a single operation.

**Features demonstrated:**
- One-to-One relationship
- Cascade operations
- Related entity creation`,
  })
  @ApiBody({
    description: 'User and profile data',
    schema: {
      example: {
        user: { name: 'John Doe', email: 'john@example.com', age: 25 },
        profile: { firstName: 'John', lastName: 'Doe', bio: 'Developer' },
      },
    },
  })
  @ApiCreatedResponse({ description: 'User with profile created successfully' })
  async createUserWithProfile(
    @Body() data: { user: Partial<User>; profile: Partial<Profile> },
  ) {
    return await this.typeormService.createUserWithProfile(
      data.user,
      data.profile,
    );
  }

  /**
   * POST /concepts/typeorm/users/with-posts
   * One-to-Many relationship example
   */
  @PostDecorator('users/with-posts')
  @HttpCode(HttpStatus.CREATED)
  async createUserWithPosts(
    @Body() data: { user: Partial<User>; posts: Partial<Post>[] },
  ) {
    return await this.typeormService.createUserWithPosts(
      data.user,
      data.posts,
    );
  }

  /**
   * POST /concepts/typeorm/transactions/user-profile
   * Transaction example - Create user with profile
   */
  @PostDecorator('transactions/user-profile')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create user with profile (Transaction)',
    description: `Create a user with profile using a database transaction.

**Features demonstrated:**
- Database transactions
- ACID properties (Atomicity, Consistency, Isolation, Durability)
- Rollback on error
- Data consistency guarantee`,
  })
  @ApiBody({
    description: 'User and profile data',
    schema: {
      example: {
        user: { name: 'John Doe', email: 'john@example.com', age: 25 },
        profile: { firstName: 'John', lastName: 'Doe', bio: 'Developer' },
      },
    },
  })
  @ApiCreatedResponse({ description: 'User with profile created in transaction' })
  async createUserWithProfileTransaction(
    @Body() data: { user: Partial<User>; profile: Partial<Profile> },
  ) {
    return await this.typeormService.createUserWithProfileTransaction(
      data.user,
      data.profile,
    );
  }

  /**
   * POST /concepts/typeorm/transactions/user-posts
   * Transaction example - Create user with posts
   */
  @PostDecorator('transactions/user-posts')
  @HttpCode(HttpStatus.CREATED)
  async createUserWithPostsTransaction(
    @Body() data: { user: Partial<User>; posts: Partial<Post>[] },
  ) {
    return await this.typeormService.createUserWithPostsTransaction(
      data.user,
      data.posts,
    );
  }

  /**
   * GET /concepts/typeorm/entity-manager/users
   * Entity Manager example
   */
  @Get('entity-manager/users')
  async getUsersUsingEntityManager() {
    return await this.typeormService.findUsersUsingEntityManager();
  }

  /**
   * GET /concepts/typeorm/raw-query/users
   * Raw SQL query example
   */
  @Get('raw-query/users')
  async getUsersUsingRawQuery() {
    return await this.typeormService.findUsersUsingRawQuery();
  }

  /**
   * POST /concepts/typeorm/bulk/users
   * Bulk operations example
   */
  @PostDecorator('bulk/users')
  @HttpCode(HttpStatus.CREATED)
  async bulkCreateUsers(@Body() usersData: Partial<User>[]) {
    return await this.typeormService.bulkCreateUsers(usersData);
  }

  /**
   * GET /concepts/typeorm/features
   * Get TypeORM features explanation
   */
  @Get('features')
  @ApiOperation({
    summary: 'Get TypeORM features reference',
    description: `Returns a comprehensive reference of TypeORM features and capabilities.

**Features covered:**
- Repositories
- Query Builder
- Relationships
- Transactions
- Entity Manager`,
  })
  @ApiOkResponse({ description: 'TypeORM features reference' })
  getTypeormFeatures() {
    return {
      repositories: {
        description: 'Repository pattern for database operations',
        methods: ['find', 'findOne', 'save', 'update', 'delete', 'create'],
        example: 'userRepository.find()',
      },
      queryBuilder: {
        description: 'Type-safe query builder for complex queries',
        features: ['Joins', 'Where conditions', 'Ordering', 'Grouping', 'Subqueries'],
        example: 'createQueryBuilder("user").where("user.age > :age", { age: 18 })',
      },
      relationships: {
        oneToOne: 'One-to-One relationship (User -> Profile)',
        oneToMany: 'One-to-Many relationship (User -> Posts)',
        manyToMany: 'Many-to-Many relationship (User <-> Tags)',
      },
      transactions: {
        description: 'Ensure data consistency across multiple operations',
        methods: ['QueryRunner', 'DataSource.transaction'],
      },
      entityManager: {
        description: 'Direct access to entity manager for advanced operations',
        useCase: 'When you need more control than repository provides',
      },
    };
  }
}

