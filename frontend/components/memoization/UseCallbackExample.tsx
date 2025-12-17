"use client";

import { useState, useCallback, memo } from "react";

/**
 * USECALLBACK EXAMPLE
 *
 * Demonstrates useCallback hook:
 * - Memoizes functions
 * - Returns same function reference if dependencies haven't changed
 * - Prevents unnecessary re-renders of child components
 * - Useful when passing functions as props to memoized components
 */

// Child component that receives a callback
const Button = memo(({ onClick, label, count }: { onClick: () => void; label: string; count: number }) => {
  console.log(`🔄 Rendering ${label} button`);
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
    >
      {label} (Count: {count})
    </button>
  );
});

Button.displayName = "Button";

export default function UseCallbackExample() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // ❌ WITHOUT useCallback: New function created on every render
  // const handleClick1 = () => setCount1(prev => prev + 1);
  // const handleClick2 = () => setCount2(prev => prev + 2);

  // ✅ WITH useCallback: Same function reference if dependencies don't change
  const handleClick1 = useCallback(() => {
    setCount1((prev) => prev + 1);
  }, []); // Empty deps - function never changes

  const handleClick2 = useCallback(() => {
    setCount2((prev) => prev + 2);
  }, []); // Empty deps - function never changes

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        useCallback Hook Example
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">What is useCallback?</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              Memoizes a function (returns same reference)
            </li>
            <li>
              Only creates new function when dependencies change
            </li>
            <li>
              Prevents child components from re-rendering unnecessarily
            </li>
            <li>
              Check console to see when buttons re-render
            </li>
          </ul>
        </div>

        {/* Controls */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                Other State (shouldn&apos;t cause button re-renders): {otherState}
              </p>
              <button
                onClick={() => setOtherState((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Increment Other State
              </button>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">Memoized Buttons:</h3>
          <div className="flex gap-4">
            <Button
              onClick={handleClick1}
              label="Increment by 1"
              count={count1}
            />
            <Button
              onClick={handleClick2}
              label="Increment by 2"
              count={count2}
            />
          </div>
          <p className="text-xs text-gray-700 mt-3">
            💡 Watch console - buttons should NOT re-render when &quot;Other State&quot; changes,
            because useCallback preserves function references!
          </p>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Code Comparison:</h4>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-red-900 mb-1">❌ Without useCallback:</p>
              <pre className="text-xs bg-white p-2 rounded border border-red-300 overflow-x-auto">
                <code className="text-gray-800">
{`// New function created on every render
const handleClick = () => setCount(prev => prev + 1);

// Child component re-renders because function reference changed
<Button onClick={handleClick} />`}
                </code>
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold text-green-900 mb-1">✅ With useCallback:</p>
              <pre className="text-xs bg-white p-2 rounded border border-green-300 overflow-x-auto">
                <code className="text-gray-800">
{`// Same function reference (unless deps change)
const handleClick = useCallback(
  () => setCount(prev => prev + 1),
  [] // Empty deps = function never changes
);

// Child component doesn't re-render unnecessarily
<Button onClick={handleClick} />`}
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
              useCallback is for <strong>functions</strong>
            </li>
            <li>
              Only useful when passing functions to memoized components (React.memo)
            </li>
            <li>
              Without React.memo, useCallback provides no benefit
            </li>
            <li>
              Dependency array determines when function reference changes
            </li>
            <li>
              useCallback has overhead - don&apos;t use it everywhere!
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

