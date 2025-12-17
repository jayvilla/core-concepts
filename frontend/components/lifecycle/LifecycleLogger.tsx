"use client";

import { useEffect, useState, useRef } from "react";

interface LifecycleEvent {
  id: number;
  event: string;
  timestamp: number;
}

/**
 * LIFECYCLE LOGGER COMPONENT
 *
 * Demonstrates useEffect with different dependency arrays:
 * - [] = Runs once on mount (componentDidMount)
 * - [dependency] = Runs on mount + when dependency changes (componentDidUpdate)
 * - No deps = Runs on every render (not recommended)
 */

export default function LifecycleLogger() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [events, setEvents] = useState<LifecycleEvent[]>([]);
  const eventIdRef = useRef(0); // Use ref to avoid race conditions

  const addEvent = (event: string) => {
    const id = eventIdRef.current++;
    const newEvent: LifecycleEvent = {
      id,
      event,
      timestamp: Date.now(),
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  // 1. Runs ONLY on mount (empty dependency array)
  // Equivalent to componentDidMount in class components
  useEffect(() => {
    addEvent("🟢 MOUNT: Effect with [] ran (componentDidMount)");
    console.log("Component mounted");

    // Cleanup runs on unmount (componentWillUnmount)
    return () => {
      addEvent("🔴 UNMOUNT: Cleanup ran (componentWillUnmount)");
      console.log("Component unmounted");
    };
  }, []); // Empty array = runs once

  // 2. Runs on mount AND whenever 'count' changes
  // Equivalent to componentDidUpdate when count changes
  useEffect(() => {
    if (count > 0) {
      // Skip initial mount log since we already have one above
      addEvent(`🔄 UPDATE: Effect with [count] ran. Count is now: ${count}`);
      console.log("Count changed:", count);
    }
  }, [count]); // Runs when count changes

  // 3. Runs on mount AND whenever 'name' changes
  useEffect(() => {
    if (name !== "") {
      addEvent(`🔄 UPDATE: Effect with [name] ran. Name is now: "${name}"`);
      console.log("Name changed:", name);
    }
  }, [name]);

  // 4. Runs on mount AND whenever EITHER count or name changes
  useEffect(() => {
    if (count > 0 || name !== "") {
      addEvent(
        `🔄 UPDATE: Effect with [count, name] ran. Count: ${count}, Name: "${name}"`
      );
    }
  }, [count, name]);

  // 5. Runs on EVERY render (no dependency array)
  // WARNING: This is usually not recommended - causes infinite loops if you update state
  // NOTE: We're NOT calling addEvent here because it would cause an infinite loop!
  // This effect only logs to console to demonstrate the behavior
  useEffect(() => {
    console.log("⚠️ RENDER: Effect with NO deps ran (runs every render)");
    // We don't update state here - that would cause infinite loop!
  }); // No dependency array = runs every render (but we don't update state!)

  const clearEvents = () => {
    setEvents([]);
    eventIdRef.current = 0;
  };

  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-purple-50">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        Component Lifecycle with useEffect
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Count: {count}
            </label>
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 mr-2"
            >
              Increment Count
            </button>
            <button
              onClick={() => setCount(0)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Reset
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type a name..."
              className="w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
            />
          </div>

          <button
            onClick={clearEvents}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 w-full"
          >
            Clear Event Log
          </button>
        </div>

        {/* Event Log */}
        <div className="bg-gray-900 rounded-md p-4 max-h-96 overflow-y-auto">
          <h3 className="text-white font-semibold mb-3">Event Log:</h3>
          {events.length === 0 ? (
            <p className="text-gray-300 text-sm">No events yet...</p>
          ) : (
            <div className="space-y-1 font-mono text-xs">
              {events.map((event) => (
                <div key={event.id} className="text-green-400">
                  {event.event}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <p className="text-sm font-semibold text-yellow-900 mb-2">
          Key Points:
        </p>
        <ul className="text-xs text-yellow-800 space-y-1">
          <li>
            •{" "}
            <code className="bg-yellow-100 px-1 rounded">
              useEffect(() =&gt; {}, [])
            </code>{" "}
            = Runs once on mount
          </li>
          <li>
            •{" "}
            <code className="bg-yellow-100 px-1 rounded">
              useEffect(() =&gt; {}, [dep])
            </code>{" "}
            = Runs on mount + when dep changes
          </li>
          <li>
            •{" "}
            <code className="bg-yellow-100 px-1 rounded">
              useEffect(() =&gt; {})
            </code>{" "}
            = Runs on every render (usually avoid)
          </li>
          <li>
            • Return function = Cleanup (runs before next effect + on unmount)
          </li>
        </ul>
      </div>
    </div>
  );
}
