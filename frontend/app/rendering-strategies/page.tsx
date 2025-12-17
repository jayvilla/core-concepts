import Link from "next/link";
import CSRExample from "@/components/rendering-strategies/CSRExample";
import SSRExample from "@/components/rendering-strategies/SSRExample";
import SSGExample from "@/components/rendering-strategies/SSGExample";
import ISRExample from "@/components/rendering-strategies/ISRExample";
import RSCExample from "@/components/rendering-strategies/RSCExample";
import RenderingStrategiesComparison from "@/components/rendering-strategies/RenderingStrategiesComparison";

export default function RenderingStrategiesPage() {
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
              Rendering Strategies
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Master different rendering strategies: CSR, SSR, SSG, ISR, and React Server Components.
              Learn when to use each approach for optimal performance and user experience.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <CSRExample />
          <SSRExample />
          <SSGExample />
          <ISRExample />
          <RSCExample />
          <RenderingStrategiesComparison />
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
                <li>&quot;What&apos;s the difference between SSR and SSG?&quot;</li>
                <li>&quot;When would you use ISR over SSG?&quot;</li>
                <li>&quot;What are React Server Components?&quot;</li>
                <li>&quot;How does CSR differ from SSR?&quot;</li>
                <li>&quot;What are the trade-offs of each rendering strategy?&quot;</li>
                <li>&quot;How do you decide which rendering strategy to use?&quot;</li>
                <li>&quot;What is hydration in the context of SSR?&quot;</li>
                <li>&quot;Explain the benefits of ISR.&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>CSR (Client-Side Rendering):</strong> HTML is minimal, JavaScript renders
                  everything in the browser. Good for interactive apps, but slower initial load and
                  poor SEO. Common in SPAs. Think: React app with useEffect fetching data.
                </li>
                <li>
                  <strong>SSR (Server-Side Rendering):</strong> HTML is generated on the server for
                  each request. Full HTML sent to browser, then JavaScript hydrates. Excellent SEO,
                  fast initial load, but slower TTFB and server load on every request. Think:
                  Next.js getServerSideProps.
                </li>
                <li>
                  <strong>SSG (Static Site Generation):</strong> HTML is generated at build time.
                  Pre-rendered files served from CDN. Fastest possible load, excellent SEO, but
                  content is static until rebuild. Perfect for blogs, docs. Think: Next.js
                  getStaticProps.
                </li>
                <li>
                  <strong>ISR (Incremental Static Regeneration):</strong> Combines SSG and SSR. Pages
                  generated at build time, but can regenerate in background after a time period.
                  Serves stale content while regenerating. Best of both worlds. Think: Next.js
                  getStaticProps with revalidate.
                </li>
                <li>
                  <strong>RSC (React Server Components):</strong> Components run on server by
                  default in Next.js 13+ App Router. Can fetch data directly in components. No
                  JavaScript sent for server components (smaller bundles). Client components marked
                  with &quot;use client&quot;. Think: async components fetching data directly.
                </li>
                <li>
                  <strong>Decision Factors:</strong> Content freshness needs, SEO requirements,
                  performance goals, server costs, build time constraints. Use SSG for static content,
                  SSR for dynamic per-request, ISR for periodic updates, CSR for no-SEO apps, RSC
                  for Next.js 13+.
                </li>
                <li>
                  <strong>Performance:</strong> SSG/ISR fastest initial load, SSR good for SEO and
                  fresh content, CSR fastest after initial load but slow first paint, RSC optimized
                  with smaller bundles.
                </li>
                <li>
                  <strong>Hybrid Approach:</strong> Most real applications use multiple strategies:
                  SSG for marketing pages, ISR for product catalogs, SSR for user dashboards, CSR
                  for admin panels.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Comparison Summary:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Rendering Time</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Initial Load</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">SEO</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Content Freshness</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold">CSR</td>
                      <td className="border border-gray-300 px-3 py-2">Client (Runtime)</td>
                      <td className="border border-gray-300 px-3 py-2">Slow</td>
                      <td className="border border-gray-300 px-3 py-2">Poor</td>
                      <td className="border border-gray-300 px-3 py-2">Real-time</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold">SSR</td>
                      <td className="border border-gray-300 px-3 py-2">Server (Per Request)</td>
                      <td className="border border-gray-300 px-3 py-2">Medium</td>
                      <td className="border border-gray-300 px-3 py-2">Excellent</td>
                      <td className="border border-gray-300 px-3 py-2">Always Fresh</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold">SSG</td>
                      <td className="border border-gray-300 px-3 py-2">Build Time</td>
                      <td className="border border-gray-300 px-3 py-2">Fastest</td>
                      <td className="border border-gray-300 px-3 py-2">Excellent</td>
                      <td className="border border-gray-300 px-3 py-2">Static (Until Rebuild)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-semibold">ISR</td>
                      <td className="border border-gray-300 px-3 py-2">Build + Background</td>
                      <td className="border border-gray-300 px-3 py-2">Fastest</td>
                      <td className="border border-gray-300 px-3 py-2">Excellent</td>
                      <td className="border border-gray-300 px-3 py-2">Periodic Updates</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-semibold">RSC</td>
                      <td className="border border-gray-300 px-3 py-2">Server (Component)</td>
                      <td className="border border-gray-300 px-3 py-2">Fast</td>
                      <td className="border border-gray-300 px-3 py-2">Excellent</td>
                      <td className="border border-gray-300 px-3 py-2">Per Request/Component</td>
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

