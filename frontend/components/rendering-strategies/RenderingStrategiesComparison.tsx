"use client";

/**
 * RENDERING STRATEGIES COMPARISON
 *
 * Comprehensive comparison of all rendering strategies:
 * - When to use each
 * - Performance characteristics
 * - SEO implications
 * - Trade-offs
 */

export default function RenderingStrategiesComparison() {
  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        Rendering Strategies: Complete Comparison
      </h2>

      <div className="space-y-6">
        {/* Quick Reference Table */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-4">Quick Reference:</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">Strategy</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">When Rendered</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Initial Load</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">SEO</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 font-semibold text-blue-900">
                    CSR
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">Client (Browser)</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">Slow (JS execution)</td>
                  <td className="border border-gray-300 px-3 py-2 text-red-600">❌ Poor</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">SPAs, Dashboards</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 font-semibold text-green-900">
                    SSR
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">Server (Per Request)</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">Medium (Server processing)</td>
                  <td className="border border-gray-300 px-3 py-2 text-green-600">✅ Excellent</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">E-commerce, User Dashboards</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 font-semibold text-purple-900">
                    SSG
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">Build Time</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">⚡ Fastest</td>
                  <td className="border border-gray-300 px-3 py-2 text-green-600">✅ Excellent</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">Blogs, Docs, Marketing</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 font-semibold text-orange-900">
                    ISR
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">Build + Background</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">⚡ Fastest</td>
                  <td className="border border-gray-300 px-3 py-2 text-green-600">✅ Excellent</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">E-commerce, News, Blogs</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 font-semibold text-pink-900">
                    RSC
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">Server (Component Level)</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">Fast (Selective)</td>
                  <td className="border border-gray-300 px-3 py-2 text-green-600">✅ Excellent</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">Next.js 13+ Apps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Decision Tree */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900">Decision Tree:</h4>
          <div className="space-y-3 text-sm text-gray-900">
            <div className="p-3 bg-white border border-gray-300 rounded">
              <p className="font-semibold mb-2">1. Does content change frequently?</p>
              <ul className="space-y-1 ml-4">
                <li>
                  <strong>Yes, every request:</strong> → <span className="text-green-600">SSR</span> (e.g., user dashboard)
                </li>
                <li>
                  <strong>Yes, periodically:</strong> → <span className="text-orange-600">ISR</span> (e.g., product inventory)
                </li>
                <li>
                  <strong>No, static:</strong> → <span className="text-purple-600">SSG</span> (e.g., blog post)
                </li>
              </ul>
            </div>
            <div className="p-3 bg-white border border-gray-300 rounded">
              <p className="font-semibold mb-2">2. Is SEO important?</p>
              <ul className="space-y-1 ml-4">
                <li>
                  <strong>Yes:</strong> → <span className="text-green-600">SSR</span>, <span className="text-purple-600">SSG</span>, <span className="text-orange-600">ISR</span>, or <span className="text-pink-600">RSC</span>
                </li>
                <li>
                  <strong>No:</strong> → <span className="text-blue-600">CSR</span> is acceptable (e.g., admin panel)
                </li>
              </ul>
            </div>
            <div className="p-3 bg-white border border-gray-300 rounded">
              <p className="font-semibold mb-2">3. Using Next.js 13+ App Router?</p>
              <ul className="space-y-1 ml-4">
                <li>
                  <strong>Yes:</strong> → Consider <span className="text-pink-600">RSC</span> (default, automatic)
                </li>
                <li>
                  <strong>No:</strong> → Use <span className="text-green-600">SSR</span>, <span className="text-purple-600">SSG</span>, or <span className="text-orange-600">ISR</span>
                </li>
              </ul>
            </div>
            <div className="p-3 bg-white border border-gray-300 rounded">
              <p className="font-semibold mb-2">4. Need maximum performance?</p>
              <ul className="space-y-1 ml-4">
                <li>
                  <strong>Yes, content is static:</strong> → <span className="text-purple-600">SSG</span>
                </li>
                <li>
                  <strong>Yes, content updates:</strong> → <span className="text-orange-600">ISR</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-blue-900">Performance Characteristics:</h4>
          <div className="space-y-2 text-sm text-gray-900">
            <div className="flex items-center justify-between p-2 bg-white border border-blue-200 rounded">
              <span className="font-semibold">Initial Load Speed:</span>
              <span className="text-xs">
                SSG/ISR ⚡ &gt; RSC ⚡ &gt; SSR 🟡 &gt; CSR 🔴
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white border border-blue-200 rounded">
              <span className="font-semibold">Time to First Byte (TTFB):</span>
              <span className="text-xs">
                SSG/ISR ⚡ &gt; RSC ⚡ &gt; SSR 🟡 &gt; CSR 🔴
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white border border-blue-200 rounded">
              <span className="font-semibold">JavaScript Bundle Size:</span>
              <span className="text-xs">
                RSC ⚡ &lt; SSG/ISR/SSR 🟡 &lt; CSR 🔴
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white border border-blue-200 rounded">
              <span className="font-semibold">Server Load:</span>
              <span className="text-xs">
                SSG/ISR ⚡ &lt; RSC 🟡 &lt; SSR 🔴 &lt; CSR ⚡ (no server)
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white border border-blue-200 rounded">
              <span className="font-semibold">Content Freshness:</span>
              <span className="text-xs">
                SSR ⚡ &gt; ISR 🟡 &gt; RSC 🟡 &gt; SSG 🔴 &gt; CSR ⚡ (depends)
              </span>
            </div>
          </div>
        </div>

        {/* When to Use Each */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-yellow-900">When to Use Each Strategy:</h4>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-blue-900 mb-1">CSR (Client-Side Rendering):</p>
              <p className="text-gray-900">
                Admin panels, dashboards, highly interactive apps where SEO doesn&apos;t matter
              </p>
            </div>
            <div>
              <p className="font-semibold text-green-900 mb-1">SSR (Server-Side Rendering):</p>
              <p className="text-gray-900">
                E-commerce product pages, user dashboards, pages needing fresh data on every request
              </p>
            </div>
            <div>
              <p className="font-semibold text-purple-900 mb-1">SSG (Static Site Generation):</p>
              <p className="text-gray-900">
                Blogs, documentation, marketing pages, portfolio sites, content that doesn&apos;t change
              </p>
            </div>
            <div>
              <p className="font-semibold text-orange-900 mb-1">ISR (Incremental Static Regeneration):</p>
              <p className="text-gray-900">
                E-commerce catalogs, news sites, blogs with scheduled posts, large sites needing fast loads + fresh content
              </p>
            </div>
            <div>
              <p className="font-semibold text-pink-900 mb-1">RSC (React Server Components):</p>
              <p className="text-gray-900">
                Next.js 13+ applications, modern React apps, when you want automatic optimization and smaller bundles
              </p>
            </div>
          </div>
        </div>

        {/* Hybrid Approaches */}
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-teal-900">Hybrid Approaches:</h4>
          <p className="text-sm text-gray-900 mb-2">
            You can combine strategies! Many applications use multiple rendering strategies:
          </p>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Marketing pages:</strong> SSG (fast, SEO-friendly)
            </li>
            <li>
              <strong>Product pages:</strong> ISR (fast + fresh inventory)
            </li>
            <li>
              <strong>User dashboard:</strong> SSR (personalized, fresh)
            </li>
            <li>
              <strong>Admin panel:</strong> CSR (highly interactive, no SEO needed)
            </li>
            <li>
              <strong>Next.js 13+:</strong> RSC by default, with client components for interactivity
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

