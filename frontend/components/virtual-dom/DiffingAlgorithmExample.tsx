"use client";

import { useState } from "react";

/**
 * DIFFING ALGORITHM EXAMPLE
 *
 * Demonstrates React's diffing algorithm:
 * - How React compares trees
 * - Breadth-first diffing
 * - Heuristics used for performance
 * - Element type vs key matching
 */

export default function DiffingAlgorithmExample() {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        Diffing Algorithm
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">What is Diffing?</h3>
          <p className="text-sm text-gray-900 mb-3">
            React uses a <strong>diffing algorithm</strong> to compare the old Virtual DOM tree
            with the new one. It follows several heuristics to make this comparison efficient.
          </p>
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 text-sm"
          >
            {showComparison ? "Hide" : "Show"} Visual Comparison
          </button>
        </div>

        {/* Diffing Heuristics */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">Diffing Heuristics:</h3>
          <div className="space-y-3">
            <div className="p-3 bg-white border border-purple-200 rounded">
              <h4 className="font-semibold text-gray-900 mb-2">1. Elements of Different Types:</h4>
              <p className="text-sm text-gray-900 mb-2">
                If root elements have different types, React will tear down the old tree and build
                the new one from scratch.
              </p>
              <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                <div className="text-red-600">Old: &lt;div&gt;...&lt;/div&gt;</div>
                <div className="text-green-600">New: &lt;span&gt;...&lt;/span&gt;</div>
                <div className="text-gray-700 mt-1">→ Entire tree replaced</div>
              </div>
            </div>

            <div className="p-3 bg-white border border-purple-200 rounded">
              <h4 className="font-semibold text-gray-900 mb-2">2. Elements of Same Type:</h4>
              <p className="text-sm text-gray-900 mb-2">
                React keeps the same DOM node and only updates changed attributes/props.
              </p>
              <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                <div className="text-blue-600">Old: &lt;div className=&quot;old&quot;&gt;Hello&lt;/div&gt;</div>
                <div className="text-blue-600">New: &lt;div className=&quot;new&quot;&gt;Hello&lt;/div&gt;</div>
                <div className="text-gray-700 mt-1">→ Only className updated</div>
              </div>
            </div>

            <div className="p-3 bg-white border border-purple-200 rounded">
              <h4 className="font-semibold text-gray-900 mb-2">3. Component Elements:</h4>
              <p className="text-sm text-gray-900 mb-2">
                React updates the component instance, keeping state, and re-renders with new props.
              </p>
              <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                <div className="text-purple-600">Old: &lt;Counter count={1} /&gt;</div>
                <div className="text-purple-600">New: &lt;Counter count={2} /&gt;</div>
                <div className="text-gray-700 mt-1">→ Same component, props updated</div>
              </div>
            </div>

            <div className="p-3 bg-white border border-purple-200 rounded">
              <h4 className="font-semibold text-gray-900 mb-2">4. Keys in Lists:</h4>
              <p className="text-sm text-gray-900 mb-2">
                React uses keys to match elements between renders. Same key = same element.
              </p>
              <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                <div className="text-orange-600">Old: [key:1, key:2, key:3]</div>
                <div className="text-orange-600">New: [key:2, key:3, key:1] (shuffled)</div>
                <div className="text-gray-700 mt-1">→ Elements moved, not recreated</div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Comparison */}
        {showComparison && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-semibold mb-3 text-gray-900">Visual Diff Example:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-red-900 mb-2">Old Virtual DOM:</h5>
                <pre className="text-xs bg-white p-3 rounded border border-red-300 overflow-x-auto">
                  <code className="text-gray-800">
{`<div>
  <h1>Title</h1>
  <p>Content</p>
  <button>Click</button>
</div>`}
                  </code>
                </pre>
              </div>
              <div>
                <h5 className="font-semibold text-green-900 mb-2">New Virtual DOM:</h5>
                <pre className="text-xs bg-white p-3 rounded border border-green-300 overflow-x-auto">
                  <code className="text-gray-800">
{`<div>
  <h1>New Title</h1>
  <p>Content</p>
  <button>Click</button>
</div>`}
                  </code>
                </pre>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <h5 className="font-semibold text-yellow-900 mb-2">Diff Result:</h5>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>div: Same type → Keep</li>
                <li>h1: Same type → Update text content only</li>
                <li>p: Same type, same content → No change</li>
                <li>button: Same type, same content → No change</li>
                <li className="font-semibold">→ Only h1 text updated in real DOM!</li>
              </ul>
            </div>
          </div>
        )}

        {/* Performance Optimizations */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Performance Optimizations:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Breadth-first:</strong> React compares level by level (faster than depth-first)
            </li>
            <li>
              <strong>Early bailout:</strong> If elements are the same, React doesn&apos;t check children
            </li>
            <li>
              <strong>Key-based matching:</strong> Keys help React identify which items changed
            </li>
            <li>
              <strong>Minimal updates:</strong> Only changed attributes are updated in DOM
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

