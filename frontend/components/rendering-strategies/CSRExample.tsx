"use client";

import { useState, useEffect } from "react";

/**
 * CLIENT-SIDE RENDERING (CSR) EXAMPLE
 *
 * Demonstrates CSR:
 * - HTML is minimal, JavaScript renders everything
 * - Content loads after JavaScript executes
 * - Initial load shows blank/loading state
 * - Good for highly interactive apps
 * - SEO can be challenging
 */

export default function CSRExample() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [renderTime, setRenderTime] = useState<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();
    
    // Simulate API call
    setTimeout(() => {
      setData("This content was fetched and rendered on the client!");
      setLoading(false);
      const endTime = performance.now();
      setRenderTime(Math.round(endTime - startTime));
    }, 1000);
  }, []);

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        Client-Side Rendering (CSR)
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">What is CSR?</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Rendering happens in the browser</strong> after JavaScript loads
            </li>
            <li>
              Server sends minimal HTML, JavaScript bundle does the work
            </li>
            <li>
              Initial page load shows blank/loading state until JS executes
            </li>
            <li>
              Content is fetched and rendered on the client side
            </li>
            <li>
              Common in Single Page Applications (SPAs)
            </li>
          </ul>
        </div>

        {/* Interactive Example */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">CSR in Action:</h3>
          <div className="space-y-3">
            {loading ? (
              <div className="p-4 bg-white border border-blue-200 rounded">
                <p className="text-gray-600">Loading... (simulating client-side fetch)</p>
              </div>
            ) : (
              <div className="p-4 bg-white border border-green-200 rounded">
                <p className="text-gray-900 font-semibold mb-2">✅ Content Loaded!</p>
                <p className="text-sm text-gray-900">{data}</p>
                {renderTime && (
                  <p className="text-xs text-gray-700 mt-2">
                    Rendered in: <strong>{renderTime}ms</strong> (client-side)
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Characteristics */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900">Characteristics:</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-green-900 mb-2">✅ Pros:</p>
              <ul className="text-gray-900 space-y-1 list-disc list-inside">
                <li>Highly interactive</li>
                <li>Fast navigation after initial load</li>
                <li>Rich user experience</li>
                <li>No server needed for rendering</li>
                <li>Good for dashboards, admin panels</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-red-900 mb-2">❌ Cons:</p>
              <ul className="text-gray-900 space-y-1 list-disc list-inside">
                <li>Slower initial load (TTFB + JS execution)</li>
                <li>SEO challenges (content not in HTML)</li>
                <li>Blank screen on first load</li>
                <li>Requires JavaScript enabled</li>
                <li>Larger bundle size</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Typical CSR Pattern:</h4>
          <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`// Client-side rendering (React SPA)
function App() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Fetch data on client
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  if (!data) return <div>Loading...</div>;
  return <div>{data}</div>;
}

// HTML sent to browser:
// <div id="root"></div>
// <script src="app.js"></script>
// JavaScript renders everything`}
            </code>
          </pre>
        </div>

        {/* Use Cases */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Best For:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>Highly interactive applications (dashboards, admin panels)</li>
            <li>Applications where SEO is not critical</li>
            <li>Real-time data that changes frequently</li>
            <li>User-specific content that requires authentication</li>
            <li>Complex client-side routing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

