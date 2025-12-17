"use client";

import { useState } from "react";

/**
 * RECONCILIATION EXAMPLE
 *
 * Demonstrates React's reconciliation process:
 * - How React compares old and new Virtual DOM trees
 * - How React decides what to update
 * - Element type matching
 * - Key-based reconciliation
 */

export default function ReconciliationExample() {
  const [items, setItems] = useState([
    { id: 1, name: "Apple", color: "red" },
    { id: 2, name: "Banana", color: "yellow" },
    { id: 3, name: "Orange", color: "orange" },
  ]);
  const [counter, setCounter] = useState(0);

  const addItem = () => {
    const newId = Math.max(...items.map((i) => i.id)) + 1;
    setItems([...items, { id: newId, name: `Item ${newId}`, color: "blue" }]);
  };

  const removeFirst = () => {
    setItems(items.slice(1));
  };

  const shuffle = () => {
    setItems([...items].sort(() => Math.random() - 0.5));
  };

  const updateFirst = () => {
    setItems(items.map((item, index) => 
      index === 0 ? { ...item, name: `${item.name} (Updated)` } : item
    ));
  };

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        Reconciliation Process
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">What is Reconciliation?</h3>
          <p className="text-sm text-gray-900 mb-3">
            Reconciliation is React&apos;s process of comparing the old Virtual DOM tree with the
            new one and determining the most efficient way to update the real DOM.
          </p>
        </div>

        {/* Controls */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">Try These Actions:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={addItem}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Item
            </button>
            <button
              onClick={removeFirst}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove First
            </button>
            <button
              onClick={shuffle}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Shuffle
            </button>
            <button
              onClick={updateFirst}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Update First Item
            </button>
            <button
              onClick={() => setCounter((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Update Counter ({counter})
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">Items List:</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white border-2 border-green-300 rounded flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <span className="text-xs text-gray-600">(ID: {item.id})</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-700 mt-3">
            💡 React uses keys (item.id) to match elements between renders. This allows React to
            efficiently update, move, or remove elements without recreating them.
          </p>
        </div>

        {/* Reconciliation Steps */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900">How React Reconciles:</h4>
          <div className="space-y-3">
            <div className="p-3 bg-white border border-gray-300 rounded">
              <h5 className="font-semibold text-gray-900 mb-2">1. Element Type Comparison:</h5>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside ml-2">
                <li>If type changed → Unmount old, mount new</li>
                <li>If type same → Update props only</li>
              </ul>
            </div>
            <div className="p-3 bg-white border border-gray-300 rounded">
              <h5 className="font-semibold text-gray-900 mb-2">2. Key Matching (for lists):</h5>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside ml-2">
                <li>React matches elements by key</li>
                <li>Same key = same element (update)</li>
                <li>Different key = different element (replace)</li>
                <li>Missing key = new element (mount)</li>
              </ul>
            </div>
            <div className="p-3 bg-white border border-gray-300 rounded">
              <h5 className="font-semibold text-gray-900 mb-2">3. Prop Updates:</h5>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside ml-2">
                <li>React compares props (shallow comparison)</li>
                <li>Only updates changed props</li>
                <li>Minimizes DOM operations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Example Scenarios */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-blue-900">Example Scenarios:</h4>
          <div className="space-y-2 text-sm text-gray-900">
            <div>
              <strong>Add Item:</strong> React adds new DOM element for new item (same type, new key)
            </div>
            <div>
              <strong>Remove First:</strong> React removes DOM element, shifts remaining (keys help identify which to remove)
            </div>
            <div>
              <strong>Shuffle:</strong> React moves existing DOM elements (keys help identify which elements moved)
            </div>
            <div>
              <strong>Update First:</strong> React updates only the changed props/text of existing element (same key, same type)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

