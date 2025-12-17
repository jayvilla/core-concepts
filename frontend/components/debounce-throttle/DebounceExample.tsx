"use client";

import { useState, useRef, useEffect } from "react";

/**
 * DEBOUNCE EXAMPLE
 *
 * Demonstrates debounce:
 * - Delays function execution until after a period of inactivity
 * - Resets timer on each call
 * - Only executes after user stops calling the function
 * - Common use: search inputs, resize events
 */

// Custom debounce hook
function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return ((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }) as T;
}

export default function DebounceExample() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [callCount, setCallCount] = useState(0);
  const [debouncedCallCount, setDebouncedCallCount] = useState(0);

  // Debounced version of search
  const debouncedSearch = useDebounce((value: string) => {
    setDebouncedSearchTerm(value);
    setDebouncedCallCount((prev) => prev + 1);
    console.log("🔍 Debounced search executed:", value);
  }, 500);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCallCount((prev) => prev + 1);
    debouncedSearch(value);
  };

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        Debounce Example
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">What is Debounce?</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              Delays function execution until after a specified period of <strong>inactivity</strong>
            </li>
            <li>
              Resets the timer every time the function is called
            </li>
            <li>
              Only executes <strong>once</strong> after user stops calling it
            </li>
            <li>
              Perfect for: search inputs, API calls, resize events
            </li>
          </ul>
        </div>

        {/* Interactive Example */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">Try It:</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                Search (type quickly):
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="Type to search..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-white border border-blue-200 rounded">
                <p className="text-xs font-semibold text-gray-900 mb-1">Immediate Updates:</p>
                <p className="text-sm text-gray-900">
                  Value: <strong>{searchTerm || "(empty)"}</strong>
                </p>
                <p className="text-xs text-gray-700 mt-1">
                  Calls: <strong>{callCount}</strong> (updates on every keystroke)
                </p>
              </div>

              <div className="p-3 bg-white border border-green-200 rounded">
                <p className="text-xs font-semibold text-gray-900 mb-1">Debounced (500ms):</p>
                <p className="text-sm text-gray-900">
                  Value: <strong>{debouncedSearchTerm || "(empty)"}</strong>
                </p>
                <p className="text-xs text-gray-700 mt-1">
                  Calls: <strong>{debouncedCallCount}</strong> (only after you stop typing)
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-700">
              💡 Notice: Debounced value only updates 500ms after you stop typing!
            </p>
          </div>
        </div>

        {/* Visual Timeline */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900">How Debounce Works:</h4>
          <div className="space-y-2 text-sm text-gray-900">
            <div className="p-3 bg-white border border-gray-300 rounded">
              <p className="font-semibold mb-2">Timeline Example (500ms delay):</p>
              <div className="space-y-1 font-mono text-xs">
                <div>0ms: User types "h" → Timer starts (500ms)</div>
                <div>100ms: User types "e" → Timer resets (500ms)</div>
                <div>200ms: User types "l" → Timer resets (500ms)</div>
                <div>300ms: User types "l" → Timer resets (500ms)</div>
                <div>400ms: User types "o" → Timer resets (500ms)</div>
                <div>500ms: User stops typing...</div>
                <div className="text-green-600 font-semibold">
                  1000ms: ✅ Function executes with "hello"
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Implementation:</h4>
          <pre className="text-xs bg-white p-2 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId); // Clear previous timer
    timeoutId = setTimeout(() => {
      func(...args); // Execute after delay
    }, delay);
  };
}

// Usage
const debouncedSearch = debounce((value) => {
  console.log("Searching for:", value);
}, 500);

// React Hook version
function useDebounce(callback, delay) {
  const timeoutRef = useRef();
  
  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}`}
            </code>
          </pre>
        </div>

        {/* Use Cases */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-green-900">Common Use Cases:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Search inputs:</strong> Wait for user to finish typing before searching
            </li>
            <li>
              <strong>API calls:</strong> Prevent excessive API requests
            </li>
            <li>
              <strong>Form validation:</strong> Validate after user stops typing
            </li>
            <li>
              <strong>Resize events:</strong> Calculate layout after resize stops
            </li>
            <li>
              <strong>Auto-save:</strong> Save document after user stops editing
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

