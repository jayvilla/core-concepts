"use client";

import { useState } from "react";

/**
 * PRISMA MIGRATIONS EXAMPLE
 *
 * Demonstrates Prisma migration workflow and best practices
 */

export default function PrismaMigrationsExample() {
  const [selectedSection, setSelectedSection] = useState<
    "basics" | "workflow" | "advanced"
  >("basics");

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        Prisma Migrations
      </h2>

      <div className="space-y-6">
        {/* Section Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "basics", label: "Migration Basics" },
              { key: "workflow", label: "Migration Workflow" },
              { key: "advanced", label: "Advanced Migrations" },
            ] as const
          ).map((section) => (
            <button
              key={section.key}
              onClick={() => setSelectedSection(section.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedSection === section.key
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Migration Basics */}
        {selectedSection === "basics" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">Migration Commands:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Prisma Migrate tracks schema changes and generates SQL migration files.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
              <code>{`# Create a new migration
npx prisma migrate dev --name add_user_table

# Apply migrations to database
npx prisma migrate deploy

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Check migration status
npx prisma migrate status

# Create migration without applying
npx prisma migrate dev --create-only --name migration_name

# Resolve migration issues
npx prisma migrate resolve --applied <migration_name>
npx prisma migrate resolve --rolled-back <migration_name>

# Generate Prisma Client after schema changes
npx prisma generate

# Format schema file
npx prisma format

# Validate schema
npx prisma validate`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900 font-semibold mb-2">
                Migration File Structure:
              </p>
              <div className="text-xs bg-gray-100 p-3 rounded font-mono">
                <div>prisma/</div>
                <div>  migrations/</div>
                <div>    20240101000000_add_user_table/</div>
                <div>      migration.sql</div>
                <div>    20240102000000_add_profile_table/</div>
                <div>      migration.sql</div>
                <div>  schema.prisma</div>
              </div>
            </div>
          </div>
        )}

        {/* Migration Workflow */}
        {selectedSection === "workflow" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">Migration Workflow:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Understanding the complete migration lifecycle.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
              <code>{`// 1. UPDATE SCHEMA
// schema.prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}

// 2. CREATE MIGRATION
npx prisma migrate dev --name add_user_table

// This will:
// - Create migration file in prisma/migrations/
// - Apply migration to development database
// - Regenerate Prisma Client

// Generated migration.sql:
CREATE TABLE "users" (
  "id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

// 3. REVIEW MIGRATION
// Check the generated SQL in prisma/migrations/.../migration.sql

// 4. CUSTOMIZE MIGRATION (if needed)
// Edit migration.sql before applying

// 5. APPLY TO PRODUCTION
npx prisma migrate deploy

// 6. VERIFY
npx prisma migrate status`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900 font-semibold mb-2">
                Development vs Production:
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li><strong>migrate dev:</strong> Creates and applies migrations, resets if needed</li>
                <li><strong>migrate deploy:</strong> Only applies existing migrations (production-safe)</li>
                <li><strong>migrate reset:</strong> Drops database, applies all migrations, runs seeds</li>
                <li>Always test migrations in development first</li>
                <li>Review generated SQL before deploying</li>
              </ul>
            </div>
          </div>
        )}

        {/* Advanced Migrations */}
        {selectedSection === "advanced" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">Advanced Migration Scenarios:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Handling complex migration scenarios like data migrations and rollbacks.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
              <code>{`// 1. ADDING COLUMN WITH DEFAULT
// Schema change:
model User {
  id        Int      @id
  name      String
  email     String
  isActive  Boolean  @default(true)  // New field
}

// Generated migration:
ALTER TABLE "users" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;

// 2. RENAMING COLUMN
// Schema change:
model User {
  id       Int    @id
  fullName String @map("name")  // Rename column
}

// Manual migration needed:
ALTER TABLE "users" RENAME COLUMN "name" TO "fullName";

// 3. DATA MIGRATION
// Create migration with --create-only
npx prisma migrate dev --create-only --name migrate_user_data

// Edit migration.sql:
-- Add new column
ALTER TABLE "users" ADD COLUMN "fullName" TEXT;

-- Migrate data
UPDATE "users" SET "fullName" = "firstName" || ' ' || "lastName";

-- Drop old columns
ALTER TABLE "users" DROP COLUMN "firstName";
ALTER TABLE "users" DROP COLUMN "lastName";

// 4. SPLITTING TABLES
// Create migration with custom SQL
-- Create new table
CREATE TABLE "user_profiles" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER UNIQUE REFERENCES "users"("id"),
  "bio" TEXT
);

-- Migrate data
INSERT INTO "user_profiles" ("userId", "bio")
SELECT "id", "bio" FROM "users" WHERE "bio" IS NOT NULL;

-- Remove column from original table
ALTER TABLE "users" DROP COLUMN "bio";

// 5. HANDLING MIGRATION FAILURES
// If migration fails:
npx prisma migrate resolve --rolled-back <migration_name>

// Then fix the issue and retry:
npx prisma migrate dev

// 6. BASELINE MIGRATIONS (for existing databases)
npx prisma migrate resolve --applied <migration_name>

// 7. CUSTOM MIGRATION SCRIPTS
// In package.json:
{
  "scripts": {
    "migrate": "prisma migrate deploy",
    "migrate:dev": "prisma migrate dev",
    "migrate:reset": "prisma migrate reset"
  }
}`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900 font-semibold mb-2">
                Migration Best Practices:
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>Always review generated SQL before applying</li>
                <li>Use --create-only for complex migrations</li>
                <li>Test migrations on a copy of production data</li>
                <li>Never edit applied migrations</li>
                <li>Use transactions for data migrations</li>
                <li>Backup database before major migrations</li>
                <li>Document breaking changes in migration names</li>
                <li>Use baseline migrations for existing databases</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">Migration Safety Checklist:</h4>
        <ul className="text-sm text-gray-900 list-disc list-inside space-y-1">
          <li>✅ Review generated SQL</li>
          <li>✅ Test on development database</li>
          <li>✅ Backup production database</li>
          <li>✅ Run during low-traffic periods</li>
          <li>✅ Monitor application after migration</li>
          <li>✅ Have rollback plan ready</li>
        </ul>
      </div>
    </div>
  );
}
