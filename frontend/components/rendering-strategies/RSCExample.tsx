"use client";

/**
 * REACT SERVER COMPONENTS (RSC) EXAMPLE
 *
 * Demonstrates RSC:
 * - Components run on the server by default
 * - Can fetch data directly in components
 * - No client-side JavaScript for server components
 * - Client components marked with "use client"
 * - Better performance and smaller bundles
 */

export default function RSCExample() {
  return (
    <div className="border-2 border-pink-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-pink-900">
        React Server Components (RSC)
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
          <h3 className="font-bold text-pink-900 mb-3">What are React Server Components?</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Components run on the server</strong> by default (Next.js 13+)
            </li>
            <li>
              Can fetch data directly in components (no useEffect, no getServerSideProps)
            </li>
            <li>
              Server components don&apos;t send JavaScript to client (smaller bundles)
            </li>
            <li>
              Client components marked with <code className="bg-gray-100 px-1 rounded">&quot;use client&quot;</code>
            </li>
            <li>
              Automatic code splitting and optimization
            </li>
          </ul>
        </div>

        {/* Interactive Example */}
        <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
          <h3 className="font-bold text-pink-900 mb-3">RSC in Action:</h3>
          <div className="space-y-3">
            <div className="p-4 bg-white border border-pink-200 rounded">
              <p className="text-sm text-gray-900 mb-2">
                <strong>✅ Server Component:</strong> This component runs on the server
              </p>
              <p className="text-xs text-gray-700">
                No JavaScript sent to client for server components. Data fetched on server.
              </p>
            </div>
            
            <div className="p-4 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900 mb-2">
                <strong>⚡ Benefits:</strong>
              </p>
              <ul className="text-xs text-gray-900 space-y-1 list-disc list-inside">
                <li>Smaller JavaScript bundles (server components not included)</li>
                <li>Direct database access in components</li>
                <li>Better security (sensitive code stays on server)</li>
                <li>Improved performance (less client-side work)</li>
              </ul>
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
                <li>Smaller bundle sizes (server components excluded)</li>
                <li>Direct data fetching in components</li>
                <li>Better security (server-only code)</li>
                <li>Improved performance</li>
                <li>Automatic code splitting</li>
                <li>Access to server-only APIs (databases, file system)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-red-900 mb-2">❌ Cons:</p>
              <ul className="text-gray-900 space-y-1 list-disc list-inside">
                <li>Learning curve (new paradigm)</li>
                <li>Requires Next.js 13+ (App Router)</li>
                <li>Can&apos;t use browser APIs in server components</li>
                <li>No interactivity in server components</li>
                <li>Need to understand client vs server boundaries</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">RSC Pattern (Next.js App Router):</h4>
          <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`// Server Component (default in App Router)
// app/products/page.tsx
async function ProductsPage() {
  // Direct data fetching - no useEffect, no getServerSideProps!
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();
  
  return (
    <div>
      <h1>Products</h1>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      {/* Interactive parts need Client Component */}
      <AddToCartButton productId={product.id} />
    </div>
  );
}

// Client Component (for interactivity)
// components/AddToCartButton.tsx
"use client"; // This directive makes it a client component

import { useState } from 'react';

export function AddToCartButton({ productId }) {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Add to Cart ({count})
    </button>
  );
}

// Server Component (no directive needed)
// components/ProductCard.tsx
export function ProductCard({ product }) {
  // Can fetch more data here if needed
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
    </div>
  );
}`}
            </code>
          </pre>
        </div>

        {/* Key Concepts */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-indigo-900">Key Concepts:</h4>
          <div className="space-y-3 text-sm text-gray-900">
            <div>
              <p className="font-semibold mb-1">Server Components (Default):</p>
              <ul className="text-xs space-y-1 list-disc list-inside ml-2">
                <li>Run on server only</li>
                <li>Can fetch data directly (async/await)</li>
                <li>No JavaScript sent to client</li>
                <li>Can access databases, file system, etc.</li>
                <li>Cannot use hooks, event handlers, or browser APIs</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-1">Client Components (<code className="bg-gray-100 px-1 rounded">&quot;use client&quot;</code>):</p>
              <ul className="text-xs space-y-1 list-disc list-inside ml-2">
                <li>Run in browser</li>
                <li>Can use hooks, state, event handlers</li>
                <li>JavaScript sent to client</li>
                <li>For interactive features</li>
                <li>Can import server components (but they become client)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-1">Component Tree:</p>
              <ul className="text-xs space-y-1 list-disc list-inside ml-2">
                <li>Server components can render client components</li>
                <li>Client components cannot directly render server components</li>
                <li>Server components pass data as props to client components</li>
                <li>Automatic code splitting at component boundaries</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-teal-900">RSC vs Traditional React:</h4>
          <div className="space-y-2 text-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Traditional React:</p>
                <ul className="text-gray-900 space-y-1 list-disc list-inside text-xs">
                  <li>All components run on client</li>
                  <li>Need useEffect for data fetching</li>
                  <li>Larger JavaScript bundles</li>
                  <li>Data fetching in client (slower)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">React Server Components:</p>
                <ul className="text-gray-900 space-y-1 list-disc list-inside text-xs">
                  <li>Server components run on server</li>
                  <li>Direct async data fetching</li>
                  <li>Smaller bundles (server code excluded)</li>
                  <li>Data fetching on server (faster)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Best For:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>Next.js 13+ App Router applications</li>
            <li>Applications needing direct database access</li>
            <li>Content-heavy sites (blogs, documentation)</li>
            <li>Applications where bundle size matters</li>
            <li>Modern React applications (Next.js recommended)</li>
            <li>When you want automatic code splitting</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

