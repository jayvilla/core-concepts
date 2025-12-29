import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { OrmService } from './orm.service';

/**
 * ORM Controller
 * Demonstrates Prisma, TypeORM, and Sequelize usage
 *
 * Route: /concepts/orm
 */
@ApiTags('ORM Comparison')
@Controller('concepts/orm')
export class OrmController {
  constructor(private readonly ormService: OrmService) {}

  /**
   * GET /concepts/orm/code-examples
   * Get code examples for all three ORMs
   */
  @Get('code-examples')
  @ApiOperation({
    summary: 'Get code examples',
    description: 'Returns code examples for Prisma, TypeORM, and Sequelize',
  })
  @ApiOkResponse({
    description: 'Code examples for all ORMs',
  })
  getCodeExamples() {
    return this.ormService.getCodeExamples();
  }

  /**
   * POST /concepts/orm/prisma/user
   * Create user with Prisma
   */
  @Post('prisma/user')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create user with Prisma',
    description: 'Demonstrates Prisma create operation',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'john@example.com' },
      },
      required: ['name', 'email'],
    },
  })
  async createUserWithPrisma(@Body() body: { name: string; email: string }) {
    return await this.ormService.createUserWithPrisma(body);
  }

  /**
   * GET /concepts/orm/prisma/user/:id
   * Get user with Prisma
   */
  @Get('prisma/user/:id')
  @ApiOperation({
    summary: 'Get user with Prisma',
    description: 'Demonstrates Prisma find operation with relations',
  })
  @ApiParam({ name: 'id', type: 'number' })
  async getUserWithPrisma(@Param('id', ParseIntPipe) id: number) {
    return await this.ormService.findUserWithPrisma(id);
  }

  /**
   * GET /concepts/orm/prisma/users
   * Get all users with Prisma
   */
  @Get('prisma/users')
  @ApiOperation({
    summary: 'Get all users with Prisma',
  })
  async getAllUsersWithPrisma() {
    return await this.ormService.findAllUsersWithPrisma();
  }

  /**
   * POST /concepts/orm/typeorm/user
   * Create user with TypeORM
   */
  @Post('typeorm/user')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create user with TypeORM',
    description: 'Demonstrates TypeORM create operation',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Jane Doe' },
        email: { type: 'string', example: 'jane@example.com' },
      },
      required: ['name', 'email'],
    },
  })
  async createUserWithTypeORM(@Body() body: { name: string; email: string }) {
    return await this.ormService.createUserWithTypeORM(body);
  }

  /**
   * GET /concepts/orm/typeorm/user/:id
   * Get user with TypeORM
   */
  @Get('typeorm/user/:id')
  @ApiOperation({
    summary: 'Get user with TypeORM',
    description: 'Demonstrates TypeORM find operation with relations',
  })
  @ApiParam({ name: 'id', type: 'number' })
  async getUserWithTypeORM(@Param('id', ParseIntPipe) id: number) {
    return await this.ormService.findUserWithTypeORM(id);
  }

  /**
   * GET /concepts/orm/typeorm/users
   * Get all users with TypeORM
   */
  @Get('typeorm/users')
  @ApiOperation({
    summary: 'Get all users with TypeORM',
  })
  async getAllUsersWithTypeORM() {
    return await this.ormService.findAllUsersWithTypeORM();
  }

  /**
   * POST /concepts/orm/sequelize/user
   * Create user with Sequelize
   */
  @Post('sequelize/user')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create user with Sequelize',
    description: 'Demonstrates Sequelize create operation',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Bob Smith' },
        email: { type: 'string', example: 'bob@example.com' },
      },
      required: ['name', 'email'],
    },
  })
  async createUserWithSequelize(@Body() body: { name: string; email: string }) {
    return await this.ormService.createUserWithSequelize(body);
  }

  /**
   * GET /concepts/orm/sequelize/user/:id
   * Get user with Sequelize
   */
  @Get('sequelize/user/:id')
  @ApiOperation({
    summary: 'Get user with Sequelize',
    description: 'Demonstrates Sequelize find operation with relations',
  })
  @ApiParam({ name: 'id', type: 'number' })
  async getUserWithSequelize(@Param('id', ParseIntPipe) id: number) {
    return await this.ormService.findUserWithSequelize(id);
  }

  /**
   * GET /concepts/orm/sequelize/users
   * Get all users with Sequelize
   */
  @Get('sequelize/users')
  @ApiOperation({
    summary: 'Get all users with Sequelize',
  })
  async getAllUsersWithSequelize() {
    return await this.ormService.findAllUsersWithSequelize();
  }
}

