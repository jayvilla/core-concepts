"use client";

import { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

/**
 * ERROR BOUNDARY LIMITATIONS
 *
 * Demonstrates what Error Boundaries CAN and CANNOT catch:
 * - What they catch: rendering errors, lifecycle errors
 * - What they don't catch: async errors, event handlers, SSR errors
 */

// Component with event handler error (NOT caught)
function EventHandlerErrorComponent() {
  const handleClick = () => {
    // This error is NOT caught by Error Boundary!
    throw new Error("Error in event handler - not caught!");
  };

  return (
    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
      >
        Click to Trigger Event Handler Error
      </button>
      <p className="text-xs text-gray-700 mt-2">
        ⚠️ This error won&apos;t be caught - it happens in an event handler!
      </p>
    </div>
  );
}

// Component with promise error (NOT caught)
function PromiseErrorComponent() {
  const [data, setData] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // Simulate API call that fails
      await new Promise((_, reject) => {
        setTimeout(() => reject(new Error("API Error - not caught by Error Boundary!")), 500);
      });
    } catch (error) {
      // This error is NOT caught by Error Boundary!
      // Must use try/catch or .catch() for async errors
      console.error("Promise error:", error);
      setData("Error occurred (check console)");
    }
  };

  return (
    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <button
        onClick={fetchData}
        className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
      >
        Trigger Promise Error
      </button>
      {data && <p className="text-sm text-gray-900 mt-2">{data}</p>}
      <p className="text-xs text-gray-700 mt-2">
        ⚠️ Promise errors must be handled with try/catch or .catch()
      </p>
    </div>
  );
}

// Component that throws during render (IS caught)
function RenderErrorComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("Render error - this WILL be caught by Error Boundary!");
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <p className="text-sm text-gray-900">✅ Component rendering correctly</p>
    </div>
  );
}

export default function ErrorBoundaryLimitationsExample() {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div className="border-2 border-orange-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-orange-900">
        Error Boundary Limitations
      </h2>

      <div className="space-y-6">
        {/* What They Catch */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">✅ What Error Boundaries CAN Catch:</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside mb-3">
            <li>Errors during rendering</li>
            <li>Errors in lifecycle methods</li>
            <li>Errors in constructors</li>
          </ul>
          <div className="mb-3">
            <button
              onClick={() => setShouldThrow(!shouldThrow)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              {shouldThrow ? "Reset" : "Trigger Render Error"}
            </button>
          </div>
          <ErrorBoundary>
            <RenderErrorComponent shouldThrow={shouldThrow} />
          </ErrorBoundary>
        </div>

        {/* What They Don't Catch */}
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-bold text-red-900 mb-3">❌ What Error Boundaries CANNOT Catch:</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside mb-4">
            <li>Errors in event handlers</li>
            <li>Errors in async code (setTimeout, promises)</li>
            <li>Errors during server-side rendering</li>
            <li>Errors thrown in the Error Boundary itself</li>
          </ul>
          <div className="space-y-4">
            <ErrorBoundary>
              <EventHandlerErrorComponent />
            </ErrorBoundary>
            <ErrorBoundary>
              <PromiseErrorComponent />
            </ErrorBoundary>
          </div>
        </div>

        {/* How to Handle Non-Catchable Errors */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">How to Handle Non-Catchable Errors:</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-2">Event Handlers:</p>
              <pre className="text-xs bg-white p-2 rounded border border-blue-300 overflow-x-auto">
                <code className="text-gray-800">
{`const handleClick = () => {
  try {
    // risky code
  } catch (error) {
    // handle error
  }
};`}
                </code>
              </pre>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-2">Async Code:</p>
              <pre className="text-xs bg-white p-2 rounded border border-blue-300 overflow-x-auto">
                <code className="text-gray-800">
{`// Use try/catch
try {
  await fetchData();
} catch (error) {
  // handle error
}

// Or .catch()
fetchData().catch(error => {
  // handle error
});`}
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
              Error Boundaries only catch errors in the <strong>render phase</strong>
            </li>
            <li>
              Use <strong>try/catch</strong> for event handlers and async code
            </li>
            <li>
              Error Boundaries are for <strong>recovering from errors</strong>, not preventing them
            </li>
            <li>
              Place Error Boundaries at strategic points in your component tree
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

