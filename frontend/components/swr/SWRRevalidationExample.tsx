"use client";

import { useState } from "react";
import useSWR from "swr";

/**
 * SWR REVALIDATION EXAMPLE
 *
 * Demonstrates different revalidation strategies:
 * - onFocus revalidation
 * - onReconnect revalidation
 * - Interval polling
 * - Manual revalidation
 */

const fetcher = async (url: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export default function SWRRevalidationExample() {
  const [revalidateInterval, setRevalidateInterval] = useState(0);
  const [timestamp, setTimestamp] = useState(Date.now());

  // SWR with different revalidation options
  const { data, error, isLoading, mutate } = useSWR(
    "https://jsonplaceholder.typicode.com/posts/2",
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: revalidateInterval > 0 ? revalidateInterval * 1000 : 0,
      dedupingInterval: 2000, // Dedupe requests within 2 seconds
    }
  );

  const handleManualRevalidate = () => {
    setTimestamp(Date.now());
    mutate();
  };

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        SWR Revalidation Strategies
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">
            Revalidation Strategies
          </h3>
          <p className="text-sm text-gray-900 mb-2">
            SWR provides multiple ways to keep your data fresh:
          </p>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>onFocus:</strong> Revalidates when window regains focus
            </li>
            <li>
              <strong>onReconnect:</strong> Revalidates when network reconnects
            </li>
            <li>
              <strong>Interval:</strong> Polls at specified intervals
            </li>
            <li>
              <strong>Manual:</strong> Trigger revalidation programmatically
            </li>
          </ul>
        </div>

        {/* Data Display */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-3">Post Data:</h3>
          
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
                Last fetched: {new Date(timestamp).toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">Revalidation Controls:</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                Polling Interval: {revalidateInterval > 0 ? `${revalidateInterval}s` : "Disabled"}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={revalidateInterval}
                onChange={(e) => setRevalidateInterval(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>Off</span>
                <span>10s</span>
              </div>
              <p className="text-xs text-gray-700 mt-2">
                💡 Set to 0 to disable polling. Higher values poll less frequently.
              </p>
            </div>

            <div>
              <button
                onClick={handleManualRevalidate}
                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
              >
                Manual Revalidate
              </button>
              <p className="text-xs text-gray-700 mt-2">
                💡 Click to manually trigger revalidation
              </p>
            </div>
          </div>
        </div>

        {/* Revalidation Options */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Revalidation Options:</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Option</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                    revalidateOnFocus
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Revalidate when window regains focus
                  </td>
                  <td className="border border-gray-300 px-4 py-2">true</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                    revalidateOnReconnect
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Revalidate when network reconnects
                  </td>
                  <td className="border border-gray-300 px-4 py-2">true</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                    refreshInterval
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Polling interval in milliseconds
                  </td>
                  <td className="border border-gray-300 px-4 py-2">0 (disabled)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                    dedupingInterval
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Dedupe requests within this interval
                  </td>
                  <td className="border border-gray-300 px-4 py-2">2000ms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Code Example:</h4>
          <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`const { data } = useSWR('/api/user', fetcher, {
  revalidateOnFocus: true,      // Revalidate on window focus
  revalidateOnReconnect: true,   // Revalidate on network reconnect
  refreshInterval: 5000,         // Poll every 5 seconds
  dedupingInterval: 2000,        // Dedupe within 2 seconds
});`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
