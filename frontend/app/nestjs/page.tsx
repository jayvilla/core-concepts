import Link from "next/link";
import ModulesExample from "@/components/nestjs/ModulesExample";
import ProvidersExample from "@/components/nestjs/ProvidersExample";
import ControllersExample from "@/components/nestjs/ControllersExample";
import DependencyInjectionExample from "@/components/nestjs/DependencyInjectionExample";
import LifecycleEventsExample from "@/components/nestjs/LifecycleEventsExample";
import NestJSStructureComparison from "@/components/nestjs/NestJSStructureComparison";

export default function NestJSPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              NestJS Concepts
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Master NestJS architecture and patterns. Learn about modules, providers, controllers, dependency injection, lifecycle events, and the distinction between structure and frameworks.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <ModulesExample />
          <ProvidersExample />
          <ControllersExample />
          <DependencyInjectionExample />
          <LifecycleEventsExample />
          <NestJSStructureComparison />
        </div>

        {/* Interview Tips */}
        <div className="mt-8 p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            💡 Interview Tips
          </h2>
          <div className="space-y-4 text-gray-900">
            <div>
              <p className="font-semibold mb-2">Common Questions:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>&quot;What is NestJS and how does it differ from Express?&quot;</li>
                <li>&quot;Explain the NestJS module system.&quot;</li>
                <li>&quot;How does dependency injection work in NestJS?&quot;</li>
                <li>&quot;What are providers and how are they different from services?&quot;</li>
                <li>&quot;Explain NestJS lifecycle events.&quot;</li>
                <li>&quot;What&apos;s the difference between structure and framework features?&quot;</li>
                <li>&quot;How do you organize code in a NestJS application?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>NestJS Overview:</strong> A progressive Node.js framework built with TypeScript. Uses decorators, dependency injection, and follows Angular-like architecture. Built on Express (or Fastify) but provides structure and patterns.
                </li>
                <li>
                  <strong>Modules:</strong> Feature modules organize code by domain. Shared modules export reusable providers. Global modules make exports available everywhere. Modules define boundaries and dependencies.
                </li>
                <li>
                  <strong>Providers (Services):</strong> Classes decorated with @Injectable() that contain business logic. Registered in modules, injected via constructor. Can be singleton (default), request-scoped, or transient. Services promote separation of concerns.
                </li>
                <li>
                  <strong>Controllers:</strong> Handle HTTP requests using decorators (@Get(), @Post(), etc.). Extract data using parameter decorators (@Param(), @Query(), @Body()). Thin layer that delegates to services.
                </li>
                <li>
                  <strong>Dependency Injection:</strong> NestJS has a built-in DI container. Dependencies injected via constructor. Container resolves dependencies automatically. Promotes loose coupling, testability, and flexibility. Uses tokens (classes, strings, symbols) to identify providers.
                </li>
                <li>
                  <strong>Lifecycle Events:</strong> OnModuleInit (after module init), OnModuleDestroy (on module destroy), OnApplicationBootstrap (after all modules ready), BeforeApplicationShutdown (before shutdown), OnApplicationShutdown (during shutdown). Useful for initialization and cleanup.
                </li>
                <li>
                  <strong>Structure vs Frameworks:</strong> Structure refers to architectural patterns (modules, DI, separation of concerns) that are transferable concepts. Framework features are NestJS-specific implementations (decorators, DI container). Senior engineers understand the underlying principles, not just the framework APIs.
                </li>
                <li>
                  <strong>Best Practices:</strong> Organize by feature modules, use services for business logic, keep controllers thin, use DTOs for validation, leverage DI for testability, follow lifecycle hooks for resource management, maintain clear boundaries between layers.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Interview Angle - Structure vs Frameworks:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Understanding Principles:</strong> Senior engineers understand that NestJS provides structure (architectural patterns) not just framework features. The structure (modules, DI, separation of concerns) is transferable knowledge.
                </li>
                <li>
                  <strong>Architectural Patterns:</strong> NestJS implements Module Pattern, Dependency Injection Pattern, Controller-Service Pattern, Repository Pattern (with TypeORM), and Provider Pattern. These are architectural concepts, not just NestJS features.
                </li>
                <li>
                  <strong>Transferable Knowledge:</strong> The organizational principles, separation of concerns, and design patterns can be applied to other frameworks or languages. The specific implementations (TypeScript decorators, NestJS DI container) differ, but the concepts are universal.
                </li>
                <li>
                  <strong>Why It Matters:</strong> Senior engineers make architectural decisions based on principles, not just framework capabilities. They can evaluate frameworks, design systems, and mentor others based on understanding structure, not just syntax.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

