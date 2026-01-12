"use client";

import { useState } from "react";

/**
 * LIFECYCLE EVENTS EXAMPLE
 *
 * Demonstrates NestJS lifecycle events: OnModuleInit, OnModuleDestroy, etc.
 */

export default function LifecycleEventsExample() {
  const [selectedEvent, setSelectedEvent] = useState<
    "module" | "application" | "all" | "order"
  >("module");

  return (
    <div className="border-2 border-orange-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-orange-900">
        Lifecycle Events
      </h2>

      <div className="space-y-6">
        {/* Event Type Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "module", label: "Module Lifecycle" },
              { key: "application", label: "Application Lifecycle" },
              { key: "all", label: "All Hooks" },
              { key: "order", label: "Execution Order" },
            ] as const
          ).map((type) => (
            <button
              key={type.key}
              onClick={() => setSelectedEvent(type.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedEvent === type.key
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Module Lifecycle */}
        {selectedEvent === "module" && (
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="font-bold text-orange-900 mb-3">Module Lifecycle Hooks:</h3>
              <p className="text-sm text-gray-700 mb-3">
                Module lifecycle hooks are called when a module is initialized or destroyed. Implement interfaces to hook into these events.
              </p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-orange-300 overflow-x-auto">
                <code>{`import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Module({
  providers: [DatabaseService],
})
export class DatabaseModule implements OnModuleInit, OnModuleDestroy {
  // Called after module dependencies are resolved
  onModuleInit() {
    console.log('DatabaseModule initialized');
    // Initialize database connection
    // Load configuration
    // Set up event listeners
  }

  // Called when module is being destroyed (app shutdown)
  onModuleDestroy() {
    console.log('DatabaseModule destroying');
    // Close database connections
    // Clean up resources
    // Remove event listeners
  }
}`}</code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-orange-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Key Points:</strong>
                </p>
                <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                  <li><strong>OnModuleInit:</strong> Called after module dependencies are resolved</li>
                  <li><strong>OnModuleDestroy:</strong> Called when module is being destroyed</li>
                  <li>Can be implemented in modules or providers</li>
                  <li>Useful for initialization logic (database connections, config loading)</li>
                  <li>Useful for cleanup logic (closing connections, freeing resources)</li>
                  <li>Allows async operations (can return Promise)</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-3">Provider Lifecycle (Module Hooks):</h3>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
                <code>{`import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;

  async onModuleInit() {
    // Called when this provider is initialized
    console.log('DatabaseService initializing...');
    this.connection = await this.connect();
    console.log('DatabaseService initialized');
  }

  async onModuleDestroy() {
    // Called when this provider is being destroyed
    console.log('DatabaseService destroying...');
    await this.connection.close();
    console.log('DatabaseService destroyed');
  }

  private async connect(): Promise<Connection> {
    // Connection logic
  }
}`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Application Lifecycle */}
        {selectedEvent === "application" && (
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="font-bold text-orange-900 mb-3">Application Lifecycle Hooks:</h3>
              <p className="text-sm text-gray-700 mb-3">
                Application lifecycle hooks are called at the application level - after all modules are initialized or before shutdown.
              </p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-orange-300 overflow-x-auto">
                <code>{`import {
  OnApplicationBootstrap,
  OnApplicationShutdown,
  BeforeApplicationShutdown,
} from '@nestjs/common';

@Injectable()
export class AppService implements
  OnApplicationBootstrap,
  BeforeApplicationShutdown,
  OnApplicationShutdown {
  
  // Called after all modules are initialized
  async onApplicationBootstrap() {
    console.log('Application bootstrapped');
    // All modules are ready
    // Can start background jobs
    // Can connect to external services
  }

  // Called before shutdown starts (can prevent shutdown)
  async beforeApplicationShutdown(signal?: string) {
    console.log(\`Shutdown signal: \${signal}\`);
    // Graceful shutdown preparation
    // Stop accepting new requests
    // Can prevent shutdown by throwing error (not recommended)
  }

  // Called during shutdown process
  async onApplicationShutdown(signal?: string) {
    console.log(\`Application shutting down: \${signal}\`);
    // Final cleanup
    // Close all connections
    // Save state
  }
}`}</code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-orange-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Key Points:</strong>
                </p>
                <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                  <li><strong>OnApplicationBootstrap:</strong> After all modules initialized</li>
                  <li><strong>BeforeApplicationShutdown:</strong> Before shutdown starts (SIGTERM, SIGINT)</li>
                  <li><strong>OnApplicationShutdown:</strong> During shutdown process</li>
                  <li>Useful for graceful shutdown (close connections, finish jobs)</li>
                  <li>Receives shutdown signal (SIGTERM, SIGINT, etc.)</li>
                  <li>Can be async for cleanup operations</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* All Hooks */}
        {selectedEvent === "all" && (
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="font-bold text-orange-900 mb-3">All Lifecycle Hooks:</h3>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-orange-300 overflow-x-auto">
                <code>{`import {
  OnModuleInit,           // After module init
  OnModuleDestroy,        // On module destroy
  OnApplicationBootstrap, // After all modules initialized
  BeforeApplicationShutdown, // Before shutdown starts
  OnApplicationShutdown,  // During shutdown
} from '@nestjs/common';

@Injectable()
export class LifecycleService implements
  OnModuleInit,
  OnModuleDestroy,
  OnApplicationBootstrap,
  BeforeApplicationShutdown,
  OnApplicationShutdown {
  
  // Module Lifecycle
  onModuleInit() {
    console.log('1. onModuleInit');
  }

  onModuleDestroy() {
    console.log('3. onModuleDestroy');
  }

  // Application Lifecycle
  onApplicationBootstrap() {
    console.log('2. onApplicationBootstrap');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log(\`4. beforeApplicationShutdown: \${signal}\`);
  }

  onApplicationShutdown(signal?: string) {
    console.log(\`5. onApplicationShutdown: \${signal}\`);
  }
}`}</code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-orange-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Hook Summary:</strong>
                </p>
                <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                  <li><strong>OnModuleInit:</strong> Module initialization</li>
                  <li><strong>OnModuleDestroy:</strong> Module cleanup</li>
                  <li><strong>OnApplicationBootstrap:</strong> App ready (all modules initialized)</li>
                  <li><strong>BeforeApplicationShutdown:</strong> Graceful shutdown prep</li>
                  <li><strong>OnApplicationShutdown:</strong> Final cleanup</li>
                  <li>All hooks can be async (return Promise)</li>
                  <li>Hooks are called in specific order (see next section)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Execution Order */}
        {selectedEvent === "order" && (
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="font-bold text-orange-900 mb-3">Execution Order:</h3>
              <p className="text-sm text-gray-700 mb-3">
                Lifecycle hooks are called in a specific order during application startup and shutdown.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Startup Sequence:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-900 bg-white p-4 rounded border border-orange-200">
                    <li><code className="bg-gray-100 px-2 py-1 rounded">onModuleInit()</code> - All modules initialize (Dependency resolution order)</li>
                    <li><code className="bg-gray-100 px-2 py-1 rounded">onApplicationBootstrap()</code> - Application ready (All modules initialized)</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Shutdown Sequence (SIGTERM/SIGINT):</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-900 bg-white p-4 rounded border border-orange-200">
                    <li><code className="bg-gray-100 px-2 py-1 rounded">beforeApplicationShutdown()</code> - Prepare for shutdown</li>
                    <li><code className="bg-gray-100 px-2 py-1 rounded">onModuleDestroy()</code> - Module cleanup (Reverse dependency order)</li>
                    <li><code className="bg-gray-100 px-2 py-1 rounded">onApplicationShutdown()</code> - Final cleanup</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-3">Example: Database Connection Lifecycle:</h3>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
                <code>{`@Injectable()
export class DatabaseService implements
  OnModuleInit,
  OnApplicationBootstrap,
  BeforeApplicationShutdown,
  OnModuleDestroy {
  
  private connection: Connection;
  private isReady = false;

  // 1. Initialize connection
  async onModuleInit() {
    console.log('Connecting to database...');
    this.connection = await createConnection();
  }

  // 2. Verify connection after all modules ready
  async onApplicationBootstrap() {
    await this.connection.ping();
    this.isReady = true;
    console.log('Database ready');
  }

  // 3. Prepare for shutdown
  async beforeApplicationShutdown() {
    console.log('Stopping new database requests...');
    this.isReady = false;
  }

  // 4. Close connection
  async onModuleDestroy() {
    console.log('Closing database connection...');
    await this.connection.close();
    console.log('Database connection closed');
  }
}`}</code>
              </pre>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">
                💡 Best Practices:
              </h4>
              <ul className="text-sm text-gray-900 list-disc list-inside space-y-1">
                <li>Use OnModuleInit for initialization that depends on other modules</li>
                <li>Use OnApplicationBootstrap for initialization after all modules ready</li>
                <li>Always clean up resources in OnModuleDestroy</li>
                <li>Use BeforeApplicationShutdown for graceful shutdown (stop accepting requests)</li>
                <li>Keep cleanup logic in OnModuleDestroy simple and fast</li>
                <li>Handle errors in lifecycle hooks appropriately</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

