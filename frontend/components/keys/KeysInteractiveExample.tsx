"use client";

import { useState } from "react";

/**
 * INTERACTIVE KEYS DEMONSTRATION
 *
 * Shows how React uses keys internally for reconciliation
 * Demonstrates the virtual DOM diffing process
 */

interface ColorItem {
  id: string;
  color: string;
  label: string;
}

export default function KeysInteractiveExample() {
  const [items, setItems] = useState<ColorItem[]>([
    { id: "red", color: "bg-red-500", label: "Red" },
    { id: "blue", color: "bg-blue-500", label: "Blue" },
    { id: "green", color: "bg-green-500", label: "Green" },
  ]);

  const [renderCount, setRenderCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  // Force re-render to show React's reconciliation
  const forceRerender = () => {
    setRenderCount((prev) => prev + 1);
  };

  const shuffleItems = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  };

  const addItem = () => {
    const colors = [
      { id: "yellow", color: "bg-yellow-500", label: "Yellow" },
      { id: "purple", color: "bg-purple-500", label: "Purple" },
      { id: "orange", color: "bg-orange-500", label: "Orange" },
    ];
    const available = colors.filter(
      (c) => !items.some((item) => item.id === c.id)
    );
    if (available.length > 0) {
      setItems([...items, available[0]]);
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        How React Uses Keys (Interactive)
      </h2>

      <div className="space-y-6">
        {/* Controls */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={shuffleItems}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Shuffle Items
            </button>
            <button
              onClick={addItem}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Random Item
            </button>
            <button
              onClick={forceRerender}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Force Re-render (Render #{renderCount})
            </button>
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              {showExplanation ? "Hide" : "Show"} Explanation
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border-2 border-gray-300 flex items-center justify-between ${item.color}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-gray-900">
                  {item.label[0]}
                </div>
                <div>
                  <p className="font-bold text-white">{item.label}</p>
                  <p className="text-xs text-white opacity-80">
                    Key: <code className="bg-white bg-opacity-30 px-1 rounded">{item.id}</code>
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-semibold mb-3 text-gray-900">
              How React Uses Keys for Reconciliation:
            </h4>
            <ol className="text-sm text-gray-900 space-y-2 list-decimal list-inside">
              <li>
                <strong>Before render:</strong> React has a virtual DOM tree with
                items having keys [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;]
              </li>
              <li>
                <strong>After render:</strong> New virtual DOM with items having keys
                [&quot;blue&quot;, &quot;green&quot;, &quot;red&quot;] (shuffled)
              </li>
              <li>
                <strong>Reconciliation:</strong> React matches keys from old to new
                tree
              </li>
              <li>
                <strong>Result:</strong> React knows &quot;blue&quot; moved from position 1 to 0,
                so it moves the DOM node instead of destroying/recreating it
              </li>
              <li>
                <strong>Performance:</strong> Only DOM moves happen, components
                don&apos;t unmount/remount (preserving state!)
              </li>
            </ol>
          </div>
        )}

        {/* Key Benefits */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Why Keys Matter:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Performance:</strong> React can efficiently update only what changed
            </li>
            <li>
              <strong>State Preservation:</strong> Component state stays with the correct element
            </li>
            <li>
              <strong>Predictable Behavior:</strong> React knows which items are which
            </li>
            <li>
              <strong>Avoiding Bugs:</strong> No mix-ups when lists are reordered
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

