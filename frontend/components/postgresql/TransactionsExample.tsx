"use client";

import { useState } from "react";

/**
 * TRANSACTIONS EXAMPLE
 *
 * Demonstrates database transactions:
 * - BEGIN, COMMIT, ROLLBACK
 * - ACID properties
 * - Transaction isolation levels
 * - Error handling
 */

export default function TransactionsExample() {
  const [selectedTopic, setSelectedTopic] = useState<
    "basics" | "acid" | "isolation" | "examples"
  >("basics");

  return (
    <div className="border-2 border-red-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-red-900">
        Transactions: ACID Properties
      </h2>

      <div className="space-y-6">
        {/* Topic Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "basics", label: "Basics" },
              { key: "acid", label: "ACID Properties" },
              { key: "isolation", label: "Isolation Levels" },
              { key: "examples", label: "Examples" },
            ] as const
          ).map((topic) => (
            <button
              key={topic.key}
              onClick={() => setSelectedTopic(topic.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedTopic === topic.key
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {topic.label}
            </button>
          ))}
        </div>

        {/* Basics */}
        {selectedTopic === "basics" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-bold text-red-900 mb-3">Transaction Basics:</h3>
            <p className="text-sm text-gray-700 mb-3">
              A transaction is a sequence of database operations that are executed as a single unit.
              Either all operations succeed (COMMIT) or all fail (ROLLBACK).
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-red-300 overflow-x-auto">
              <code>{`-- Start a transaction
BEGIN;

-- Multiple SQL statements
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
INSERT INTO transactions (user_id, amount) VALUES (1, -100);

-- If everything is OK, commit (save changes)
COMMIT;

-- If something goes wrong, rollback (undo all changes)
ROLLBACK;

-- Example with error handling
BEGIN;
  INSERT INTO users (name, email) VALUES ('Bob', 'bob@example.com');
  -- If this fails, the entire transaction is rolled back
  INSERT INTO accounts (user_id, balance) VALUES (999, 1000); -- Invalid user_id
COMMIT; -- This won't execute if there's an error above`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-red-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Points:</strong> Transactions ensure data consistency. If any operation
                fails, all changes are rolled back. Use transactions for multi-step operations that
                must succeed or fail together.
              </p>
            </div>
          </div>
        )}

        {/* ACID Properties */}
        {selectedTopic === "acid" && (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-bold text-red-900 mb-3">ACID Properties:</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white border border-red-200 rounded">
                  <p className="font-semibold text-sm text-gray-900 mb-2">
                    A - Atomicity:
                  </p>
                  <p className="text-sm text-gray-900">
                    All operations in a transaction succeed or fail together. No partial updates.
                  </p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-2 rounded mt-2 overflow-x-auto">
                    <code>{`-- Either ALL of these succeed, or NONE
BEGIN;
  UPDATE account1 SET balance = balance - 100;
  UPDATE account2 SET balance = balance + 100;
COMMIT;`}</code>
                  </pre>
                </div>
                <div className="p-3 bg-white border border-red-200 rounded">
                  <p className="font-semibold text-sm text-gray-900 mb-2">
                    C - Consistency:
                  </p>
                  <p className="text-sm text-gray-900">
                    Database remains in a valid state before and after the transaction. All
                    constraints and rules are maintained.
                  </p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-2 rounded mt-2 overflow-x-auto">
                    <code>{`-- Ensures foreign keys, constraints, etc. are valid
BEGIN;
  INSERT INTO orders (user_id, total) VALUES (999, 100);
  -- If user_id 999 doesn't exist, transaction fails
COMMIT;`}</code>
                  </pre>
                </div>
                <div className="p-3 bg-white border border-red-200 rounded">
                  <p className="font-semibold text-sm text-gray-900 mb-2">
                    I - Isolation:
                  </p>
                  <p className="text-sm text-gray-900">
                    Concurrent transactions don&apos;t interfere with each other. Each transaction
                    sees a consistent snapshot of the database.
                  </p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-2 rounded mt-2 overflow-x-auto">
                    <code>{`-- Transaction 1 and Transaction 2 run concurrently
-- Each sees consistent data, even if other is modifying
BEGIN; -- Transaction 1
  SELECT balance FROM accounts WHERE id = 1; -- Reads 1000
  -- Transaction 2 might update this, but Transaction 1 doesn't see it yet
COMMIT;`}</code>
                  </pre>
                </div>
                <div className="p-3 bg-white border border-red-200 rounded">
                  <p className="font-semibold text-sm text-gray-900 mb-2">
                    D - Durability:
                  </p>
                  <p className="text-sm text-gray-900">
                    Once a transaction is committed, changes are permanent and survive system
                    failures.
                  </p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-2 rounded mt-2 overflow-x-auto">
                    <code>{`-- After COMMIT, changes are written to disk
-- Even if database crashes, changes persist
BEGIN;
  INSERT INTO users (name) VALUES ('Charlie');
COMMIT; -- Now permanent, even after restart`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Isolation Levels */}
        {selectedTopic === "isolation" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-bold text-red-900 mb-3">Isolation Levels:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Isolation levels control how transactions interact with each other. Higher isolation
              = more safety but less concurrency.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Level</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Description</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">
                      READ UNCOMMITTED
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-900">
                      Can read uncommitted changes (dirty reads)
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-900">Rarely used</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">
                      READ COMMITTED
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-900">
                      Only read committed data (PostgreSQL default)
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-900">Most common</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">
                      REPEATABLE READ
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-900">
                      Same query returns same results within transaction
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-900">When consistency is critical</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">SERIALIZABLE</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-900">
                      Highest isolation, transactions execute serially
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-900">
                      When absolute consistency is required
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-red-300 overflow-x-auto mt-3">
              <code>{`-- Set isolation level for a transaction
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
  -- Transaction code here
COMMIT;

-- PostgreSQL default is READ COMMITTED
-- Most applications work fine with this`}</code>
            </pre>
          </div>
        )}

        {/* Examples */}
        {selectedTopic === "examples" && (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-bold text-red-900 mb-3">Real-World Examples:</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-sm text-gray-900 mb-2">
                    Example 1: Money Transfer
                  </p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-red-300 overflow-x-auto">
                    <code>{`-- Transfer $100 from account 1 to account 2
BEGIN;
  -- Deduct from source account
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  
  -- Add to destination account
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
  
  -- Log the transaction
  INSERT INTO transaction_log (from_account, to_account, amount)
  VALUES (1, 2, 100);
  
  -- If any step fails, all changes are rolled back
COMMIT;`}</code>
                  </pre>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 mb-2">
                    Example 2: Order Creation
                  </p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-red-300 overflow-x-auto">
                    <code>{`-- Create order with items
BEGIN;
  -- Create order
  INSERT INTO orders (user_id, total) VALUES (1, 150.00);
  -- Get the order ID (using RETURNING or LASTVAL)
  -- In PostgreSQL: order_id = LASTVAL() or use RETURNING
  
  -- Add order items
  INSERT INTO order_items (order_id, product_id, quantity, price)
  VALUES 
    (LASTVAL(), 10, 2, 50.00),
    (LASTVAL(), 20, 1, 50.00);
  
  -- Update inventory
  UPDATE products SET stock = stock - 2 WHERE id = 10;
  UPDATE products SET stock = stock - 1 WHERE id = 20;
  
  -- If inventory is insufficient, transaction fails
COMMIT;`}</code>
                  </pre>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 mb-2">
                    Example 3: Error Handling
                  </p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-red-300 overflow-x-auto">
                    <code>{`-- Using savepoints for partial rollback
BEGIN;
  INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
  
  SAVEPOINT after_user;
  
  INSERT INTO accounts (user_id, balance) VALUES (LASTVAL(), 0);
  -- If this fails, rollback to savepoint (user still created)
  
  -- On error:
  -- ROLLBACK TO SAVEPOINT after_user;
  -- Then continue or rollback entirely
  
COMMIT;`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Key Points */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Key Points:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Use Transactions:</strong> For any multi-step operation that must succeed or
              fail together (money transfers, order creation, etc.)
            </li>
            <li>
              <strong>ACID Guarantees:</strong> Atomicity (all or nothing), Consistency (valid
              state), Isolation (concurrent transactions don&apos;t interfere), Durability
              (permanent changes)
            </li>
            <li>
              <strong>Isolation Levels:</strong> Balance between consistency and performance. Most
              apps use READ COMMITTED (PostgreSQL default).
            </li>
            <li>
              <strong>Error Handling:</strong> Always handle transaction errors. Use savepoints for
              partial rollbacks if needed.
            </li>
            <li>
              <strong>Performance:</strong> Keep transactions short. Long transactions can block
              other operations and cause deadlocks.
            </li>
            <li>
              <strong>Best Practice:</strong> Use transactions for operations that modify multiple
              related tables or require consistency guarantees.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

