"use client";

import { useState } from "react";

/**
 * PRISMA SCHEMA EXAMPLE
 *
 * Demonstrates Prisma schema definition, models, and relationships
 */

export default function PrismaSchemaExample() {
  const [selectedSection, setSelectedSection] = useState<
    "basics" | "relationships" | "advanced"
  >("basics");

  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        Prisma Schema & Models
      </h2>

      <div className="space-y-6">
        {/* Section Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "basics", label: "Schema Basics" },
              { key: "relationships", label: "Relationships" },
              { key: "advanced", label: "Advanced Features" },
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

        {/* Schema Basics */}
        {selectedSection === "basics" && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3">Schema Structure:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Prisma uses a declarative schema file (schema.prisma) as the single source of truth for your database structure.
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

// Basic Model Definition
model User {
  // Primary Key
  id        Int      @id @default(autoincrement())
  
  // String Fields
  name      String   @db.VarChar(100)
  email     String   @unique @db.VarChar(255)
  
  // Optional Fields
  bio       String?  @db.Text
  
  // DateTime Fields
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  
  // Boolean with Default
  isActive  Boolean  @default(true)
  
  // Enum
  role      UserRole @default(USER)
  
  // Table Mapping
  @@map("users")
  
  // Indexes
  @@index([email])
  @@unique([email, name])
}

enum UserRole {
  USER
  ADMIN
  MODERATOR
}`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
              <p className="text-sm text-gray-900 font-semibold mb-2">
                Key Schema Directives:
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">@id</code> - Primary key</li>
                <li><code className="bg-gray-100 px-1 rounded">@default()</code> - Default value (autoincrement, now, etc.)</li>
                <li><code className="bg-gray-100 px-1 rounded">@unique</code> - Unique constraint</li>
                <li><code className="bg-gray-100 px-1 rounded">@map()</code> - Maps field/model name to database column/table name</li>
                <li><code className="bg-gray-100 px-1 rounded">@db.VarChar()</code> - Database-specific type</li>
                <li><code className="bg-gray-100 px-1 rounded">@updatedAt</code> - Auto-updated timestamp</li>
                <li><code className="bg-gray-100 px-1 rounded">?</code> - Optional/nullable field</li>
                <li><code className="bg-gray-100 px-1 rounded">[]</code> - Array type (for relations)</li>
              </ul>
            </div>
          </div>
        )}

        {/* Relationships */}
        {selectedSection === "relationships" && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3">Relationships:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Prisma supports all relationship types with clean, declarative syntax.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-purple-300 overflow-x-auto">
              <code>{`// ONE-TO-ONE
model User {
  id      Int      @id
  profile Profile?  // Optional - user may not have profile
}

model Profile {
  id        Int  @id
  bio       String?
  userId    Int  @unique  // Foreign key with unique constraint
  user      User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("profiles")
}

// ONE-TO-MANY
model User {
  id    Int    @id
  posts Post[]  // Array indicates "many"
}

model Post {
  id       Int  @id
  title    String
  authorId Int  // Foreign key
  author   User @relation(fields: [authorId], references: [id], onDelete: Cascade)
  
  @@index([authorId])
  @@map("posts")
}

// MANY-TO-MANY (Implicit)
model User {
  id   Int   @id
  tags Tag[]  // Array on both sides
}

model Tag {
  id    Int    @id
  name  String @unique
  users User[]  // Array on both sides
  // Prisma automatically creates junction table: _TagToUser
}

// MANY-TO-MANY (Explicit - with additional fields)
model User {
  id         Int          @id
  userTags   UserTag[]
}

model Tag {
  id       Int          @id
  userTags UserTag[]
}

model UserTag {
  id        Int   @id
  userId    Int
  tagId     Int
  createdAt DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id])
  tag  Tag  @relation(fields: [tagId], references: [id])
  
  @@unique([userId, tagId])
  @@map("user_tags")
}

