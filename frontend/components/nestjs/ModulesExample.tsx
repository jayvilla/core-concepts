"use client";

import { useState } from "react";

/**
 * MODULES EXAMPLE
 *
 * Demonstrates NestJS modules: Feature, Shared, and Global modules
 */

export default function ModulesExample() {
  const [selectedModule, setSelectedModule] = useState<
    "feature" | "shared" | "global"
  >("feature");

  return (
    <div className="border-2 border-red-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-red-900">
        NestJS Modules
      </h2>

      <div className="space-y-6">
        {/* Module Type Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "feature", label: "Feature Module" },
              { key: "shared", label: "Shared Module" },
              { key: "global", label: "Global Module" },
            ] as const
          ).map((type) => (
            <button
              key={type.key}
              onClick={() => setSelectedModule(type.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedModule === type.key
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Feature Module */}
        {selectedModule === "feature" && (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-bold text-red-900 mb-3">Feature Module:</h3>
              <p className="text-sm text-gray-700 mb-3">
                Feature modules organize code by domain/feature. Each module encapsulates its controllers, services, and related code.
              </p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-red-300 overflow-x-auto">
                <code>{`import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export to make available to other modules
})
export class UsersModule {}`}</code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-red-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Key Points:</strong>
                </p>
                <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                  <li>Self-contained unit for a specific feature/domain</li>
                  <li>Declares controllers (handles HTTP requests)</li>
                  <li>Declares providers (services, repositories, etc.)</li>
                  <li>Can export providers for use in other modules</li>
                  <li>Can import other modules to use their exported providers</li>
                  <li>Promotes code organization and separation of concerns</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-3">Usage in AppModule:</h3>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
                <code>{`import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [UsersModule, OrdersModule], // Import feature modules
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Shared Module */}
        {selectedModule === "shared" && (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-bold text-red-900 mb-3">Shared Module:</h3>
              <p className="text-sm text-gray-700 mb-3">
                Shared modules contain common functionality used across multiple feature modules. They export providers that can be imported by feature modules.
              </p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-red-300 overflow-x-auto">
                <code>{`import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ConfigService } from './config.service';

@Module({
  providers: [LoggerService, ConfigService],
  exports: [LoggerService, ConfigService], // Export shared services
})
export class SharedModule {}`}</code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-red-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Key Points:</strong>
                </p>
                <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                  <li>Contains reusable providers (services, utilities, helpers)</li>
                  <li>Exports providers for use in other modules</li>
                  <li>Imported by multiple feature modules</li>
                  <li>Promotes code reusability and DRY principle</li>
                  <li>Common examples: LoggerService, ConfigService, DatabaseModule</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-3">Using Shared Module:</h3>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
                <code>{`import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { UsersService } from './users.service';

@Module({
  imports: [SharedModule], // Import shared module
  providers: [UsersService],
})
export class UsersModule {
  // UsersService can now inject LoggerService and ConfigService
  // from SharedModule via dependency injection
}`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Global Module */}
        {selectedModule === "global" && (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-bold text-red-900 mb-3">Global Module:</h3>
              <p className="text-sm text-gray-700 mb-3">
                Global modules make their exports available to all modules without needing to import them. Use sparingly - typically for configuration, logging, or database connections.
              </p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-red-300 overflow-x-auto">
                <code>{`import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global() // Makes module global
@Module({
  providers: [ConfigService],
  exports: [ConfigService], // Available to all modules
})
export class ConfigModule {}`}</code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-red-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Key Points:</strong>
                </p>
                <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                  <li>Use @Global() decorator to make a module global</li>
                  <li>Exports are available to all modules without importing</li>
                  <li>Import once in AppModule, available everywhere</li>
                  <li>Use sparingly - only for truly global services</li>
                  <li>Common use cases: ConfigModule, LoggerModule, DatabaseModule</li>
                  <li>Overuse can lead to tight coupling and hidden dependencies</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-3">Using Global Module:</h3>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
                <code>{`import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module'; // Import once
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule, UsersModule], // ConfigModule imported here
})
export class AppModule {}

// In any other module - no import needed!
export class OrdersModule {
  // Can directly inject ConfigService without importing ConfigModule
  constructor(private configService: ConfigService) {}
}`}</code>
              </pre>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">
                ⚠️ When to Use Global Modules:
              </h4>
              <ul className="text-sm text-gray-900 list-disc list-inside space-y-1">
                <li>Configuration services used everywhere</li>
                <li>Database connections</li>
                <li>Logging utilities</li>
                <li>HTTP clients (Axios, etc.)</li>
                <li>Avoid for business logic - prefer explicit imports</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

