"use client";

import { useState } from "react";

/**
 * GENERICS EXAMPLE
 *
 * Demonstrates TypeScript generics:
 * - Generic functions
 * - Generic interfaces/types
 * - Generic constraints
 * - Real-world examples
 */

// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Generic interface
interface Box<T> {
  value: T;
  getValue: () => T;
}

// Generic with constraints
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): T {
  console.log(`Length: ${item.length}`);
  return item;
}

// Generic React component props
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

export default function GenericsExample() {
  const [selectedExample, setSelectedExample] = useState<
    "basic" | "constraints" | "react"
  >("basic");

  // Examples
  const stringResult = identity<string>("hello");
  const numberResult = identity<number>(42);

  const stringBox: Box<string> = {
    value: "TypeScript",
    getValue: () => "TypeScript",
  };

  const numberBox: Box<number> = {
    value: 100,
    getValue: () => 100,
  };

  const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
  ];

  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        TypeScript Generics
      </h2>

      <div className="space-y-6">
        {/* Example Selector */}
        <div className="flex flex-wrap gap-2">
          {(["basic", "constraints", "react"] as const).map((ex) => (
            <button
              key={ex}
              onClick={() => setSelectedExample(ex)}
              className={`px-4 py-2 rounded-md font-medium capitalize ${
                selectedExample === ex
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Basic Generics */}
        {selectedExample === "basic" && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3">Basic Generics:</h3>
            <pre className="text-xs bg-white p-3 rounded border border-purple-300 overflow-x-auto">
              <code className="text-gray-800">
{`// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Usage
const str = identity<string>("hello");  // Type: string
const num = identity<number>(42);       // Type: number

// Type inference (can omit type parameter)
const inferred = identity("hello");     // TypeScript infers: string`}
              </code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>String result:</strong> {stringResult} (type: string)
              </p>
              <p className="text-sm text-gray-900">
                <strong>Number result:</strong> {numberResult} (type: number)
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-purple-900 mb-2">Generic Interface:</h4>
              <pre className="text-xs bg-white p-3 rounded border border-purple-300 overflow-x-auto">
                <code className="text-gray-800">
{`interface Box<T> {
  value: T;
  getValue: () => T;
}

const stringBox: Box<string> = {
  value: "TypeScript",
  getValue: () => "TypeScript"
};

const numberBox: Box<number> = {
  value: 100,
  getValue: () => 100
};`}
                </code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>String Box:</strong> {stringBox.value}
                </p>
                <p className="text-sm text-gray-900">
                  <strong>Number Box:</strong> {numberBox.value}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Constraints */}
        {selectedExample === "constraints" && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3">Generic Constraints:</h3>
            <pre className="text-xs bg-white p-3 rounded border border-purple-300 overflow-x-auto">
              <code className="text-gray-800">
{`// Constraint: T must have length property
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): T {
  console.log(\`Length: \${item.length}\`);
  return item;
}

// Works with strings, arrays, etc.
logLength("hello");        // ✅ Has length
logLength([1, 2, 3]);      // ✅ Has length
logLength(42);             // ❌ Error: number doesn't have length`}
              </code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Why constraints?</strong> Ensure generic type has specific properties
              </p>
              <p className="text-sm text-gray-900">
                <strong>Example:</strong> <code className="bg-gray-100 px-1 rounded">T extends HasLength</code> ensures T has a length property
              </p>
            </div>
          </div>
        )}

        {/* React with Generics */}
        {selectedExample === "react" && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3">Generics in React:</h3>
            <pre className="text-xs bg-white p-3 rounded border border-purple-300 overflow-x-auto">
              <code className="text-gray-800">
{`// Generic component props
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
<List
  items={users}
  renderItem={(user) => <div>{user.name}</div>}
/>`}
              </code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
              <p className="text-sm text-gray-900 mb-2">
                <strong>Users List:</strong>
              </p>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside ml-4">
                {users.map((user) => (
                  <li key={user.id}>
                    {user.name} (age: {user.age})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Key Points */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Key Points:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              Generics allow you to write <strong>reusable, type-safe code</strong>
            </li>
            <li>
              <code className="bg-gray-100 px-1 rounded">&lt;T&gt;</code> is a type parameter (can be any name)
            </li>
            <li>
              <strong>Constraints</strong> (<code className="bg-gray-100 px-1 rounded">extends</code>) limit what types can be used
            </li>
            <li>
              TypeScript can <strong>infer</strong> generic types from usage
            </li>
            <li>
              Generics are essential for creating <strong>reusable React components</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

