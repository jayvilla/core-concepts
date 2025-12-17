"use client";

import { useState, useEffect } from "react";

/**
 * PRACTICAL CUSTOM HOOK EXAMPLE
 *
 * Demonstrates a more complex custom hook:
 * - Uses multiple hooks (useState, useEffect)
 * - Handles side effects (localStorage)
 * - Handles edge cases (JSON parsing errors)
 * - Reusable across the entire application
 */

// Custom Hook - syncs state with localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

// Component using the custom hook
export default function UseLocalStorageExample() {
  const [name, setName] = useLocalStorage<string>("user-name", "");
  const [settings, setSettings] = useLocalStorage<{
    theme: string;
    notifications: boolean;
  }>("user-settings", { theme: "light", notifications: true });

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        Practical Custom Hook: useLocalStorage
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">
            Why This Hook is Useful:
          </h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              Persists data across page refreshes (uses localStorage)
            </li>
            <li>
              Handles JSON serialization/deserialization automatically
            </li>
            <li>
              Handles errors gracefully (if localStorage fails)
            </li>
            <li>
              Same API as useState, so easy to use
            </li>
            <li>
              Reusable across any component that needs persistent state
            </li>
          </ul>
        </div>

        {/* Name Example */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">Name (Persisted)</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 mb-2"
            placeholder="Enter your name..."
          />
          <p className="text-sm text-gray-900">
            Current value: <strong>{name || "(empty)"}</strong>
          </p>
          <p className="text-xs text-gray-700 mt-1">
            💡 Refresh the page - your name will persist!
          </p>
        </div>

        {/* Settings Example */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">Settings (Persisted)</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                Theme:
              </label>
              <select
                value={settings.theme}
                onChange={(e) =>
                  setSettings({ ...settings, theme: e.target.value })
                }
                className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-gray-900">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: e.target.checked,
                    })
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm">Enable notifications</span>
              </label>
            </div>
          </div>
          <p className="text-xs text-gray-700 mt-2">
            💡 These settings persist across page refreshes!
          </p>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Hook Usage:</h4>
          <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`const [name, setName] = useLocalStorage("user-name", "");
const [settings, setSettings] = useLocalStorage("settings", {});

// Works exactly like useState!
setName("John");
setSettings(prev => ({ ...prev, theme: "dark" }));`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

