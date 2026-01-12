"use client";

import { useState } from "react";
import useSWR from "swr";

/**
 * SWR PAGINATION EXAMPLE
 *
 * Demonstrates pagination with SWR:
 * - Dynamic key based on page number
 * - Previous/Next navigation
 * - Loading states per page
 */

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export default function SWRPaginationExample() {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // SWR key changes with page number
  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`,
    fetcher
  );

  return (
    <div className="border-2 border-orange-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-orange-900">
        Pagination with SWR
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="font-bold text-orange-900 mb-3">Pagination Strategy</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              Change SWR key based on page number
            </li>
            <li>
              Each page is cached separately
            </li>
            <li>
              Previous pages remain in cache for instant navigation
            </li>
            <li>
              SWR automatically handles loading and error states
            </li>
          </ul>
        </div>

        {/* Posts List */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-3">
            Page {page} Posts:
          </h3>
          
          {isLoading && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-900">⏳ Loading page {page}...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-900">❌ Error: {error.message}</p>
            </div>
          )}

          {data && (
            <div className="space-y-2">
              {data.map((post: any) => (
                <div
                  key={post.id}
                  className="p-3 bg-white border border-gray-200 rounded"
                >
                  <h4 className="font-semibold text-gray-900">{post.title}</h4>
                  <p className="text-sm text-gray-700">{post.body}</p>
                  <p className="text-xs text-gray-600 mt-1">ID: {post.id}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="font-bold text-orange-900 mb-3">Navigation:</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <span className="text-lg font-bold text-gray-900">
              Page {page}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={isLoading}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
          <p className="text-xs text-gray-700 mt-2">
            💡 Navigate between pages. Notice how previously visited pages load instantly from cache!
          </p>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Code Example:</h4>
          <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`const [page, setPage] = useState(1);

// SWR key changes with page
const { data, error, isLoading } = useSWR(
  \`/api/posts?page=\${page}&limit=10\`,
  fetcher
);

// Navigation
<button onClick={() => setPage(p => p - 1)}>Previous</button>
<button onClick={() => setPage(p => p + 1)}>Next</button>`}
            </code>
          </pre>
        </div>

        {/* Key Points */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Key Points:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              Each page gets its own cache entry (different key)
            </li>
            <li>
              Previous pages stay cached for instant back navigation
            </li>
            <li>
              Use <code className="bg-yellow-100 px-1 rounded">useSWRInfinite</code> for infinite scroll
            </li>
            <li>
              Consider prefetching next page on hover for better UX
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
