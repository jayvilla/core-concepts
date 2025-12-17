"use client";

import { useState } from "react";

/**
 * WITH KEYS EXAMPLE
 *
 * Demonstrates proper key usage:
 * - Using unique, stable IDs as keys
 * - React can correctly track which items changed
 * - State stays with the correct items
 * - Better performance
 */

interface Item {
  id: number;
  name: string;
  completed: boolean;
}

export default function WithKeysExample() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Buy groceries", completed: false },
    { id: 2, name: "Walk the dog", completed: false },
    { id: 3, name: "Finish project", completed: false },
  ]);

  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({
    1: "",
    2: "",
    3: "",
  });

  const moveItemToTop = (id: number) => {
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id === id);
    const [item] = newItems.splice(index, 1);
    newItems.unshift(item);
    setItems(newItems);
  };

  const toggleCompleted = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        ✅ With Keys (Correct!)
      </h2>

      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-gray-900 mb-2">
          <strong>Notice:</strong> These list items have proper keys (using item.id)! Try:
        </p>
        <ol className="text-sm text-gray-900 space-y-1 list-decimal list-inside">
          <li>Type something in an input field</li>
          <li>Click &quot;Move to Top&quot; on that item</li>
          <li>See how the input value stays with the correct item! ✅</li>
        </ol>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-4 border-2 rounded-lg ${
              item.completed
                ? "bg-gray-100 border-gray-300"
                : "bg-green-50 border-green-200"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompleted(item.id)}
                className="w-4 h-4"
              />
              <span
                className={`flex-1 font-medium ${
                  item.completed ? "line-through text-gray-500" : "text-gray-900"
                }`}
              >
                {item.name}
              </span>
              <button
                onClick={() => moveItemToTop(item.id)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Move to Top
              </button>
            </div>
            <input
              type="text"
              value={inputValues[item.id] || ""}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  [item.id]: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Type something here..."
            />
            <p className="text-xs text-gray-700 mt-1">Item ID: {item.id} (used as key)</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">Why This Works:</h4>
        <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
          <li>
            Using <code className="bg-gray-100 px-1 rounded">{'key={item.id}'}</code> - a unique,
            stable identifier (using the ID from your data item)
          </li>
          <li>
            React can track each item correctly, even when the list is reordered
          </li>
          <li>
            State (like input values) stays associated with the correct DOM element
          </li>
          <li>React can efficiently update only what changed</li>
        </ul>
      </div>
    </div>
  );
}

