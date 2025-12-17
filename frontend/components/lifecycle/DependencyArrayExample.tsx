"use client";

import { useEffect, useState } from "react";

/**
 * DEPENDENCY ARRAY EXAMPLES
 *
 * Demonstrates different dependency array scenarios:
 * - Empty array []
 * - Single dependency [count]
 * - Multiple dependencies [count, name]
 * - Missing dependencies (common mistake)
 */

export default function DependencyArrayExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLog((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Scenario 1: Empty array - runs once on mount
  useEffect(() => {
    addLog("🟢 Effect with [] ran (mount only)");
  }, []);

  // Scenario 2: Single dependency - runs when count changes
  useEffect(() => {
    addLog(`🔄 Effect with [count] ran. Count = ${count}`);
  }, [count]);

  // Scenario 3: Multiple dependencies - runs when count OR name changes
  useEffect(() => {
    addLog(`🔄 Effect with [count, name] ran. Count = ${count}, Name = "${name}"`);
  }, [count, name]);

  // Scenario 4: Missing dependency (intentional to show the issue)
  useEffect(() => {
    // count is used but not in dependency array - React will warn about this
    addLog(`⚠️ Effect with [] but uses count=${count} (missing dependency!)`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // count is missing from deps

  return (
    <div className="border-2 border-teal-500 rounded-lg p-6 bg-teal-50">
      <h2 className="text-2xl font-bold mb-4 text-teal-900">
        Dependency Array Patterns
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Count: {count}
            </label>
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
            >
              Increment Count
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type a name..."
              className="w-full px-4 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            onClick={() => setLog([])}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 w-full"
          >
            Clear Log
          </button>
        </div>

        {/* Log */}
        <div className="bg-gray-900 rounded-md p-4 max-h-64 overflow-y-auto">
          <h3 className="text-white font-semibold mb-3">Effect Log:</h3>
          {log.length === 0 ? (
            <p className="text-gray-400 text-sm">No logs yet...</p>
          ) : (
            <div className="space-y-1 font-mono text-xs">
              {log.map((entry, idx) => (
                <div key={`log-${idx}-${entry}`} className="text-green-400">
                  {entry}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <p className="text-sm font-semibold text-yellow-900 mb-2">
          Dependency Array Rules:
        </p>
        <ul className="text-xs text-yellow-800 space-y-1">
          <li>
            • <code className="bg-yellow-100 px-1 rounded">[]</code> = Run once
            on mount (like componentDidMount)
          </li>
          <li>
            • <code className="bg-yellow-100 px-1 rounded">[dep]</code> = Run
            on mount + when dep changes
          </li>
          <li>
            • <code className="bg-yellow-100 px-1 rounded">[dep1, dep2]</code> =
            Run when ANY dependency changes
          </li>
          <li>
            • Missing dependencies = Stale closures, bugs, React warnings
          </li>
          <li>
            • Use ESLint rule{" "}
            <code className="bg-yellow-100 px-1 rounded">
              react-hooks/exhaustive-deps
            </code>{" "}
            to catch missing deps
          </li>
        </ul>
      </div>
    </div>
  );
}

