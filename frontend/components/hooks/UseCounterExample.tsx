"use client";

import { useState } from "react";

/**
 * SIMPLE CUSTOM HOOK EXAMPLE
 *
 * Demonstrates creating a basic custom hook:
 * - Encapsulates stateful logic
 * - Can be reused across components
 * - Follows naming convention: use* (useCounter, useTimer, etc.)
 */

// Custom Hook - encapsulates counter logic
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Component using the custom hook
function CounterDisplay({ label }: { label: string }) {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="font-bold text-blue-900 mb-2">{label}</h3>
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={decrement}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>
        <span className="text-2xl font-bold text-gray-900">{count}</span>
        <button
          onClick={increment}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
        <button
          onClick={reset}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
      <p className="text-xs text-gray-700">
        This component uses the useCounter hook
      </p>
    </div>
  );
}

export default function UseCounterExample() {
  // Each component instance gets its own independent state
  const counter1 = useCounter(10);
  const counter2 = useCounter(5);

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        Simple Custom Hook: useCounter
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">What is a Custom Hook?</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              A JavaScript function that starts with &quot;use&quot; (naming convention)
            </li>
            <li>Can call other hooks (useState, useEffect, etc.)</li>
            <li>
              Encapsulates reusable stateful logic
            </li>
            <li>
              Allows sharing logic between components without duplicating code
            </li>
          </ul>
        </div>

        {/* Using the hook in this component */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">
            Using useCounter in Parent Component
          </h3>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-lg font-bold text-gray-900">
              Counter 1: {counter1.count}
            </span>
            <button
              onClick={counter1.increment}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Increment
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-gray-900">
              Counter 2: {counter2.count}
            </span>
            <button
              onClick={counter2.increment}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Increment
            </button>
          </div>
          <p className="text-xs text-gray-700 mt-2">
            Notice: Each hook call has independent state
          </p>
        </div>

        {/* Using the hook in child components */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">
            Using useCounter in Child Components
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <CounterDisplay label="Counter A" />
            <CounterDisplay label="Counter B" />
          </div>
          <p className="text-xs text-gray-700 mt-2">
            Each component instance has its own independent counter state
          </p>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Hook Implementation:</h4>
          <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

