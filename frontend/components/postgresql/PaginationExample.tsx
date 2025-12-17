"use client";

import { useState } from "react";

/**
 * PAGINATION EXAMPLE
 *
 * Demonstrates pagination techniques:
 * - LIMIT and OFFSET (offset-based pagination)
 * - Cursor-based pagination (better for large datasets)
 * - Performance considerations
 */

export default function PaginationExample() {
  const [paginationType, setPaginationType] = useState<"offset" | "cursor">(
    "offset"
  );

  return (
    <div className="border-2 border-orange-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-orange-900">
        Pagination: Efficient Data Retrieval
      </h2>

      <div className="space-y-6">
        {/* Pagination Type Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "offset", label: "OFFSET-Based" },
              { key: "cursor", label: "Cursor-Based" },
            ] as const
          ).map((type) => (
            <button
              key={type.key}
              onClick={() => setPaginationType(type.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                paginationType === type.key
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* OFFSET-Based Pagination */}
        {paginationType === "offset" && (
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="font-bold text-orange-900 mb-3">
                OFFSET-Based Pagination:
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Uses LIMIT and OFFSET to skip a certain number of rows. Simple but can be slow for
                large offsets.
              </p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-orange-300 overflow-x-auto">
                <code>{`-- Page 1: First 10 records
SELECT * FROM orders
ORDER BY created_at DESC
LIMIT 10 OFFSET 0;

-- Page 2: Next 10 records (skip first 10)
SELECT * FROM orders
ORDER BY created_at DESC
LIMIT 10 OFFSET 10;

-- Page 3: Next 10 records (skip first 20)
SELECT * FROM orders
ORDER BY created_at DESC
LIMIT 10 OFFSET 20;

-- General formula: LIMIT = page_size, OFFSET = (page - 1) * page_size
-- Page N: LIMIT page_size OFFSET (N - 1) * page_size

-- Get total count for pagination UI
SELECT COUNT(*) FROM orders; -- Total: 1000 records
-- Total pages = CEIL(1000 / 10) = 100 pages`}</code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-orange-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Pros:</strong> Simple, works with any ordering, can jump to any page
                </p>
                <p className="text-sm text-gray-900">
                  <strong>Cons:</strong> Slow for large offsets (database must scan and skip many
                  rows), inconsistent if data changes during pagination
                </p>
              </div>
            </div>

            {/* Example Implementation */}
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="font-bold text-orange-900 mb-3">
                Example Implementation:
              </h3>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-orange-300 overflow-x-auto">
                <code>{`-- Backend code (pseudo-code)
function getOrders(page = 1, pageSize = 10) {
  const offset = (page - 1) * pageSize;
  
  return db.query(\`
    SELECT * FROM orders
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
  \`, [pageSize, offset]);
}

-- API Response
{
  "data": [...orders...],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 1000,
    "totalPages": 100
  }
}`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Cursor-Based Pagination */}
        {paginationType === "cursor" && (
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="font-bold text-orange-900 mb-3">
                Cursor-Based Pagination:
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Uses a cursor (last seen ID or value) to fetch the next page. More efficient for
                large datasets and provides consistent results even if data changes.
              </p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-orange-300 overflow-x-auto">
                <code>{`-- First page: Get first 10 records
SELECT * FROM orders
ORDER BY id ASC
LIMIT 10;
-- Returns orders with IDs: 1, 2, 3, ..., 10
-- Last ID: 10

-- Next page: Get records after ID 10
SELECT * FROM orders
WHERE id > 10
ORDER BY id ASC
LIMIT 10;
-- Returns orders with IDs: 11, 12, 13, ..., 20
-- Last ID: 20

-- Next page: Get records after ID 20
SELECT * FROM orders
WHERE id > 20
ORDER BY id ASC
LIMIT 10;

-- Using timestamp cursor (for created_at ordering)
SELECT * FROM orders
WHERE created_at > '2024-01-01 10:00:00'
ORDER BY created_at ASC
LIMIT 10;

-- Using composite cursor (multiple columns)
SELECT * FROM orders
WHERE (created_at, id) > ('2024-01-01 10:00:00', 100)
ORDER BY created_at ASC, id ASC
LIMIT 10;`}</code>
              </pre>
              <div className="mt-3 p-3 bg-white border border-orange-200 rounded">
                <p className="text-sm text-gray-900">
                  <strong>Pros:</strong> Fast (uses index), consistent results, works well for large
                  datasets, no performance degradation for later pages
                </p>
                <p className="text-sm text-gray-900">
                  <strong>Cons:</strong> Can&apos;t jump to arbitrary pages, requires unique cursor
                  column(s), slightly more complex implementation
                </p>
              </div>
            </div>

            {/* Example Implementation */}
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="font-bold text-orange-900 mb-3">
                Example Implementation:
              </h3>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-orange-300 overflow-x-auto">
                <code>{`-- Backend code (pseudo-code)
function getOrders(cursor = null, pageSize = 10) {
  if (cursor) {
    return db.query(\`
      SELECT * FROM orders
      WHERE id > $1
      ORDER BY id ASC
      LIMIT $2
    \`, [cursor, pageSize]);
  } else {
    return db.query(\`
      SELECT * FROM orders
      ORDER BY id ASC
      LIMIT $1
    \`, [pageSize]);
  }
}

-- API Response
{
  "data": [...orders...],
  "pagination": {
    "cursor": 20,  // Last ID in this page
    "hasMore": true,
    "pageSize": 10
  }
}

-- Client requests next page with cursor
GET /api/orders?cursor=20&pageSize=10`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Performance Comparison */}
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="font-bold text-orange-900 mb-3">
            Performance Comparison:
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Page</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">
                    OFFSET-Based
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Cursor-Based</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Page 1</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-900">10ms</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-900">10ms</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Page 10</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-900">50ms</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-900">10ms</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Page 100</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-900">500ms</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-900">10ms</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Page 1000</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-900">5000ms</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-900">10ms</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-3 bg-white border border-orange-200 rounded">
            <p className="text-sm text-gray-900">
              <strong>Note:</strong> Cursor-based pagination maintains consistent performance
              regardless of page number, while OFFSET-based pagination gets slower as the offset
              increases.
            </p>
          </div>
        </div>

        {/* Key Points */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Key Points:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>OFFSET-Based:</strong> Use for small datasets or when users need to jump to
              arbitrary pages. Simple but can be slow.
            </li>
            <li>
              <strong>Cursor-Based:</strong> Use for large datasets, infinite scroll, or when
              consistency is important. More efficient and scalable.
            </li>
            <li>
              <strong>Indexing:</strong> Ensure ORDER BY columns are indexed for optimal
              performance.
            </li>
            <li>
              <strong>Cursor Selection:</strong> Use a unique, sequential column (like ID) or a
              composite of (timestamp, id) for stable cursors.
            </li>
            <li>
              <strong>API Design:</strong> Return cursor and hasMore flag for cursor-based
              pagination. Return total count for offset-based pagination.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

