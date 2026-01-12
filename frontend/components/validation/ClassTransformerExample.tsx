"use client";

import { useState } from "react";

/**
 * CLASS-TRANSFORMER EXAMPLE
 *
 * Demonstrates class-transformer usage:
 * - Type conversion with @Type()
 * - Query parameter transformation
 * - Nested object transformation
 */

export default function ClassTransformerExample() {
  const [selectedExample, setSelectedExample] = useState<
    "basics" | "query" | "nested"
  >("basics");

  const examples = [
    { key: "basics", label: "Basics" },
    { key: "query", label: "Query Parameters" },
    { key: "nested", label: "Nested Objects" },
  ];

  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        class-transformer
      </h2>

      <div className="space-y-6">
        {/* Example Selector */}
        <div className="flex flex-wrap gap-2">
          {examples.map((example) => (
            <button
              key={example.key}
              onClick={() => setSelectedExample(example.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedExample === example.key
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {example.label}
            </button>
          ))}
        </div>

        {/* Basics */}
        {selectedExample === "basics" && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3">What is class-transformer?</h3>
            <p className="text-sm text-gray-900 mb-4">
              <strong>class-transformer</strong> is a library for transforming plain JavaScript objects
              to class instances and vice versa. In NestJS, it&apos;s used to convert incoming request
              data to DTO class instances.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-purple-300 overflow-x-auto">
              <code>{`import { Type, Transform } from 'class-transformer';

export class CreateUserDto {
  name: string;
  email: string;
  
  // Without @Type(), this would be a string from JSON
  // With @Type(() => Number), it's converted to a number
  @Type(() => Number)
  age: number;
  
  // Custom transformation
  @Transform(({ value }) => value.toLowerCase())
  username: string;
}`}</code>
            </pre>
            <div className="mt-4 p-3 bg-white border border-purple-200 rounded">
              <p className="text-sm font-semibold text-gray-900 mb-2">Key Decorators:</p>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li><code className="bg-gray-100 px-1 rounded">@Type(() =&gt; Type)</code> - Converts property to specified type</li>
                <li><code className="bg-gray-100 px-1 rounded">@Transform()</code> - Applies custom transformation function</li>
                <li><code className="bg-gray-100 px-1 rounded">@Expose()</code> - Explicitly include property</li>
                <li><code className="bg-gray-100 px-1 rounded">@Exclude()</code> - Exclude property from transformation</li>
              </ul>
            </div>
          </div>
        )}

        {/* Query Parameters */}
        {selectedExample === "query" && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3">Query Parameter Transformation</h3>
            <p className="text-sm text-gray-900 mb-4">
              Query parameters come as strings from URLs. <code className="bg-gray-100 px-1 rounded">@Type()</code> ensures
              they&apos;re converted to the correct types.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-purple-300 overflow-x-auto">
              <code>{`import { IsOptional, IsInt, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryParamsDto {
  // URL: ?page=1&limit=10&search=john
  // Without @Type(() => Number), page would be string "1"
  // With @Type(() => Number), page is number 1
  
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;
}

// Controller usage
@Get('users')
getUsers(@Query() query: QueryParamsDto) {
  // query.page is a number, not a string!
  console.log(typeof query.page); // "number"
  return this.service.findAll(query);
}`}</code>
            </pre>
            <div className="mt-4 p-3 bg-white border border-purple-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Why it matters:</strong> Query parameters are always strings in URLs.
                Without <code className="bg-gray-100 px-1 rounded">@Type()</code>, validation would fail because
                <code className="bg-gray-100 px-1 rounded">@IsInt()</code> expects a number, not a string.
              </p>
            </div>
          </div>
        )}

        {/* Nested Objects */}
        {selectedExample === "nested" && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3">Nested Object Transformation</h3>
            <p className="text-sm text-gray-900 mb-4">
              For nested objects, use <code className="bg-gray-100 px-1 rounded">@Type()</code> to ensure
              proper transformation of nested DTOs.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-purple-300 overflow-x-auto">
              <code>{`import { ValidateNested, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @Type(() => Number)
  @IsInt()
  zipCode: number;
}

export class CreateUserDto {
  @IsString()
  name: string;

  // Without @Type(() => AddressDto), address would be a plain object
  // With @Type(() => AddressDto), it's transformed to AddressDto instance
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}

// Request body:
// {
//   "name": "John",
//   "address": {
//     "street": "123 Main St",
//     "city": "NYC",
//     "zipCode": "10001"  // string from JSON
//   }
// }
// 
// After transformation:
// {
//   name: "John",
//   address: AddressDto {
//     street: "123 Main St",
//     city: "NYC",
//     zipCode: 10001  // converted to number!
//   }
// }`}</code>
            </pre>
            <div className="mt-4 p-3 bg-white border border-purple-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Points:</strong>
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>Use <code className="bg-gray-100 px-1 rounded">@ValidateNested()</code> to validate nested objects</li>
                <li>Use <code className="bg-gray-100 px-1 rounded">@Type(() =&gt; DtoClass)</code> to transform nested objects</li>
                <li>Both decorators are needed for nested validation to work</li>
                <li>Works recursively for deeply nested structures</li>
              </ul>
            </div>
          </div>
        )}

        {/* ValidationPipe Integration */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-blue-900">ValidationPipe Integration:</h4>
          <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
            <code>{`// main.ts
app.useGlobalPipes(
  new ValidationPipe({
    transform: true, // Enables class-transformer
    transformOptions: {
      enableImplicitConversion: true, // Auto-convert types
    },
  }),
);`}</code>
          </pre>
          <p className="text-sm text-gray-900 mt-3">
            With <code className="bg-gray-100 px-1 rounded">transform: true</code>, NestJS automatically
            transforms incoming payloads to DTO class instances using class-transformer.
          </p>
        </div>
      </div>
    </div>
  );
}

