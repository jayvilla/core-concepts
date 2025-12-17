"use client";

import { useState } from "react";

/**
 * PROPS EXAMPLE
 *
 * Characteristics of Props:
 * - Passed from parent component to child
 * - Immutable in child component (read-only)
 * - Child cannot modify props directly
 * - Changes to props come from parent re-rendering with new values
 * - Props flow down the component tree (unidirectional)
 */

interface PropsExampleChildProps {
  name: string;
  age: number;
  color: string;
}

// Child component - receives props, cannot modify them
function PropsExampleChild({ name, age, color }: PropsExampleChildProps) {
  return (
    <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
      <h3 className="font-bold text-blue-900 mb-2">Child Component</h3>
      <div className="space-y-2 text-sm">
        <p className="text-gray-900">
          <strong>Name (prop):</strong> {name}
        </p>
        <p className="text-gray-900">
          <strong>Age (prop):</strong> {age}
        </p>
        <p className="text-gray-900">
          <strong>Color (prop):</strong>{" "}
          <span
            className="px-2 py-1 rounded text-white"
            style={{ backgroundColor: color }}
          >
            {color}
          </span>
        </p>
      </div>
      <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
        <p className="font-semibold text-yellow-900">Key Point:</p>
        <p className="text-yellow-800">
          This component receives props but cannot modify them. Props are
          read-only!
        </p>
      </div>
    </div>
  );
}

// Parent component - controls the props
export default function PropsExample() {
  const [name, setName] = useState("Alice");
  const [age, setAge] = useState(25);
  const [color, setColor] = useState("#3B82F6");

  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Props Example</h2>

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-bold text-blue-900 mb-2">Parent Component</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Name (updates child prop):
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Age (updates child prop):
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Color (updates child prop):
            </label>
            <div className="flex gap-2 flex-wrap">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-4 py-2 rounded text-white font-medium ${
                    color === c ? "ring-2 ring-blue-500 ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: c }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Child component receives props */}
      <PropsExampleChild name={name} age={age} color={color} />

      <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">Props Characteristics:</h4>
        <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
          <li>Passed from parent to child (downward flow)</li>
          <li>Immutable - child cannot change props directly</li>
          <li>Parent controls prop values via state</li>
          <li>When parent state changes, new props flow down</li>
          <li>Child re-renders when props change</li>
        </ul>
      </div>
    </div>
  );
}

