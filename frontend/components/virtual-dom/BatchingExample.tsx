"use client";

import { useState, useRef, useEffect } from "react";

/**
 * BATCHING EXAMPLE
 *
 * Demonstrates React's batching behavior:
 * - Multiple state updates are batched together
 * - Single re-render for multiple setState calls
 * - Automatic batching in React 18+
 * - Performance benefit of batching
 */

export default function BatchingExample() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`🔄 Component rendered (render #${renderCount.current})`);
  });

  const handleMultipleUpdates = () => {
    console.log("📝 Multiple setState calls...");
    setCount1((prev) => prev + 1);
    setCount2((prev) => prev + 1);
    setCount3((prev) => prev + 1);
    console.log("✅ All setState calls queued");
    // In React 18+, these are automatically batched!
    // Only ONE re-render will happen
  };

  const handleSingleUpdate = () => {
    console.log("📝 Single setState call...");
    setCount1((prev) => prev + 1);
    console.log("✅ setState call queued");
    // This causes one re-render
  };

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        React Batching
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">What is Batching?</h3>
          <p className="text-sm text-gray-900 mb-3">
            React <strong>batches</strong> multiple state updates together. Instead of re-rendering
            after each setState call, React groups them and performs a single re-render.
          </p>
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-xs text-gray-900">
              <strong>React 18+:</strong> Automatic batching works in event handlers, promises,
              timeouts, and native event handlers. Check console to see render count!
            </p>
          </div>
        </div>

        {/* Display */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">Current State:</h3>
          <div className="grid grid-cols-3 gap-4 mb-3">
            <div className="p-3 bg-white border border-indigo-200 rounded text-center">
              <p className="text-sm text-gray-600">Count 1</p>
              <p className="text-2xl font-bold text-gray-900">{count1}</p>
            </div>
            <div className="p-3 bg-white border border-indigo-200 rounded text-center">
              <p className="text-sm text-gray-600">Count 2</p>
              <p className="text-2xl font-bold text-gray-900">{count2}</p>
            </div>
            <div className="p-3 bg-white border border-indigo-200 rounded text-center">
              <p className="text-sm text-gray-600">Count 3</p>
              <p className="text-2xl font-bold text-gray-900">{count3}</p>
            </div>
          </div>
          <div className="p-3 bg-white border border-indigo-200 rounded">
            <p className="text-sm text-gray-900">
              <strong>Total Renders:</strong> {renderCount.current}
            </p>
            <p className="text-xs text-gray-700 mt-1">
              💡 Watch this number - multiple setState calls should only increment by 1!
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">Try These:</h3>
          <div className="space-y-3">
            <div>
              <button
                onClick={handleMultipleUpdates}
                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
              >
                Update All 3 Counts (Should cause 1 render)
              </button>
              <p className="text-xs text-gray-700 mt-1">
                This triggers 3 setState calls, but React batches them into 1 re-render
              </p>
            </div>
            <div>
              <button
                onClick={handleSingleUpdate}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Update Count 1 Only (1 render)
              </button>
              <p className="text-xs text-gray-700 mt-1">
                This triggers 1 setState call, causing 1 re-render
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900">How Batching Works:</h4>
          <div className="space-y-2 text-sm text-gray-900">
            <div className="p-2 bg-white border border-gray-300 rounded">
              <strong>1. Multiple setState calls:</strong>
              <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                <code>{`setCount1(prev => prev + 1);
setCount2(prev => prev + 1);
setCount3(prev => prev + 1);`}</code>
              </pre>
            </div>
            <div className="p-2 bg-white border border-gray-300 rounded">
              <strong>2. React batches updates:</strong> All state updates are queued
            </div>
            <div className="p-2 bg-white border border-gray-300 rounded">
              <strong>3. Single re-render:</strong> React performs one render with all updates
            </div>
            <div className="p-2 bg-white border border-gray-300 rounded">
              <strong>4. Virtual DOM diff:</strong> React compares and updates only changed parts
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-green-900">Benefits of Batching:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Performance:</strong> Fewer re-renders = better performance
            </li>
            <li>
              <strong>Consistency:</strong> All state updates happen in one render cycle
            </li>
            <li>
              <strong>Efficiency:</strong> Virtual DOM diff happens once, not multiple times
            </li>
            <li>
              <strong>Predictability:</strong> Component state is always consistent after render
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

