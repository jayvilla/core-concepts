"use client";

import { useState } from "react";

/**
 * STATE EXAMPLE
 *
 * Characteristics of State:
 * - Managed internally within a component
 * - Mutable - component can update its own state
 * - State changes trigger re-renders
 * - State is isolated to the component (unless lifted up)
 * - Each component instance has its own state
 */

export default function StateExample() {
  // State is managed internally with useState
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Hello!");
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">State Example</h2>

      <div className="space-y-6">
        {/* Counter State */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">Counter State</h3>
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={() => setCount(count - 1)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              -
            </button>
            <span className="text-2xl font-bold text-green-900">{count}</span>
            <button
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              +
            </button>
            <button
              onClick={() => setCount(0)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
          <p className="text-xs text-gray-800">
            State: <code className="bg-gray-100 px-1 rounded">{count}</code> - This
            component controls its own count state
          </p>
        </div>

        {/* Message State */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">Message State</h3>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-2 text-gray-900"
            placeholder="Type a message..."
          />
          <p className="text-sm text-gray-900">
            Current message: <strong>{message}</strong>
          </p>
        </div>

        {/* Boolean State */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">Toggle State</h3>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              isActive
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </button>
          <p className="text-xs text-gray-800 mt-2">
            State: <code className="bg-gray-100 px-1 rounded">{String(isActive)}</code>
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">State Characteristics:</h4>
        <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
          <li>Managed internally within the component</li>
          <li>Mutable - component can update state using setState</li>
          <li>State changes trigger component re-render</li>
          <li>Each component instance has its own independent state</li>
          <li>State is private to the component (unless passed as props)</li>
        </ul>
      </div>
    </div>
  );
}

