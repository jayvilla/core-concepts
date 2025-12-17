"use client";

import { useState } from "react";

/**
 * INTERFACES VS TYPE ALIASES
 *
 * Demonstrates the difference between interfaces and type aliases:
 * - When to use each
 * - Extending/interfaces
 * - Intersection types
 * - Declaration merging
 */

// Interface example
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark: () => void;
}

// Type alias example
type Status = "pending" | "approved" | "rejected";

type Point = {
  x: number;
  y: number;
};

// Intersection type
type Cat = Animal & {
  meow: () => void;
  lives: number;
};

// Interface declaration merging (interfaces can be merged)
interface Window {
  customProperty: string;
}

interface Window {
  anotherProperty: number;
}
// Now Window has both properties

export default function InterfacesVsTypesExample() {
  const [selectedComparison, setSelectedComparison] = useState<
    "basic" | "extending" | "merging"
  >("basic");

  const dog: Dog = {
    name: "Buddy",
    age: 3,
    breed: "Golden Retriever",
    bark: () => console.log("Woof!"),
  };

  const cat: Cat = {
    name: "Whiskers",
    age: 2,
    meow: () => console.log("Meow!"),
    lives: 9,
  };

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        Interfaces vs Type Aliases
      </h2>

      <div className="space-y-6">
        {/* Comparison Selector */}
        <div className="flex flex-wrap gap-2">
          {(["basic", "extending", "merging"] as const).map((comp) => (
            <button
              key={comp}
              onClick={() => setSelectedComparison(comp)}
              className={`px-4 py-2 rounded-md font-medium capitalize ${
                selectedComparison === comp
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {comp}
            </button>
          ))}
        </div>

        {/* Basic Comparison */}
        {selectedComparison === "basic" && (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-bold text-green-900 mb-3">Interface:</h3>
              <pre className="text-xs bg-white p-3 rounded border border-green-300 overflow-x-auto">
                <code className="text-gray-800">
{`// Interface - for object shapes
interface User {
  name: string;
  age: number;
}

// Can be extended
interface Admin extends User {
  permissions: string[];
}

// Can be implemented by classes
class Person implements User {
  name: string;
  age: number;
}`}
                </code>
              </pre>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-3">Type Alias:</h3>
              <pre className="text-xs bg-white p-3 rounded border border-blue-300 overflow-x-auto">
                <code className="text-gray-800">
{`// Type alias - more flexible
type Status = "pending" | "approved";

type User = {
  name: string;
  age: number;
};

// Can use unions, intersections, primitives
type ID = string | number;
type Point = { x: number; y: number };`}
                </code>
              </pre>
            </div>
          </div>
        )}

        {/* Extending */}
        {selectedComparison === "extending" && (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-bold text-green-900 mb-3">Interface Extending:</h3>
              <pre className="text-xs bg-white p-3 rounded border border-green-300 overflow-x-auto">
                <code className="text-gray-800">
{`interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark: () => void;
}

// Dog has: name, age, breed, bark`}
                </code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-green-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Dog:</strong> {dog.name}, {dog.age} years old, {dog.breed}
                </p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-3">Type Intersection:</h3>
              <pre className="text-xs bg-white p-3 rounded border border-blue-300 overflow-x-auto">
                <code className="text-gray-800">
{`type Animal = {
  name: string;
  age: number;
};

type Cat = Animal & {
  meow: () => void;
  lives: number;
};

// Cat has: name, age, meow, lives`}
                </code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Cat:</strong> {cat.name}, {cat.age} years old, {cat.lives} lives
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Declaration Merging */}
        {selectedComparison === "merging" && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3">Declaration Merging:</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">✅ Interfaces:</p>
                <pre className="text-xs bg-white p-2 rounded border border-purple-300 overflow-x-auto">
                  <code className="text-gray-800">
{`// Interfaces can be merged
interface Window {
  customProperty: string;
}

interface Window {
  anotherProperty: number;
}

// Now Window has both properties!`}
                  </code>
                </pre>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">❌ Type Aliases:</p>
                <pre className="text-xs bg-white p-2 rounded border border-purple-300 overflow-x-auto">
                  <code className="text-gray-800">
{`// Types CANNOT be merged
type Window = {
  customProperty: string;
};

type Window = {  // ❌ Error: Duplicate identifier
  anotherProperty: number;
};`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* When to Use */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900">When to Use Each:</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold text-green-900 mb-2">Use Interface when:</h5>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>Defining object shapes</li>
                <li>Need declaration merging</li>
                <li>Want to extend other interfaces</li>
                <li>Classes implementing contracts</li>
                <li>Public API definitions</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-blue-900 mb-2">Use Type when:</h5>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>Union or intersection types</li>
                <li>Primitive type aliases</li>
                <li>Tuple types</li>
                <li>Mapped types</li>
                <li>More complex type operations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

