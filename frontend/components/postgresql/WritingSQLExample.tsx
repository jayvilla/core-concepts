"use client";

import { useState } from "react";

/**
 * WRITING SQL EXAMPLE
 *
 * Demonstrates basic SQL operations:
 * - CREATE TABLE: Define table structure
 * - SELECT: Retrieve data
 * - UPDATE: Modify existing records
 * - DELETE: Remove records
 */

export default function WritingSQLExample() {
  const [selectedOperation, setSelectedOperation] = useState<
    "create" | "select" | "update" | "delete"
  >("create");

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        Writing SQL: Basic Operations
      </h2>

      <div className="space-y-6">
        {/* Operation Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "create", label: "CREATE TABLE" },
              { key: "select", label: "SELECT" },
              { key: "update", label: "UPDATE" },
              { key: "delete", label: "DELETE" },
            ] as const
          ).map((op) => (
            <button
              key={op.key}
              onClick={() => setSelectedOperation(op.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedOperation === op.key
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>

        {/* CREATE TABLE */}
        {selectedOperation === "create" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">CREATE TABLE:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Creates a new table with specified columns and constraints.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
              <code>{`CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Explanation:
-- SERIAL: Auto-incrementing integer
-- PRIMARY KEY: Unique identifier for each row
-- TEXT: Variable-length string
-- UNIQUE: No duplicate values allowed
-- NOT NULL: Field must have a value
-- TIMESTAMP: Date and time
-- DEFAULT NOW(): Sets current timestamp if not provided`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Result:</strong> Creates a table named &quot;users&quot; with three columns:
                id (auto-incrementing primary key), email (unique, required), and created_at
                (timestamp with default value).
              </p>
            </div>
          </div>
        )}

        {/* SELECT */}
        {selectedOperation === "select" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">SELECT:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Retrieves data from one or more tables.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
              <code>{`-- Select all columns from users table
SELECT * FROM users;

-- Select specific columns
SELECT id, email FROM users;

-- Select with WHERE clause (filtering)
SELECT * FROM users WHERE email = 'test@test.com';

-- Select with multiple conditions
SELECT * FROM users 
WHERE email = 'test@test.com' 
  AND created_at > '2024-01-01';

-- Select with ORDER BY (sorting)
SELECT * FROM users ORDER BY created_at DESC;

-- Select with LIMIT (restrict results)
SELECT * FROM users LIMIT 10;`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Result:</strong> Returns rows matching the specified conditions. Use WHERE
                to filter, ORDER BY to sort, and LIMIT to restrict the number of results.
              </p>
            </div>
          </div>
        )}

        {/* UPDATE */}
        {selectedOperation === "update" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">UPDATE:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Modifies existing records in a table.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
              <code>{`-- Update a single column
UPDATE users 
SET email = 'new@test.com' 
WHERE id = 1;

-- Update multiple columns
UPDATE users 
SET email = 'new@test.com',
    created_at = NOW()
WHERE id = 1;

-- Update multiple rows
UPDATE users 
SET email = 'updated@test.com'
WHERE created_at < '2024-01-01';

-- Always use WHERE clause!
-- Without WHERE, updates ALL rows (dangerous!)
UPDATE users SET email = 'dangerous@test.com'; -- ⚠️ Updates all rows!`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Result:</strong> Modifies the specified columns for rows matching the WHERE
                condition. <strong>Always include a WHERE clause</strong> to avoid updating all rows
                accidentally!
              </p>
            </div>
          </div>
        )}

        {/* DELETE */}
        {selectedOperation === "delete" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">DELETE:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Removes records from a table.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
              <code>{`-- Delete a specific row
DELETE FROM users WHERE id = 1;

-- Delete multiple rows
DELETE FROM users WHERE created_at < '2024-01-01';

-- Delete with subquery
DELETE FROM users 
WHERE id IN (
  SELECT id FROM users WHERE email LIKE '%spam%'
);

-- Always use WHERE clause!
-- Without WHERE, deletes ALL rows (very dangerous!)
DELETE FROM users; -- ⚠️ Deletes all rows!`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Result:</strong> Permanently removes rows matching the WHERE condition.
                <strong> Always include a WHERE clause</strong> to avoid deleting all data! Consider
                using soft deletes (a &quot;deleted&quot; flag) instead of hard deletes in production.
              </p>
            </div>
          </div>
        )}

        {/* Key Points */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Key Points:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>CREATE TABLE:</strong> Define your schema with appropriate data types and
              constraints (PRIMARY KEY, UNIQUE, NOT NULL, etc.)
            </li>
            <li>
              <strong>SELECT:</strong> Use WHERE for filtering, ORDER BY for sorting, LIMIT for
              pagination
            </li>
            <li>
              <strong>UPDATE/DELETE:</strong> Always include a WHERE clause to avoid modifying or
              deleting all rows accidentally
            </li>
            <li>
              <strong>Data Types:</strong> SERIAL (auto-increment), TEXT (string), INTEGER, TIMESTAMP,
              BOOLEAN, etc.
            </li>
            <li>
              <strong>Constraints:</strong> PRIMARY KEY (unique identifier), UNIQUE (no duplicates),
              NOT NULL (required), FOREIGN KEY (references another table)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

