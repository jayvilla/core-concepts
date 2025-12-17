"use client";

import { useState } from "react";

/**
 * RELATIONSHIPS & JOINS EXAMPLE
 *
 * Demonstrates SQL relationships and JOIN operations:
 * - INNER JOIN: Returns matching rows from both tables
 * - LEFT JOIN: Returns all rows from left table + matches
 * - RIGHT JOIN: Returns all rows from right table + matches
 * - FULL OUTER JOIN: Returns all rows from both tables
 */

export default function RelationshipsJoinsExample() {
  const [selectedJoin, setSelectedJoin] = useState<
    "inner" | "left" | "right" | "full"
  >("inner");

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        Relationships & Joins
      </h2>

      <div className="space-y-6">
        {/* Setup Tables */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">Table Structure:</h3>
          <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
            <code>{`-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

-- Orders table (has foreign key to users)
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Relationship: One user can have many orders (One-to-Many)`}</code>
          </pre>
        </div>

        {/* Join Type Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "inner", label: "INNER JOIN" },
              { key: "left", label: "LEFT JOIN" },
              { key: "right", label: "RIGHT JOIN" },
              { key: "full", label: "FULL OUTER JOIN" },
            ] as const
          ).map((join) => (
            <button
              key={join.key}
              onClick={() => setSelectedJoin(join.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedJoin === join.key
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {join.label}
            </button>
          ))}
        </div>

        {/* INNER JOIN */}
        {selectedJoin === "inner" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">INNER JOIN:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Returns only rows that have matching values in both tables.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
              <code>{`-- Get orders with user information
SELECT o.*, u.name, u.email
FROM orders o
INNER JOIN users u ON u.id = o.user_id;

-- Alternative syntax (equivalent)
SELECT o.*, u.name, u.email
FROM orders o, users u
WHERE u.id = o.user_id;

-- With WHERE clause
SELECT o.*
FROM orders o
JOIN users u ON u.id = o.user_id
WHERE u.id = 1;

-- Multiple joins
SELECT o.id, o.total, u.name, u.email
FROM orders o
INNER JOIN users u ON u.id = o.user_id
INNER JOIN order_items oi ON oi.order_id = o.id
WHERE o.total > 100;`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-green-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Result:</strong> Returns only orders that have a matching user. Orders
                without users or users without orders are excluded.
              </p>
            </div>
          </div>
        )}

        {/* LEFT JOIN */}
        {selectedJoin === "left" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">LEFT JOIN:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Returns all rows from the left table, plus matching rows from the right table. If no
              match, right table columns are NULL.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
              <code>{`-- Get all users and their orders (if any)
SELECT u.*, o.id as order_id, o.total
FROM users u
LEFT JOIN orders o ON o.user_id = u.id;

-- Find users without orders
SELECT u.*
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;

-- With WHERE clause
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name;`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-green-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Result:</strong> Returns all users, even if they have no orders. Order
                columns will be NULL for users without orders. Useful for finding users without
                orders.
              </p>
            </div>
          </div>
        )}

        {/* RIGHT JOIN */}
        {selectedJoin === "right" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">RIGHT JOIN:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Returns all rows from the right table, plus matching rows from the left table. If no
              match, left table columns are NULL.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
              <code>{`-- Get all orders and their users (if user exists)
SELECT o.*, u.name, u.email
FROM users u
RIGHT JOIN orders o ON o.user_id = u.id;

-- Find orders with missing users (orphaned orders)
SELECT o.*
FROM users u
RIGHT JOIN orders o ON o.user_id = u.id
WHERE u.id IS NULL;

-- Note: RIGHT JOIN is less common
-- You can achieve the same with LEFT JOIN by swapping tables`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-green-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Result:</strong> Returns all orders, even if the user doesn&apos;t exist
                (orphaned orders). User columns will be NULL for orders without users. Less
                commonly used than LEFT JOIN.
              </p>
            </div>
          </div>
        )}

        {/* FULL OUTER JOIN */}
        {selectedJoin === "full" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">FULL OUTER JOIN:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Returns all rows from both tables. If no match, missing columns are NULL.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
              <code>{`-- Get all users and all orders
SELECT u.*, o.id as order_id, o.total
FROM users u
FULL OUTER JOIN orders o ON o.user_id = u.id;

-- Find unmatched records from both sides
SELECT 
  CASE WHEN u.id IS NULL THEN 'Orphaned Order' ELSE 'User' END as type,
  COALESCE(u.id, o.id) as id
FROM users u
FULL OUTER JOIN orders o ON o.user_id = u.id
WHERE u.id IS NULL OR o.id IS NULL;`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-green-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Result:</strong> Returns all users and all orders, regardless of matches.
                Useful for finding data integrity issues (orphaned records).
              </p>
            </div>
          </div>
        )}

        {/* Key Points */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Key Points:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>INNER JOIN:</strong> Most common. Returns only matching rows from both tables.
            </li>
            <li>
              <strong>LEFT JOIN:</strong> Returns all left table rows + matches. Use to find records
              without relationships.
            </li>
            <li>
              <strong>RIGHT JOIN:</strong> Returns all right table rows + matches. Less common, can
              be replaced with LEFT JOIN.
            </li>
            <li>
              <strong>FULL OUTER JOIN:</strong> Returns all rows from both tables. Useful for data
              integrity checks.
            </li>
            <li>
              <strong>Join Conditions:</strong> Always specify ON clause with the relationship
              (usually foreign key = primary key).
            </li>
            <li>
              <strong>Multiple Joins:</strong> Chain multiple JOINs to query across many related
              tables.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

