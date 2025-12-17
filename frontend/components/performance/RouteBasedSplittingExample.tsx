"use client";

import { useState } from "react";

/**
 * ROUTE-BASED CODE SPLITTING
 *
 * Demonstrates splitting code by routes:
 * - Each route loads its own bundle
 * - Reduces initial bundle size
 * - Common pattern in Next.js, React Router
 * - Improves performance for large apps
 */

// Simulated route components
function HomePage() {
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="font-bold text-blue-900 mb-2">🏠 Home Page</h3>
      <p className="text-sm text-gray-900">
        This is the home page. It loads immediately with the main bundle.
      </p>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="font-bold text-green-900 mb-2">ℹ️ About Page</h3>
      <p className="text-sm text-gray-900">
        This page would be lazy-loaded. Only loads when user navigates to /about.
      </p>
      <div className="mt-3 p-3 bg-white border border-green-200 rounded">
        <p className="text-xs text-gray-700">
          💡 In a real app, this would be a separate chunk loaded on-demand!
        </p>
      </div>
    </div>
  );
}

function ProductsPage() {
  return (
    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h3 className="font-bold text-purple-900 mb-2">🛍️ Products Page</h3>
      <p className="text-sm text-gray-900">
        This page would be lazy-loaded. Only loads when user navigates to /products.
      </p>
      <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
        <p className="text-xs text-gray-700">
          💡 Products page might have heavy components (filters, charts) - perfect for lazy loading!
        </p>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
      <h3 className="font-bold text-orange-900 mb-2">📧 Contact Page</h3>
      <p className="text-sm text-gray-900">
        This page would be lazy-loaded. Only loads when user navigates to /contact.
      </p>
    </div>
  );
}

type Route = "home" | "about" | "products" | "contact";

export default function RouteBasedSplittingExample() {
  const [currentRoute, setCurrentRoute] = useState<Route>("home");

  const renderRoute = () => {
    switch (currentRoute) {
      case "home":
        return <HomePage />;
      case "about":
        return <AboutPage />;
      case "products":
        return <ProductsPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        Route-Based Code Splitting
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">What is Route-Based Splitting?</h3>
          <p className="text-sm text-gray-900 mb-3">
            Split your application by routes. Each route becomes a separate bundle that loads
            only when the user navigates to that route.
          </p>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>Initial bundle only contains home/landing page</li>
            <li>Other routes load on-demand when navigated to</li>
            <li>Common pattern in Next.js (automatic) and React Router (manual)</li>
            <li>Significantly reduces initial bundle size</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">Navigation:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCurrentRoute("home")}
              className={`px-4 py-2 rounded-md font-medium ${
                currentRoute === "home"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentRoute("about")}
              className={`px-4 py-2 rounded-md font-medium ${
                currentRoute === "about"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              About
            </button>
            <button
              onClick={() => setCurrentRoute("products")}
              className={`px-4 py-2 rounded-md font-medium ${
                currentRoute === "products"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setCurrentRoute("contact")}
              className={`px-4 py-2 rounded-md font-medium ${
                currentRoute === "contact"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Contact
            </button>
          </div>
        </div>

        {/* Route Content */}
        <div>{renderRoute()}</div>

        {/* Code Examples */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900">Implementation Examples:</h4>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-blue-900 mb-1">Next.js (Automatic):</p>
              <pre className="text-xs bg-white p-2 rounded border border-blue-300 overflow-x-auto">
                <code className="text-gray-800">
{`// Next.js automatically code-splits by route
// app/about/page.tsx - automatically lazy loaded
export default function AboutPage() {
  return <div>About</div>;
}`}
                </code>
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold text-green-900 mb-1">React Router (Manual):</p>
              <pre className="text-xs bg-white p-2 rounded border border-green-300 overflow-x-auto">
                <code className="text-gray-800">
{`import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const AboutPage = lazy(() => import('./pages/About'));
const ProductsPage = lazy(() => import('./pages/Products'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Suspense>
  );
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-green-900">Benefits:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Smaller initial bundle:</strong> Only home page code loads first
            </li>
            <li>
              <strong>Faster initial load:</strong> Users see content faster
            </li>
            <li>
              <strong>Better UX:</strong> Progressive loading as users navigate
            </li>
            <li>
              <strong>Scalability:</strong> App can grow without bloating initial bundle
            </li>
            <li>
              <strong>Mobile-friendly:</strong> Especially important for mobile users
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

