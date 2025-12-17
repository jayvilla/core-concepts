"use client";

import { useState } from "react";

/**
 * CONTROLLED COMPONENT
 *
 * Characteristics:
 * - Component's state is controlled by React (via useState)
 * - Input value is bound to state via value prop
 * - onChange handler updates the state
 * - React is the "single source of truth" for the input's value
 *
 * Benefits:
 * - Full control over the input value
 * - Easy to validate, transform, or reset the value
 * - Predictable state management
 * - Enables features like disabling submit when empty
 */

export default function ControlledComponent() {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // We can transform the value before setting it
    // For example, convert to uppercase
    setInputValue(e.target.value.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedValue(inputValue);
  };

  const handleReset = () => {
    setInputValue(""); // Easy to reset - React controls the value
    setSubmittedValue("");
  };

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-blue-50">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        Controlled Component
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Name (converts to uppercase):
          </label>
          <input
            type="text"
            value={inputValue} // Value is controlled by React state
            onChange={handleChange} // Every keystroke updates state
            placeholder="Type your name..."
            className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-600 mt-1">
            Current state: {inputValue || "(empty)"}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!inputValue} // Easy to disable based on state
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
        </div>
      </form>

      {submittedValue && (
        <div className="mt-4 p-3 bg-blue-100 rounded-md">
          <p className="font-semibold">Submitted value:</p>
          <p className="text-blue-900">{submittedValue}</p>
        </div>
      )}

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-xs font-semibold text-yellow-900 mb-1">
          Key Points:
        </p>
        <ul className="text-xs text-yellow-800 space-y-1">
          <li>• Value prop binds input to React state</li>
          <li>• onChange updates state synchronously</li>
          <li>• Can transform/validate on every change</li>
          <li>• Easy to reset or clear programmatically</li>
        </ul>
      </div>
    </div>
  );
}
