"use client";

import { useState } from "react";

/**
 * INDEX VS UNIQUE ID KEYS
 *
 * Demonstrates the difference between using index vs unique ID as keys
 * Shows when each is appropriate (spoiler: index is rarely the right choice)
 */

interface User {
  id: number;
  name: string;
  email: string;
}

export default function IndexVsIdExample() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const removeFirst = () => {
    setUsers(users.slice(1));
    setEditingIndex(null);
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditName(users[index].name);
  };

  const saveEdit = () => {
    if (editingIndex !== null) {
      const newUsers = [...users];
      newUsers[editingIndex].name = editName;
      setUsers(newUsers);
      setEditingIndex(null);
    }
  };

  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        Index vs Unique ID as Keys
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Using Index (WRONG) */}
        <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
          <h3 className="font-bold text-red-900 mb-3">
            ❌ Using Index (key={"{index}"})
          </h3>
          <div className="mb-3">
            <button
              onClick={removeFirst}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 mb-3"
            >
              Remove First Item
            </button>
          </div>
          <div className="space-y-2">
            {users.map((user, index) => (
              <div
                key={index}
                className="p-3 bg-white border border-red-200 rounded"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={() => startEdit(index)}
                    className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </div>
                {editingIndex === index ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm text-gray-900"
                    />
                    <button
                      onClick={saveEdit}
                      className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                ) : null}
                <p className="text-xs text-gray-500 mt-1">Index: {index}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-xs text-gray-900">
              <strong>Problem:</strong> After removing first item, editing the
              &quot;new first item&quot; will edit the wrong user! Keys shifted.
            </p>
          </div>
        </div>

        {/* Using Unique ID (CORRECT) */}
        <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">
            ✅ Using Unique ID (key={"{user.id}"})
          </h3>
          <div className="mb-3">
            <button
              onClick={removeFirst}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 mb-3"
            >
              Remove First Item
            </button>
          </div>
          <div className="space-y-2">
            {users.map((user, index) => (
              <div
                key={user.id}
                className="p-3 bg-white border border-green-200 rounded"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={() => startEdit(index)}
                    className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </div>
                {editingIndex === index ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm text-gray-900"
                    />
                    <button
                      onClick={saveEdit}
                      className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                ) : null}
                <p className="text-xs text-gray-500 mt-1">ID: {user.id}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-xs text-gray-900">
              <strong>Works correctly:</strong> Each user has a stable ID. Removing
              items doesn&apos;t affect other items&apos; keys.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">Key Rules:</h4>
        <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
          <li>
            <strong>Use unique ID when:</strong> Items can be reordered, added, or removed
          </li>
          <li>
            <strong>Index is okay when:</strong> List is static (never changes order), items
            have no state/refs, and performance doesn&apos;t matter
          </li>
          <li>
            <strong>Best practice:</strong> Always use unique, stable IDs (database ID, UUID,
            etc.)
          </li>
          <li>
            <strong>Never use:</strong> Random values (like Math.random()) as keys - they
            change on every render!
          </li>
        </ul>
      </div>
    </div>
  );
}

