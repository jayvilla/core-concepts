"use client";

import { useState } from "react";

/**
 * PROVIDERS EXAMPLE
 *
 * Demonstrates NestJS providers (services) and how they work
 */

export default function ProvidersExample() {
  const [selectedAspect, setSelectedAspect] = useState<
    "basic" | "dependency" | "custom" | "scope"
  >("basic");

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        Providers (Services)
      </h2>

      <div className="space-y-6">
        {/* Aspect Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "basic", label: "Basic Service" },
              { key: "dependency", label: "Dependencies" },
              { key: "custom", label: "Custom Provider" },
              { key: "scope", label: "Scopes" },
            ] as const
          ).map((aspect) => (
            <button
              key={aspect.key}
              onClick={() => setSelectedAspect(aspect.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedAspect === aspect.key
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {aspect.label}
            </button>
          ))}
        </div>

        {/* Basic Service */}
        {selectedAspect === "basic" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">Basic Service:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Services are providers that contain business logic. They are decorated with @Injectable() and registered in modules.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
              <code>{`import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find(user => user.id === id);
  }

  create(userData: CreateUserDto): User {
    const user = {
      id: this.users.length + 1,
      ...userData,
    };
    this.users.push(user);
    return user;
  }

  update(id: number, userData: UpdateUserDto): User {
    const user = this.findOne(id);
    Object.assign(user, userData);
    return user;
  }

  remove(id: number): void {
    const index = this.users.findIndex(user => user.id === id);
    this.users.splice(index, 1);
  }
}`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-green-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Points:</strong>
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>@Injectable() decorator marks the class as a provider</li>
                <li>Registered in module's providers array</li>
                <li>Can be injected into controllers, other services, or modules</li>
                <li>Contains business logic, not HTTP concerns</li>
                <li>Promotes separation of concerns (logic vs HTTP handling)</li>
                <li>Services are singletons by default (one instance per app)</li>
              </ul>
            </div>
          </div>
        )}

        {/* Dependencies */}
        {selectedAspect === "dependency" && (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-bold text-green-900 mb-3">Service with Dependencies:</h3>
              <p className="text-sm text-gray-700 mb-3">
                Services can inject other services through constructor injection. NestJS DI container resolves dependencies automatically.
              </p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
                <code>{`import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ConfigService } from './config.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: LoggerService,
    private readonly config: ConfigService,
  ) {
    // Dependencies are automatically injected
    this.logger.log('UsersService initialized');
  }

  findAll(): User[] {
    this.logger.log('Finding all users');
    // Use injected services
    const maxResults = this.config.get('MAX_USERS');
    // ... business logic
    return users;
  }
}`}</code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-green-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Key Points:</strong>
                </p>
                <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                  <li>Dependencies injected via constructor</li>
                  <li>Use private readonly for dependency properties</li>
                  <li>DI container resolves dependencies automatically</li>
                  <li>Dependencies must be provided in the module</li>
                  <li>Circular dependencies must be handled carefully</li>
                  <li>Promotes testability (can mock dependencies)</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-3">Module Registration:</h3>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
                <code>{`@Module({
  providers: [
    LoggerService,  // Must be provided
    ConfigService,  // Must be provided
    UsersService,   // Can inject LoggerService and ConfigService
  ],
})
export class UsersModule {}`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Custom Provider */}
        {selectedAspect === "custom" && (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-bold text-green-900 mb-3">Custom Provider:</h3>
              <p className="text-sm text-gray-700 mb-3">
                Custom providers allow you to use values, factories, or classes as providers. Useful for configuration, external libraries, or complex initialization.
              </p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
                <code>{`import { Module } from '@nestjs/common';

// Value Provider
const CONNECTION = 'CONNECTION';

@Module({
  providers: [
    {
      provide: CONNECTION,
      useValue: {
        host: 'localhost',
        port: 5432,
      },
    },
    // Factory Provider
    {
      provide: 'ASYNC_CONNECTION',
      useFactory: async () => {
        const connection = await createConnection();
        return connection;
      },
    },
    // Class Provider (alias)
    {
      provide: 'AliasedLoggerService',
      useExisting: LoggerService,
    },
  ],
})
export class DatabaseModule {}`}</code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-green-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Key Points:</strong>
                </p>
                <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                  <li>useValue: Provide a constant value</li>
                  <li>useFactory: Create provider dynamically (can be async)</li>
                  <li>useExisting: Alias to another provider</li>
                  <li>Use @Inject() decorator to inject by token</li>
                  <li>Useful for configuration, external libraries, or complex setup</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-3">Using Custom Provider:</h3>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
                <code>{`import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject('CONNECTION') private connection: any,
    @Inject('ASYNC_CONNECTION') private asyncConnection: any,
  ) {}
}`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Scopes */}
        {selectedAspect === "scope" && (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-bold text-green-900 mb-3">Provider Scopes:</h3>
              <p className="text-sm text-gray-700 mb-3">
                Providers have different scopes that control their lifetime. Default is singleton, but you can use request-scoped providers.
              </p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
                <code>{`import { Injectable, Scope } from '@nestjs/common';

// Default: Singleton (one instance per app)
@Injectable()
export class UsersService {
  // One instance shared across entire application
}

// Request-scoped: New instance per request
@Injectable({ scope: Scope.REQUEST })
export class RequestScopedService {
  // New instance created for each HTTP request
  // Useful for request-specific data (user context, correlation IDs)
}

// Transient: New instance every time it's injected
@Injectable({ scope: Scope.TRANSIENT })
export class TransientService {
  // New instance every time it's injected
  // Each consumer gets its own instance
}`}</code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-green-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Key Points:</strong>
                </p>
                <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                  <li><strong>DEFAULT (Singleton):</strong> One instance per application</li>
                  <li><strong>REQUEST:</strong> New instance per HTTP request</li>
                  <li><strong>TRANSIENT:</strong> New instance every time it's injected</li>
                  <li>Singleton is most common (performance, state management)</li>
                  <li>Request-scoped useful for user context, request IDs</li>
                  <li>Transient useful when you need isolated instances</li>
                  <li>Scoped providers have performance overhead</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">
                ⚠️ Scope Considerations:
              </h4>
              <ul className="text-sm text-gray-900 list-disc list-inside space-y-1">
                <li>Request-scoped providers cannot be injected into singleton providers</li>
                <li>Must use REQUEST scope for the entire dependency chain</li>
                <li>Request-scoped has performance overhead (instance creation per request)</li>
                <li>Use singleton when possible for better performance</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

