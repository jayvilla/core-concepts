"use client";

import { useState, useMemo, useRef, useEffect } from "react";

/**
 * VIRTUALIZATION EXAMPLE
 *
 * Demonstrates virtualization with a table of fake data
 * Only renders visible items in the viewport
 */

// Generate fake data
const generateFakeData = (count: number) => {
  const names = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry"];
  const cities = ["New York", "London", "Tokyo", "Paris", "Sydney", "Berlin", "Toronto", "Mumbai"];
  const departments = ["Engineering", "Sales", "Marketing", "HR", "Finance", "Operations"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${names[i % names.length]} ${Math.floor(i / names.length) + 1}`,
    email: `user${i + 1}@example.com`,
    city: cities[i % cities.length],
    department: departments[i % departments.length],
    salary: Math.floor(Math.random() * 100000) + 50000,
    joinDate: new Date(2020 + (i % 4), i % 12, (i % 28) + 1).toLocaleDateString(),
  }));
};

const TOTAL_ITEMS = 1000;
const ROW_HEIGHT = 50; // Height of each row in pixels
const VISIBLE_ROWS = 10; // Number of rows visible at once
const OVERSCAN = 2; // Extra rows to render above/below viewport

export default function VirtualizationExample() {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const allData = useMemo(() => generateFakeData(TOTAL_ITEMS), []);

  // Calculate which items to render
  const containerHeight = VISIBLE_ROWS * ROW_HEIGHT;
  const totalHeight = TOTAL_ITEMS * ROW_HEIGHT;
  
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const endIndex = Math.min(
    TOTAL_ITEMS - 1,
    Math.ceil((scrollTop + containerHeight) / ROW_HEIGHT) + OVERSCAN
  );
  
  const visibleData = allData.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * ROW_HEIGHT;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        Virtualization Example
      </h2>

      <div className="space-y-4">
        {/* Info */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-gray-900">
            <strong>Total Items:</strong> {TOTAL_ITEMS} | <strong>Visible Rows:</strong> {VISIBLE_ROWS} | <strong>Rendered Items:</strong> {visibleData.length} | <strong>Scroll Position:</strong> {Math.round(scrollTop)}px
          </p>
          <p className="text-xs text-gray-700 mt-2">
            Only {visibleData.length} items are rendered in the DOM (visible + overscan). Scroll to see more items load dynamically.
          </p>
        </div>

        {/* Virtualized Table Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="border border-gray-300 rounded-lg overflow-auto"
          style={{ height: `${containerHeight}px` }}
        >
          <div style={{ height: `${totalHeight}px`, position: "relative" }}>
            <div style={{ transform: `translateY(${offsetY}px)` }}>
              <table className="w-full text-sm">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left border-b border-gray-300 text-gray-900">ID</th>
                    <th className="px-4 py-3 text-left border-b border-gray-300 text-gray-900">Name</th>
                    <th className="px-4 py-3 text-left border-b border-gray-300 text-gray-900">Email</th>
                    <th className="px-4 py-3 text-left border-b border-gray-300 text-gray-900">City</th>
                    <th className="px-4 py-3 text-left border-b border-gray-300 text-gray-900">Department</th>
                    <th className="px-4 py-3 text-left border-b border-gray-300 text-gray-900">Salary</th>
                    <th className="px-4 py-3 text-left border-b border-gray-300 text-gray-900">Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                      style={{ height: `${ROW_HEIGHT}px` }}
                    >
                      <td className="px-4 py-3 text-gray-900">{item.id}</td>
                      <td className="px-4 py-3 text-gray-900">{item.name}</td>
                      <td className="px-4 py-3 text-gray-900">{item.email}</td>
                      <td className="px-4 py-3 text-gray-900">{item.city}</td>
                      <td className="px-4 py-3 text-gray-900">{item.department}</td>
                      <td className="px-4 py-3 text-gray-900">${item.salary.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-900">{item.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Scroll Info */}
        <div className="text-sm text-gray-700">
          <p>
            Showing items {startIndex + 1} to {endIndex + 1} of {TOTAL_ITEMS} (rendering {visibleData.length} items)
          </p>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">How It Works:</h4>
          <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
            <code>{`// Calculate visible range based on scroll position
const startIndex = Math.floor(scrollTop / ROW_HEIGHT);
const endIndex = Math.ceil((scrollTop + containerHeight) / ROW_HEIGHT);

// Only render visible items + overscan
const visibleData = allData.slice(startIndex, endIndex + 1);

// Offset content to maintain scroll position
<div style={{ transform: \`translateY(\${startIndex * ROW_HEIGHT}px)\` }}>
  {visibleData.map(item => <Row key={item.id} {...item} />)}
</div>

// DOM nodes: Only ~${VISIBLE_ROWS + OVERSCAN * 2} rows rendered (constant)`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

