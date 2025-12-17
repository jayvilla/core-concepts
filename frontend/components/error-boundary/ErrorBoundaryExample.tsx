"use client";

import { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

/**
 * ERROR BOUNDARY EXAMPLE
 *
 * Demonstrates Error Boundaries:
 * - How to create and use Error Boundaries
 * - What errors they catch
 * - Fallback UI display
 * - Error recovery
 */

// Component that throws an error
function BuggyComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("💥 I'm a buggy component! This error was caught by Error Boundary.");
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <p className="text-sm text-gray-900">✅ Component working correctly!</p>
    </div>
  );
}

// Component with async error (won't be caught by Error Boundary)
function AsyncErrorComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    // This won't be caught by Error Boundary!
    setTimeout(() => {
      throw new Error("Async error - not caught by Error Boundary");
    }, 100);
  }

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <p className="text-sm text-gray-900">Async error component</p>
    </div>
  );
}

export default function ErrorBoundaryExample() {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [asyncShouldThrow, setAsyncShouldThrow] = useState(false);

  return (
    <div className="border-2 border-red-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-red-900">
        Error Boundary Example
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-bold text-red-900 mb-3">What is an Error Boundary?</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              React component that catches JavaScript errors anywhere in child component tree
            </li>
            <li>
              Displays fallback UI instead of crashing the entire app
            </li>
            <li>
              Must be a <strong>class component</strong> (no hooks equivalent yet)
            </li>
            <li>
              Catches errors during rendering, lifecycle methods, and constructors
            </li>
          </ul>
        </div>

        {/* Error Boundary Example */}
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-bold text-red-900 mb-3">Error Boundary in Action:</h3>
          <div className="mb-3">
            <button
              onClick={() => setShouldThrow(!shouldThrow)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              {shouldThrow ? "Reset Component" : "Trigger Error"}
            </button>
          </div>
          <ErrorBoundary
            fallback={
              <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                <h4 className="font-bold text-yellow-900 mb-2">Custom Fallback UI</h4>
                <p className="text-sm text-gray-900">
                  This is a custom fallback. The error was caught and handled gracefully!
                </p>
                <button
                  onClick={() => setShouldThrow(false)}
                  className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm"
                >
                  Reset
                </button>
              </div>
            }
          >
            <BuggyComponent shouldThrow={shouldThrow} />
          </ErrorBoundary>
        </div>

        {/* Async Error Example */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">What Error Boundaries DON&apos;T Catch:</h3>
          <div className="mb-3">
            <button
              onClick={() => setAsyncShouldThrow(!asyncShouldThrow)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Trigger Async Error
            </button>
          </div>
          <ErrorBoundary>
            <AsyncErrorComponent shouldThrow={asyncShouldThrow} />
          </ErrorBoundary>
          <p className="text-xs text-gray-700 mt-3">
            ⚠️ Async errors (setTimeout, promises, event handlers) are NOT caught by Error Boundaries!
            Check console - error will appear but app will still crash.
          </p>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Error Boundary Implementation:</h4>
          <pre className="text-xs bg-white p-2 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

