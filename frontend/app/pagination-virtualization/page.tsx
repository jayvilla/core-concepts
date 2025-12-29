import Link from "next/link";
import PaginationExample from "@/components/pagination-virtualization/PaginationExample";
import VirtualizationExample from "@/components/pagination-virtualization/VirtualizationExample";
import ComparisonExample from "@/components/pagination-virtualization/ComparisonExample";

export default function PaginationVirtualizationPage() {
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
              Pagination vs Virtualization
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Learn the difference between pagination and virtualization for handling large datasets. Understand when to use each approach and their performance implications.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <PaginationExample />
          <VirtualizationExample />
          <ComparisonExample />
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
                <li>&quot;What&apos;s the difference between pagination and virtualization?&quot;</li>
                <li>&quot;When would you use pagination vs virtualization?&quot;</li>
                <li>&quot;What are the performance implications of each?&quot;</li>
                <li>&quot;How does virtualization work?&quot;</li>
                <li>&quot;What are the trade-offs between these approaches?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Pagination:</strong> Divides data into pages. User navigates between pages. Only loads current page data. Better for server-side data, search results, when users need to jump to specific pages. Simpler to implement.
                </li>
                <li>
                  <strong>Virtualization:</strong> Renders only visible items in viewport. Dynamically loads/unloads items as user scrolls. Better for client-side data, infinite scroll, when users need to see all data in one continuous list. More complex but better UX for large lists.
                </li>
                <li>
                  <strong>Performance:</strong> Pagination reduces initial load and DOM nodes. Virtualization maintains constant DOM size regardless of data size. Both improve performance but in different ways.
                </li>
                <li>
                  <strong>Use Pagination When:</strong> Data is server-side, users need to jump to specific pages, data needs to be searchable/filterable, you want predictable page loads.
                </li>
                <li>
                  <strong>Use Virtualization When:</strong> Data is client-side, you want infinite scroll, users need to see all data, you have thousands of items, smooth scrolling is important.
                </li>
                <li>
                  <strong>Best Practices:</strong> Pagination: Show page numbers, total count, allow page size selection. Virtualization: Use libraries like react-window or react-virtualized, implement proper item height calculation, handle dynamic heights carefully.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Comparison Table:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Aspect</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Pagination</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Virtualization</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Data Source</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Server-side</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Client-side</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">DOM Nodes</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">One page worth</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Only visible items</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">User Navigation</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Page numbers, prev/next</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Scroll</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Initial Load</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Fast (one page)</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Fast (visible items)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Memory Usage</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Low (one page)</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Low (visible items)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Best For</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Search results, tables, data grids</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Long lists, infinite scroll</td>
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

