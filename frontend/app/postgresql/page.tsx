import Link from "next/link";
import WritingSQLExample from "@/components/postgresql/WritingSQLExample";
import RelationshipsJoinsExample from "@/components/postgresql/RelationshipsJoinsExample";
import IndexesExample from "@/components/postgresql/IndexesExample";
import PaginationExample from "@/components/postgresql/PaginationExample";
import TransactionsExample from "@/components/postgresql/TransactionsExample";
import BackendConnectionExample from "@/components/postgresql/BackendConnectionExample";

export default function PostgreSQLPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              PostgreSQL Concepts
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Master PostgreSQL fundamentals for backend development. Learn SQL basics, relationships, joins, indexes, pagination, transactions, and how to connect from your backend using TypeORM.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <WritingSQLExample />
          <RelationshipsJoinsExample />
          <IndexesExample />
          <PaginationExample />
          <TransactionsExample />
          <BackendConnectionExample />
        </div>

        {/* Interview Tips */}
        <div className="mt-8 p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            💡 Interview Tips
          </h2>
          <div className="space-y-4 text-gray-900">
            <div>
              <p className="font-semibold mb-2">Common Questions:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>&quot;What is PostgreSQL and how does it differ from MySQL?&quot;</li>
                <li>&quot;Explain different types of JOINs in SQL&quot;</li>
                <li>&quot;What are indexes and when should you use them?&quot;</li>
                <li>&quot;How do you implement pagination in SQL?&quot;</li>
                <li>&quot;What are database transactions and ACID properties?&quot;</li>
                <li>&quot;How do you connect to PostgreSQL from a Node.js backend?&quot;</li>
                <li>&quot;What is an ORM and why use TypeORM?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>PostgreSQL:</strong> Open-source relational database with advanced features like JSON support, full-text search, and ACID compliance. More feature-rich than MySQL, better for complex queries and data integrity.
                </li>
                <li>
                  <strong>SQL Basics:</strong> CREATE TABLE defines schema, SELECT retrieves data, UPDATE modifies records, DELETE removes records. Use WHERE for filtering, ORDER BY for sorting, GROUP BY for aggregation.
                </li>
                <li>
                  <strong>JOINs:</strong> INNER JOIN returns matching rows, LEFT JOIN returns all left rows + matches, RIGHT JOIN returns all right rows + matches, FULL OUTER JOIN returns all rows from both tables. Use JOINs to combine related data from multiple tables.
                </li>
                <li>
                  <strong>Indexes:</strong> Improve query performance by creating a data structure that allows faster lookups. Use on frequently queried columns, foreign keys, and WHERE/ORDER BY columns. Trade-off: faster reads, slower writes, additional storage.
                </li>
                <li>
                  <strong>Pagination:</strong> Use LIMIT to restrict rows returned, OFFSET to skip rows. For large datasets, consider cursor-based pagination (using WHERE id &gt; lastId) instead of OFFSET for better performance.
                </li>
                <li>
                  <strong>Transactions:</strong> ACID properties - Atomicity (all or nothing), Consistency (valid state transitions), Isolation (concurrent transactions don&apos;t interfere), Durability (committed changes persist). Use BEGIN/COMMIT/ROLLBACK to manage transactions.
                </li>
                <li>
                  <strong>TypeORM:</strong> Object-Relational Mapping library for TypeScript/Node.js. Provides type-safe database access, migrations, relationships, query builder, and repository pattern. Simplifies database operations and provides abstraction over raw SQL.
                </li>
                <li>
                  <strong>Best Practices:</strong> Use parameterized queries to prevent SQL injection, create indexes on foreign keys and frequently queried columns, use transactions for multi-step operations, normalize data to reduce redundancy, use connection pooling for performance.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">PostgreSQL vs Other Databases:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Feature</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">PostgreSQL</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">MySQL</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">MongoDB</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Type</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Relational (SQL)</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Relational (SQL)</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Document (NoSQL)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">ACID Compliance</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Full</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Full (InnoDB)</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">⚠️ Limited</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">JSON Support</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Native</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ JSON type</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Native</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Complex Queries</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Excellent</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Good</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">⚠️ Limited</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Performance</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Excellent for complex queries</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Excellent for simple reads</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Excellent for writes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

