"use client";

import { useState, memo } from "react";

/**
 * REACT.MEMO EXAMPLE
 *
 * Demonstrates React.memo:
 * - Memoizes component rendering
 * - Prevents re-render if props haven't changed (shallow comparison)
 * - Only re-renders when props change
 * - Useful for expensive components
 */

// Regular component (always re-renders when parent re-renders)
function RegularChild({ name, count }: { name: string; count: number }) {
  console.log(`🔄 RegularChild "${name}" rendering`);
  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded">
      <p className="text-sm text-gray-900">
        <strong>{name}</strong>: {count}
      </p>
    </div>
  );
}

// Memoized component (only re-renders when props change)
const MemoizedChild = memo(function MemoizedChild({
  name,
  count,
}: {
  name: string;
  count: number;
}) {
  console.log(`✅ MemoizedChild "${name}" rendering`);
  return (
    <div className="p-3 bg-green-50 border border-green-200 rounded">
      <p className="text-sm text-gray-900">
        <strong>{name}</strong>: {count}
      </p>
    </div>
  );
});

// Component with object prop (needs careful handling)
const MemoizedChildWithObject = memo(
  function MemoizedChildWithObject({
    config,
  }: {
    config: { theme: string; fontSize: number };
  }) {
    console.log(`✅ MemoizedChildWithObject rendering`);
    return (
      <div className="p-3 bg-purple-50 border border-purple-200 rounded">
        <p className="text-sm text-gray-900">
          Theme: <strong>{config.theme}</strong>, Size: <strong>{config.fontSize}</strong>
        </p>
      </div>
    );
  },
  // Custom comparison function (optional)
  (prevProps, nextProps) => {
    return (
      prevProps.config.theme === nextProps.config.theme &&
      prevProps.config.fontSize === nextProps.config.fontSize
    );
  }
);

export default function ReactMemoExample() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [otherState, setOtherState] = useState(0);
  const [config, setConfig] = useState({ theme: "light", fontSize: 14 });

  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        React.memo Example
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">What is React.memo?</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              Higher-order component that memoizes rendering
            </li>
            <li>
              Prevents re-render if props haven&apos;t changed (shallow comparison)
            </li>
            <li>
              Only re-renders when props actually change
            </li>
            <li>
              Check console to see when components re-render
            </li>
          </ul>
        </div>

        {/* Controls */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                Count 1: {count1}
              </p>
              <button
                onClick={() => setCount1((prev) => prev + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Increment Count 1
              </button>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                Count 2: {count2}
              </p>
              <button
                onClick={() => setCount2((prev) => prev + 2)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Increment Count 2
              </button>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                Other State: {otherState}
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

        {/* Regular vs Memoized */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-bold text-red-900 mb-3">❌ Regular Component</h3>
            <div className="space-y-2">
              <RegularChild name="Child 1" count={count1} />
              <RegularChild name="Child 2" count={count2} />
            </div>
            <p className="text-xs text-gray-700 mt-3">
              ⚠️ Re-renders whenever parent re-renders (even when props don&apos;t change)
            </p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">✅ Memoized Component</h3>
            <div className="space-y-2">
              <MemoizedChild name="Child 1" count={count1} />
              <MemoizedChild name="Child 2" count={count2} />
            </div>
            <p className="text-xs text-gray-700 mt-3">
              ✅ Only re-renders when its props actually change
            </p>
          </div>
        </div>

        {/* Object Props */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">
            Memoized Component with Object Prop
          </h3>
          <div className="mb-3">
            <MemoizedChildWithObject config={config} />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setConfig({ ...config, theme: config.theme === "light" ? "dark" : "light" })
              }
              className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
            >
              Toggle Theme
            </button>
            <button
              onClick={() => setConfig({ ...config, fontSize: config.fontSize + 1 })}
              className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
            >
              Increase Font Size
            </button>
            <button
              onClick={() => setOtherState((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
            >
              Change Other State
            </button>
          </div>
          <p className="text-xs text-gray-700 mt-3">
            💡 With custom comparison, component only re-renders when config properties change
          </p>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Usage:</h4>
          <pre className="text-xs bg-white p-2 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`// Wrap component with React.memo
const MemoizedComponent = memo(function Component(props) {
  return <div>{props.value}</div>;
});

// Optional: Custom comparison function
const MemoizedComponent = memo(
  function Component(props) {
    return <div>{props.value}</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    // Return false if props are different (re-render)
    return prevProps.value === nextProps.value;
  }
);`}
            </code>
          </pre>
        </div>

        {/* Key Points */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Key Points:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              React.memo does <strong>shallow comparison</strong> of props
            </li>
            <li>
              Works best with primitive props (strings, numbers, booleans)
            </li>
            <li>
              For object/array props, use custom comparison function or ensure stable references
            </li>
            <li>
              Only use for expensive components - memoization has overhead
            </li>
            <li>
              Combine with useCallback/useMemo for function/object props
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

