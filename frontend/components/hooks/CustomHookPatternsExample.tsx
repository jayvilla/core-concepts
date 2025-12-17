"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * CUSTOM HOOK PATTERNS
 *
 * Demonstrates common patterns for creating custom hooks:
 * - Combining multiple hooks
 * - Returning objects vs arrays
 * - Handling dependencies
 * - Using useCallback/useMemo in custom hooks
 */

// Pattern 1: Simple state hook with actions
function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((prev) => !prev), []);
  return [value, toggle] as const;
}

// Pattern 2: Hook with side effects
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Get initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

// Pattern 3: Hook returning object (named return values)
function useTimer(initialSeconds: number = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const stop = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setSeconds(initialSeconds);
    setIsRunning(false);
  }, [initialSeconds]);

  return {
    seconds,
    isRunning,
    start,
    stop,
    reset,
  };
}

export default function CustomHookPatternsExample() {
  const [isOpen, toggle] = useToggle(false);
  const windowSize = useWindowSize();
  const timer = useTimer(0);

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        Common Custom Hook Patterns
      </h2>

      <div className="space-y-6">
        {/* Pattern 1: Simple toggle */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">
            Pattern 1: Simple State Hook (Array Return)
          </h3>
          <div className="mb-3">
            <button
              onClick={toggle}
              className={`px-4 py-2 rounded-md font-medium ${
                isOpen
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {isOpen ? "Open" : "Closed"} - Click to Toggle
            </button>
          </div>
          <pre className="text-xs bg-white p-3 rounded border border-indigo-300 overflow-x-auto">
            <code className="text-gray-800">
{`function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(prev => !prev);
  return [value, toggle]; // Array pattern
}

const [isOpen, toggle] = useToggle();`}
            </code>
          </pre>
          <p className="text-xs text-gray-700 mt-2">
            💡 Use array return when you have 1-2 values (similar to useState)
          </p>
        </div>

        {/* Pattern 2: Window size */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">
            Pattern 2: Hook with Side Effects (useEffect)
          </h3>
          <div className="mb-3">
            <p className="text-sm text-gray-900">
              Window Size: <strong>{windowSize.width}</strong> x <strong>{windowSize.height}</strong>
            </p>
            <p className="text-xs text-gray-700 mt-1">
              💡 Resize the window to see it update!
            </p>
          </div>
          <pre className="text-xs bg-white p-3 rounded border border-indigo-300 overflow-x-auto">
            <code className="text-gray-800">
{`function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}`}
            </code>
          </pre>
        </div>

        {/* Pattern 3: Timer */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">
            Pattern 3: Complex Hook with Object Return
          </h3>
          <div className="mb-3 space-y-2">
            <div className="text-2xl font-bold text-gray-900">
              Timer: {timer.seconds}s
            </div>
            <div className="flex gap-2">
              <button
                onClick={timer.start}
                disabled={timer.isRunning}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Start
              </button>
              <button
                onClick={timer.stop}
                disabled={!timer.isRunning}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Stop
              </button>
              <button
                onClick={timer.reset}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </div>
          <pre className="text-xs bg-white p-3 rounded border border-indigo-300 overflow-x-auto">
            <code className="text-gray-800">
{`function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // ... timer logic ...
  
  return {
    seconds,
    isRunning,
    start,
    stop,
    reset,
  }; // Object pattern - named values
}

const timer = useTimer();
timer.start(); // Clear API`}
            </code>
          </pre>
          <p className="text-xs text-gray-700 mt-2">
            💡 Use object return when you have multiple related values (more readable)
          </p>
        </div>

        {/* Best Practices */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Best Practices:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Naming:</strong> Always start custom hooks with &quot;use&quot; (useCounter, useTimer)
            </li>
            <li>
              <strong>Return pattern:</strong> Array for 1-2 values, object for multiple values
            </li>
            <li>
              <strong>Dependencies:</strong> Include all dependencies in useEffect dependency arrays
            </li>
            <li>
              <strong>Cleanup:</strong> Always clean up side effects (event listeners, intervals, etc.)
            </li>
            <li>
              <strong>Reusability:</strong> Extract logic that&apos;s used in multiple components
            </li>
            <li>
              <strong>Testing:</strong> Custom hooks can be tested independently
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

