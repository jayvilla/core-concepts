"use client";

import { useState } from "react";

/**
 * COMPARISON EXAMPLE
 *
 * Side-by-side comparison of Pagination vs Virtualization
 */

export default function ComparisonExample() {
  const [selectedAspect, setSelectedAspect] = useState<
    "rendering" | "navigation" | "performance" | "use-cases"
  >("rendering");

  const aspects = [
    { key: "rendering", label: "Rendering Strategy" },
    { key: "navigation", label: "User Navigation" },
    { key: "performance", label: "Performance" },
    { key: "use-cases", label: "Use Cases" },
  ];

  const comparisons = {
    rendering: {
      pagination: {
        title: "Pagination Rendering",
        points: [
          "Renders one page of items at a time",
          "DOM contains only current page items",
          "Re-renders entire page when navigating",
          "Simple implementation",
          "Predictable memory usage",
        ],
        code: `// Pagination: Render one page
const startIndex = (page - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const pageData = allData.slice(startIndex, endIndex);

// DOM: Only itemsPerPage rows
{pageData.map(item => <Row {...item} />)}`,
      },
      virtualization: {
        title: "Virtualization Rendering",
        points: [
          "Renders only visible items in viewport",
          "Dynamically loads/unloads as user scrolls",
          "Constant DOM size regardless of data size",
          "More complex implementation",
          "Uses transform/offset for positioning",
        ],
        code: `// Virtualization: Render visible range
const startIndex = Math.floor(scrollTop / rowHeight);
const endIndex = startIndex + visibleRows;
const visibleData = allData.slice(startIndex, endIndex);

// DOM: Only visibleRows rows (constant)
<div style={{ transform: \`translateY(\${offsetY}px)\` }}>
  {visibleData.map(item => <Row {...item} />)}
</div>`,
      },
    },
    navigation: {
      pagination: {
        title: "Pagination Navigation",
        points: [
          "Page numbers (1, 2, 3...)",
          "Previous/Next buttons",
          "Jump to specific page",
          "Shows current page indicator",
          "Total pages visible",
        ],
        code: `// User clicks page number
<button onClick={() => setPage(5)}>5</button>

// Navigate to page 5
// Loads items 41-50 (if 10 per page)`,
      },
      virtualization: {
        title: "Virtualization Navigation",
        points: [
          "Scroll to navigate",
          "Infinite scroll feel",
          "No page numbers",
          "Smooth continuous scrolling",
          "Can't jump to specific item easily",
        ],
        code: `// User scrolls
<div onScroll={handleScroll}>
  {/* Items load automatically */}
</div>

// Scroll position determines
// which items are visible`,
      },
    },
    performance: {
      pagination: {
        title: "Pagination Performance",
        points: [
          "Fast initial load (one page)",
          "Low memory usage",
          "Predictable performance",
          "Good for server-side data",
          "Network requests per page",
        ],
        code: `// Performance characteristics:
- Initial render: O(itemsPerPage)
- Memory: O(itemsPerPage)
- Network: 1 request per page
- Re-render: Full page on navigation`,
      },
      virtualization: {
        title: "Virtualization Performance",
        points: [
          "Fast initial load (visible items)",
          "Low memory usage (constant)",
          "Smooth scrolling",
          "Good for client-side data",
          "No network requests during scroll",
        ],
        code: `// Performance characteristics:
- Initial render: O(visibleRows)
- Memory: O(visibleRows) - constant!
- Network: 1 request for all data
- Re-render: Only visible items change`,
      },
    },
    "use-cases": {
      pagination: {
        title: "Pagination Use Cases",
        points: [
          "Search results",
          "Data tables with filters",
          "E-commerce product listings",
          "Admin dashboards",
          "When users need to jump to specific pages",
        ],
        code: `// Best for:
- Server-side data
- Searchable/filterable data
- When page numbers are meaningful
- Tables with sorting/filtering
- Data grids`,
      },
      virtualization: {
        title: "Virtualization Use Cases",
        points: [
          "Long lists (thousands of items)",
          "Infinite scroll feeds",
          "Chat message history",
          "File browsers",
          "When users need to see all data",
        ],
        code: `// Best for:
- Client-side data
- Very long lists (1000+ items)
- Infinite scroll UX
- When smooth scrolling is important
- Continuous data exploration`,
      },
    },
  };

  const current = comparisons[selectedAspect];

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        Pagination vs Virtualization Comparison
      </h2>

      <div className="space-y-6">
        {/* Aspect Selector */}
        <div className="flex flex-wrap gap-2">
          {aspects.map((aspect) => (
            <button
              key={aspect.key}
              onClick={() => setSelectedAspect(aspect.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedAspect === aspect.key
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {aspect.label}
            </button>
          ))}
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pagination */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">{current.pagination.title}</h3>
            <ul className="text-sm text-gray-900 space-y-2 list-disc list-inside mb-4">
              {current.pagination.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
              <code>{current.pagination.code}</code>
            </pre>
          </div>

          {/* Virtualization */}
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">{current.virtualization.title}</h3>
            <ul className="text-sm text-gray-900 space-y-2 list-disc list-inside mb-4">
              {current.virtualization.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
              <code>{current.virtualization.code}</code>
            </pre>
          </div>
        </div>

        {/* Quick Decision Guide */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-yellow-900">Quick Decision Guide:</h4>
          <div className="space-y-2 text-sm text-gray-900">
            <p>
              <strong>Server-side data, need page numbers?</strong> → Use <code className="bg-gray-100 px-1 rounded">Pagination</code>
            </p>
            <p>
              <strong>Client-side data, thousands of items?</strong> → Use <code className="bg-gray-100 px-1 rounded">Virtualization</code>
            </p>
            <p>
              <strong>Search results, tables with filters?</strong> → Use <code className="bg-gray-100 px-1 rounded">Pagination</code>
            </p>
            <p>
              <strong>Infinite scroll, long lists?</strong> → Use <code className="bg-gray-100 px-1 rounded">Virtualization</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

