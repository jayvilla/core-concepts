"use client";

import { useState, useEffect } from "react";

/**
 * SERVER-SIDE RENDERING (SSR) EXAMPLE
 *
 * Demonstrates SSR:
 * - HTML is generated on the server for each request
 * - Full HTML sent to browser (content is ready)
 * - JavaScript hydrates the page
 * - Good for SEO and initial load
 * - Each request generates fresh HTML
 */

export default function SSRExample() {
  const [serverTime, setServerTime] = useState<string | null>(null);
  const [clientTime, setClientTime] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Simulate hydration
    setIsHydrated(true);
    setClientTime(new Date().toLocaleTimeString());
    
    // Simulate server-rendered time (would come from server in real SSR)
    setServerTime(new Date().toLocaleTimeString());
  }, []);

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        Server-Side Rendering (SSR)
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">What is SSR?</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>HTML is generated on the server</strong> for each request
            </li>
            <li>
              Full HTML with content is sent to the browser
            </li>
            <li>
              Content is immediately visible (no blank screen)
            </li>
            <li>
              JavaScript then &quot;hydrates&quot; the page for interactivity
            </li>
            <li>
              Each request gets fresh, server-rendered HTML
            </li>
          </ul>
        </div>

        {/* Interactive Example */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">SSR in Action:</h3>
          <div className="space-y-3">
            <div className="p-4 bg-white border border-green-200 rounded">
              <p className="text-sm text-gray-900 mb-2">
                <strong>Server-rendered content:</strong> This HTML was generated on the server!
              </p>
              {serverTime && (
                <p className="text-xs text-gray-700">
                  Server render time: <strong>{serverTime}</strong>
                </p>
              )}
            </div>
            
            {isHydrated ? (
              <div className="p-4 bg-white border border-blue-200 rounded">
                <p className="text-sm text-gray-900 mb-2">
                  <strong>✅ Hydrated:</strong> JavaScript has taken over (interactive now)
                </p>
                {clientTime && (
                  <p className="text-xs text-gray-700">
                    Client hydration time: <strong>{clientTime}</strong>
                  </p>
                )}
              </div>
            ) : (
              <div className="p-4 bg-white border border-gray-200 rounded">
                <p className="text-xs text-gray-600">Waiting for hydration...</p>
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
                <li>Excellent SEO (content in HTML)</li>
                <li>Fast initial page load (content ready)</li>
                <li>Works without JavaScript</li>
                <li>Fresh content on every request</li>
                <li>Good for dynamic, personalized content</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-red-900 mb-2">❌ Cons:</p>
              <ul className="text-gray-900 space-y-1 list-disc list-inside">
                <li>Slower TTFB (Time To First Byte)</li>
                <li>Server load on every request</li>
                <li>More complex infrastructure</li>
                <li>Can be slower than static for simple pages</li>
                <li>Requires server for every page load</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">SSR Pattern (Next.js):</h4>
          <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`// Server-Side Rendering (Next.js)
export async function getServerSideProps(context) {
  // Runs on server for every request
  const data = await fetch('https://api.example.com/data');
  const json = await data.json();
  
  return {
    props: {
      data: json // Sent to component as props
    }
  };
}

export default function Page({ data }) {
  // Component receives server-fetched data
  return <div>{data.content}</div>;
}

// HTML sent to browser:
// <div>Actual content here</div>
// <script src="app.js"></script>
// JavaScript hydrates for interactivity`}
            </code>
          </pre>
        </div>

        {/* Request Flow */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-purple-900">Request Flow:</h4>
          <div className="space-y-2 text-sm text-gray-900">
            <div className="flex items-start gap-2">
              <span className="font-bold text-green-600">1.</span>
              <div>User requests page → Server receives request</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-green-600">2.</span>
              <div>Server fetches data → Renders React component to HTML</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-green-600">3.</span>
              <div>Server sends complete HTML to browser</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-green-600">4.</span>
              <div>Browser displays HTML immediately (content visible)</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-green-600">5.</span>
              <div>JavaScript loads → Hydrates page (makes it interactive)</div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Best For:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>E-commerce product pages (need fresh inventory)</li>
            <li>User dashboards with personalized content</li>
            <li>Content that changes frequently</li>
            <li>Pages requiring authentication</li>
            <li>SEO-critical pages with dynamic content</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

