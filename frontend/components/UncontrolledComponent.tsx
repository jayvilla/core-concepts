"use client";

import { useRef, useState } from "react";

/**
 * UNCONTROLLED COMPONENT
 *
 * Characteristics:
 * - Component's state is managed by the DOM itself
 * - Input value is accessed via ref (not bound to React state)
 * - No value prop - input maintains its own internal state
 * - DOM is the "single source of truth" for the input's value
 *
 * Benefits:
 * - Less re-renders (React doesn't track every keystroke)
 * - Simpler for simple forms where you only need value on submit
 * - Better performance for forms with many inputs
 * - Can integrate with non-React libraries easier
 */

export default function UncontrolledComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [submittedValue, setSubmittedValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Access value directly from DOM via ref
    const value = inputRef.current?.value || "";
    setSubmittedValue(value);
  };

  const handleReset = () => {
    // Need to manually reset the DOM element
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSubmittedValue("");
  };

  // Example: Getting current value without submit
  const handleShowValue = () => {
    const currentValue = inputRef.current?.value || "";
    alert(`Current input value: "${currentValue}"`);
  };

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-green-50">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        Uncontrolled Component
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900">
            Name (managed by DOM):
          </label>
          <input
            type="text"
            ref={inputRef} // Use ref to access value, not state
            defaultValue="" // Only sets initial value, not bound to state
            placeholder="Type your name..."
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
          />
          <p className="text-xs text-gray-800 mt-1">
            Value stored in DOM, not React state
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleShowValue}
            className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-500"
          >
            Show Value
          </button>
        </div>
      </form>

      {submittedValue && (
        <div className="mt-4 p-3 bg-green-100 rounded-md">
          <p className="font-semibold text-gray-900">Submitted value:</p>
          <p className="text-green-900">{submittedValue}</p>
        </div>
      )}

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-xs font-semibold text-yellow-900 mb-1">
          Key Points:
        </p>
        <ul className="text-xs text-yellow-800 space-y-1">
          <li>• No value prop - DOM manages state</li>
          <li>• Access value via ref.current.value</li>
          <li>• Fewer re-renders (better performance)</li>
          <li>• Less control over input behavior</li>
        </ul>
      </div>
    </div>
  );
}