// SELF-REFERENCING (One-to-Many)
model Category {
  id       Int        @id
  name     String
  parentId Int?
  parent   Category?  @relation("CategoryTree", fields: [parentId], references: [id])
  children Category[] @relation("CategoryTree")
}`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
              <p className="text-sm text-gray-900 font-semibold mb-2">
                Relationship Rules:
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li><strong>One-to-One:</strong> Optional field (?) on one side, @unique foreign key</li>
                <li><strong>One-to-Many:</strong> Array on "one" side, foreign key on "many" side</li>
                <li><strong>Many-to-Many:</strong> Arrays on both sides (implicit) or explicit junction table</li>
                <li><strong>onDelete:</strong> Cascade, SetNull, Restrict, NoAction</li>
                <li><strong>onUpdate:</strong> Cascade, Restrict, NoAction</li>
                <li>Always define relation on both sides for clarity</li>
              </ul>
            </div>
          </div>
        )}

        {/* Advanced Features */}
        {selectedSection === "advanced" && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3">Advanced Schema Features:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Prisma supports advanced features like composite keys, indexes, and database-specific types.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-purple-300 overflow-x-auto">
              <code>{`// COMPOSITE PRIMARY KEY
model UserRole {
  userId Int
  roleId Int
  
  user User @relation(fields: [userId], references: [id])
  role Role @relation(fields: [roleId], references: [id])
  
  @@id([userId, roleId])
  @@map("user_roles")
}

// MULTIPLE INDEXES
model Post {
  id        Int      @id
  title     String
  content   String   @db.Text
  authorId  Int
  status    PostStatus
  createdAt DateTime @default(now())
  
  author User @relation(fields: [authorId], references: [id])
  
  // Single column index
  @@index([authorId])
  
  // Composite index
  @@index([status, createdAt])
  
  // Unique composite index
  @@unique([authorId, title])
  
  @@map("posts")
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

// FULL-TEXT SEARCH (PostgreSQL)
model Post {
  id      Int    @id
  title   String
  content String @db.Text
  
  @@index([title, content(ops: Raw("gin_trgm_ops"))], type: Gin)
  @@map("posts")
}

// JSON FIELD
model User {
  id     Int   @id
  name   String
  metadata Json  // Stores JSON data
  
  @@map("users")
}

// ARRAY FIELD (PostgreSQL)
model Post {
  id     Int      @id
  title  String
  tags   String[]  // Array of strings
  
  @@map("posts")
}

// CUSTOM SCALAR TYPES
model User {
  id       Int      @id
  email    String   @unique
  balance  Decimal   @db.Decimal(10, 2)  // Precision and scale
  metadata Json?
  
  @@map("users")
}`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-purple-200 rounded">
              <p className="text-sm text-gray-900 font-semibold mb-2">
                Advanced Features:
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li><strong>Composite Keys:</strong> Use @@id([field1, field2]) for composite primary keys</li>
                <li><strong>Indexes:</strong> @@index() for performance optimization</li>
                <li><strong>JSON Fields:</strong> Store flexible JSON data with Json type</li>
                <li><strong>Array Fields:</strong> Native array support in PostgreSQL</li>
                <li><strong>Database Types:</strong> Use @db.* for database-specific types</li>
                <li><strong>Enums:</strong> Type-safe enumerations</li>
                <li><strong>Full-Text Search:</strong> Advanced indexing for search</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">Schema Best Practices:</h4>
        <ul className="text-sm text-gray-900 list-disc list-inside space-y-1">
          <li>Keep schema.prisma as the single source of truth</li>
          <li>Use @map() to separate model names from table names</li>
          <li>Always define relationships on both sides</li>
          <li>Use indexes for frequently queried columns</li>
          <li>Set appropriate onDelete/onUpdate behaviors</li>
          <li>Use enums for fixed sets of values</li>
          <li>Run <code className="bg-gray-100 px-1 rounded">npx prisma generate</code> after schema changes</li>
        </ul>
      </div>
    </div>
  );
}
