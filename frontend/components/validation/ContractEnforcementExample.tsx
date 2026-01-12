"use client";

import { useState } from "react";

/**
 * CONTRACT ENFORCEMENT EXAMPLE
 *
 * Demonstrates enforcing contracts at API boundaries:
 * - ValidationPipe configuration
 * - Whitelisting and security
 * - Boundary enforcement
 */

export default function ContractEnforcementExample() {
  const [selectedAspect, setSelectedAspect] = useState<
    "validation" | "security" | "boundary"
  >("validation");

  const aspects = [
    { key: "validation", label: "ValidationPipe" },
    { key: "security", label: "Security" },
    { key: "boundary", label: "Boundary Enforcement" },
  ];

  return (
    <div className="border-2 border-red-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-red-900">
        Enforcing Contracts at the Boundary
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
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {aspect.label}
            </button>
          ))}
        </div>

        {/* ValidationPipe */}
        {selectedAspect === "validation" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-bold text-red-900 mb-3">ValidationPipe Configuration</h3>
            <p className="text-sm text-gray-900 mb-4">
              The <code className="bg-gray-100 px-1 rounded">ValidationPipe</code> is configured globally to validate
              all incoming requests against DTOs. It enforces the contract at the API boundary.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-red-300 overflow-x-auto">
              <code>{`// main.ts
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // Strip properties that don't have decorators
      whitelist: true,
      
      // Throw error if non-whitelisted properties are present
      forbidNonWhitelisted: true,
      
      // Automatically transform payloads to DTO instances
      transform: true,
      
      // Enable implicit type conversion
      transformOptions: {
        enableImplicitConversion: true,
      },
      
      // Stop at first validation error (optional)
      stopAtFirstError: false,
      
      // Disable detailed error messages (optional, for production)
      disableErrorMessages: false,
    }),
  );

  await app.listen(3000);
}`}</code>
            </pre>
            <div className="mt-4 space-y-3">
              <div className="p-3 bg-white border border-red-200 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">Configuration Options:</h4>
                <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                  <li><strong>whitelist: true</strong> - Removes properties not defined in DTO</li>
                  <li><strong>forbidNonWhitelisted: true</strong> - Rejects requests with extra fields</li>
                  <li><strong>transform: true</strong> - Converts plain objects to DTO class instances</li>
                  <li><strong>enableImplicitConversion: true</strong> - Auto-converts types (string → number)</li>
                  <li><strong>stopAtFirstError: false</strong> - Returns all validation errors</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Security */}
        {selectedAspect === "security" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-bold text-red-900 mb-3">Security Benefits</h3>
            <p className="text-sm text-gray-900 mb-4">
              Validation at the boundary provides multiple security benefits by preventing malicious
              or unexpected data from entering your application.
            </p>
            <div className="space-y-4">
              <div className="p-3 bg-white border border-red-200 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">1. Property Pollution Prevention</h4>
                <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                  <code>{`// DTO definition
export class CreateUserDto {
  name: string;
  email: string;
}

// Malicious request (trying to add extra fields)
POST /users
{
  "name": "John",
  "email": "john@example.com",
  "isAdmin": true,  // ⚠️ Attempted privilege escalation
  "role": "admin"   // ⚠️ Trying to set admin role
}

// With whitelist: true
// → Extra fields are stripped
// → Only name and email reach the handler

// With forbidNonWhitelisted: true
// → Request is rejected with 400 Bad Request
// → Error: "property isAdmin should not exist"`}</code>
                </pre>
              </div>
              <div className="p-3 bg-white border border-red-200 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">2. Type Coercion Prevention</h4>
                <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                  <code>{`// DTO definition
export class CreateUserDto {
  @IsInt()
  @Min(18)
  @Max(120)
  age: number;
}

// Malicious request (wrong type)
POST /users
{
  "age": "not a number"  // ⚠️ Type confusion attack
}

// With @IsInt() validation
// → Request rejected with 400 Bad Request
// → Error: "age must be an integer number"

// Without validation, age might be processed as string
// → Could lead to unexpected behavior or vulnerabilities`}</code>
                </pre>
              </div>
              <div className="p-3 bg-white border border-red-200 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">3. Input Validation</h4>
                <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                  <code>{`// DTO with validation rules
export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)/)
  password: string;
}

// Invalid request
POST /users
{
  "email": "not-an-email",      // ⚠️ Invalid email
  "password": "weak"             // ⚠️ Weak password
}

// Validation rejects both:
// → "email must be an email"
// → "password must be longer than or equal to 8 characters"
// → "password must match the regular expression"

// Prevents:
// - SQL injection (if email used in queries)
// - Weak passwords
// - Invalid data format attacks`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Boundary Enforcement */}
        {selectedAspect === "boundary" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-bold text-red-900 mb-3">API Boundary Enforcement</h3>
            <p className="text-sm text-gray-900 mb-4">
              The API boundary is where external data enters your application. Enforcing contracts
              here ensures data integrity throughout your application.
            </p>
            <div className="space-y-4">
              <div className="p-3 bg-white border border-red-200 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">Request Flow:</h4>
                <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                  <code>{`1. Request arrives at controller
   ↓
2. ValidationPipe intercepts request
   ↓
3. Transform payload to DTO instance
   ↓
4. class-validator validates DTO
   ↓
5a. Validation fails → 400 Bad Request
   OR
5b. Validation passes → Continue to handler
   ↓
6. Handler receives validated DTO
   ↓
7. Business logic processes clean data`}</code>
                </pre>
              </div>
              <div className="p-3 bg-white border border-red-200 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">Example: Complete Flow</h4>
                <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                  <code>{`// DTO
export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;
}

// Controller
@Controller('users')
export class UserController {
  @Post()
  create(@Body() dto: CreateUserDto) {
    // At this point:
    // ✅ dto is a CreateUserDto instance
    // ✅ dto.name is a string (min 2 chars)
    // ✅ dto.email is a valid email
    // ✅ No extra properties exist
    // ✅ Types are correct
    
    // Safe to use without additional validation
    return this.service.create(dto);
  }
}

// Request 1: Valid
POST /users
{ "name": "John", "email": "john@example.com" }
→ ✅ 201 Created

// Request 2: Invalid email
POST /users
{ "name": "John", "email": "invalid" }
→ ❌ 400 Bad Request: "email must be an email"

// Request 3: Extra property
POST /users
{ "name": "John", "email": "john@example.com", "hack": true }
→ ❌ 400 Bad Request: "property hack should not exist"`}</code>
                </pre>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Principle:</strong> <em>Never trust client input.</em> Always validate at
                the boundary. Once data passes validation, you can trust it within your application
                (assuming your validation is comprehensive).
              </p>
            </div>
          </div>
        )}

        {/* Security Checklist */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-blue-900">Security Checklist:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>✅ Use <code className="bg-gray-100 px-1 rounded">whitelist: true</code> to strip unknown properties</li>
            <li>✅ Use <code className="bg-gray-100 px-1 rounded">forbidNonWhitelisted: true</code> for strict validation</li>
            <li>✅ Validate all input types (strings, numbers, emails, etc.)</li>
            <li>✅ Use appropriate constraints (min/max length, min/max values)</li>
            <li>✅ Validate nested objects with <code className="bg-gray-100 px-1 rounded">@ValidateNested()</code></li>
            <li>✅ Validate arrays and array elements</li>
            <li>✅ Use custom validators for domain-specific rules</li>
            <li>✅ Never bypass validation, even in development</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

