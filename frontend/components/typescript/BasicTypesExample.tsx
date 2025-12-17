"use client";

import { useState } from "react";

/**
 * BASIC TYPES EXAMPLE
 *
 * Demonstrates TypeScript basic types:
 * - Primitive types (string, number, boolean)
 * - Arrays and tuples
 * - Objects and interfaces
 * - Union types
 * - Optional and readonly properties
 */

// Basic type annotations
let userName: string = "John";
let userAge: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Tuples (fixed-length arrays with specific types)
let tuple: [string, number] = ["hello", 42];

// Union types
let id: string | number = "123";
let status: "pending" | "approved" | "rejected" = "pending";

// Object types
interface User {
  name: string;
  age: number;
  email?: string; // Optional property
  readonly id: number; // Readonly property
}

export default function BasicTypesExample() {
  const [selectedType, setSelectedType] = useState<
    "primitives" | "arrays" | "unions" | "objects"
  >("primitives");

  const user: User = {
    name: "Alice",
    age: 25,
    email: "alice@example.com",
    id: 1,
  };

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        TypeScript Basic Types
      </h2>

      <div className="space-y-6">
        {/* Type Selector */}
        <div className="flex flex-wrap gap-2">
          {(["primitives", "arrays", "unions", "objects"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-md font-medium capitalize ${
                selectedType === type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Primitives */}
        {selectedType === "primitives" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">Primitive Types:</h3>
            <pre className="text-xs bg-white p-3 rounded border border-blue-300 overflow-x-auto">
              <code className="text-gray-800">
{`// String
let name: string = "John";

// Number
let age: number = 30;

// Boolean
let isActive: boolean = true;

// Type inference (TypeScript infers the type)
let inferred = "Hello"; // Type: string
let count = 42; // Type: number`}
              </code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Example:</strong> name = &quot;{userName}&quot; (type: string)
              </p>
              <p className="text-sm text-gray-900">
                <strong>Example:</strong> age = {userAge} (type: number)
              </p>
              <p className="text-sm text-gray-900">
                <strong>Example:</strong> isActive = {String(isActive)} (type: boolean)
              </p>
            </div>
          </div>
        )}

        {/* Arrays */}
        {selectedType === "arrays" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">Arrays & Tuples:</h3>
            <pre className="text-xs bg-white p-3 rounded border border-blue-300 overflow-x-auto">
              <code className="text-gray-800">
{`// Array of numbers
let numbers: number[] = [1, 2, 3];

// Array of strings (alternative syntax)
let names: Array<string> = ["Alice", "Bob"];

// Tuple (fixed length, specific types)
let tuple: [string, number] = ["hello", 42];

// Readonly array
let readonly: ReadonlyArray<number> = [1, 2, 3];`}
              </code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Numbers array:</strong> [{numbers.join(", ")}]
              </p>
              <p className="text-sm text-gray-900">
                <strong>Names array:</strong> [{names.join(", ")}]
              </p>
              <p className="text-sm text-gray-900">
                <strong>Tuple:</strong> [{tuple.join(", ")}]
              </p>
            </div>
          </div>
        )}

        {/* Union Types */}
        {selectedType === "unions" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">Union Types:</h3>
            <pre className="text-xs bg-white p-3 rounded border border-blue-300 overflow-x-auto">
              <code className="text-gray-800">
{`// Union type (can be string OR number)
let id: string | number = "123";
id = 456; // Also valid

// Literal union type
let status: "pending" | "approved" | "rejected" = "pending";

// Multiple types
let value: string | number | boolean = true;`}
              </code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>ID:</strong> Can be string or number
              </p>
              <p className="text-sm text-gray-900">
                <strong>Status:</strong> Must be one of: pending, approved, rejected
              </p>
            </div>
          </div>
        )}

        {/* Objects */}
        {selectedType === "objects" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">Objects & Interfaces:</h3>
            <pre className="text-xs bg-white p-3 rounded border border-blue-300 overflow-x-auto">
              <code className="text-gray-800">
{`// Interface definition
interface User {
  name: string;
  age: number;
  email?: string;        // Optional property
  readonly id: number;   // Readonly (can't be changed)
}

// Using the interface
const user: User = {
  name: "Alice",
  age: 25,
  email: "alice@example.com",
  id: 1,
};

// user.id = 2; // ❌ Error: Cannot assign to 'id'`}
              </code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>User:</strong> {user.name}, {user.age} years old
              </p>
              <p className="text-sm text-gray-900">
                <strong>Email:</strong> {user.email || "(optional, not provided)"}
              </p>
              <p className="text-sm text-gray-900">
                <strong>ID:</strong> {user.id} (readonly - cannot be changed)
              </p>
            </div>
          </div>
        )}

        {/* Key Points */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Key Points:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              TypeScript provides <strong>type safety</strong> at compile time
            </li>
            <li>
              <strong>Type inference:</strong> TypeScript can infer types (you don&apos;t always need explicit types)
            </li>
            <li>
              <strong>Optional properties:</strong> Use <code className="bg-gray-100 px-1 rounded">?</code> for optional properties
            </li>
            <li>
              <strong>Readonly:</strong> Use <code className="bg-gray-100 px-1 rounded">readonly</code> to prevent reassignment
            </li>
            <li>
              <strong>Union types:</strong> Allow values to be one of several types
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

