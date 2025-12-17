"use client";

/**
 * INDEXES EXAMPLE
 *
 * Demonstrates database indexes:
 * - What indexes are and why they're important
 * - How to create indexes
 * - When to use indexes
 * - Performance impact
 */

export default function IndexesExample() {
  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        Indexes: Performance Optimization
      </h2>

      <div className="space-y-6">
        {/* What are Indexes */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">What are Indexes?</h3>
          <p className="text-sm text-gray-700 mb-3">
            Indexes are data structures that improve the speed of data retrieval operations on a
            database table. Think of them like an index in a book - instead of scanning every page,
            you can quickly find what you need.
          </p>
          <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
            <p className="text-sm text-gray-900">
              <strong>Without Index:</strong> Database scans entire table (slow for large tables)
            </p>
            <p className="text-sm text-gray-900">
              <strong>With Index:</strong> Database uses index to quickly locate rows (much faster)
            </p>
          </div>
        </div>

        {/* Creating Indexes */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">Creating Indexes:</h3>
          <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-purple-300 overflow-x-auto">
            <code>{`-- Create index on a single column
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Create index on multiple columns (composite index)
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- Create unique index (ensures uniqueness)
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Create partial index (only on subset of rows)
CREATE INDEX idx_active_users ON users(email) 
WHERE active = true;

-- Create index with specific method (B-tree is default)
CREATE INDEX idx_orders_total ON orders USING btree(total);

-- Drop an index
DROP INDEX idx_orders_user_id;`}</code>
          </pre>
        </div>

        {/* When to Use Indexes */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">When to Use Indexes:</h3>
          <div className="space-y-3">
            <div className="p-3 bg-white border border-purple-200 rounded">
              <p className="font-semibold text-sm text-gray-900 mb-2">✅ Good Candidates:</p>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>Foreign key columns (frequently used in JOINs)</li>
                <li>Columns used in WHERE clauses</li>
                <li>Columns used in ORDER BY</li>
                <li>Columns used in GROUP BY</li>
                <li>Frequently queried columns</li>
                <li>Columns with high cardinality (many unique values)</li>
              </ul>
            </div>
            <div className="p-3 bg-white border border-purple-200 rounded">
              <p className="font-semibold text-sm text-gray-900 mb-2">❌ Avoid Indexing:</p>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>Columns rarely used in queries</li>
                <li>Columns with low cardinality (few unique values, like boolean)</li>
                <li>Small tables (index overhead may not be worth it)</li>
                <li>Columns frequently updated (indexes slow down writes)</li>
                <li>Columns with NULL values (unless using partial index)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Performance Example */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">Performance Impact:</h3>
          <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-purple-300 overflow-x-auto">
            <code>{`-- Query without index (slow - full table scan)
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 123;
-- Execution Time: 250.123 ms (scans 1,000,000 rows)

-- Create index
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Same query with index (fast - index lookup)
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 123;
-- Execution Time: 0.456 ms (uses index, scans ~10 rows)

-- Performance improvement: ~550x faster!`}</code>
          </pre>
          <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
            <p className="text-sm text-gray-900">
              <strong>EXPLAIN ANALYZE:</strong> Use this command to see the query execution plan and
              verify that indexes are being used.
            </p>
          </div>
        </div>

        {/* Index Types */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">Index Types in PostgreSQL:</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">B-tree</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-900">
                    Default. Good for most queries (equality, range, sorting)
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Hash</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-900">
                    Fast for equality comparisons only (not for sorting)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">GIN</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-900">
                    Generalized Inverted Index. Good for arrays, JSON, full-text search
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">GiST</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-900">
                    Generalized Search Tree. Good for geometric data, full-text search
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Points */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Key Points:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Trade-offs:</strong> Indexes speed up SELECT queries but slow down INSERT,
              UPDATE, and DELETE operations (indexes must be maintained)
            </li>
            <li>
              <strong>Storage:</strong> Indexes take up additional disk space
            </li>
            <li>
              <strong>Automatic Indexes:</strong> PostgreSQL automatically creates indexes for
              PRIMARY KEY and UNIQUE constraints
            </li>
            <li>
              <strong>Composite Indexes:</strong> Order matters! Index on (a, b) can be used for
              queries on (a) or (a, b), but not (b) alone
            </li>
            <li>
              <strong>Monitor Usage:</strong> Use EXPLAIN ANALYZE to verify indexes are being used
              and identify missing indexes
            </li>
            <li>
              <strong>Best Practice:</strong> Index foreign keys and frequently queried columns,
              but don&apos;t over-index (balance between read and write performance)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

