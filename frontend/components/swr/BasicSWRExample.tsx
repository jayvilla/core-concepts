"use client";

import useSWR from "swr";

/**
 * BASIC SWR EXAMPLE
 *
 * Demonstrates core SWR concepts:
 * - Data fetching with useSWR
 * - Automatic caching
 * - Loading and error states
 * - Revalidation on focus
 */

// Fetcher function - SWR requires a fetcher
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
};

export default function BasicSWRExample() {
  // Basic SWR usage
  const { data, error, isLoading, mutate } = useSWR(
    "https://jsonplaceholder.typicode.com/posts/1",
    fetcher
  );

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        Basic SWR Example
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">What is SWR?</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>SWR</strong> = Stale-While-Revalidate (HTTP cache invalidation strategy)
            </li>
            <li>
              Returns cached data immediately (stale), then fetches fresh data (revalidate)
            </li>
            <li>
              Automatic caching, revalidation, error handling, and loading states
            </li>
            <li>
              Built by Vercel - lightweight and performant
            </li>
          </ul>
        </div>

        {/* Data Display */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-3">Fetched Data:</h3>
          
          {isLoading && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-900">⏳ Loading...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-900">❌ Error: {error.message}</p>
            </div>
          )}

          {data && (
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <h4 className="font-semibold text-gray-900 mb-2">
                {data.title}
              </h4>
              <p className="text-sm text-gray-700">{data.body}</p>
              <p className="text-xs text-gray-600 mt-2">
                Post ID: {data.id} | User ID: {data.userId}
              </p>
            </div>
          )}
        </div>

        {/* Manual Revalidation */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">Manual Revalidation:</h3>
          <button
            onClick={() => mutate()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Revalidate Data
          </button>
          <p className="text-xs text-gray-700 mt-2">
            💡 Click to manually trigger a revalidation. SWR also automatically
            revalidates on window focus, network reconnect, and interval.
          </p>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Code Example:</h4>
          <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

function MyComponent() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/user',
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  
  return <div>{data.name}</div>;
}`}
            </code>
          </pre>
        </div>

        {/* Key Features */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Key Features:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Automatic Caching:</strong> Data is cached by key
            </li>
            <li>
              <strong>Revalidation:</strong> Automatically refetches on focus, reconnect, interval
            </li>
            <li>
              <strong>Deduplication:</strong> Multiple components using same key share one request
            </li>
            <li>
              <strong>Error Retry:</strong> Automatically retries failed requests
            </li>
            <li>
              <strong>TypeScript Support:</strong> Full TypeScript support out of the box
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
