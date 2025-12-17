"use client";

import { useState } from "react";

/**
 * CODE SPLITTING EXAMPLE
 *
 * Demonstrates code splitting with dynamic imports:
 * - Split code into smaller chunks
 * - Load code only when needed
 * - Reduce initial bundle size
 * - Improve initial page load time
 */

// Heavy component that we'll lazy load
function HeavyComponent() {
  return (
    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h3 className="font-bold text-purple-900 mb-2">Heavy Component Loaded!</h3>
      <p className="text-sm text-gray-900">
        This component is loaded dynamically. It wasn&apos;t included in the initial bundle.
      </p>
      <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
        <p className="text-xs text-gray-700">
          💡 Check Network tab - you&apos;ll see a new chunk loaded when this component appears!
        </p>
      </div>
    </div>
  );
}

export default function CodeSplittingExample() {
  const [showHeavy, setShowHeavy] = useState(false);
  const [HeavyComponentDynamic, setHeavyComponentDynamic] = useState<React.ComponentType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic import - loads component only when needed
  const loadHeavyComponent = async () => {
    setIsLoading(true);
    try {
      // Simulate dynamic import (in real app, this would be React.lazy)
      // For demonstration, we'll use a timeout to simulate loading
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In real app: const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
      setHeavyComponentDynamic(() => HeavyComponent);
      setShowHeavy(true);
    } catch (error) {
      console.error("Failed to load component:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        Code Splitting with Dynamic Imports
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">What is Code Splitting?</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              Split your code into smaller chunks (bundles)
            </li>
            <li>
              Load code only when it&apos;s needed (on-demand)
            </li>
            <li>
              Reduces initial bundle size
            </li>
            <li>
              Improves initial page load time
            </li>
            <li>
              Better user experience, especially on slow connections
            </li>
          </ul>
        </div>

        {/* Interactive Example */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">Try It:</h3>
          <div className="space-y-3">
            {!showHeavy ? (
              <button
                onClick={loadHeavyComponent}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Loading Component..." : "Load Heavy Component"}
              </button>
            ) : (
              <div>
                {HeavyComponentDynamic && <HeavyComponentDynamic />}
                <button
                  onClick={() => {
                    setShowHeavy(false);
                    setHeavyComponentDynamic(null);
                  }}
                  className="mt-3 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Unload Component
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Code Examples */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900">How to Implement:</h4>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-red-900 mb-1">❌ Without Code Splitting:</p>
              <pre className="text-xs bg-white p-2 rounded border border-red-300 overflow-x-auto">
                <code className="text-gray-800">
{`// All code in one bundle
import HeavyComponent from './HeavyComponent';

function App() {
  return <HeavyComponent />;
}`}
                </code>
              </pre>
              <p className="text-xs text-gray-700 mt-1">
                Entire app loads upfront, even if user never sees HeavyComponent
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-green-900 mb-1">✅ With Code Splitting:</p>
              <pre className="text-xs bg-white p-2 rounded border border-green-300 overflow-x-auto">
                <code className="text-gray-800">
{`// Component loaded on-demand
const HeavyComponent = React.lazy(
  () => import('./HeavyComponent')
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}`}
                </code>
              </pre>
              <p className="text-xs text-gray-700 mt-1">
                Component only loads when needed - separate chunk created
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-green-900">Benefits:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Smaller initial bundle:</strong> Only essential code loads first
            </li>
            <li>
              <strong>Faster initial load:</strong> Less JavaScript to parse and execute
            </li>
            <li>
              <strong>Better performance:</strong> Load code when user actually needs it
            </li>
            <li>
              <strong>Improved UX:</strong> Faster time to interactive (TTI)
            </li>
            <li>
              <strong>Bandwidth savings:</strong> Users only download what they use
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

