"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/**
 * REAL-WORLD EXAMPLES
 *
 * Demonstrates practical use cases:
 * - Search with debounce
 * - Scroll tracking with throttle
 * - Button click prevention
 * - Resize handling
 */

// Debounce hook
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

// Throttle hook
function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef<number>(0);

  return ((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      lastRun.current = now;
      callback(...args);
    }
  }) as T;
}

export default function RealWorldExamples() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [throttledClickCount, setThrottledClickCount] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Debounced search
  const debouncedSearch = useDebounce((query: string) => {
    if (query.trim()) {
      // Simulate API call
      const results = [
        `Result 1 for "${query}"`,
        `Result 2 for "${query}"`,
        `Result 3 for "${query}"`,
      ];
      setSearchResults(results);
      console.log("🔍 API call made for:", query);
    } else {
      setSearchResults([]);
    }
  }, 500);

  // Throttled scroll handler
  const throttledScroll = useThrottle((y: number) => {
    setScrollPosition(y);
    console.log("📜 Scroll position updated:", y);
  }, 100);

  // Throttled click handler
  const handleThrottledClick = useThrottle(() => {
    setThrottledClickCount((prev) => prev + 1);
    console.log("🖱️ Throttled click executed");
  }, 1000);

  // Resize handler callback - use useCallback to keep it stable
  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    console.log("📐 Window resized");
  }, []);

  // Throttled resize handler - must be called unconditionally
  const throttledResize = useThrottle(handleResize, 200);

  // Store throttled function in ref for event listener
  const throttledResizeRef = useRef(throttledResize);
  throttledResizeRef.current = throttledResize;

  // Simulate scroll
  const simulateScroll = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        throttledScroll(Math.floor(Math.random() * 1000));
      }, i * 50);
    }
  };

  // Set up resize listener
  useEffect(() => {
    // Initialize window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Create a stable wrapper function that calls the current throttled function
    const stableHandler = () => {
      throttledResizeRef.current();
    };

    // Add resize event listener
    window.addEventListener("resize", stableHandler);

    // Cleanup
    return () => {
      window.removeEventListener("resize", stableHandler);
    };
  }, []);

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        Real-World Examples
      </h2>

      <div className="space-y-6">
        {/* Search Example */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">
            Example 1: Search with Debounce
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                debouncedSearch(value);
              }}
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Search... (debounced 500ms)"
            />
            {searchResults.length > 0 && (
              <div className="p-3 bg-white border border-blue-200 rounded">
                <p className="text-xs font-semibold text-gray-900 mb-2">Results:</p>
                <ul className="text-sm text-gray-900 space-y-1">
                  {searchResults.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-xs text-gray-700">
              💡 API call only happens 500ms after you stop typing!
            </p>
          </div>
        </div>

        {/* Scroll Example */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">
            Example 2: Scroll Tracking with Throttle
          </h3>
          <div className="space-y-3">
            <button
              onClick={simulateScroll}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Simulate Rapid Scroll Events
            </button>
            <div className="p-3 bg-white border border-green-200 rounded">
              <p className="text-sm text-gray-900">
                Scroll Position: <strong>{scrollPosition}</strong>
              </p>
              <p className="text-xs text-gray-700 mt-1">
                💡 Position updates at most once per 100ms, even with rapid events!
              </p>
            </div>
          </div>
        </div>

        {/* Button Click Example */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">
            Example 3: Button Click Prevention with Throttle
          </h3>
          <div className="space-y-3">
            <div className="flex gap-4">
              <div>
                <button
                  onClick={() => setClickCount((prev) => prev + 1)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Normal Click (Count: {clickCount})
                </button>
                <p className="text-xs text-gray-700 mt-1">Every click counts</p>
              </div>
              <div>
                <button
                  onClick={handleThrottledClick}
                  className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                >
                  Throttled Click (Count: {throttledClickCount})
                </button>
                <p className="text-xs text-gray-700 mt-1">Max once per second</p>
              </div>
            </div>
            <p className="text-xs text-gray-700">
              💡 Throttled button prevents rapid-fire clicks (e.g., submit button)
            </p>
          </div>
        </div>

        {/* Resize Example */}
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="font-bold text-orange-900 mb-3">
            Example 4: Window Resize with Throttle
          </h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-900">
              Resize your browser window to see throttled updates
            </p>
            <div className="p-3 bg-white border border-orange-200 rounded">
              <p className="text-sm text-gray-900">
                Window Size: <strong>{windowSize.width || "—"}</strong> x <strong>{windowSize.height || "—"}</strong>
              </p>
              <p className="text-xs text-gray-700 mt-1">
                💡 Size updates at most once per 200ms during resize (automatically enabled)
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Quick Decision Guide:</h4>
          <div className="space-y-2 text-sm text-gray-900">
            <p>
              <strong>Need to wait until user stops?</strong> → Use <strong>Debounce</strong>
            </p>
            <p>
              <strong>Need regular updates while event is happening?</strong> → Use <strong>Throttle</strong>
            </p>
            <p>
              <strong>Search/input fields?</strong> → <strong>Debounce</strong>
            </p>
            <p>
              <strong>Scroll/resize/mousemove?</strong> → <strong>Throttle</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

