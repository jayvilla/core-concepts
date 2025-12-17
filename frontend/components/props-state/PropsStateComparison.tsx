"use client";

import { useState } from "react";

/**
 * PROPS VS STATE COMPARISON
 *
 * Side-by-side comparison showing when to use props vs state
 */

// Child component that receives props
function UserDisplay({ name, age }: { name: string; age: number }) {
  return (
    <div className="p-3 bg-blue-100 border border-blue-300 rounded">
      <p className="text-sm text-gray-900">
        <strong>Name:</strong> {name} | <strong>Age:</strong> {age}
      </p>
      <p className="text-xs text-gray-800 mt-1">
        This component receives props but cannot modify them
      </p>
    </div>
  );
}

// Component with internal state
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-3 bg-green-100 border border-green-300 rounded">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCount(count - 1)}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
        >
          -
        </button>
        <span className="font-bold text-green-900">{count}</span>
        <button
          onClick={() => setCount(count + 1)}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
        >
          +
        </button>
      </div>
      <p className="text-xs text-gray-800 mt-1">
        This component manages its own state internally
      </p>
    </div>
  );
}

export default function PropsStateComparison() {
  const [parentName, setParentName] = useState("John");
  const [parentAge, setParentAge] = useState(30);

  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        Props vs State: Side-by-Side Comparison
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Props Example */}
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3 text-lg">Using PROPS</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  Parent controls name:
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  Parent controls age:
                </label>
                <input
                  type="number"
                  value={parentAge}
                  onChange={(e) => setParentAge(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                />
              </div>
              <div className="pt-2 border-t border-blue-200">
                <p className="text-xs font-semibold text-blue-900 mb-2">
                  Child Component (receives props):
                </p>
                <UserDisplay name={parentName} age={parentAge} />
              </div>
            </div>
          </div>
        </div>

        {/* State Example */}
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3 text-lg">Using STATE</h3>
            <div className="space-y-3">
              <p className="text-sm text-gray-900">
                Each counter instance manages its own state independently:
              </p>
              <div className="space-y-3 pt-2 border-t border-green-200">
                <div>
                  <p className="text-xs font-semibold text-green-900 mb-2">
                    Counter 1 (has its own state):
                  </p>
                  <Counter />
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-900 mb-2">
                    Counter 2 (different state):
                  </p>
                  <Counter />
                </div>
              </div>
              <p className="text-xs text-gray-800 mt-2">
                Notice: Each counter maintains its own independent count!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* When to Use Each */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold mb-3 text-yellow-900">
          When to Use Props vs State:
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-blue-900 mb-2">Use PROPS when:</p>
            <ul className="space-y-1 text-gray-900 list-disc list-inside">
              <li>Data comes from parent component</li>
              <li>Data should be read-only in child</li>
              <li>Multiple components need same data</li>
              <li>You want to make component reusable</li>
              <li>Data flows down the component tree</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-green-900 mb-2">Use STATE when:</p>
            <ul className="space-y-1 text-gray-900 list-disc list-inside">
              <li>Data is specific to this component</li>
              <li>Data changes based on user interaction</li>
              <li>Data doesn't need to be shared</li>
              <li>Component needs to update itself</li>
              <li>Data is derived from user input or events</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

