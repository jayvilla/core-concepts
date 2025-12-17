"use client";

import { useState, useRef } from "react";

/**
 * DEBOUNCE VS THROTTLE COMPARISON
 *
 * Side-by-side comparison showing the key differences:
 * - When each executes
 * - How they handle rapid calls
 * - Visual timeline comparison
 * - When to use each
 */

// Simple debounce implementation
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

// Simple throttle implementation
function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastRun = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastRun >= delay) {
      lastRun = now;
      func(...args);
    }
  };
}

export default function DebounceThrottleComparison() {
  const [events, setEvents] = useState<Array<{ time: number; type: string }>>([]);
  const [debouncedCount, setDebouncedCount] = useState(0);
  const [throttledCount, setThrottledCount] = useState(0);
  const startTimeRef = useRef<number>(Date.now());

  // Create debounced and throttled functions using refs to persist across renders
  const debouncedFnRef = useRef(
    debounce(() => {
      setDebouncedCount((prev) => prev + 1);
      setEvents((prev) => [...prev, { time: Date.now() - startTimeRef.current, type: "debounced" }]);
    }, 500)
  );

  const throttledFnRef = useRef(
    throttle(() => {
      setThrottledCount((prev) => prev + 1);
      setEvents((prev) => [...prev, { time: Date.now() - startTimeRef.current, type: "throttled" }]);
    }, 200)
  );

  const handleEvent = () => {
    const elapsed = Date.now() - startTimeRef.current;
    setEvents((prev) => [...prev, { time: elapsed, type: "event" }]);

    // Debounced: resets timer, executes after 500ms of inactivity
    debouncedFnRef.current();

    // Throttled: executes immediately if enough time passed, max once per 200ms
    throttledFnRef.current();
  };

  const reset = () => {
    setEvents([]);
    setDebouncedCount(0);
    setThrottledCount(0);
    startTimeRef.current = Date.now();
  };

  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        Debounce vs Throttle: Side-by-Side
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">Key Differences:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Debounce:</h4>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>Waits for inactivity</li>
                <li>Resets timer on each call</li>
                <li>Executes once after delay</li>
                <li>&quot;Wait until done&quot;</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900 mb-2">Throttle:</h4>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>Limits execution rate</li>
                <li>Executes at regular intervals</li>
                <li>Guarantees execution</li>
                <li>&quot;Execute periodically&quot;</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Comparison */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">Try It:</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={handleEvent}
                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
              >
                Trigger Event (Click Rapidly!)
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Reset
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-white border border-blue-200 rounded">
                <p className="text-xs font-semibold text-gray-900 mb-1">Debounced (500ms):</p>
                <p className="text-2xl font-bold text-blue-900">{debouncedCount}</p>
                <p className="text-xs text-gray-700 mt-1">Executions</p>
              </div>

              <div className="p-3 bg-white border border-green-200 rounded">
                <p className="text-xs font-semibold text-gray-900 mb-1">Throttled (200ms):</p>
                <p className="text-2xl font-bold text-green-900">{throttledCount}</p>
                <p className="text-xs text-gray-700 mt-1">Executions</p>
              </div>
            </div>

            {/* Event Timeline */}
            {events.length > 0 && (
              <div className="p-3 bg-gray-50 border border-gray-300 rounded">
                <p className="text-xs font-semibold text-gray-900 mb-2">Event Timeline:</p>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {events.slice(-10).map((event, index) => (
                    <div
                      key={index}
                      className={`text-xs font-mono ${
                        event.type === "event"
                          ? "text-gray-600"
                          : event.type === "debounced"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {event.time}ms: {event.type === "event" ? "⚡ Event" : event.type === "debounced" ? "✅ Debounced executed" : "✅ Throttled executed"}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Visual Comparison */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900">Visual Comparison:</h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-2">Scenario: Rapid events every 100ms (500ms delay):</p>
              <div className="p-3 bg-white border border-gray-300 rounded">
                <p className="text-xs font-semibold text-blue-900 mb-1">Debounce:</p>
                <div className="font-mono text-xs space-y-1">
                  <div>0ms: Event → Timer starts (500ms)</div>
                  <div>100ms: Event → Timer resets (500ms)</div>
                  <div>200ms: Event → Timer resets (500ms)</div>
                  <div>300ms: Event → Timer resets (500ms)</div>
                  <div>400ms: Event → Timer resets (500ms)</div>
                  <div>500ms: Event → Timer resets (500ms)</div>
                  <div className="text-green-600">...user stops...</div>
                  <div className="text-green-600 font-semibold">1000ms: ✅ Executes ONCE</div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-2">Same scenario with Throttle (200ms):</p>
              <div className="p-3 bg-white border border-gray-300 rounded">
                <p className="text-xs font-semibold text-green-900 mb-1">Throttle:</p>
                <div className="font-mono text-xs space-y-1">
                  <div className="text-green-600">0ms: Event → ✅ Executes immediately</div>
                  <div>100ms: Event → ❌ Ignored</div>
                  <div className="text-green-600">200ms: Event → ✅ Executes</div>
                  <div>300ms: Event → ❌ Ignored</div>
                  <div className="text-green-600">400ms: Event → ✅ Executes</div>
                  <div>500ms: Event → ❌ Ignored</div>
                  <div className="text-green-600">600ms: Event → ✅ Executes</div>
                  <div className="text-gray-600">...continues at regular intervals...</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* When to Use */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-yellow-900">When to Use Each:</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold text-blue-900 mb-2">Use Debounce when:</h5>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>User input (search, typing)</li>
                <li>API calls triggered by user action</li>
                <li>You want to wait until user is done</li>
                <li>Final value matters, not intermediate</li>
                <li>Auto-save functionality</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-green-900 mb-2">Use Throttle when:</h5>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>Scroll/resize events</li>
                <li>Mouse move tracking</li>
                <li>You need regular updates</li>
                <li>Intermediate values matter</li>
                <li>Button click prevention</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

