"use client";

import { useState } from "react";

/**
 * PRISMA NESTJS IMPLEMENTATION EXAMPLE
 *
 * Demonstrates how to integrate Prisma with NestJS
 */

export default function PrismaNestJSExample() {
  const [selectedSection, setSelectedSection] = useState<
    "setup" | "service" | "module" | "best-practices"
  >("setup");

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        Prisma with NestJS
      </h2>

      <div className="space-y-6">
        {/* Section Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "setup", label: "Setup & Installation" },
              { key: "service", label: "Prisma Service" },
              { key: "module", label: "Module Integration" },
              { key: "best-practices", label: "Best Practices" },
            ] as const
          ).map((section) => (
            <button
              key={section.key}
              onClick={() => setSelectedSection(section.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedSection === section.key
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Setup & Installation */}
        {selectedSection === "setup" && (
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h3 className="font-bold text-indigo-900 mb-3">Setup & Installation:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Setting up Prisma in a NestJS application.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-indigo-300 overflow-x-auto">
              <code>{`// 1. INSTALL DEPENDENCIES
npm install @prisma/client
npm install -D prisma

// 2. INITIALIZE PRISMA
npx prisma init

// This creates:
// - prisma/schema.prisma
// - .env (with DATABASE_URL)

// 3. CONFIGURE SCHEMA
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}

// 4. GENERATE PRISMA CLIENT
npx prisma generate

// 5. CREATE MIGRATION
npx prisma migrate dev --name init

// 6. INSTALL PRISMA ADAPTER (Prisma 7+)
npm install @prisma/adapter-pg pg

// For Prisma 7, you need to use adapter:
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-indigo-200 rounded">
              <p className="text-sm text-gray-900 font-semibold mb-2">
                Setup Steps:
              </p>
              <ol className="text-sm text-gray-900 list-decimal list-inside mt-2 space-y-1">
                <li>Install Prisma dependencies</li>
                <li>Initialize Prisma with <code className="bg-gray-100 px-1 rounded">npx prisma init</code></li>
                <li>Configure schema.prisma</li>
                <li>Generate Prisma Client</li>
                <li>Create and run migrations</li>
                <li>Set up Prisma Service in NestJS</li>
              </ol>
            </div>
          </div>
        )}

        {/* Prisma Service */}
        {selectedSection === "service" && (
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h3 className="font-bold text-indigo-900 mb-3">Prisma Service:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Creating a Prisma service for dependency injection in NestJS.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-indigo-300 overflow-x-auto">
              <code>{`// prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Prisma 7: Use adapter
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);
    
    super({ adapter });
    
    // Or for Prisma 6 and earlier:
    // super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

// USAGE IN OTHER SERVICES
// user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { name: string; email: string }) {
    return this.prisma.user.create({
      data,
    });
  }

  async findUser(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        posts: true,
      },
    });
  }

  async findAllUsers() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateUser(id: number, data: { name?: string; email?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}

// CONTROLLER
// user.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() createUserDto: { name: string; email: string }) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUser(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: { name?: string; email?: string }
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-indigo-200 rounded">
              <p className="text-sm text-gray-900 font-semibold mb-2">
                Service Pattern:
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>Extend PrismaClient for type safety</li>
                <li>Implement OnModuleInit/OnModuleDestroy for lifecycle</li>
                <li>Use $connect() and $disconnect() for connection management</li>
                <li>Inject PrismaService into other services</li>
                <li>Keep business logic in service layer, not controller</li>
              </ul>
            </div>
          </div>
        )}

        {/* Module Integration */}
        {selectedSection === "module" && (
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h3 className="font-bold text-indigo-900 mb-3">Module Integration:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Organizing Prisma in NestJS modules.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-indigo-300 overflow-x-auto">
              <code>{`// prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()  // Makes PrismaService available everywhere
@Module({
  providers: [PrismaService],
  exports: [PrismaService],  // Export for other modules
})
export class PrismaModule {}

// app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule,  // Import globally
    UserModule,
  ],
})
export class AppModule {}

// user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
// PrismaService is available globally, no need to import

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

// ALTERNATIVE: Feature-specific Prisma Module
// user-prisma.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';

@Module({
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export class UserPrismaModule {}

// TRANSACTION EXAMPLE
// user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUserWithProfile(
    userData: { name: string; email: string },
    profileData: { bio: string }
  ) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: userData,
      });

      const profile = await tx.profile.create({
        data: {
          ...profileData,
          userId: user.id,
        },
      });

      return { user, profile };
    });
  }
}

// ERROR HANDLING
import { Prisma } from '@prisma/client';

async createUser(data: { name: string; email: string }) {
  try {
    return await this.prisma.user.create({ data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // Unique constraint violation
        throw new ConflictException('Email already exists');
      }
    }
    throw error;
  }
}`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-indigo-200 rounded">
              <p className="text-sm text-gray-900 font-semibold mb-2">
                Module Organization:
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>Use @Global() for PrismaModule to make it available everywhere</li>
                <li>Export PrismaService from PrismaModule</li>
                <li>Inject PrismaService in feature modules</li>
                <li>Use transactions for multi-step operations</li>
                <li>Handle Prisma errors appropriately</li>
              </ul>
            </div>
          </div>
        )}

        {/* Best Practices */}
        {selectedSection === "best-practices" && (
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h3 className="font-bold text-indigo-900 mb-3">Best Practices:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Best practices for using Prisma in NestJS applications.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-indigo-300 overflow-x-auto">
              <code>{`// 1. SINGLETON PRISMA SERVICE
// prisma.service.ts - Already shown, ensures single connection pool

// 2. USE DTOs FOR VALIDATION
// create-user.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;
}

// user.controller.ts
@Post()
create(@Body() createUserDto: CreateUserDto) {
  return this.userService.createUser(createUserDto);
}

// 3. ERROR HANDLING MIDDLEWARE
// prisma-exception.filter.ts
import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    switch (exception.code) {
      case 'P2002':
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: 'Unique constraint violation',
        });
        break;
      case 'P2025':
        response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Record not found',
        });
        break;
      default:
        super.catch(exception, host);
    }
  }
}

// 4. LOGGING
// prisma.service.ts
import { Logger } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
      ],
    });

    this.$on('query', (e) => {
      this.logger.debug(\`Query: \${e.query}\`);
      this.logger.debug(\`Params: \${e.params}\`);
      this.logger.debug(\`Duration: \${e.duration}ms\`);
    });
  }
}

// 5. ENVIRONMENT CONFIGURATION
// config/database.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DATABASE_URL,
  log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
}));

// 6. TESTING WITH PRISMA
// test/setup.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  // Clean database
  await prisma.user.deleteMany();
});

// 7. MIGRATION SCRIPTS
// package.json
{
  "scripts": {
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:deploy": "prisma migrate deploy",
    "prisma:studio": "prisma studio"
  }
}`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-indigo-200 rounded">
              <p className="text-sm text-gray-900 font-semibold mb-2">
                Best Practices Summary:
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>Use singleton PrismaService for connection pooling</li>
                <li>Validate input with DTOs and class-validator</li>
                <li>Handle Prisma errors with exception filters</li>
                <li>Enable logging in development</li>
                <li>Use environment-based configuration</li>
                <li>Clean database in tests</li>
                <li>Use transactions for related operations</li>
                <li>Keep business logic in services, not controllers</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">NestJS + Prisma Architecture:</h4>
        <div className="text-sm text-gray-900 space-y-1">
          <p><strong>Layers:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Controller → Handles HTTP requests/responses</li>
            <li>Service → Business logic, uses PrismaService</li>
            <li>PrismaService → Database access layer</li>
            <li>DTOs → Data validation and transformation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
