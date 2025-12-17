"use client";

import { useState, useRef } from "react";

/**
 * THROTTLE EXAMPLE
 *
 * Demonstrates throttle:
 * - Limits function execution to at most once per time period
 * - Executes immediately, then ignores calls until period ends
 * - Guarantees execution at regular intervals
 * - Common use: scroll events, mouse move, resize
 */

// Custom throttle hook
function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return ((...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastRun.current >= delay) {
      // Enough time has passed, execute immediately
      lastRun.current = now;
      callback(...args);
    } else {
      // Schedule execution for when delay period ends
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        lastRun.current = Date.now();
        callback(...args);
      }, delay - (now - lastRun.current));
    }
  }) as T;
}

export default function ThrottleExample() {
  const [scrollY, setScrollY] = useState(0);
  const [throttledScrollY, setThrottledScrollY] = useState(0);
  const [callCount, setCallCount] = useState(0);
  const [throttledCallCount, setThrottledCallCount] = useState(0);

  // Throttled scroll handler
  const throttledScroll = useThrottle((value: number) => {
    setThrottledScrollY(value);
    setThrottledCallCount((prev) => prev + 1);
    console.log("📜 Throttled scroll executed:", value);
  }, 200);

  // Simulate scroll event
  const handleScroll = () => {
    const newScrollY = Math.floor(Math.random() * 1000);
    setScrollY(newScrollY);
    setCallCount((prev) => prev + 1);
    throttledScroll(newScrollY);
  };

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        Throttle Example
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">What is Throttle?</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              Limits function execution to <strong>at most once</strong> per time period
            </li>
            <li>
              Executes immediately on first call, then ignores calls until period ends
            </li>
            <li>
              Guarantees execution at <strong>regular intervals</strong>
            </li>
            <li>
              Perfect for: scroll events, mouse move, resize, button clicks
            </li>
          </ul>
        </div>

        {/* Interactive Example */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">Try It:</h3>
          <div className="space-y-3">
            <button
              onClick={handleScroll}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Simulate Scroll Event (Click Rapidly!)
            </button>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-white border border-green-200 rounded">
                <p className="text-xs font-semibold text-gray-900 mb-1">Immediate Updates:</p>
                <p className="text-sm text-gray-900">
                  Scroll Y: <strong>{scrollY}</strong>
                </p>
                <p className="text-xs text-gray-700 mt-1">
                  Calls: <strong>{callCount}</strong> (every click)
                </p>
              </div>

              <div className="p-3 bg-white border border-blue-200 rounded">
                <p className="text-xs font-semibold text-gray-900 mb-1">Throttled (200ms):</p>
                <p className="text-sm text-gray-900">
                  Scroll Y: <strong>{throttledScrollY}</strong>
                </p>
                <p className="text-xs text-gray-700 mt-1">
                  Calls: <strong>{throttledCallCount}</strong> (max once per 200ms)
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-700">
              💡 Notice: Throttled function executes at most once every 200ms, even if you click rapidly!
            </p>
          </div>
        </div>

        {/* Visual Timeline */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900">How Throttle Works:</h4>
          <div className="space-y-2 text-sm text-gray-900">
            <div className="p-3 bg-white border border-gray-300 rounded">
              <p className="font-semibold mb-2">Timeline Example (200ms throttle):</p>
              <div className="space-y-1 font-mono text-xs">
                <div className="text-green-600">0ms: Event fires → ✅ Executes immediately</div>
                <div>50ms: Event fires → ❌ Ignored (within 200ms window)</div>
                <div>100ms: Event fires → ❌ Ignored</div>
                <div>150ms: Event fires → ❌ Ignored</div>
                <div className="text-green-600">200ms: Event fires → ✅ Executes (200ms passed)</div>
                <div>250ms: Event fires → ❌ Ignored</div>
                <div className="text-green-600">400ms: Event fires → ✅ Executes (200ms passed)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Implementation:</h4>
          <pre className="text-xs bg-white p-2 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`function throttle(func, delay) {
  let lastRun = 0;
  
  return function(...args) {
    const now = Date.now();
    
    if (now - lastRun >= delay) {
      // Enough time passed, execute
      lastRun = now;
      func(...args);
    }
    // Otherwise, ignore the call
  };
}

// React Hook version
function useThrottle(callback, delay) {
  const lastRun = useRef(0);
  
  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      lastRun.current = now;
      callback(...args);
    }
  }, [callback, delay]);
}`}
            </code>
          </pre>
        </div>

        {/* Use Cases */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Common Use Cases:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Scroll events:</strong> Update UI at regular intervals while scrolling
            </li>
            <li>
              <strong>Mouse move:</strong> Track cursor position without overwhelming the system
            </li>
            <li>
              <strong>Resize events:</strong> Recalculate layout periodically
            </li>
            <li>
              <strong>Button clicks:</strong> Prevent rapid-fire clicks (e.g., submit button)
            </li>
            <li>
              <strong>API polling:</strong> Poll API at regular intervals
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

