"use client";

import { useState } from "react";

/**
 * DTO PATTERN EXAMPLE
 *
 * Demonstrates the DTO (Data Transfer Object) pattern:
 * - What DTOs are and why they're used
 * - DTOs vs Entities vs Models
 * - Benefits of using DTOs
 */

export default function DTOPatternExample() {
  const [selectedConcept, setSelectedConcept] = useState<
    "what" | "why" | "difference"
  >("what");

  const concepts = [
    { key: "what", label: "What is a DTO?" },
    { key: "why", label: "Why Use DTOs?" },
    { key: "difference", label: "DTO vs Entity vs Model" },
  ];

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        DTO Pattern
      </h2>

      <div className="space-y-6">
        {/* Concept Selector */}
        <div className="flex flex-wrap gap-2">
          {concepts.map((concept) => (
            <button
              key={concept.key}
              onClick={() => setSelectedConcept(concept.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedConcept === concept.key
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {concept.label}
            </button>
          ))}
        </div>

        {/* What is a DTO */}
        {selectedConcept === "what" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">What is a DTO?</h3>
            <p className="text-sm text-gray-900 mb-4">
              A <strong>DTO (Data Transfer Object)</strong> is a design pattern used to transfer data
              between layers or across network boundaries. In NestJS, DTOs define the shape and
              validation rules for request/response data.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
              <code>{`// DTO for creating a user
export class CreateUserDto {
  name: string;
  email: string;
  age: number;
  bio?: string; // Optional
}

// DTO for updating a user (all fields optional)
export class UpdateUserDto {
  name?: string;
  email?: string;
  age?: number;
  bio?: string;
}

// Usage in controller
@Post('users')
create(@Body() createUserDto: CreateUserDto) {
  // createUserDto is validated and typed
  return this.service.create(createUserDto);
}`}</code>
            </pre>
            <div className="mt-4 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Characteristics:</strong>
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>Defines the structure of data being transferred</li>
                <li>Can include validation rules</li>
                <li>Separates internal models from external contracts</li>
                <li>Provides type safety at compile time</li>
              </ul>
            </div>
          </div>
        )}

        {/* Why Use DTOs */}
        {selectedConcept === "why" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">Why Use DTOs?</h3>
            <div className="space-y-4">
              <div className="p-3 bg-white border border-blue-200 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">1. Type Safety</h4>
                <p className="text-sm text-gray-900">
                  DTOs provide compile-time type checking. TypeScript ensures you&apos;re using
                  the correct properties and types.
                </p>
              </div>
              <div className="p-3 bg-white border border-blue-200 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">2. Validation</h4>
                <p className="text-sm text-gray-900">
                  DTOs can include validation rules (via class-validator) that automatically
                  validate incoming data before it reaches your business logic.
                </p>
              </div>
              <div className="p-3 bg-white border border-blue-200 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">3. Documentation</h4>
                <p className="text-sm text-gray-900">
                  DTOs serve as self-documenting code. Combined with Swagger decorators, they
                  automatically generate API documentation.
                </p>
              </div>
              <div className="p-3 bg-white border border-blue-200 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">4. Clear Contracts</h4>
                <p className="text-sm text-gray-900">
                  DTOs define explicit contracts between your API and clients. Frontend and
                  backend teams know exactly what data is expected.
                </p>
              </div>
              <div className="p-3 bg-white border border-blue-200 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">5. Security</h4>
                <p className="text-sm text-gray-900">
                  DTOs prevent exposing internal model structure. Only explicitly defined
                  fields are accepted, preventing property pollution attacks.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DTO vs Entity vs Model */}
        {selectedConcept === "difference" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">DTO vs Entity vs Model</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Concept</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Purpose</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">DTO</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-900">Data transfer between layers/network boundaries</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-900">
                      <code className="bg-gray-100 px-1 rounded">CreateUserDto</code>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Entity</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-900">Database representation (ORM mapping)</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-900">
                      <code className="bg-gray-100 px-1 rounded">User</code> (TypeORM entity)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Model</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-900">Domain/business logic representation</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-900">
                      <code className="bg-gray-100 px-1 rounded">User</code> (domain model)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-white border border-blue-200 rounded">
              <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                <code>{`// DTO - for API input/output
export class CreateUserDto {
  name: string;
  email: string;
}

// Entity - for database
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;
  
  @Column()
  email: string;
  
  @CreateDateColumn()
  createdAt: Date;
}

// Conversion: DTO → Entity
const user = this.userRepo.create(createUserDto);
await this.userRepo.save(user);`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Key Points */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Key Points:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>DTOs define <strong>what data</strong> can be transferred across boundaries</li>
            <li>Entities define <strong>how data</strong> is stored in the database</li>
            <li>Models define <strong>business logic</strong> and domain rules</li>
            <li>Keep DTOs separate from entities - don&apos;t expose internal structure</li>
            <li>Use DTOs at API boundaries (controllers, services)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

