"use client";

import { useState, Suspense, lazy } from "react";

/**
 * LAZY LOADING EXAMPLE
 *
 * Demonstrates React.lazy and Suspense:
 * - React.lazy for component lazy loading
 * - Suspense for loading states
 * - Error boundaries for error handling
 * - Multiple lazy-loaded components
 */

// Simulated heavy components (in real app, these would be separate files)
function ChartComponent() {
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="font-bold text-green-900 mb-2">📊 Chart Component</h3>
      <p className="text-sm text-gray-900">
        This is a heavy charting component that&apos;s loaded lazily.
      </p>
      <div className="mt-3 h-32 bg-white border border-green-200 rounded flex items-center justify-center">
        <p className="text-gray-500">Chart visualization would go here</p>
      </div>
    </div>
  );
}

function DataTableComponent() {
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="font-bold text-blue-900 mb-2">📋 Data Table Component</h3>
      <p className="text-sm text-gray-900">
        This is a heavy data table component that&apos;s loaded lazily.
      </p>
      <div className="mt-3 bg-white border border-blue-200 rounded p-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">Item 1</td>
              <td className="p-2">100</td>
            </tr>
            <tr>
              <td className="p-2">Item 2</td>
              <td className="p-2">200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MapComponent() {
  return (
    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h3 className="font-bold text-purple-900 mb-2">🗺️ Map Component</h3>
      <p className="text-sm text-gray-900">
        This is a heavy map component that&apos;s loaded lazily.
      </p>
      <div className="mt-3 h-48 bg-white border border-purple-200 rounded flex items-center justify-center">
        <p className="text-gray-500">Map visualization would go here</p>
      </div>
    </div>
  );
}

// Lazy load components (in real app, these would import from separate files)
const LazyChart = lazy(() => 
  new Promise<{ default: typeof ChartComponent }>((resolve) => {
    setTimeout(() => {
      resolve({ default: ChartComponent });
    }, 1000); // Simulate loading delay
  })
);

const LazyDataTable = lazy(() => 
  new Promise<{ default: typeof DataTableComponent }>((resolve) => {
    setTimeout(() => {
      resolve({ default: DataTableComponent });
    }, 800);
  })
);

const LazyMap = lazy(() => 
  new Promise<{ default: typeof MapComponent }>((resolve) => {
    setTimeout(() => {
      resolve({ default: MapComponent });
    }, 1200);
  })
);

// Loading fallback component
function LoadingFallback({ componentName }: { componentName: string }) {
  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
      <p className="text-xs text-gray-600 mt-2">Loading {componentName}...</p>
    </div>
  );
}

export default function LazyLoadingExample() {
  const [showChart, setShowChart] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        Lazy Loading with React.lazy & Suspense
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">React.lazy & Suspense:</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>React.lazy:</strong> Function that lets you load components on-demand
            </li>
            <li>
              <strong>Suspense:</strong> Component that shows fallback UI while lazy component loads
            </li>
            <li>
              <strong>Automatic code splitting:</strong> Creates separate chunk for lazy component
            </li>
            <li>
              <strong>Error boundaries:</strong> Should wrap Suspense for error handling
            </li>
          </ul>
        </div>

        {/* Controls */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">Load Components:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowChart(!showChart)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              {showChart ? "Hide" : "Show"} Chart
            </button>
            <button
              onClick={() => setShowTable(!showTable)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {showTable ? "Hide" : "Show"} Data Table
            </button>
            <button
              onClick={() => setShowMap(!showMap)}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              {showMap ? "Hide" : "Show"} Map
            </button>
          </div>
        </div>

        {/* Lazy Loaded Components */}
        <div className="space-y-4">
          {showChart && (
            <Suspense fallback={<LoadingFallback componentName="Chart" />}>
              <LazyChart />
            </Suspense>
          )}

          {showTable && (
            <Suspense fallback={<LoadingFallback componentName="Data Table" />}>
              <LazyDataTable />
            </Suspense>
          )}

          {showMap && (
            <Suspense fallback={<LoadingFallback componentName="Map" />}>
              <LazyMap />
            </Suspense>
          )}
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Implementation:</h4>
          <pre className="text-xs bg-white p-2 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`// 1. Lazy load component
const LazyChart = React.lazy(
  () => import('./ChartComponent')
);

// 2. Use with Suspense
function App() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Show Chart
      </button>
      
      {showChart && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyChart />
        </Suspense>
      )}
    </div>
  );
}`}
            </code>
          </pre>
        </div>

        {/* Key Points */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Key Points:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              React.lazy only works with default exports
            </li>
            <li>
              Suspense fallback is required (shows while loading)
            </li>
            <li>
              Each lazy component creates a separate bundle chunk
            </li>
            <li>
              Components load when first rendered (not before)
            </li>
            <li>
              Use Error Boundaries to handle loading errors
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

