"use client";

import { useState, useMemo, useCallback, memo } from "react";

/**
 * MEMOIZATION COMPARISON
 *
 * Side-by-side comparison of useMemo, useCallback, and React.memo
 * When to use each and how they work together
 */

// Memoized child component
const MemoizedChild = memo(function MemoizedChild({
  value,
  onIncrement,
}: {
  value: number;
  onIncrement: () => void;
}) {
  console.log("🔄 MemoizedChild rendering");
  return (
    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
      <p className="text-sm text-gray-900 mb-2">
        Value: <strong>{value}</strong>
      </p>
      <button
        onClick={onIncrement}
        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
      >
        Increment
      </button>
    </div>
  );
});

export default function MemoizationComparison() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [otherState, setOtherState] = useState(0);

  // useMemo: Memoize computed value
  const expensiveValue = useMemo(() => {
    console.log("💰 useMemo: Computing expensive value");
    return count * multiplier;
  }, [count, multiplier]);

  // useCallback: Memoize function
  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        Memoization Comparison
      </h2>

      <div className="space-y-6">
        {/* Combined Example */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">
            Combined Example: All Three Together
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                Count: {count} (affects expensiveValue)
              </label>
              <button
                onClick={() => setCount((prev) => prev + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Increment Count
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                Multiplier: {multiplier} (affects expensiveValue)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                Other State: {otherState} (shouldn&apos;t trigger recalculations)
              </label>
              <button
                onClick={() => setOtherState((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Increment Other State
              </button>
            </div>

            <div className="p-3 bg-white border border-indigo-200 rounded">
              <p className="text-sm text-gray-900 mb-2">
                Expensive Value (useMemo): <strong>{expensiveValue}</strong>
              </p>
              <p className="text-xs text-gray-700">
                💡 Only recalculates when count or multiplier changes
              </p>
            </div>

            <MemoizedChild value={count} onIncrement={handleIncrement} />
            <p className="text-xs text-gray-700">
              💡 Child only re-renders when count changes (React.memo + useCallback)
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900">Quick Comparison:</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Hook/API</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">What It Memoizes</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">When to Use</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    useMemo
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Computed values</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Expensive calculations that depend on specific values
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    useCallback
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Functions</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Functions passed as props to memoized components
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    React.memo
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Component rendering</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Expensive components that receive stable props
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* When to Use */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">When to Use Each:</h4>
          <div className="space-y-3 text-sm text-gray-900">
            <div>
              <p className="font-semibold">useMemo:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Expensive calculations (loops, filtering large arrays)</li>
                <li>Derived values that depend on specific props/state</li>
                <li>Creating objects/arrays for dependency arrays</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">useCallback:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Functions passed to React.memo components</li>
                <li>Functions in dependency arrays of useEffect/useMemo</li>
                <li>Event handlers passed to expensive child components</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">React.memo:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Expensive components (complex rendering, many DOM elements)</li>
                <li>Components that re-render frequently with same props</li>
                <li>List items that don&apos;t change often</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-red-900">Common Mistakes to Avoid:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Over-memoizing:</strong> Don&apos;t wrap everything - memoization has overhead
            </li>
            <li>
              <strong>useCallback without React.memo:</strong> No benefit if child isn&apos;t memoized
            </li>
            <li>
              <strong>Unstable dependencies:</strong> Creating new objects/arrays in render breaks memoization
            </li>
            <li>
              <strong>Memoizing simple calculations:</strong> Not worth it for basic math operations
            </li>
            <li>
              <strong>Wrong dependency arrays:</strong> Missing dependencies causes stale values
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

