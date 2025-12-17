"use client";

import { useEffect, useState } from "react";

/**
 * MOUNT/UNMOUNT EXAMPLE
 *
 * Demonstrates component mounting and unmounting:
 * - Show lifecycle when component is conditionally rendered
 * - Cleanup on unmount
 */

function ChildComponent({ name }: { name: string }) {
  useEffect(() => {
    console.log(`✅ Component "${name}" mounted`);
    return () => {
      console.log(`❌ Component "${name}" unmounted`);
    };
  }, [name]);

  return (
    <div className="p-4 bg-blue-100 border border-blue-300 rounded-md">
      <p className="font-semibold text-blue-900">Child Component: {name}</p>
      <p className="text-xs text-blue-700 mt-1">
        Check console for mount/unmount logs
      </p>
    </div>
  );
}

export default function MountUnmountExample() {
  const [showChild, setShowChild] = useState(false);
  const [childName, setChildName] = useState("Child 1");
  const [mountCount, setMountCount] = useState(0);

  useEffect(() => {
    if (showChild) {
      setMountCount((prev) => prev + 1);
    }
  }, [showChild]);

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-indigo-50">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        Mount & Unmount
      </h2>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowChild(!showChild)}
            className={`px-4 py-2 rounded-md text-white ${
              showChild
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {showChild ? "Unmount Component" : "Mount Component"}
          </button>
          <span className="text-sm text-gray-600">
            Mounted {mountCount} time{mountCount !== 1 ? "s" : ""}
          </span>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Child Name (changing will remount):
          </label>
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={showChild}
          />
          <p className="text-xs text-gray-600 mt-1">
            {showChild
              ? "Unmount first to change name"
              : "Change name, then mount to see new name"}
          </p>
        </div>

        {showChild && <ChildComponent name={childName} />}

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-sm font-semibold text-yellow-900 mb-2">
            Understanding Mount/Unmount:
          </p>
          <ul className="text-xs text-yellow-800 space-y-1">
            <li>
              • Mount = Component is created and inserted into DOM (useEffect
              with [] runs)
            </li>
            <li>
              • Unmount = Component is removed from DOM (cleanup function runs)
            </li>
            <li>
              • Changing a component's key will cause unmount + remount
            </li>
            <li>
              • Cleanup should remove subscriptions, timers, event listeners
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

