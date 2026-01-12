"use client";

import { useState } from "react";

/**
 * NESTJS STRUCTURE COMPARISON
 *
 * Demonstrates the interview angle: Structure vs Frameworks
 */

export default function NestJSStructureComparison() {
  const [selectedAspect, setSelectedAspect] = useState<
    "concept" | "patterns" | "vs-frameworks" | "interview"
  >("concept");

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        Structure vs Frameworks (Interview Angle)
      </h2>

      <div className="space-y-6">
        {/* Aspect Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "concept", label: "Core Concept" },
              { key: "patterns", label: "Architectural Patterns" },
              { key: "vs-frameworks", label: "Structure vs Framework" },
              { key: "interview", label: "Interview Questions" },
            ] as const
          ).map((aspect) => (
            <button
              key={aspect.key}
              onClick={() => setSelectedAspect(aspect.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedAspect === aspect.key
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {aspect.label}
            </button>
          ))}
        </div>

        {/* Core Concept */}
        {selectedAspect === "concept" && (
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h3 className="font-bold text-indigo-900 mb-3">Understanding Structure vs Frameworks:</h3>
              <p className="text-sm text-gray-700 mb-3">
                The key insight is that NestJS provides <strong>architectural structure</strong>, not just framework features. Understanding this distinction is crucial for senior engineers.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white border border-indigo-200 rounded">
                  <h4 className="font-semibold text-gray-900 mb-2">🏗️ Structure (What NestJS Provides):</h4>
                  <ul className="text-sm text-gray-900 list-disc list-inside space-y-1">
                    <li><strong>Architectural patterns:</strong> Modules, Dependency Injection, Separation of Concerns</li>
                    <li><strong>Organizational principles:</strong> How to organize code, where things belong</li>
                    <li><strong>Conventions:</strong> Naming, file structure, responsibilities</li>
                    <li><strong>Design patterns:</strong> Provider pattern, Controller-Service pattern, Repository pattern</li>
                    <li><strong>Abstractions:</strong> DI Container, Module system, Lifecycle hooks</li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-indigo-200 rounded">
                  <h4 className="font-semibold text-gray-900 mb-2">⚙️ Framework Features (Tools NestJS Provides):</h4>
                  <ul className="text-sm text-gray-900 list-disc list-inside space-y-1">
                    <li><strong>HTTP handling:</strong> Controllers, route decorators, request/response</li>
                    <li><strong>Middleware system:</strong> Guards, Interceptors, Pipes, Filters</li>
                    <li><strong>Integration:</strong> TypeORM, Prisma, Swagger, WebSockets</li>
                    <li><strong>Testing:</strong> Testing utilities, mocking framework</li>
                    <li><strong>CLI:</strong> Code generation, project scaffolding</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <h4 className="font-semibold text-yellow-900 mb-2">
                  💡 Key Insight:
                </h4>
                <p className="text-sm text-gray-900">
                  NestJS enforces <strong>structure</strong> through its module system, DI container, and architectural patterns. 
                  This structure is valuable even if you remove NestJS-specific features. The structure promotes:
                </p>
                <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                  <li>Separation of concerns</li>
                  <li>Testability</li>
                  <li>Maintainability</li>
                  <li>Scalability</li>
                  <li>Code organization</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Architectural Patterns */}
        {selectedAspect === "patterns" && (
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h3 className="font-bold text-indigo-900 mb-3">Architectural Patterns in NestJS:</h3>
              <p className="text-sm text-gray-700 mb-3">
                NestJS implements several architectural patterns. Understanding these patterns helps you see the structure beyond the framework.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-white border border-indigo-200 rounded">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Module Pattern:</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Encapsulates related functionality, promotes modularity and code organization.
                  </p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                    <code>{`@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}`}</code>
                  </pre>
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Structure value:</strong> Clear boundaries, explicit dependencies, testable units
                  </p>
                </div>

                <div className="p-4 bg-white border border-indigo-200 rounded">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Dependency Injection Pattern:</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Inversion of Control - dependencies provided, not created.
                  </p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                    <code>{`constructor(
  private readonly usersService: UsersService,
  private readonly logger: LoggerService,
) {}`}</code>
                  </pre>
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Structure value:</strong> Loose coupling, testability, flexibility
                  </p>
                </div>

                <div className="p-4 bg-white border border-indigo-200 rounded">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Controller-Service Pattern:</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Separation of HTTP concerns (Controller) from business logic (Service).
                  </p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                    <code>{`@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Get()
  findAll() {
    return this.usersService.findAll(); // Delegate to service
  }
}`}</code>
                  </pre>
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Structure value:</strong> Single Responsibility, testability, reusability
                  </p>
                </div>

                <div className="p-4 bg-white border border-indigo-200 rounded">
                  <h4 className="font-semibold text-gray-900 mb-2">4. Repository Pattern (when using TypeORM):</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Abstraction layer between business logic and data access.
                  </p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                    <code>{`@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
}`}</code>
                  </pre>
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Structure value:</strong> Data access abstraction, testability, flexibility
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Structure vs Framework */}
        {selectedAspect === "vs-frameworks" && (
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h3 className="font-bold text-indigo-900 mb-3">Structure vs Framework:</h3>
              <p className="text-sm text-gray-700 mb-3">
                The distinction between structure and framework features helps you understand what's transferable and what's NestJS-specific.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Aspect</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Structure (Transferable)</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Framework (NestJS-Specific)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Organization</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Module boundaries, separation of concerns</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">@Module decorator, module registration</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Dependencies</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">DI pattern, constructor injection</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">NestJS DI container, @Injectable()</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Layers</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Controller-Service separation</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">@Controller(), @Get(), route decorators</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Lifecycle</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Init/destroy hooks concept</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">OnModuleInit, OnModuleDestroy interfaces</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Testing</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Mocking dependencies, unit testing</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">TestingModule, NestJS test utilities</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Validation</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">DTO pattern, validation logic</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">class-validator, ValidationPipe</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Transferable Knowledge:</h4>
                <p className="text-sm text-gray-900">
                  The <strong>structure</strong> (modules, DI, separation of concerns) can be applied to other frameworks or languages. 
                  The <strong>framework features</strong> (decorators, NestJS DI container) are NestJS-specific but implement common patterns.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Interview Questions */}
        {selectedAspect === "interview" && (
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h3 className="font-bold text-indigo-900 mb-3">Interview Questions & Answers:</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-white border border-indigo-200 rounded">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Q: "What's the difference between structure and framework features in NestJS?"
                  </h4>
                  <p className="text-sm text-gray-900 mb-2">
                    <strong>A:</strong> Structure refers to architectural patterns and organizational principles (modules, DI, separation of concerns) that are transferable concepts. Framework features are NestJS-specific implementations (decorators, DI container, route handlers) that provide tooling to implement the structure.
                  </p>
                </div>

                <div className="p-4 bg-white border border-indigo-200 rounded">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Q: "If you had to rebuild NestJS concepts in another language, what would you keep?"
                  </h4>
                  <p className="text-sm text-gray-900 mb-2">
                    <strong>A:</strong> I'd keep the structural concepts: modular organization, dependency injection pattern, controller-service separation, lifecycle hooks, and clear boundaries between layers. The specific implementations (TypeScript decorators, NestJS DI container) would differ, but the architectural patterns are language-agnostic.
                  </p>
                </div>

                <div className="p-4 bg-white border border-indigo-200 rounded">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Q: "How does NestJS promote good architecture?"
                  </h4>
                  <p className="text-sm text-gray-900 mb-2">
                    <strong>A:</strong> NestJS enforces structure through:
                  </p>
                  <ul className="text-sm text-gray-900 list-disc list-inside ml-4 space-y-1">
                    <li>Module system forces organization and boundaries</li>
                    <li>DI container promotes loose coupling and testability</li>
                    <li>Controller-Service pattern enforces separation of concerns</li>
                    <li>Decorators make dependencies explicit</li>
                    <li>Conventions guide where code belongs</li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-indigo-200 rounded">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Q: "What architectural patterns does NestJS implement?"
                  </h4>
                  <p className="text-sm text-gray-900 mb-2">
                    <strong>A:</strong> NestJS implements several patterns:
                  </p>
                  <ul className="text-sm text-gray-900 list-disc list-inside ml-4 space-y-1">
                    <li><strong>Module Pattern:</strong> Encapsulation and organization</li>
                    <li><strong>Dependency Injection:</strong> Inversion of Control</li>
                    <li><strong>Controller-Service Pattern:</strong> Separation of HTTP and business logic</li>
                    <li><strong>Repository Pattern:</strong> (with TypeORM) Data access abstraction</li>
                    <li><strong>Provider Pattern:</strong> Service registration and lifecycle</li>
                    <li><strong>Decorator Pattern:</strong> Metadata-driven configuration</li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-indigo-200 rounded">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Q: "Why is understanding structure vs framework important for senior engineers?"
                  </h4>
                  <p className="text-sm text-gray-900 mb-2">
                    <strong>A:</strong> Senior engineers need to:
                  </p>
                  <ul className="text-sm text-gray-900 list-disc list-inside ml-4 space-y-1">
                    <li>Understand underlying principles, not just framework APIs</li>
                    <li>Apply patterns across different technologies</li>
                    <li>Make architectural decisions based on principles</li>
                    <li>Evaluate frameworks based on structure they provide</li>
                    <li>Mentor junior engineers on concepts, not just syntax</li>
                    <li>Design systems that outlive specific frameworks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

