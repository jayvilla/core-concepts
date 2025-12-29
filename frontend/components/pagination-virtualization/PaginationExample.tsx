"use client";

import { useState, useMemo } from "react";

/**
 * PAGINATION EXAMPLE
 *
 * Demonstrates pagination with a table of fake data
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
const ITEMS_PER_PAGE = 10;

export default function PaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const allData = useMemo(() => generateFakeData(TOTAL_ITEMS), []);

  // Calculate pagination
  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageData = allData.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        Pagination Example
      </h2>

      <div className="space-y-4">
        {/* Info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-900">
            <strong>Total Items:</strong> {TOTAL_ITEMS} | <strong>Items Per Page:</strong> {ITEMS_PER_PAGE} | <strong>Current Page:</strong> {currentPage} of {totalPages}
          </p>
          <p className="text-xs text-gray-700 mt-2">
            Only {ITEMS_PER_PAGE} items are rendered in the DOM at a time. User navigates using page controls.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
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
              {currentPageData.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
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

        {/* Pagination Controls */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, TOTAL_ITEMS)} of {TOTAL_ITEMS} items
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              First
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === pageNum
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Last
            </button>
          </div>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">How It Works:</h4>
          <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
            <code>{`// Calculate which items to show
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;
const currentPageData = allData.slice(startIndex, endIndex);

// Only render current page items
{currentPageData.map(item => <Row key={item.id} {...item} />)}

// DOM nodes: Only ${ITEMS_PER_PAGE} rows rendered`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

