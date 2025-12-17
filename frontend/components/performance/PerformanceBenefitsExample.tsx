"use client";

import { useState } from "react";

/**
 * PERFORMANCE BENEFITS EXAMPLE
 *
 * Demonstrates the impact of code splitting and lazy loading:
 * - Bundle size reduction
 * - Load time improvements
 * - Network usage
 * - Real-world metrics
 */

export default function PerformanceBenefitsExample() {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        Performance Benefits
      </h2>

      <div className="space-y-6">
        {/* Bundle Size Comparison */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">Bundle Size Impact:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-3">❌ Without Code Splitting</h4>
              <div className="space-y-2 text-sm text-gray-900">
                <div>
                  <strong>Initial Bundle:</strong> 2.5 MB
                </div>
                <div>
                  <strong>All Routes:</strong> Loaded upfront
                </div>
                <div>
                  <strong>All Components:</strong> In initial bundle
                </div>
                <div>
                  <strong>Load Time:</strong> ~5-8 seconds (3G)
                </div>
                <div>
                  <strong>Time to Interactive:</strong> ~6-10 seconds
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3">✅ With Code Splitting</h4>
              <div className="space-y-2 text-sm text-gray-900">
                <div>
                  <strong>Initial Bundle:</strong> 500 KB (80% reduction!)
                </div>
                <div>
                  <strong>Route Chunks:</strong> Load on-demand
                </div>
                <div>
                  <strong>Component Chunks:</strong> Load when needed
                </div>
                <div>
                  <strong>Load Time:</strong> ~1-2 seconds (3G)
                </div>
                <div>
                  <strong>Time to Interactive:</strong> ~2-3 seconds
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Network Usage */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-3">Network Usage Comparison:</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm text-gray-900 mb-1">
                <span>Without Splitting:</span>
                <span className="font-semibold">2.5 MB upfront</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-red-500 h-4 rounded-full" style={{ width: "100%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-900 mb-1">
                <span>With Splitting (Initial):</span>
                <span className="font-semibold">500 KB upfront</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: "20%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-900 mb-1">
                <span>Additional Chunks (On-demand):</span>
                <span className="font-semibold">~200 KB per route</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-blue-500 h-4 rounded-full" style={{ width: "8%" }}></div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-700 mt-3">
            💡 Users only download what they actually use!
          </p>
        </div>

        {/* Real-World Metrics */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-bold text-yellow-900 mb-3">Real-World Impact:</h3>
          <div className="space-y-2 text-sm text-gray-900">
            <div className="flex items-center justify-between p-2 bg-white border border-yellow-200 rounded">
              <span><strong>Initial Load Time:</strong></span>
              <span className="font-semibold text-green-600">60-75% faster</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white border border-yellow-200 rounded">
              <span><strong>Time to Interactive:</strong></span>
              <span className="font-semibold text-green-600">50-70% faster</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white border border-yellow-200 rounded">
              <span><strong>Mobile Performance:</strong></span>
              <span className="font-semibold text-green-600">Significantly improved</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white border border-yellow-200 rounded">
              <span><strong>Bandwidth Usage:</strong></span>
              <span className="font-semibold text-green-600">60-80% reduction</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white border border-yellow-200 rounded">
              <span><strong>Bounce Rate:</strong></span>
              <span className="font-semibold text-green-600">20-30% reduction</span>
            </div>
          </div>
        </div>

        {/* When to Use */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">When to Use Code Splitting:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✅ Good Candidates:</h4>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>Route components</li>
                <li>Heavy third-party libraries</li>
                <li>Large feature modules</li>
                <li>Modals/dialogs</li>
                <li>Admin panels</li>
                <li>Charts/visualizations</li>
                <li>Rich text editors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">❌ Don&apos;t Split:</h4>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>Small components</li>
                <li>Frequently used components</li>
                <li>Critical above-the-fold content</li>
                <li>Components needed immediately</li>
                <li>Shared utilities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        {showComparison && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-semibold mb-3 text-gray-900">Best Practices:</h4>
            <ul className="text-sm text-gray-900 space-y-2 list-disc list-inside">
              <li>
                <strong>Start with routes:</strong> Split by route first (biggest impact)
              </li>
              <li>
                <strong>Measure first:</strong> Use tools like Lighthouse, WebPageTest to identify bottlenecks
              </li>
              <li>
                <strong>Preload critical routes:</strong> Use link prefetching for likely next pages
              </li>
              <li>
                <strong>Bundle analysis:</strong> Use webpack-bundle-analyzer to see what&apos;s in your bundles
              </li>
              <li>
                <strong>Error boundaries:</strong> Always wrap lazy components with error boundaries
              </li>
              <li>
                <strong>Loading states:</strong> Provide good fallback UI during loading
              </li>
            </ul>
          </div>
        )}

        <button
          onClick={() => setShowComparison(!showComparison)}
          className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          {showComparison ? "Hide" : "Show"} Best Practices
        </button>
      </div>
    </div>
  );
}

