import Link from "next/link";
import CodeSplittingExample from "@/components/performance/CodeSplittingExample";
import LazyLoadingExample from "@/components/performance/LazyLoadingExample";
import RouteBasedSplittingExample from "@/components/performance/RouteBasedSplittingExample";
import PerformanceBenefitsExample from "@/components/performance/PerformanceBenefitsExample";

export default function PerformancePage() {
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
              Performance Optimization: Code Splitting & Lazy Loading
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Learn how to optimize React applications with code splitting and lazy loading.
              Reduce bundle sizes, improve load times, and enhance user experience.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <CodeSplittingExample />
          <LazyLoadingExample />
          <RouteBasedSplittingExample />
          <PerformanceBenefitsExample />
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
                <li>&quot;What is code splitting?&quot;</li>
                <li>&quot;How do you implement lazy loading in React?&quot;</li>
                <li>&quot;What is React.lazy and Suspense?&quot;</li>
                <li>&quot;How does code splitting improve performance?&quot;</li>
                <li>&quot;When should you use code splitting?&quot;</li>
                <li>&quot;What&apos;s the difference between code splitting and lazy loading?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Code Splitting:</strong> Technique to split your code into smaller chunks
                  (bundles). Instead of one large bundle, you create multiple smaller bundles that
                  load on-demand. Reduces initial bundle size and improves load time.
                </li>
                <li>
                  <strong>Lazy Loading:</strong> Loading code/components only when they&apos;re needed,
                  not upfront. React.lazy() enables lazy loading of components. Works with Suspense
                  to show loading states.
                </li>
                <li>
                  <strong>React.lazy:</strong> Function that lets you load components on-demand using
                  dynamic import(). Returns a component that loads when first rendered. Only works
                  with default exports. Creates separate bundle chunk automatically.
                </li>
                <li>
                  <strong>Suspense:</strong> Component that lets you specify fallback UI while lazy
                  components are loading. Required when using React.lazy. Shows fallback during
                  component loading, then renders component when ready.
                </li>
                <li>
                  <strong>Route-Based Splitting:</strong> Split code by routes - each route becomes
                  separate bundle. Common pattern in Next.js (automatic) and React Router (manual
                  with React.lazy). Biggest performance impact for multi-page apps.
                </li>
                <li>
                  <strong>Performance Benefits:</strong> Smaller initial bundle (60-80% reduction),
                  faster initial load (60-75% faster), better Time to Interactive, reduced bandwidth
                  usage, improved mobile performance, lower bounce rates.
                </li>
                <li>
                  <strong>When to Use:</strong> Route components, heavy third-party libraries, large
                  feature modules, modals/dialogs, admin panels, charts/visualizations. Don&apos;t split:
                  small components, frequently used components, critical above-the-fold content.
                </li>
                <li>
                  <strong>Best Practices:</strong> Start with route-based splitting (biggest impact),
                  measure with Lighthouse/WebPageTest, use error boundaries with lazy components,
                  provide good loading fallbacks, analyze bundles with webpack-bundle-analyzer.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Implementation Patterns:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Pattern</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Use Case</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Route-Based
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Multi-page apps</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                        React.lazy(() =&gt; import(&apos;./pages/About&apos;))
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Component-Based
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Heavy components</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                        React.lazy(() =&gt; import(&apos;./Chart&apos;))
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Library-Based
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Large libraries</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                        const Chart = lazy(() =&gt; import(&apos;chart.js&apos;))
                      </td>
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

