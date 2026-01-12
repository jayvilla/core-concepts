"use client";

import { useState } from "react";

/**
 * DEPENDENCY INJECTION EXAMPLE
 *
 * Demonstrates NestJS Dependency Injection container and how it works
 */

export default function DependencyInjectionExample() {
  const [selectedAspect, setSelectedAspect] = useState<
    "basics" | "injection" | "container" | "tokens"
  >("basics");

  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        Dependency Injection Container
      </h2>

      <div className="space-y-6">
        {/* Aspect Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "basics", label: "Basics" },
              { key: "injection", label: "Injection Patterns" },
              { key: "container", label: "How It Works" },
              { key: "tokens", label: "Tokens & Resolution" },
            ] as const
          ).map((aspect) => (
            <button
              key={aspect.key}
              onClick={() => setSelectedAspect(aspect.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedAspect === aspect.key
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {aspect.label}
            </button>
          ))}
        </div>

        {/* Basics */}
        {selectedAspect === "basics" && (
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-bold text-purple-900 mb-3">What is Dependency Injection?</h3>
              <p className="text-sm text-gray-700 mb-3">
                Dependency Injection (DI) is a design pattern where dependencies are provided to a class rather than the class creating them. NestJS has a built-in DI container that manages dependencies.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">❌ Without DI (Tight Coupling):</h4>
                  <pre className="text-xs bg-gray-900 text-red-400 p-4 rounded border border-red-300 overflow-x-auto">
                    <code>{`export class UsersService {
  private logger: LoggerService;
  private database: DatabaseService;

  constructor() {
    // Hard to test - can't mock dependencies
    this.logger = new LoggerService();
    this.database = new DatabaseService();
  }

  findAll() {
    this.logger.log('Finding users');
    return this.database.query('SELECT * FROM users');
  }
}`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">✅ With DI (Loose Coupling):</h4>
                  <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
                    <code>{`@Injectable()
export class UsersService {
  constructor(
    private readonly logger: LoggerService,
    private readonly database: DatabaseService,
  ) {}

  findAll() {
    this.logger.log('Finding users');
    return this.database.query('SELECT * FROM users');
  }
}`}</code>
                  </pre>
                </div>
              </div>
              <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Benefits:</strong>
                </p>
                <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                  <li>Loose coupling - classes don't create their dependencies</li>
                  <li>Testability - easy to mock dependencies in tests</li>
                  <li>Flexibility - can swap implementations</li>
                  <li>Single Responsibility - classes focus on their logic</li>
                  <li>DI container manages object creation and lifecycle</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Injection Patterns */}
        {selectedAspect === "injection" && (
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-bold text-purple-900 mb-3">Injection Patterns:</h3>
              <p className="text-sm text-gray-700 mb-3">
                NestJS supports constructor injection, property injection, and method injection (rarely used).
              </p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-purple-300 overflow-x-auto">
                <code>{`import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class UsersService {
  // Constructor Injection (Most Common)
  constructor(
    private readonly logger: LoggerService,
    private readonly config: ConfigService,
  ) {}

  // Property Injection (Less Common)
  @Inject(Optional())
  @Inject('OPTIONAL_SERVICE')
  private optionalService?: OptionalService;
}

// Method Injection (Rare - usually for dynamic providers)
@Injectable()
export class FactoryService {
  createService(@Inject('CONFIG') config: any) {
    return new Service(config);
  }
}`}</code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Key Points:</strong>
                </p>
                <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                  <li><strong>Constructor Injection:</strong> Preferred method, dependencies clearly visible</li>
                  <li><strong>Property Injection:</strong> Useful for optional dependencies</li>
                  <li><strong>Method Injection:</strong> Rare, used in factories or dynamic scenarios</li>
                  <li>Dependencies must be provided in module</li>
                  <li>Use private readonly for constructor-injected dependencies</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-3">Optional & Default Dependencies:</h3>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
                <code>{`import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class UsersService {
  // Optional dependency
  constructor(
    @Optional() @Inject('OPTIONAL_LOGGER') private logger?: LoggerService,
  ) {
    if (this.logger) {
      this.logger.log('Logger available');
    }
  }

  // Default value
  constructor(
    @Inject('TIMEOUT') private timeout: number = 5000,
  ) {}
}`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* How It Works */}
        {selectedAspect === "container" && (
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-bold text-purple-900 mb-3">How the DI Container Works:</h3>
              <p className="text-sm text-gray-700 mb-3">
                The DI container is a registry that manages providers. When you request a dependency, the container resolves it (and its dependencies) automatically.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">1. Registration:</h4>
                  <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-purple-300 overflow-x-auto">
                    <code>{`@Module({
  providers: [
    LoggerService,    // Registered in container
    ConfigService,    // Registered in container
    UsersService,     // Registered in container
  ],
})
export class UsersModule {}`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">2. Resolution:</h4>
                  <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-purple-300 overflow-x-auto">
                    <code>{`// When UsersController is instantiated:
// 1. Container sees UsersService dependency
// 2. Checks if UsersService is registered
// 3. Sees UsersService needs LoggerService and ConfigService
// 4. Resolves LoggerService (no dependencies)
// 5. Resolves ConfigService (no dependencies)
// 6. Creates UsersService with resolved dependencies
// 7. Creates UsersController with UsersService

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  // Container automatically injects UsersService
}`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">3. Singleton Behavior:</h4>
                  <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-purple-300 overflow-x-auto">
                    <code>{`// First request for LoggerService
// -> Container creates instance
const logger1 = container.get(LoggerService);

// Second request for LoggerService
// -> Container returns same instance (singleton)
const logger2 = container.get(LoggerService);
// logger1 === logger2 (true)

// This happens automatically in NestJS`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">
                🔍 DI Container Benefits:
              </h4>
              <ul className="text-sm text-gray-900 list-disc list-inside space-y-1">
                <li>Automatic dependency resolution</li>
                <li>Singleton management (one instance per provider)</li>
                <li>Lifecycle management (creation, destruction)</li>
                <li>Circular dependency detection</li>
                <li>Type-safe dependency injection</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tokens & Resolution */}
        {selectedAspect === "tokens" && (
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-bold text-purple-900 mb-3">Tokens & Resolution:</h3>
              <p className="text-sm text-gray-700 mb-3">
                The DI container uses tokens to identify providers. By default, classes are used as tokens, but you can use strings or symbols.
              </p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-purple-300 overflow-x-auto">
                <code>{`import { Injectable, Inject } from '@nestjs/common';

// Class Token (Default)
@Injectable()
export class LoggerService {}

@Module({
  providers: [LoggerService], // Class is the token
})
export class LoggerModule {}

// Usage
constructor(private logger: LoggerService) {}
// Container uses LoggerService class as token

// String Token
const CONFIG_TOKEN = 'CONFIG';

@Module({
  providers: [
    {
      provide: CONFIG_TOKEN, // String token
      useValue: { host: 'localhost' },
    },
  ],
})
export class ConfigModule {}

// Usage
constructor(@Inject(CONFIG_TOKEN) private config: any) {}

// Symbol Token
const DB_TOKEN = Symbol('DATABASE');

@Module({
  providers: [
    {
      provide: DB_TOKEN, // Symbol token
      useClass: DatabaseService,
    },
  ],
})
export class DatabaseModule {}

// Usage
constructor(@Inject(DB_TOKEN) private db: DatabaseService) {}`}</code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Token Types:</strong>
                </p>
                <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                  <li><strong>Class Token:</strong> Most common, uses the class itself</li>
                  <li><strong>String Token:</strong> Useful for values, configs, constants</li>
                  <li><strong>Symbol Token:</strong> Prevents naming conflicts, more unique</li>
                  <li>Use @Inject() decorator when token is not a class</li>
                  <li>Container resolves token to provider instance</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-3">Circular Dependencies:</h3>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
                <code>{`// Service A depends on Service B
// Service B depends on Service A
// This creates a circular dependency

import { forwardRef, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ServiceA {
  constructor(
    @Inject(forwardRef(() => ServiceB))
    private serviceB: ServiceB,
  ) {}
}

@Injectable()
export class ServiceB {
  constructor(
    @Inject(forwardRef(() => ServiceA))
    private serviceA: ServiceA,
  ) {}
}

// forwardRef() delays resolution until both classes are defined
// Avoid circular dependencies when possible - refactor if needed`}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

