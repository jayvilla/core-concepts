"use client";

import { useState } from "react";

/**
 * PRISMA QUERYING EXAMPLE
 *
 * Demonstrates Prisma querying capabilities: CRUD, filtering, relations, transactions
 */

export default function PrismaQueryingExample() {
  const [selectedSection, setSelectedSection] = useState<
    "crud" | "filtering" | "relations" | "advanced"
  >("crud");

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        Prisma Querying
      </h2>

      <div className="space-y-6">
        {/* Section Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "crud", label: "CRUD Operations" },
              { key: "filtering", label: "Filtering & Sorting" },
              { key: "relations", label: "Relations" },
              { key: "advanced", label: "Advanced Queries" },
            ] as const
          ).map((section) => (
            <button
              key={section.key}
              onClick={() => setSelectedSection(section.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedSection === section.key
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* CRUD Operations */}
        {selectedSection === "crud" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">CRUD Operations:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Prisma provides type-safe CRUD operations with excellent TypeScript support.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
              <code>{`import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CREATE
const user = await prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'john@example.com',
    profile: {
      create: {
        bio: 'Software developer'
      }
    }
  }
});

// CREATE MANY
const users = await prisma.user.createMany({
  data: [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' }
  ],
  skipDuplicates: true  // Skip if email already exists
});

// READ - Find Unique
const user = await prisma.user.findUnique({
  where: { id: 1 }
});

// READ - Find First
const user = await prisma.user.findFirst({
  where: { email: 'john@example.com' }
});

// READ - Find Many
const users = await prisma.user.findMany({
  where: { isActive: true },
  orderBy: { createdAt: 'desc' },
  take: 10,
  skip: 0
});

// UPDATE
const updatedUser = await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Jane Doe' }
});

// UPDATE MANY
const result = await prisma.user.updateMany({
  where: { isActive: false },
  data: { isActive: true }
});

// UPSERT (Update or Create)
const user = await prisma.user.upsert({
  where: { email: 'john@example.com' },
  update: { name: 'John Updated' },
  create: {
    name: 'John Doe',
    email: 'john@example.com'
  }
});

// DELETE
await prisma.user.delete({
  where: { id: 1 }
});

// DELETE MANY
await prisma.user.deleteMany({
  where: { isActive: false }
});

// COUNT
const count = await prisma.user.count({
  where: { isActive: true }
});

// EXISTS
const exists = await prisma.user.findUnique({
  where: { email: 'john@example.com' }
}) !== null;`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-green-200 rounded">
              <p className="text-sm text-gray-900 font-semibold mb-2">
                Key Points:
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>All operations are fully type-safe</li>
                <li>createMany is faster but doesn't return created records</li>
                <li>updateMany returns count, not updated records</li>
                <li>upsert is atomic (create or update in one operation)</li>
                <li>deleteMany can be dangerous - use with caution</li>
              </ul>
            </div>
          </div>
        )}

        {/* Filtering & Sorting */}
        {selectedSection === "filtering" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">Filtering & Sorting:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Prisma provides powerful filtering, sorting, and pagination capabilities.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
              <code>{`// BASIC FILTERING
const users = await prisma.user.findMany({
  where: {
    email: 'john@example.com'  // Exact match
  }
});

// FILTER OPERATORS
const users = await prisma.user.findMany({
  where: {
    // Comparison
    age: { gt: 18 },           // Greater than
    age: { gte: 18 },          // Greater than or equal
    age: { lt: 65 },           // Less than
    age: { lte: 65 },          // Less than or equal
    
    // String operations
    email: { contains: '@gmail' },
    name: { startsWith: 'John' },
    name: { endsWith: 'Doe' },
    
    // Array operations
    tags: { has: 'developer' },
    
    // Null checks
    bio: { not: null },
    bio: null,
    
    // IN / NOT IN
    role: { in: ['USER', 'ADMIN'] },
    role: { notIn: ['BANNED'] },
    
    // AND / OR / NOT
    AND: [
      { isActive: true },
      { age: { gte: 18 } }
    ],
    OR: [
      { role: 'ADMIN' },
      { role: 'MODERATOR' }
    ],
    NOT: {
      isBanned: true
    }
  }
});

// SORTING
const users = await prisma.user.findMany({
  orderBy: [
    { createdAt: 'desc' },  // Primary sort
    { name: 'asc' }         // Secondary sort
  ]
});

// PAGINATION
const users = await prisma.user.findMany({
  skip: 20,   // Offset
  take: 10,   // Limit
  cursor: { id: 5 },  // Cursor-based pagination
  orderBy: { id: 'asc' }
});

// CURSOR-BASED PAGINATION (Better for large datasets)
const firstPage = await prisma.user.findMany({
  take: 10,
  orderBy: { id: 'asc' }
});

const lastUser = firstPage[firstPage.length - 1];

const nextPage = await prisma.user.findMany({
  take: 10,
  skip: 1,
  cursor: { id: lastUser.id },
  orderBy: { id: 'asc' }
});

// SELECT SPECIFIC FIELDS
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true
    // profile, posts, etc. are not included
  }
});

// DISTINCT
const uniqueRoles = await prisma.user.findMany({
  distinct: ['role'],
  select: { role: true }
});`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-green-200 rounded">
              <p className="text-sm text-gray-900 font-semibold mb-2">
                Filtering Tips:
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>Use indexes for frequently filtered columns</li>
                <li>Cursor-based pagination is more efficient than offset</li>
                <li>select reduces data transfer and improves performance</li>
                <li>Combine filters with AND/OR for complex queries</li>
                <li>Use distinct for unique value queries</li>
              </ul>
            </div>
          </div>
        )}

        {/* Relations */}
        {selectedSection === "relations" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">Working with Relations:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Prisma makes working with relationships intuitive and type-safe.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
              <code>{`// INCLUDE RELATIONS (Eager Loading)
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    profile: true,        // One-to-One
    posts: true,           // One-to-Many
    tags: true            // Many-to-Many
  }
});

// NESTED INCLUDE
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: {
      include: {
        comments: true,   // Nested relation
        author: {
          select: {
            name: true,
            email: true
          }
        }
      },
      where: {
        published: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    }
  }
});

// CREATE WITH RELATIONS
const user = await prisma.user.create({
  data: {
    name: 'John',
    email: 'john@example.com',
    profile: {
      create: {
        bio: 'Developer'
      }
    },
    posts: {
      create: [
        { title: 'Post 1', content: 'Content 1' },
        { title: 'Post 2', content: 'Content 2' }
      ]
    },
    tags: {
      connect: [
        { id: 1 },
        { id: 2 }
      ]
    }
  }
});

// UPDATE WITH RELATIONS
await prisma.user.update({
  where: { id: 1 },
  data: {
    profile: {
      upsert: {
        create: { bio: 'New bio' },
        update: { bio: 'Updated bio' }
      }
    },
    posts: {
      create: { title: 'New Post', content: 'Content' },
      update: {
        where: { id: 5 },
        data: { title: 'Updated Post' }
      },
      delete: { id: 3 }
    },
    tags: {
      set: [{ id: 1 }, { id: 2 }],  // Replace all
      connect: [{ id: 3 }],          // Add
      disconnect: [{ id: 1 }]        // Remove
    }
  }
});

// FILTER BY RELATION
const users = await prisma.user.findMany({
  where: {
    posts: {
      some: {
        published: true
      }
    },
    tags: {
      every: {
        name: { in: ['developer', 'engineer'] }
      }
    }
  }
});

// RELATION COUNT
const users = await prisma.user.findMany({
  include: {
    _count: {
      select: {
        posts: true,
        tags: true
      }
    }
  }
});

// AGGREGATE ON RELATIONS
const result = await prisma.user.aggregate({
  _count: {
    posts: {
      where: {
        published: true
      }
    }
  }
});`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-green-200 rounded">
              <p className="text-sm text-gray-900 font-semibold mb-2">
                Relation Operations:
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li><strong>include:</strong> Eager load relations</li>
                <li><strong>connect:</strong> Link existing records</li>
                <li><strong>create:</strong> Create nested records</li>
                <li><strong>set:</strong> Replace all relations</li>
                <li><strong>disconnect:</strong> Remove relations</li>
                <li><strong>some/every/none:</strong> Filter by relation conditions</li>
                <li>Use _count for relation counts</li>
              </ul>
            </div>
          </div>
        )}

        {/* Advanced Queries */}
        {selectedSection === "advanced" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">Advanced Queries:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Transactions, raw queries, aggregations, and more.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-green-300 overflow-x-auto">
              <code>{`// TRANSACTIONS
// Sequential operations (all succeed or all fail)
const result = await prisma.$transaction([
  prisma.user.create({
    data: { name: 'User 1', email: 'user1@example.com' }
  }),
  prisma.user.create({
    data: { name: 'User 2', email: 'user2@example.com' }
  })
]);

// Interactive transaction
await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({
    data: { name: 'John', email: 'john@example.com' }
  });
  
  await tx.profile.create({
    data: {
      userId: user.id,
      bio: 'Developer'
    }
  });
  
  return user;
});

// AGGREGATIONS
const stats = await prisma.user.aggregate({
  _count: { id: true },
  _avg: { age: true },
  _sum: { balance: true },
  _min: { createdAt: true },
  _max: { createdAt: true },
  where: {
    isActive: true
  }
});

// GROUP BY
const usersByRole = await prisma.user.groupBy({
  by: ['role'],
  _count: {
    id: true
  },
  _avg: {
    age: true
  },
  having: {
    id: {
      _count: {
        gt: 5
      }
    }
  }
});

// RAW SQL QUERIES
const users = await prisma.$queryRaw\`
  SELECT * FROM users
  WHERE age > $1
  ORDER BY created_at DESC
  LIMIT $2
\`, 18, 10);

// RAW SQL with Prisma types
const users = await prisma.$queryRaw<Array<{
  id: number;
  name: string;
  email: string;
}>>\`
  SELECT id, name, email FROM users
  WHERE role = $1
\`, 'USER');

// EXECUTE RAW SQL (for DDL)
await prisma.$executeRaw\`
  CREATE INDEX idx_user_email ON users(email)
\`;

// BATCH OPERATIONS
const users = await prisma.user.findMany({
  where: { isActive: true }
});

// Process in batches
const batchSize = 100;
for (let i = 0; i < users.length; i += batchSize) {
  const batch = users.slice(i, i + batchSize);
  await prisma.user.updateMany({
    where: {
      id: { in: batch.map(u => u.id) }
    },
    data: { lastLogin: new Date() }
  });
}

// FIND OR CREATE PATTERN
async function findOrCreateUser(email: string, name: string) {
  const user = await prisma.user.findUnique({
    where: { email }
  });
  
  if (user) return user;
  
  return await prisma.user.create({
    data: { email, name }
  });
}

// SOFT DELETE PATTERN
await prisma.user.update({
  where: { id: 1 },
  data: { deletedAt: new Date() }
});

const activeUsers = await prisma.user.findMany({
  where: { deletedAt: null }
});`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-green-200 rounded">
              <p className="text-sm text-gray-900 font-semibold mb-2">
                Advanced Features:
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li><strong>Transactions:</strong> Ensure data consistency</li>
                <li><strong>Aggregations:</strong> Calculate statistics</li>
                <li><strong>Group By:</strong> Group and aggregate data</li>
                <li><strong>Raw SQL:</strong> For complex queries Prisma can't express</li>
                <li><strong>Batch Operations:</strong> Process large datasets efficiently</li>
                <li>Use transactions for multi-step operations</li>
                <li>Raw SQL should be last resort - prefer Prisma queries</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">Query Performance Tips:</h4>
        <ul className="text-sm text-gray-900 list-disc list-inside space-y-1">
          <li>Use select to fetch only needed fields</li>
          <li>Add indexes for frequently filtered columns</li>
          <li>Use include carefully - can cause N+1 queries</li>
          <li>Prefer cursor-based pagination over offset</li>
          <li>Batch operations when possible</li>
          <li>Use transactions for related operations</li>
        </ul>
      </div>
    </div>
  );
}
