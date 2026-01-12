"use client";

import { useState } from "react";

/**
 * VALIDATION COMPARISON
 *
 * Shows the difference between validated and unvalidated approaches
 */

export default function ValidationComparison() {
  const [selectedComparison, setSelectedComparison] = useState<
    "with" | "without"
  >("with");

  return (
    <div className="border-2 border-orange-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-orange-900">
        Validation: With vs Without
      </h2>

      <div className="space-y-6">
        {/* Comparison Selector */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedComparison("with")}
            className={`px-4 py-2 rounded-md font-medium ${
              selectedComparison === "with"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ✅ With Validation
          </button>
          <button
            onClick={() => setSelectedComparison("without")}
            className={`px-4 py-2 rounded-md font-medium ${
              selectedComparison === "without"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ❌ Without Validation
          </button>
        </div>

        {/* With Validation */}
        {selectedComparison === "with" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">✅ With DTOs & Validation</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Backend:</h4>
                <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
                  <code>{`// DTO with validation
export class CreateUserDto {
  @ApiProperty({ description: 'User name', example: 'John' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({ description: 'User email', example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User age', example: 25 })
  @IsInt()
  @Min(18)
  @Max(120)
  age: number;
}

// Controller
@Post('users')
create(@Body() dto: CreateUserDto) {
  // dto is validated and typed
  return this.service.create(dto);
}`}</code>
                </pre>
              </div>
              <div className="p-3 bg-white border border-green-200 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                  <li>✅ Type safety at compile time</li>
                  <li>✅ Runtime validation prevents bad data</li>
                  <li>✅ Automatic API documentation (Swagger)</li>
                  <li>✅ Security: prevents property pollution</li>
                  <li>✅ Clear contracts between FE/BE</li>
                  <li>✅ Error messages guide developers</li>
                  <li>✅ IDE autocomplete and IntelliSense</li>
                  <li>✅ Refactoring safety</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Frontend:</h4>
                <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                  <code>{`// Shared type (from Swagger or shared package)
interface CreateUserDto {
  name: string;
  email: string;
  age: number;
}

// Type-safe API call
const createUser = async (data: CreateUserDto) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errors = await response.json();
    // errors.message contains validation errors
    throw new Error(errors.message.join(', '));
  }
  
  return response.json();
};

// TypeScript ensures correct shape
createUser({
  name: "John",
  email: "john@example.com",
  age: 25
}); // ✅ Valid`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Without Validation */}
        {selectedComparison === "without" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-bold text-red-900 mb-3">❌ Without DTOs & Validation</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Backend:</h4>
                <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-red-300 overflow-x-auto">
                  <code>{`// No DTO, just using any
@Post('users')
create(@Body() body: any) {
  // No type safety
  // No validation
  // Can't trust the data
  
  // Manual validation needed everywhere
  if (!body.name || typeof body.name !== 'string') {
    throw new BadRequestException('Invalid name');
  }
  if (!body.email || !isValidEmail(body.email)) {
    throw new BadRequestException('Invalid email');
  }
  // ... repeat for every field
  
  // No protection against extra fields
  // body.isAdmin = true; // ⚠️ Could be set!
  
  return this.service.create(body);
}`}</code>
                </pre>
              </div>
              <div className="p-3 bg-white border border-red-200 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">Problems:</h4>
                <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                  <li>❌ No type safety (using <code className="bg-gray-100 px-1 rounded">any</code>)</li>
                  <li>❌ Manual validation needed everywhere</li>
                  <li>❌ Easy to forget validation checks</li>
                  <li>❌ Security vulnerabilities (property pollution)</li>
                  <li>❌ No API documentation</li>
                  <li>❌ Unclear contracts between FE/BE</li>
                  <li>❌ Runtime errors from type mismatches</li>
                  <li>❌ No IDE support (no autocomplete)</li>
                  <li>❌ Refactoring is error-prone</li>
                  <li>❌ Inconsistent error messages</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Frontend:</h4>
                <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                  <code>{`// No type information
const createUser = async (data: any) => {
  // No way to know what fields are expected
  // No way to know what types are required
  // Have to guess or read documentation (if it exists)
  
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data), // ⚠️ Could send wrong data
  });
  
  return response.json();
};

// Easy to make mistakes
createUser({
  name: 123,        // ⚠️ Wrong type (number instead of string)
  email: "invalid", // ⚠️ Invalid email (might work if backend doesn't validate)
  age: "25"         // ⚠️ String instead of number
}); // ❌ Runtime errors possible`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-blue-900">Key Takeaways:</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-900">
            <div className="p-3 bg-white border border-blue-200 rounded">
              <p className="font-semibold mb-2 text-green-700">✅ With Validation:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Type-safe and secure</li>
                <li>Self-documenting</li>
                <li>Developer-friendly</li>
                <li>Fewer bugs</li>
                <li>Better DX</li>
              </ul>
            </div>
            <div className="p-3 bg-white border border-blue-200 rounded">
              <p className="font-semibold mb-2 text-red-700">❌ Without Validation:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Error-prone</li>
                <li>Security risks</li>
                <li>No documentation</li>
                <li>More bugs</li>
                <li>Poor DX</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-gray-900">
              <strong>Best Practice:</strong> Always use DTOs with validation in NestJS.
              The small amount of setup time is far outweighed by the benefits in type safety,
              security, documentation, and developer experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

