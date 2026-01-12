"use client";

import { useState } from "react";

/**
 * STRONG TYPING + SWAGGER EXAMPLE
 *
 * Demonstrates how DTOs combine TypeScript types with Swagger documentation:
 * - @ApiProperty() decorators
 * - Automatic API documentation generation
 * - Shared types between FE/BE
 */

export default function StrongTypingSwaggerExample() {
  const [selectedAspect, setSelectedAspect] = useState<
    "swagger" | "types" | "integration"
  >("swagger");

  const aspects = [
    { key: "swagger", label: "Swagger Decorators" },
    { key: "types", label: "Type Safety" },
    { key: "integration", label: "FE/BE Integration" },
  ];

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        Strong Typing + Swagger
      </h2>

      <div className="space-y-6">
        {/* Aspect Selector */}
        <div className="flex flex-wrap gap-2">
          {aspects.map((aspect) => (
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

        {/* Swagger Decorators */}
        {selectedAspect === "swagger" && (
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h3 className="font-bold text-indigo-900 mb-3">Swagger API Documentation</h3>
            <p className="text-sm text-gray-900 mb-4">
              <code className="bg-gray-100 px-1 rounded">@ApiProperty()</code> and <code className="bg-gray-100 px-1 rounded">@ApiPropertyOptional()</code> decorators
              from <code className="bg-gray-100 px-1 rounded">@nestjs/swagger</code> add metadata for automatic API documentation generation.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-indigo-300 overflow-x-auto">
              <code>{`import { IsString, IsEmail, IsInt, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'User email address (must be unique)',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User age',
    example: 25,
    minimum: 18,
    maximum: 120,
  })
  @IsInt()
  @Min(18)
  @Max(120)
  age: number;

  @ApiPropertyOptional({
    description: 'User biography or description',
    example: 'Software developer passionate about clean code',
    minLength: 5,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  bio?: string;
}`}</code>
            </pre>
            <div className="mt-4 p-3 bg-white border border-indigo-200 rounded">
              <p className="text-sm font-semibold text-gray-900 mb-2">Benefits:</p>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>Automatic Swagger UI generation at <code className="bg-gray-100 px-1 rounded">/api</code></li>
                <li>Interactive API documentation with &quot;Try it out&quot; feature</li>
                <li>Example values for each field</li>
                <li>Type information and constraints displayed</li>
                <li>Request/response schemas automatically documented</li>
              </ul>
            </div>
          </div>
        )}

        {/* Type Safety */}
        {selectedAspect === "types" && (
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h3 className="font-bold text-indigo-900 mb-3">TypeScript Type Safety</h3>
            <p className="text-sm text-gray-900 mb-4">
              DTOs provide compile-time type safety. TypeScript ensures you&apos;re using the correct
              properties and types throughout your application.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-indigo-300 overflow-x-auto">
              <code>{`// DTO defines the contract
export class CreateUserDto {
  name: string;
  email: string;
  age: number;
  bio?: string;
}

// Service method is type-safe
class UserService {
  create(dto: CreateUserDto) {
    // TypeScript knows the shape of dto
    console.log(dto.name);     // ✅ OK
    console.log(dto.email);    // ✅ OK
    console.log(dto.invalid);  // ❌ TypeScript error!
    
    // TypeScript ensures correct types
    const age = dto.age + 1;   // ✅ OK (number + number)
    const fullName = dto.name.toUpperCase(); // ✅ OK (string method)
    
    return {
      id: 1,
      ...dto,  // TypeScript ensures all fields match
    };
  }
}

// Controller is type-safe
@Controller('users')
export class UserController {
  @Post()
  create(@Body() dto: CreateUserDto) {
    // dto is fully typed here
    return this.service.create(dto);
  }
}`}</code>
            </pre>
            <div className="mt-4 p-3 bg-white border border-indigo-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Type Safety Benefits:</strong>
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>Compile-time error checking (catch bugs before runtime)</li>
                <li>IDE autocomplete and IntelliSense</li>
                <li>Refactoring safety (TypeScript finds all usages)</li>
                <li>Self-documenting code (types serve as documentation)</li>
                <li>Fewer runtime errors from type mismatches</li>
              </ul>
            </div>
          </div>
        )}

        {/* FE/BE Integration */}
        {selectedAspect === "integration" && (
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h3 className="font-bold text-indigo-900 mb-3">Frontend/Backend Integration</h3>
            <p className="text-sm text-gray-900 mb-4">
              DTOs serve as a shared contract between frontend and backend. Both sides can use
              the same types or generate types from the OpenAPI spec.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Option 1: Shared Types (Monorepo)</h4>
                <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                  <code>{`// shared/types/user.dto.ts
export interface CreateUserDto {
  name: string;
  email: string;
  age: number;
  bio?: string;
}

// frontend/components/UserForm.tsx
import { CreateUserDto } from '@shared/types/user.dto';

const createUser = async (data: CreateUserDto) => {
  // TypeScript ensures correct shape
  await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data), // Type-safe!
  });
};

// backend/src/dto/create-user.dto.ts
// Same interface used in NestJS (or convert from class)`}</code>
                </pre>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Option 2: Generate from OpenAPI</h4>
                <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                  <code>{`# Generate TypeScript types from Swagger/OpenAPI
npx openapi-typescript http://localhost:8000/api-json -o src/types/api.ts

# Generated types automatically match backend DTOs
import { components } from './api';

type CreateUserDto = components['schemas']['CreateUserDto'];

const createUser = async (data: CreateUserDto) => {
  await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};`}</code>
                </pre>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Option 3: Manual Type Sync</h4>
                <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                  <code>{`// Frontend manually mirrors backend DTO
// Keep in sync by reviewing Swagger docs at /api

export interface CreateUserDto {
  name: string;
  email: string;
  age: number;
  bio?: string;
}

// When backend changes, update frontend types
// Swagger docs show exactly what's expected`}</code>
                </pre>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white border border-indigo-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Best Practice:</strong> Use shared types in a monorepo, or generate types
                from OpenAPI spec. This ensures frontend and backend stay in sync. Swagger docs
                become the single source of truth for API contracts.
              </p>
            </div>
          </div>
        )}

        {/* Swagger UI Example */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Swagger UI Benefits:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>Interactive API testing directly from documentation</li>
            <li>Automatic request/response schema display</li>
            <li>Example values for easy testing</li>
            <li>Clear validation rules and constraints</li>
            <li>No need to write separate API documentation</li>
            <li>Frontend developers can see exact API contracts</li>
            <li>OpenAPI spec can be exported for code generation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

