"use client";

import { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

/**
 * ERROR BOUNDARY BEST PRACTICES
 *
 * Demonstrates best practices for using Error Boundaries:
 * - Placement strategy
 * - Multiple boundaries
 * - Error reporting
 * - Recovery strategies
 */

// Simulated components that might error
function FeatureA() {
  const [shouldError, setShouldError] = useState(false);
  
  if (shouldError) {
    throw new Error("Feature A error");
  }

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="font-bold text-blue-900 mb-2">Feature A</h3>
      <button
        onClick={() => setShouldError(true)}
        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
      >
        Trigger Error
      </button>
    </div>
  );
}

function FeatureB() {
  const [shouldError, setShouldError] = useState(false);
  
  if (shouldError) {
    throw new Error("Feature B error");
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="font-bold text-green-900 mb-2">Feature B</h3>
      <button
        onClick={() => setShouldError(true)}
        className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
      >
        Trigger Error
      </button>
    </div>
  );
}

function FeatureC() {
  const [shouldError, setShouldError] = useState(false);
  
  if (shouldError) {
    throw new Error("Feature C error");
  }

  return (
    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h3 className="font-bold text-purple-900 mb-2">Feature C</h3>
      <button
        onClick={() => setShouldError(true)}
        className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
      >
        Trigger Error
      </button>
    </div>
  );
}

export default function ErrorBoundaryBestPracticesExample() {
  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        Error Boundary Best Practices
      </h2>

      <div className="space-y-6">
        {/* Strategy */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">Placement Strategy:</h3>
          <p className="text-sm text-gray-900 mb-3">
            Place Error Boundaries at strategic points to isolate failures. If one feature fails,
            others can still work!
          </p>
        </div>

        {/* Multiple Boundaries */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">Multiple Error Boundaries:</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <ErrorBoundary
              fallback={
                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <p className="text-xs text-red-900 font-semibold">Feature A Error</p>
                  <p className="text-xs text-gray-700">Other features still work!</p>
                </div>
              }
            >
              <FeatureA />
            </ErrorBoundary>

            <ErrorBoundary
              fallback={
                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <p className="text-xs text-red-900 font-semibold">Feature B Error</p>
                  <p className="text-xs text-gray-700">Other features still work!</p>
                </div>
              }
            >
              <FeatureB />
            </ErrorBoundary>

            <ErrorBoundary
              fallback={
                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <p className="text-xs text-red-900 font-semibold">Feature C Error</p>
                  <p className="text-xs text-gray-700">Other features still work!</p>
                </div>
              }
            >
              <FeatureC />
            </ErrorBoundary>
          </div>
          <p className="text-xs text-gray-700 mt-3">
            💡 Each feature has its own Error Boundary - if one fails, others continue working!
          </p>
        </div>

        {/* Best Practices */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900">Best Practices:</h4>
          <div className="space-y-3">
            <div className="p-3 bg-white border border-gray-300 rounded">
              <h5 className="font-semibold text-gray-900 mb-2">1. Strategic Placement:</h5>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>Wrap major features/sections separately</li>
                <li>Place at route level (catch route-level errors)</li>
                <li>Don&apos;t wrap every component (too granular)</li>
                <li>Consider user experience - what should still work if this fails?</li>
              </ul>
            </div>

            <div className="p-3 bg-white border border-gray-300 rounded">
              <h5 className="font-semibold text-gray-900 mb-2">2. Error Reporting:</h5>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>Log errors to error reporting service (Sentry, LogRocket, etc.)</li>
                <li>Include error details and component stack</li>
                <li>Track error frequency and patterns</li>
                <li>Use componentDidCatch for reporting</li>
              </ul>
            </div>

            <div className="p-3 bg-white border border-gray-300 rounded">
              <h5 className="font-semibold text-gray-900 mb-2">3. Fallback UI:</h5>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>Provide helpful, user-friendly error messages</li>
                <li>Include recovery options (retry, go back, contact support)</li>
                <li>Don&apos;t expose technical details to users</li>
                <li>Match your app&apos;s design system</li>
              </ul>
            </div>

            <div className="p-3 bg-white border border-gray-300 rounded">
              <h5 className="font-semibold text-gray-900 mb-2">4. Recovery:</h5>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>Provide reset/retry functionality</li>
                <li>Allow users to navigate away</li>
                <li>Consider automatic retry for transient errors</li>
                <li>Preserve user data when possible</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Recommended Structure:</h4>
          <pre className="text-xs bg-white p-2 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`// App level
<ErrorBoundary>
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={
        <ErrorBoundary> {/* Route level */}
          <AboutPage />
        </ErrorBoundary>
      } />
      <Route path="/dashboard" element={
        <ErrorBoundary> {/* Route level */}
          <Dashboard>
            <ErrorBoundary> {/* Feature level */}
              <Analytics />
            </ErrorBoundary>
            <ErrorBoundary> {/* Feature level */}
              <Reports />
            </ErrorBoundary>
          </Dashboard>
        </ErrorBoundary>
      } />
    </Routes>
  </Router>
</ErrorBoundary>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

