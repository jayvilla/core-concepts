"use client";

import { useState, useEffect } from "react";

/**
 * INCREMENTAL STATIC REGENERATION (ISR) EXAMPLE
 *
 * Demonstrates ISR:
 * - Combines SSG and SSR benefits
 * - Pages generated at build time (like SSG)
 * - Can regenerate in the background after a time period
 * - Serves stale content while regenerating
 * - Best of both worlds: fast + fresh
 */

export default function ISRExample() {
  const [lastRegenerated, setLastRegenerated] = useState<string | null>(null);
  const [nextRegeneration, setNextRegeneration] = useState<string | null>(null);
  const [regenerationCount, setRegenerationCount] = useState(0);

  useEffect(() => {
    // Simulate initial build time
    const buildTime = new Date();
    setLastRegenerated(buildTime.toLocaleString());
    
    // Simulate revalidation period (e.g., 60 seconds)
    const revalidateTime = new Date(buildTime.getTime() + 60000);
    setNextRegeneration(revalidateTime.toLocaleString());
    
    // Simulate regeneration on demand
    const interval = setInterval(() => {
      const now = new Date();
      if (now >= revalidateTime) {
        setLastRegenerated(now.toLocaleString());
        setRegenerationCount((prev) => prev + 1);
        const newRevalidate = new Date(now.getTime() + 60000);
        setNextRegeneration(newRevalidate.toLocaleString());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-2 border-orange-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-orange-900">
        Incremental Static Regeneration (ISR)
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="font-bold text-orange-900 mb-3">What is ISR?</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Best of SSG + SSR:</strong> Static at build, regenerates on demand
            </li>
            <li>
              Pages generated at build time (fast like SSG)
            </li>
            <li>
              Can regenerate in background after a time period
            </li>
            <li>
              Serves stale content while regenerating (no downtime)
            </li>
            <li>
              Perfect for content that updates occasionally
            </li>
          </ul>
        </div>

        {/* Interactive Example */}
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="font-bold text-orange-900 mb-3">ISR in Action:</h3>
          <div className="space-y-3">
            <div className="p-4 bg-white border border-orange-200 rounded">
              <p className="text-sm text-gray-900 mb-2">
                <strong>✅ Pre-rendered content:</strong> Generated at build time
              </p>
              {lastRegenerated && (
                <p className="text-xs text-gray-700">
                  Last regenerated: <strong>{lastRegenerated}</strong>
                </p>
              )}
              {regenerationCount > 0 && (
                <p className="text-xs text-green-700 mt-1">
                  Regenerated {regenerationCount} time(s) in background
                </p>
              )}
            </div>
            
            <div className="p-4 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900 mb-2">
                <strong>🔄 Revalidation:</strong>
              </p>
              {nextRegeneration && (
                <p className="text-xs text-gray-700">
                  Next regeneration: <strong>{nextRegeneration}</strong>
                </p>
              )}
              <p className="text-xs text-gray-700 mt-2">
                After revalidation period, page regenerates in background on next request
              </p>
            </div>
          </div>
        </div>

        {/* Characteristics */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900">Characteristics:</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-green-900 mb-2">✅ Pros:</p>
              <ul className="text-gray-900 space-y-1 list-disc list-inside">
                <li>Fast like SSG (pre-rendered)</li>
                <li>Fresh content like SSR (regenerates)</li>
                <li>No downtime during regeneration</li>
                <li>Excellent SEO</li>
                <li>Scales well (CDN + background updates)</li>
                <li>Perfect for blogs, e-commerce, news sites</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-red-900 mb-2">❌ Cons:</p>
              <ul className="text-gray-900 space-y-1 list-disc list-inside">
                <li>First request after revalidation sees stale content</li>
                <li>More complex than pure SSG</li>
                <li>Requires understanding of revalidation timing</li>
                <li>Not instant updates (depends on revalidate period)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">ISR Pattern (Next.js):</h4>
          <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`// Incremental Static Regeneration (Next.js)
export async function getStaticProps() {
  const data = await fetch('https://api.example.com/products');
  const products = await data.json();
  
  return {
    props: {
      products
    },
    // Revalidate every 60 seconds
    revalidate: 60
  };
}

export default function ProductsPage({ products }) {
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

// How it works:
// 1. Build time: Page generated with initial data
// 2. User requests page: Gets pre-rendered HTML (fast!)
// 3. After 60s: Next request triggers background regeneration
// 4. User gets stale content immediately, new version ready for next user
// 5. No downtime, always fast, always fresh`}
            </code>
          </pre>
        </div>

        {/* How It Works */}
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-teal-900">How ISR Works:</h4>
          <div className="space-y-2 text-sm text-gray-900">
            <div className="flex items-start gap-2">
              <span className="font-bold text-orange-600">1.</span>
              <div>Build time: Page generated with data → HTML file created</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-orange-600">2.</span>
              <div>User requests page: Gets pre-rendered HTML instantly (CDN)</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-orange-600">3.</span>
              <div>After revalidate period: Next request triggers background regeneration</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-orange-600">4.</span>
              <div>User gets stale content immediately (no waiting)</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-orange-600">5.</span>
              <div>New version generated in background → Ready for next user</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-orange-600">6.</span>
              <div>Subsequent users get fresh content → Cycle repeats</div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Best For:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>E-commerce product pages (inventory updates periodically)</li>
            <li>Blogs with scheduled posts</li>
            <li>News sites (content updates regularly)</li>
            <li>Documentation that updates occasionally</li>
            <li>Any site needing fast loads + fresh content</li>
            <li>Large sites where full rebuild is expensive</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

