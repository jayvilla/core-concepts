"use client";

import { useState } from "react";

/**
 * STATIC SITE GENERATION (SSG) EXAMPLE
 *
 * Demonstrates SSG:
 * - HTML is generated at build time
 * - Pre-rendered HTML files served from CDN
 * - Fastest possible load time
 * - Great for SEO
 * - Content is static until rebuild
 */

export default function SSGExample() {
  const [buildTime] = useState(() => {
    // Simulate build-time data
    return new Date().toLocaleString();
  });

  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        Static Site Generation (SSG)
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">What is SSG?</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>HTML is generated at build time</strong> (not on request)
            </li>
            <li>
              Pre-rendered HTML files are created during deployment
            </li>
            <li>
              Static files served from CDN (very fast)
            </li>
            <li>
              Content is the same for all users (until rebuild)
            </li>
            <li>
              Perfect for blogs, documentation, marketing pages
            </li>
          </ul>
        </div>

        {/* Interactive Example */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">SSG in Action:</h3>
          <div className="space-y-3">
            <div className="p-4 bg-white border border-purple-200 rounded">
              <p className="text-sm text-gray-900 mb-2">
                <strong>✅ Pre-rendered content:</strong> This HTML was generated at build time!
              </p>
              <p className="text-xs text-gray-700">
                Build time: <strong>{buildTime}</strong> (simulated)
              </p>
              <p className="text-xs text-gray-700 mt-2">
                This content is the same for all users and loads instantly from CDN.
              </p>
            </div>
            
            <div className="p-4 bg-white border border-green-200 rounded">
              <p className="text-sm text-gray-900 mb-2">
                <strong>⚡ Performance:</strong>
              </p>
              <ul className="text-xs text-gray-900 space-y-1 list-disc list-inside">
                <li>No server processing needed</li>
                <li>Served from CDN edge locations</li>
                <li>Fastest possible load time</li>
                <li>Minimal server costs</li>
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
                <li>Fastest load time (pre-rendered)</li>
                <li>Excellent SEO (content in HTML)</li>
                <li>Low server costs (static files)</li>
                <li>Works without JavaScript</li>
                <li>Scales infinitely (CDN)</li>
                <li>Secure (no server-side code)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-red-900 mb-2">❌ Cons:</p>
              <ul className="text-gray-900 space-y-1 list-disc list-inside">
                <li>Content is static (requires rebuild to update)</li>
                <li>Not suitable for user-specific content</li>
                <li>Build time increases with page count</li>
                <li>Can&apos;t handle dynamic data well</li>
                <li>Requires rebuild for content changes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">SSG Pattern (Next.js):</h4>
          <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`// Static Site Generation (Next.js)
export async function getStaticProps() {
  // Runs at BUILD TIME, not on request
  const data = await fetch('https://api.example.com/posts');
  const posts = await data.json();
  
  return {
    props: {
      posts // Available at build time
    }
  };
}

export default function BlogPage({ posts }) {
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}

// At build time:
// 1. getStaticProps runs
// 2. Component renders with data
// 3. HTML file generated: /blog.html
// 4. Deployed to CDN
// 5. Users get pre-rendered HTML instantly`}
            </code>
          </pre>
        </div>

        {/* Build Process */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-indigo-900">Build Process:</h4>
          <div className="space-y-2 text-sm text-gray-900">
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-600">1.</span>
              <div>Build starts → <code className="bg-gray-100 px-1 rounded">getStaticProps</code> runs</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-600">2.</span>
              <div>Data fetched → Components rendered to HTML</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-600">3.</span>
              <div>HTML files generated for each page</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-600">4.</span>
              <div>Files deployed to CDN (e.g., Vercel, Netlify)</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-600">5.</span>
              <div>Users request page → CDN serves pre-rendered HTML instantly</div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Best For:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>Blogs and documentation sites</li>
            <li>Marketing and landing pages</li>
            <li>Portfolio websites</li>
            <li>Content that doesn&apos;t change frequently</li>
            <li>E-commerce product catalogs (if inventory updates are infrequent)</li>
            <li>Any site where content is known at build time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

