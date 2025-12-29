"use client";

import { useState } from "react";

/**
 * PRISMA EXAMPLE
 *
 * Demonstrates Prisma schema definition and usage
 */

export default function PrismaExample() {
  const [selectedSection, setSelectedSection] = useState<
    "schema" | "usage" | "relationships"
  >("schema");

  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        Prisma - Schema-First ORM
      </h2>

      <div className="space-y-6">
        {/* Section Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "schema", label: "Schema Definition" },
              { key: "usage", label: "Usage Examples" },
              { key: "relationships", label: "Relationships" },
            ] as const
          ).map((section) => (
            <button
              key={section.key}
              onClick={() => setSelectedSection(section.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedSection === section.key
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Schema Definition */}
        {selectedSection === "schema" && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3">Prisma Schema:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Prisma uses a schema file (schema.prisma) to define your database structure.
              The schema is the single source of truth.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-purple-300 overflow-x-auto">
              <code>{`// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String   @db.VarChar(100)
  email     String   @unique @db.VarChar(255)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  profile Profile?
  posts   Post[]
  tags    Tag[]

  @@index([email])
  @@map("orm_users")
}

model Profile {
  id        Int      @id @default(autoincrement())
  bio       String?  @db.Text
  avatar    String?  @db.VarChar(255)
  userId    Int      @unique @map("user_id")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("orm_profiles")
}`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Points:</strong>
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>Schema-first approach - single source of truth</li>
                <li>@id marks primary key, @default sets default values</li>
                <li>@unique enforces uniqueness constraint</li>
                <li>@map maps model/field names to database table/column names</li>
                <li>Relationships defined with model references</li>
                <li>Run <code className="bg-gray-100 px-1 rounded">npx prisma generate</code> to generate client</li>
              </ul>
            </div>
          </div>
        )}

        {/* Usage Examples */}
        {selectedSection === "usage" && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3">Prisma Usage:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Prisma Client provides type-safe database access with auto-completion.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-purple-300 overflow-x-auto">
              <code>{`import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CREATE
const user = await prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'john@example.com'
  }
});

// FIND with relations
const userWithRelations = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    profile: true,
    posts: true,
    tags: true
  }
});

// FIND MANY with filtering
const users = await prisma.user.findMany({
  where: {
    email: { contains: '@example.com' }
  },
  orderBy: { createdAt: 'desc' },
  take: 10
});

// UPDATE
await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Jane Doe' }
});

// DELETE
await prisma.user.delete({
  where: { id: 1 }
});

// TRANSACTIONS
await prisma.$transaction([
  prisma.user.create({ data: { name: 'User 1', email: 'u1@example.com' } }),
  prisma.user.create({ data: { name: 'User 2', email: 'u2@example.com' } })
]);`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Points:</strong>
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>Fully type-safe - TypeScript knows all fields and types</li>
                <li>Auto-completion for all operations</li>
                <li>include for eager loading relationships</li>
                <li>where for filtering, orderBy for sorting</li>
                <li>Built-in transaction support</li>
              </ul>
            </div>
          </div>
        )}

        {/* Relationships */}
        {selectedSection === "relationships" && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3">Prisma Relationships:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Prisma supports all relationship types with clean syntax.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-purple-300 overflow-x-auto">
              <code>{`// ONE-TO-ONE
model User {
  id      Int      @id
  profile Profile?
}

model Profile {
  id     Int  @id
  userId Int  @unique
  user   User @relation(fields: [userId], references: [id])
}

// ONE-TO-MANY
model User {
  id    Int    @id
  posts Post[]
}

model Post {
  id       Int  @id
  authorId Int
  author   User @relation(fields: [authorId], references: [id])
}

// MANY-TO-MANY
model User {
  id   Int   @id
  tags Tag[]
}

model Tag {
  id    Int    @id
  users User[]
}

// Usage with relations
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    profile: true,  // One-to-One
    posts: true,    // One-to-Many
    tags: true      // Many-to-Many
  }
});`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Points:</strong>
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>One-to-One: Optional field (?) on one side, @unique foreign key</li>
                <li>One-to-Many: Array on "one" side, foreign key on "many" side</li>
                <li>Many-to-Many: Arrays on both sides, Prisma creates junction table</li>
                <li>onDelete: Cascade, SetNull, Restrict, NoAction</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">Prisma Pros & Cons:</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-900">
          <div>
            <p className="font-semibold mb-2 text-green-700">✅ Pros:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Excellent TypeScript support</li>
              <li>Schema-first (single source of truth)</li>
              <li>Auto-generated type-safe client</li>
              <li>Great developer experience</li>
              <li>Built-in migrations</li>
              <li>Minimal boilerplate</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2 text-red-700">❌ Cons:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Requires code generation step</li>
              <li>Less flexible than decorator-based ORMs</li>
              <li>Newer ecosystem</li>
              <li>Schema changes require regeneration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

