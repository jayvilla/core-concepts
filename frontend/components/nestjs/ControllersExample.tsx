"use client";

import { useState } from "react";

/**
 * CONTROLLERS EXAMPLE
 *
 * Demonstrates NestJS controllers and decorators
 */

export default function ControllersExample() {
  const [selectedAspect, setSelectedAspect] = useState<
    "basic" | "routes" | "params" | "decorators"
  >("basic");

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        Controllers & Decorators
      </h2>

      <div className="space-y-6">
        {/* Aspect Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "basic", label: "Basic Controller" },
              { key: "routes", label: "Route Methods" },
              { key: "params", label: "Parameters" },
              { key: "decorators", label: "Decorators" },
            ] as const
          ).map((aspect) => (
            <button
              key={aspect.key}
              onClick={() => setSelectedAspect(aspect.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedAspect === aspect.key
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {aspect.label}
            </button>
          ))}
        </div>

        {/* Basic Controller */}
        {selectedAspect === "basic" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">Basic Controller:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Controllers handle HTTP requests and responses. They are decorated with @Controller() and contain route handlers decorated with HTTP method decorators.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
              <code>{`import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // Base route: /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post() // POST /users
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Points:</strong>
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>@Controller() decorator defines the base route</li>
                <li>Registered in module's controllers array</li>
                <li>Handles HTTP requests and delegates to services</li>
                <li>Thin layer - business logic in services</li>
                <li>Uses dependency injection to get services</li>
                <li>Route handlers return values that are serialized to JSON</li>
              </ul>
            </div>
          </div>
        )}

        {/* Route Methods */}
        {selectedAspect === "routes" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">HTTP Method Decorators:</h3>
            <p className="text-sm text-gray-700 mb-3">
              NestJS provides decorators for all HTTP methods. Route paths are combined with the controller's base path.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
              <code>{`@Controller('users')
export class UsersController {
  @Get()              // GET /users
  findAll() {}

  @Get(':id')         // GET /users/:id
  findOne(@Param('id') id: string) {}

  @Post()             // POST /users
  create(@Body() dto: CreateUserDto) {}

  @Put(':id')         // PUT /users/:id
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {}

  @Patch(':id')       // PATCH /users/:id
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateUserDto) {}

  @Delete(':id')      // DELETE /users/:id
  remove(@Param('id') id: string) {}

  @Head(':id')        // HEAD /users/:id
  head(@Param('id') id: string) {}

  @Options()          // OPTIONS /users
  options() {}
}`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Points:</strong>
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>@Get(), @Post(), @Put(), @Patch(), @Delete() - standard HTTP methods</li>
                <li>@Head(), @Options() - less common HTTP methods</li>
                <li>Route paths combine: @Controller('users') + @Get(':id') = GET /users/:id</li>
                <li>Empty path in decorator uses controller base path</li>
                <li>Paths support parameters (:id) and wildcards (*)</li>
                <li>Order matters - more specific routes should come first</li>
              </ul>
            </div>
          </div>
        )}

        {/* Parameters */}
        {selectedAspect === "params" && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-3">Parameter Decorators:</h3>
              <p className="text-sm text-gray-700 mb-3">
                NestJS provides decorators to extract data from requests: route parameters, query strings, request body, headers, etc.
              </p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
                <code>{`@Controller('users')
export class UsersController {
  // Route parameter
  @Get(':id')
  findOne(@Param('id') id: string) {}
  // Or get all params
  @Get(':id/posts/:postId')
  findPost(@Param() params: { id: string; postId: string }) {}

  // Query parameters
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {}
  // Or get all queries
  findAll(@Query() query: { page: number; limit: number }) {}

  // Request body
  @Post()
  create(@Body() createUserDto: CreateUserDto) {}
  // Or get specific property
  create(@Body('name') name: string) {}

  // Request headers
  @Get()
  findAll(@Headers('authorization') auth: string) {}
  // Or get all headers
  findAll(@Headers() headers: any) {}

  // Request object (full access)
  @Get()
  findAll(@Req() request: Request) {}

  // Response object (full control)
  @Get()
  findAll(@Res() response: Response) {
    response.status(200).json({ data: [] });
  }
}`}</code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Key Points:</strong>
                </p>
                <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                  <li>@Param() - Extract route parameters</li>
                  <li>@Query() - Extract query string parameters</li>
                  <li>@Body() - Extract request body (validated with DTOs)</li>
                  <li>@Headers() - Extract HTTP headers</li>
                  <li>@Req() - Full Express/Fastify request object</li>
                  <li>@Res() - Full Express/Fastify response object (bypasses NestJS response handling)</li>
                  <li>Use DTOs with class-validator for body validation</li>
                  <li>Use ParseIntPipe, ParseBoolPipe for type conversion</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-bold text-purple-900 mb-3">Pipes for Transformation:</h3>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-purple-300 overflow-x-auto">
                <code>{`import { ParseIntPipe, ParseBoolPipe, DefaultValuePipe } from '@nestjs/common';

@Get(':id')
findOne(
  @Param('id', ParseIntPipe) id: number, // Converts string to number
) {}

@Get()
findAll(
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
) {}`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Decorators */}
        {selectedAspect === "decorators" && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-3">Common Decorators:</h3>
              <p className="text-sm text-gray-700 mb-3">
                NestJS uses decorators extensively for metadata and configuration. Understanding decorators is key to understanding NestJS.
              </p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
                <code>{`// Module decorators
@Module({ ... })           // Defines a module
@Global()                  // Makes module global

// Class decorators
@Controller('users')       // Marks class as controller
@Injectable()              // Marks class as provider
@Entity()                  // Marks class as entity (TypeORM)

// Method decorators
@Get(), @Post(), etc.     // HTTP method handlers
@UseGuards(AuthGuard)     // Apply guards
@UseInterceptors(LogInterceptor) // Apply interceptors
@UsePipes(ValidationPipe) // Apply pipes

// Parameter decorators
@Param(), @Query(), @Body(), @Headers(), @Req(), @Res()

// Property decorators
@Inject('TOKEN')          // Inject by token
@Optional()               // Make dependency optional
@Inject(forwardRef(() => Service)) // Handle circular deps

// Status code decorators
@HttpCode(204)            // Set HTTP status code
@Header('Cache-Control', 'no-cache') // Set header`}</code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Key Points:</strong>
                </p>
                <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                  <li>Decorators are TypeScript/JavaScript metadata</li>
                  <li>NestJS uses decorators for dependency injection, routing, validation</li>
                  <li>Decorators add metadata at compile time</li>
                  <li>Runtime reflection reads metadata to configure the framework</li>
                  <li>Enables declarative, annotation-based programming</li>
                  <li>Decorators make code more readable and less boilerplate</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-bold text-green-900 mb-3">Example: Complete Controller:</h3>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
                <code>{`import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { LoggingInterceptor } from './logging.interceptor';

@Controller('users')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class UsersController {
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query('page') page: number) {
    return this.usersService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}`}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

