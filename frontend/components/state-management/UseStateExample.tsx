"use client";

import { useState } from "react";

/**
 * USESTATE EXAMPLE
 *
 * Demonstrates useState hook:
 * - Basic usage with primitive values
 * - Functional updates
 * - Object state
 * - Array state
 * - Multiple state variables
 */

export default function UseStateExample() {
  // 1. Primitive state (number, string, boolean)
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);

  // 2. Object state
  const [user, setUser] = useState({ name: "", email: "", age: 0 });

  // 3. Array state
  const [items, setItems] = useState<string[]>([]);

  // 4. Functional update (when new state depends on previous state)
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const updateUserField = (field: string, value: string | number) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const addItem = () => {
    const newItem = `Item ${items.length + 1}`;
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const removeItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        useState Hook Examples
      </h2>

      <div className="space-y-6">
        {/* Primitive State */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">
            1. Primitive State (Number, String, Boolean)
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg font-bold text-gray-900">Count: {count}</span>
                <button
                  onClick={incrementCount}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Increment
                </button>
                <button
                  onClick={() => setCount(0)}
                  className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                >
                  Reset
                </button>
              </div>
              <p className="text-xs text-gray-800">
                Using functional update: <code className="bg-gray-100 px-1 rounded">setCount(prev =&gt; prev + 1)</code>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="Enter your name"
              />
              {name && (
                <p className="text-sm text-gray-900 mt-1">Hello, {name}!</p>
              )}
            </div>

            <div>
              <button
                onClick={() => setIsActive(!isActive)}
                className={`px-4 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {isActive ? "Active" : "Inactive"}
              </button>
            </div>
          </div>
        </div>

        {/* Object State */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">2. Object State</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                Name:
              </label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => updateUserField("name", e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                Email:
              </label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => updateUserField("email", e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                Age:
              </label>
              <input
                type="number"
                value={user.age || ""}
                onChange={(e) => updateUserField("age", Number(e.target.value))}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <div className="p-3 bg-white rounded border border-blue-200">
              <p className="text-xs font-semibold text-gray-900 mb-1">Current User:</p>
              <pre className="text-xs text-gray-800 overflow-x-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
            <p className="text-xs text-gray-800">
              Key: Always spread previous state when updating objects:{" "}
              <code className="bg-gray-100 px-1 rounded">
                setUser(prev =&gt; ({"{"}...prev, field: value{"}"}))
              </code>
            </p>
          </div>
        </div>

        {/* Array State */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">3. Array State</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={addItem}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Item
              </button>
            </div>
            <div className="space-y-2">
              {items.length === 0 ? (
                <p className="text-sm text-gray-700">No items yet. Click &quot;Add Item&quot; to add one.</p>
              ) : (
                items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-white border border-blue-200 rounded"
                  >
                    <span className="text-sm text-gray-900">{item}</span>
                    <button
                      onClick={() => removeItem(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
            <p className="text-xs text-gray-800">
              Key: Always create new arrays:{" "}
              <code className="bg-gray-100 px-1 rounded">
                setItems([...prevItems, newItem])
              </code>{" "}
              or{" "}
              <code className="bg-gray-100 px-1 rounded">
                setItems(prevItems =&gt; prevItems.filter(...))
              </code>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">useState Key Points:</h4>
        <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
          <li>Returns array with [state, setState]</li>
          <li>Initial value only used on first render</li>
          <li>Always use functional updates when new state depends on previous state</li>
          <li>For objects/arrays, always create new references (don&apos;t mutate)</li>
          <li>Can call useState multiple times for separate state variables</li>
        </ul>
      </div>
    </div>
  );
}

