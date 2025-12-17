"use client";

import { useState, useMemo } from "react";

/**
 * USEMEMO EXAMPLE
 *
 * Demonstrates useMemo hook:
 * - Memoizes expensive computations
 * - Only recalculates when dependencies change
 * - Prevents unnecessary recalculations on every render
 */

// Expensive computation function
function expensiveCalculation(n: number): number {
  console.log("🔄 Computing expensive calculation...");
  let sum = 0;
  for (let i = 0; i < n * 1000000; i++) {
    sum += i;
  }
  return sum;
}

export default function UseMemoExample() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [otherState, setOtherState] = useState(0);

  // ❌ WITHOUT useMemo: Recalculates on EVERY render (even when multiplier doesn't change)
  // const expensiveValue = expensiveCalculation(multiplier);

  // ✅ WITH useMemo: Only recalculates when multiplier changes
  const expensiveValue = useMemo(
    () => expensiveCalculation(multiplier),
    [multiplier]
  );

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        useMemo Hook Example
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">What is useMemo?</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              Memoizes the result of an expensive computation
            </li>
            <li>
              Only recalculates when dependencies change
            </li>
            <li>
              Returns cached value if dependencies haven&apos;t changed
            </li>
            <li>
              Check console to see when recalculation happens
            </li>
          </ul>
        </div>

        {/* Controls */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                Multiplier (triggers recalculation): {multiplier}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>1</span>
                <span>5</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                Other State (doesn&apos;t trigger recalculation): {otherState}
              </label>
              <button
                onClick={() => setOtherState((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Increment Other State
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                Count: {count}
              </label>
              <button
                onClick={() => setCount((prev) => prev + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Increment Count
              </button>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-2">Expensive Calculation Result:</h3>
          <p className="text-2xl font-bold text-gray-900 mb-2">
            {expensiveValue.toLocaleString()}
          </p>
          <p className="text-xs text-gray-700">
            💡 Watch the console - recalculation only happens when multiplier changes,
            not when otherState or count changes!
          </p>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Code Comparison:</h4>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-red-900 mb-1">❌ Without useMemo:</p>
              <pre className="text-xs bg-white p-2 rounded border border-red-300 overflow-x-auto">
                <code className="text-gray-800">
{`// Recalculates on EVERY render
const expensiveValue = expensiveCalculation(multiplier);`}
                </code>
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold text-green-900 mb-1">✅ With useMemo:</p>
              <pre className="text-xs bg-white p-2 rounded border border-green-300 overflow-x-auto">
                <code className="text-gray-800">
{`// Only recalculates when multiplier changes
const expensiveValue = useMemo(
  () => expensiveCalculation(multiplier),
  [multiplier]
);`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Key Points:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              useMemo is for <strong>values</strong> (computed results)
            </li>
            <li>
              Only use when computation is truly expensive (not for simple calculations)
            </li>
            <li>
              Dependency array determines when to recalculate
            </li>
            <li>
              useMemo has overhead - don&apos;t overuse it!
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

