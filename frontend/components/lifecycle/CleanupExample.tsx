"use client";

import { useEffect, useState, useRef } from "react";

/**
 * CLEANUP EXAMPLE
 *
 * Demonstrates cleanup functions in useEffect:
 * - Cleanup runs before the next effect
 * - Cleanup runs on unmount
 * - Important for subscriptions, timers, event listeners
 */

export default function CleanupExample() {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Example 1: Timer cleanup
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      console.log("⏱️ Timer started");

      // Cleanup: Clear interval when component unmounts or isActive changes
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          console.log("🧹 Cleanup: Timer cleared");
        }
      };
    } else {
      // When isActive becomes false, cleanup will clear the interval
      setTimer(0);
    }
  }, [isActive]);

  // Example 2: Window event listener cleanup
  useEffect(() => {
    const handleResize = () => {
      console.log("Window resized!");
    };

    window.addEventListener("resize", handleResize);
    console.log("👂 Event listener added");

    // Cleanup: Remove event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("🧹 Cleanup: Event listener removed");
    };
  }, []); // Empty deps = only on mount/unmount

  // Example 3: Document click listener (with dependency)
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleClick = () => {
      setClickCount((prev) => prev + 1);
    };

    // Only add listener when isActive is true
    if (isActive) {
      document.addEventListener("click", handleClick);
      console.log("👆 Click listener added");

      return () => {
        document.removeEventListener("click", handleClick);
        console.log("🧹 Cleanup: Click listener removed");
      };
    }
  }, [isActive]); // Cleanup runs when isActive changes

  return (
    <div className="border-2 border-orange-500 rounded-lg p-6 bg-orange-50">
      <h2 className="text-2xl font-bold mb-4 text-orange-900">
        Cleanup Functions
      </h2>

      <div className="space-y-6">
        {/* Timer Example */}
        <div className="bg-white rounded-md p-4 border border-orange-200">
          <h3 className="font-semibold mb-3 text-orange-900">
            Example 1: Timer Cleanup
          </h3>
          <div className="flex items-center gap-4 mb-3">
            <div className="text-3xl font-bold text-orange-600">
              {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
            </div>
            <button
              onClick={() => setIsActive(!isActive)}
              className={`px-4 py-2 rounded-md text-white ${
                isActive
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isActive ? "Stop" : "Start"}
            </button>
          </div>
          <p className="text-sm text-gray-800">
            Timer cleanup prevents memory leaks when component unmounts or timer
            is stopped
          </p>
        </div>

        {/* Event Listener Example */}
        <div className="bg-white rounded-md p-4 border border-orange-200">
          <h3 className="font-semibold mb-3 text-orange-900">
            Example 2: Event Listener Cleanup
          </h3>
          <p className="text-sm text-gray-800 mb-2">
            Resize the window and check console. Cleanup removes listener on
            unmount.
          </p>
          <p className="text-sm text-gray-800">
            Click count (only when timer is active):{" "}
            <span className="font-bold text-orange-600">{clickCount}</span>
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-sm font-semibold text-yellow-900 mb-2">
            Why Cleanup is Important:
          </p>
          <ul className="text-xs text-yellow-800 space-y-1">
            <li>
              • Prevents memory leaks (event listeners, subscriptions, timers)
            </li>
            <li>• Avoids bugs from stale closures</li>
            <li>• Runs before next effect execution</li>
            <li>• Runs on component unmount</li>
            <li>• Always return cleanup function for side effects</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

