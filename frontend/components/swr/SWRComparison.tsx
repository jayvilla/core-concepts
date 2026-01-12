"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";

/**
 * SWR COMPARISON
 *
 * Compares SWR with traditional data fetching approaches:
 * - useState + useEffect
 * - SWR benefits
 */

const fetcher = async (url: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// Traditional approach hook
function useTraditionalFetch() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetcher("https://jsonplaceholder.typicode.com/posts/3");
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

// SWR approach hook
function useSWRFetch() {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/posts/4",
    fetcher
  );

  return { data, loading: isLoading, error: error || null };
}

export default function SWRComparison() {
  const traditional = useTraditionalFetch();
  const swr = useSWRFetch();

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        SWR vs Traditional Fetching
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">Why SWR?</h3>
          <p className="text-sm text-gray-900 mb-2">
            SWR eliminates boilerplate and provides powerful features out of the box:
          </p>
        </div>

        {/* Side by Side Comparison */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Traditional */}
          <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
            <h3 className="font-bold text-red-900 mb-3">
              ❌ Traditional (useState + useEffect)
            </h3>
            <div className="space-y-2">
              {traditional.loading && (
                <p className="text-sm text-yellow-700">⏳ Loading...</p>
              )}
              {traditional.error && (
                <p className="text-sm text-red-700">
                  ❌ Error: {traditional.error.message}
                </p>
              )}
              {traditional.data && (
                <div className="p-2 bg-white border border-red-200 rounded">
                  <p className="text-sm font-semibold text-gray-900">
                    {traditional.data.title}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-3 p-2 bg-white border border-red-200 rounded">
              <p className="text-xs text-gray-700">
                <strong>Issues:</strong>
              </p>
              <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                <li>Manual loading/error state</li>
                <li>No caching</li>
                <li>No revalidation</li>
                <li>More boilerplate</li>
              </ul>
            </div>
          </div>

          {/* SWR */}
          <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">
              ✅ SWR (useSWR)
            </h3>
            <div className="space-y-2">
              {swr.loading && (
                <p className="text-sm text-yellow-700">⏳ Loading...</p>
              )}
              {swr.error && (
                <p className="text-sm text-red-700">
                  ❌ Error: {swr.error.message}
                </p>
              )}
              {swr.data && (
                <div className="p-2 bg-white border border-green-200 rounded">
                  <p className="text-sm font-semibold text-gray-900">
                    {swr.data.title}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-3 p-2 bg-white border border-green-200 rounded">
              <p className="text-xs text-gray-700">
                <strong>Benefits:</strong>
              </p>
              <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                <li>Automatic caching</li>
                <li>Auto revalidation</li>
                <li>Less code</li>
                <li>Deduplication</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Comparison */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900">Code Comparison:</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-red-900 mb-1">
                ❌ Traditional (30+ lines):
              </p>
              <pre className="text-xs bg-white p-2 rounded border border-red-300 overflow-x-auto">
                <code className="text-gray-800">
{`const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  let cancelled = false;
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      if (!cancelled) setData(data);
    } catch (err) {
      if (!cancelled) setError(err);
    } finally {
      if (!cancelled) setLoading(false);
    }
  };
  fetchData();
  return () => { cancelled = true; };
}, []);`}
                </code>
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold text-green-900 mb-1">
                ✅ SWR (3 lines):
              </p>
              <pre className="text-xs bg-white p-2 rounded border border-green-300 overflow-x-auto">
                <code className="text-gray-800">
{`const { data, error, isLoading } = useSWR(
  '/api/user',
  fetcher
);`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900">Feature Comparison:</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Feature</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Traditional</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">SWR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Caching</td>
                  <td className="border border-gray-300 px-4 py-2">❌ Manual</td>
                  <td className="border border-gray-300 px-4 py-2">✅ Automatic</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Revalidation</td>
                  <td className="border border-gray-300 px-4 py-2">❌ Manual</td>
                  <td className="border border-gray-300 px-4 py-2">✅ Auto (focus, reconnect)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Deduplication</td>
                  <td className="border border-gray-300 px-4 py-2">❌ No</td>
                  <td className="border border-gray-300 px-4 py-2">✅ Yes</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Error Retry</td>
                  <td className="border border-gray-300 px-4 py-2">❌ Manual</td>
                  <td className="border border-gray-300 px-4 py-2">✅ Automatic</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Loading States</td>
                  <td className="border border-gray-300 px-4 py-2">⚠️ Manual</td>
                  <td className="border border-gray-300 px-4 py-2">✅ Built-in</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Code Size</td>
                  <td className="border border-gray-300 px-4 py-2">❌ 30+ lines</td>
                  <td className="border border-gray-300 px-4 py-2">✅ 3 lines</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* When to Use */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">When to Use SWR:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Perfect for:</strong> Data fetching, API calls, real-time data, caching needs
            </li>
            <li>
              <strong>Benefits:</strong> Less code, better UX, automatic optimizations
            </li>
            <li>
              <strong>Consider traditional:</strong> One-time fetches, simple cases, when you need full control
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
