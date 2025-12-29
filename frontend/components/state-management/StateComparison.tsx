"use client";

import { useState } from "react";

/**
 * STATE MANAGEMENT COMPARISON
 *
 * Side-by-side comparison of useState, useReducer, and Context API
 * When to use each approach
 */

export default function StateComparison() {
  const [selectedApproach, setSelectedApproach] = useState<
    "useState" | "useReducer" | "context" | "zustand" | "redux"
  >("useState");

  const approaches = [
    {
      id: "useState" as const,
      name: "useState",
      when: [
        "Simple state (primitives, simple objects)",
        "State is local to one component",
        "State updates are straightforward",
        "Few state variables needed",
      ],
      pros: [
        "Simple and easy to understand",
        "Great for local component state",
        "No boilerplate needed",
        "Perfect for forms and simple UI state",
      ],
      cons: [
        "Can get messy with complex state",
        "Multiple useState calls for related state",
        "Logic scattered across component",
      ],
      example: "Counter, form inputs, toggle buttons",
    },
    {
      id: "useReducer" as const,
      name: "useReducer",
      when: [
        "Complex state logic",
        "Multiple related state values",
        "State updates depend on previous state",
        "Need predictable state transitions",
      ],
      pros: [
        "Centralized state logic",
        "Easier to test (pure reducer function)",
        "Better for complex state machines",
        "Predictable state updates",
      ],
      cons: [
        "More boilerplate than useState",
        "Might be overkill for simple state",
        "Requires understanding action/reducer pattern",
      ],
      example: "Todo lists, shopping carts, multi-step forms",
    },
    {
      id: "context" as const,
      name: "Context API",
      when: [
        "State needs to be shared across many components",
        "Avoiding prop drilling",
        "Global UI state (theme, language)",
        "User authentication state",
      ],
      pros: [
        "Avoids prop drilling",
        "Clean component tree",
        "Built into React (no external library)",
        "Great for rarely changing values",
      ],
      cons: [
        "All consumers re-render on context change",
        "Not ideal for frequently changing values",
        "Can make components harder to test",
        "Should combine with useState/useReducer",
      ],
      example: "Theme, user auth, language preference",
    },
    {
      id: "zustand" as const,
      name: "Zustand",
      when: [
        "Medium to large applications",
        "Need global state without boilerplate",
        "Want selective re-renders",
        "Prefer simple API over Redux complexity",
      ],
      pros: [
        "Minimal boilerplate - very simple API",
        "No Provider needed - use anywhere",
        "Selective subscriptions - optimized re-renders",
        "Small bundle size (~1KB)",
        "Great TypeScript support",
        "Perfect middle ground between Context and Redux",
      ],
      cons: [
        "Less ecosystem than Redux",
        "No built-in DevTools (can add middleware)",
        "Newer library (less battle-tested than Redux)",
      ],
      example: "E-commerce apps, dashboards, medium-sized SPAs",
    },
    {
      id: "redux" as const,
      name: "Redux Toolkit",
      when: [
        "Large, complex applications",
        "Need time-travel debugging",
        "Require middleware (thunks, sagas)",
        "Team familiar with Redux patterns",
      ],
      pros: [
        "Industry standard for large apps",
        "Excellent DevTools support",
        "Time-travel debugging",
        "Rich middleware ecosystem",
        "Predictable state updates",
        "Great for teams and large codebases",
      ],
      cons: [
        "More boilerplate than Zustand",
        "Requires Provider wrapper",
        "Steeper learning curve",
        "Can be overkill for small apps",
      ],
      example: "Enterprise apps, complex dashboards, large teams",
    },
  ];

  const current = approaches.find((a) => a.id === selectedApproach);

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        State Management Comparison
      </h2>

      <div className="space-y-6">
        {/* Selection Buttons */}
        <div className="flex gap-2 flex-wrap">
          {approaches.map((approach) => (
            <button
              key={approach.id}
              onClick={() => setSelectedApproach(approach.id)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedApproach === approach.id
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {approach.name}
            </button>
          ))}
        </div>

        {/* Selected Approach Details */}
        {current && (
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h3 className="text-xl font-bold text-indigo-900 mb-4">
              {current.name}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">When to Use:</h4>
                <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                  {current.when.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Pros:</h4>
                <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                  {current.pros.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Cons:</h4>
                <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                  {current.cons.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Example Use Cases:</h4>
                <p className="text-sm text-gray-900">{current.example}</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Decision Guide */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-yellow-900">
            Quick Decision Guide:
          </h4>
          <div className="space-y-2 text-sm text-gray-900">
            <p>
              <strong>Simple local state?</strong> → Use <code className="bg-gray-100 px-1 rounded">useState</code>
            </p>
            <p>
              <strong>Complex state logic?</strong> → Use <code className="bg-gray-100 px-1 rounded">useReducer</code>
            </p>
            <p>
              <strong>Share state across many components?</strong> → Use{" "}
              <code className="bg-gray-100 px-1 rounded">Context API</code>
            </p>
            <p>
              <strong>Need both?</strong> → Use <code className="bg-gray-100 px-1 rounded">useReducer</code> in{" "}
              <code className="bg-gray-100 px-1 rounded">Context</code> for complex shared state!
            </p>
            <p>
              <strong>Medium app, want simplicity?</strong> → Use <code className="bg-gray-100 px-1 rounded">Zustand</code>
            </p>
            <p>
              <strong>Large app, need power?</strong> → Use <code className="bg-gray-100 px-1 rounded">Redux Toolkit</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

