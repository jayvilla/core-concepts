import Link from "next/link";
import BasicSWRExample from "@/components/swr/BasicSWRExample";
import SWRRevalidationExample from "@/components/swr/SWRRevalidationExample";
import SWRMutationExample from "@/components/swr/SWRMutationExample";
import SWROptimisticUpdateExample from "@/components/swr/SWROptimisticUpdateExample";
import SWRPaginationExample from "@/components/swr/SWRPaginationExample";
import SWRInfiniteExample from "@/components/swr/SWRInfiniteExample";
import SWRComparison from "@/components/swr/SWRComparison";

export default function SWRPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              SWR: Data Fetching & Caching
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Master SWR (stale-while-revalidate) for efficient data fetching in React. Learn caching, revalidation, mutations, optimistic updates, and advanced patterns for production applications.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <BasicSWRExample />
          <SWRRevalidationExample />
          <SWRMutationExample />
          <SWROptimisticUpdateExample />
          <SWRPaginationExample />
          <SWRInfiniteExample />
          <SWRComparison />
        </div>

        {/* Interview Tips */}
        <div className="mt-8 p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            💡 Interview Tips
          </h2>
          <div className="space-y-4 text-gray-900">
            <div>
              <p className="font-semibold mb-2">Common Questions:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>&quot;What is SWR and why use it?&quot;</li>
                <li>&quot;How does SWR handle caching?&quot;</li>
                <li>&quot;What is stale-while-revalidate?&quot;</li>
                <li>&quot;How do you handle mutations with SWR?&quot;</li>
                <li>&quot;What are optimistic updates?&quot;</li>
                <li>&quot;How does SWR differ from React Query?&quot;</li>
                <li>&quot;When would you use useSWRInfinite?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>What is SWR:</strong> SWR (stale-while-revalidate) is a React data fetching library by Vercel. It provides automatic caching, revalidation, error handling, and loading states. The name comes from the HTTP cache invalidation strategy: return cached (stale) data immediately, then fetch fresh data in the background.
                </li>
                <li>
                  <strong>Why use SWR:</strong> Eliminates boilerplate code (no manual useState/useEffect for fetching), provides automatic caching and revalidation, deduplicates requests, handles error retries, and improves UX with instant cached data.
                </li>
                <li>
                  <strong>Caching Strategy:</strong> SWR caches data by key. Multiple components using the same key share one request (deduplication). Cache persists across re-renders and can be manually invalidated with <code className="bg-gray-100 px-1 rounded">mutate()</code>.
                </li>
                <li>
                  <strong>Revalidation:</strong> SWR automatically revalidates data on window focus, network reconnect, and at configurable intervals. This keeps data fresh without manual intervention. Can be disabled or customized per hook.
                </li>
                <li>
                  <strong>Mutations:</strong> Use <code className="bg-gray-100 px-1 rounded">useSWRMutation</code> for POST/PUT/DELETE operations. It doesn&apos;t fetch on mount - only when triggered. After mutations, use <code className="bg-gray-100 px-1 rounded">mutate()</code> to invalidate and refetch related data.
                </li>
                <li>
                  <strong>Optimistic Updates:</strong> Update UI immediately before API call completes. If API fails, SWR automatically rolls back. Use <code className="bg-gray-100 px-1 rounded">optimisticData</code> and <code className="bg-gray-100 px-1 rounded">rollbackOnError</code> options. Great for likes, follows, toggles.
                </li>
                <li>
                  <strong>Pagination:</strong> Change SWR key based on page number. Each page is cached separately. Use <code className="bg-gray-100 px-1 rounded">useSWRInfinite</code> for infinite scroll - it manages multiple pages and provides <code className="bg-gray-100 px-1 rounded">setSize()</code> to load more.
                </li>
                <li>
                  <strong>SWR vs React Query:</strong> Both solve similar problems. SWR is lighter, simpler API, built by Vercel. React Query has more features (devtools, mutations, infinite queries). Choose based on project needs. Both are excellent choices.
                </li>
                <li>
                  <strong>Best Practices:</strong> Use consistent key patterns, implement proper error boundaries, use TypeScript for type safety, configure revalidation appropriately, implement optimistic updates for better UX, use <code className="bg-gray-100 px-1 rounded">useSWRInfinite</code> for infinite lists.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Core Concepts to Master:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Concept</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Hook/API</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Data Fetching
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                        useSWR
                      </td>
                      <td className="border border-gray-300 px-4 py-2">GET requests, data fetching</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Mutations
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                        useSWRMutation
                      </td>
                      <td className="border border-gray-300 px-4 py-2">POST, PUT, DELETE operations</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Infinite Loading
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                        useSWRInfinite
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Infinite scroll, load more</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Cache Invalidation
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                        mutate()
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Refresh data after mutations</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Optimistic Updates
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                        optimisticData
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Instant UI updates</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
