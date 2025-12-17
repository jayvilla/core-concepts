"use client";

import { useState } from "react";

/**
 * WITHOUT KEYS EXAMPLE
 *
 * Demonstrates what happens when you don't use keys in lists:
 * - React can't efficiently track which items changed
 * - State gets mixed up when items are reordered
 * - Input values persist in wrong inputs
 * - Performance issues
 */

interface Item {
  id: number;
  name: string;
  completed: boolean;
}

export default function WithoutKeysExample() {
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

  const moveItemToTop = (index: number) => {
    const newItems = [...items];
    const [item] = newItems.splice(index, 1);
    newItems.unshift(item);
    setItems(newItems);
  };

  const toggleCompleted = (index: number) => {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    setItems(newItems);
  };

  return (
    <div className="border-2 border-red-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-red-900">
        ❌ Without Keys (Problems!)
      </h2>

      <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-gray-900 mb-2">
          <strong>Notice:</strong> These list items don&apos;t have keys! Try the following:
        </p>
        <ol className="text-sm text-gray-900 space-y-1 list-decimal list-inside">
          <li>Type something in an input field</li>
          <li>Click &quot;Move to Top&quot; on that item</li>
          <li>See how the input value stays with the wrong item! 🐛</li>
        </ol>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className={`p-4 border-2 rounded-lg ${
              item.completed
                ? "bg-gray-100 border-gray-300"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompleted(index)}
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
                onClick={() => moveItemToTop(index)}
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
            <p className="text-xs text-gray-700 mt-1">
              Item ID: {item.id} | Index: {index}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-yellow-900">What&apos;s Happening:</h4>
        <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
          <li>
            React uses <strong>index</strong> as the default key (implicit)
          </li>
          <li>
            When items reorder, React thinks the item at index 0 is the same item
            (even if it&apos;s different!)
          </li>
          <li>
            React reuses DOM nodes, causing state (like input values) to stick to
            the wrong element
          </li>
          <li>This causes bugs and performance issues</li>
        </ul>
      </div>
    </div>
  );
}

