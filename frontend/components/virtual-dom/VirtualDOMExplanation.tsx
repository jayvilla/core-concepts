"use client";

import { useState } from "react";

/**
 * VIRTUAL DOM EXPLANATION
 *
 * Demonstrates what Virtual DOM is and why React uses it:
 * - Virtual DOM is a JavaScript representation of the real DOM
 * - React works with Virtual DOM, not directly with browser DOM
 * - Changes are made to Virtual DOM first, then efficiently applied to real DOM
 */

export default function VirtualDOMExplanation() {
  const [count, setCount] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        What is Virtual DOM?
      </h2>

      <div className="space-y-6">
        {/* Simple Explanation */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">Simple Explanation:</h3>
          <p className="text-sm text-gray-900 mb-3">
            Virtual DOM is a <strong>JavaScript object representation</strong> of the real DOM.
            React uses Virtual DOM as an intermediate layer between your code and the browser&apos;s DOM.
          </p>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
          >
            {showDetails ? "Hide" : "Show"} Details
          </button>
        </div>

        {/* Visual Representation */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-3">How It Works:</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white border-2 border-blue-300 rounded-lg">
              <div className="text-2xl mb-2">📝</div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Your Code</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded text-left overflow-x-auto">
                <code>{`<div>
  <h1>Count: {count}</h1>
  <button>Click</button>
</div>`}</code>
              </pre>
            </div>
            <div className="p-4 bg-white border-2 border-green-300 rounded-lg">
              <div className="text-2xl mb-2">⚛️</div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Virtual DOM</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded text-left overflow-x-auto">
                <code>{`{
  type: 'div',
  props: {
    children: [
      { type: 'h1', props: { children: 'Count: 0' } },
      { type: 'button', props: { children: 'Click' } }
    ]
  }
}`}</code>
              </pre>
            </div>
            <div className="p-4 bg-white border-2 border-purple-300 rounded-lg">
              <div className="text-2xl mb-2">🌐</div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Real DOM</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded text-left overflow-x-auto">
                <code>{`<div>
  <h1>Count: 0</h1>
  <button>Click</button>
</div>`}</code>
              </pre>
            </div>
          </div>
          <p className="text-xs text-gray-700 mt-4 text-center">
            React converts your JSX → Virtual DOM → Real DOM
          </p>
        </div>

        {/* Interactive Example */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">Interactive Example:</h3>
          <div className="space-y-3">
            <div className="p-3 bg-white border border-blue-200 rounded">
              <p className="text-lg font-bold text-gray-900">Count: {count}</p>
              <button
                onClick={() => setCount((prev) => prev + 1)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Increment
              </button>
            </div>
            <p className="text-xs text-gray-700">
              💡 When you click, React updates the Virtual DOM first, then efficiently updates only
              the changed parts of the real DOM!
            </p>
          </div>
        </div>

        {/* Why Virtual DOM */}
        {showDetails && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-bold text-yellow-900 mb-3">Why Use Virtual DOM?</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">✅ Benefits:</h4>
                <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                  <li>
                    <strong>Performance:</strong> React batches updates and only changes what&apos;s necessary
                  </li>
                  <li>
                    <strong>Efficiency:</strong> Avoids expensive direct DOM manipulation
                  </li>
                  <li>
                    <strong>Predictability:</strong> Declarative code (what you want) vs imperative (how to do it)
                  </li>
                  <li>
                    <strong>Cross-browser:</strong> React handles browser differences
                  </li>
                  <li>
                    <strong>Diffing:</strong> React compares Virtual DOM trees to find minimal changes
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🔄 The Process:</h4>
                <ol className="text-sm text-gray-900 space-y-1 list-decimal list-inside">
                  <li>State changes trigger re-render</li>
                  <li>React creates new Virtual DOM tree</li>
                  <li>React compares (diffs) old vs new Virtual DOM</li>
                  <li>React calculates minimal changes needed</li>
                  <li>React updates only changed parts of real DOM</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Key Points */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Key Points:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>Virtual DOM is a <strong>concept</strong>, not a library or framework</li>
            <li>Virtual DOM is <strong>fast</strong> because it&apos;s just JavaScript objects</li>
            <li>React uses <strong>diffing algorithm</strong> to find what changed</li>
            <li>Only <strong>changed elements</strong> are updated in real DOM</li>
            <li>This is why React is fast even with frequent re-renders</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

