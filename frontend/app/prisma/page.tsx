import Link from "next/link";
import PrismaSchemaExample from "@/components/prisma/PrismaSchemaExample";
import PrismaMigrationsExample from "@/components/prisma/PrismaMigrationsExample";
import PrismaQueryingExample from "@/components/prisma/PrismaQueryingExample";
import PrismaNestJSExample from "@/components/prisma/PrismaNestJSExample";

export default function PrismaPage() {
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
              Prisma Concepts
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Master Prisma ORM: schema definition, models, migrations, querying, and NestJS integration. Learn the schema-first approach with excellent TypeScript support.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <PrismaSchemaExample />
          <PrismaMigrationsExample />
          <PrismaQueryingExample />
          <PrismaNestJSExample />
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
                <li>&quot;What is Prisma and how does it differ from other ORMs?&quot;</li>
                <li>&quot;Explain Prisma&apos;s schema-first approach.&quot;</li>
                <li>&quot;How do Prisma migrations work?&quot;</li>
                <li>&quot;How do you define relationships in Prisma?&quot;</li>
                <li>&quot;What are the advantages of Prisma over TypeORM?&quot;</li>
                <li>&quot;How do you handle transactions in Prisma?&quot;</li>
                <li>&quot;Explain Prisma Client generation and type safety.&quot;</li>
                <li>&quot;How do you integrate Prisma with NestJS?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Prisma Overview:</strong> A next-generation ORM with a schema-first approach. Uses a declarative schema.prisma file as the single source of truth. Generates a type-safe Prisma Client with excellent TypeScript support. Provides built-in migrations, query engine, and database introspection.
                </li>
                <li>
                  <strong>Schema-First Approach:</strong> All database structure is defined in schema.prisma. Schema is the single source of truth - no code-first or decorator-based definitions. Changes to schema require running <code className="bg-gray-100 px-1 rounded">npx prisma generate</code> to regenerate the client. This ensures consistency between database and code.
                </li>
                <li>
                  <strong>Models & Relationships:</strong> Models define database tables. Relationships are declared with field types (optional ? for one-to-one, arrays [] for one-to-many/many-to-many). Foreign keys use @relation directive. Supports one-to-one, one-to-many, many-to-many, and self-referencing relationships.
                </li>
                <li>
                  <strong>Migrations:</strong> Prisma Migrate tracks schema changes and generates SQL migration files. <code className="bg-gray-100 px-1 rounded">prisma migrate dev</code> creates and applies migrations. <code className="bg-gray-100 px-1 rounded">prisma migrate deploy</code> applies existing migrations (production-safe). Migrations are versioned and can be reviewed before applying.
                </li>
                <li>
                  <strong>Querying:</strong> Type-safe queries with full TypeScript autocompletion. Supports CRUD operations, filtering, sorting, pagination, and aggregations. Include for eager loading relationships. Transactions for multi-step operations. Raw SQL support when needed. Cursor-based pagination for better performance.
                </li>
                <li>
                  <strong>Type Safety:</strong> Prisma Client is auto-generated from schema, ensuring types match database structure. TypeScript knows all fields, types, and relationships. Compile-time errors catch type mismatches. No runtime type checking needed - it&apos;s all compile-time.
                </li>
                <li>
                  <strong>NestJS Integration:</strong> Create PrismaService extending PrismaClient. Use @Global() module to make it available everywhere. Implement OnModuleInit/OnModuleDestroy for connection lifecycle. Inject PrismaService into feature services. Use DTOs for validation, exception filters for error handling.
                </li>
                <li>
                  <strong>Advantages:</strong> Excellent developer experience, minimal boilerplate, type safety, built-in migrations, great documentation, active development. Schema-first ensures consistency. Auto-generated client reduces errors. Better than TypeORM for new projects prioritizing type safety.
                </li>
                <li>
                  <strong>Best Practices:</strong> Keep schema.prisma as single source of truth. Review generated migrations before applying. Use transactions for related operations. Add indexes for frequently queried columns. Use select to fetch only needed fields. Handle Prisma errors appropriately. Use DTOs for validation. Enable logging in development.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Prisma vs Other ORMs:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Feature</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Prisma</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">TypeORM</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Sequelize</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Approach</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Schema-first</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Decorator-based</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Model-based</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Type Safety</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Excellent (auto-generated)</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Good</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">⚠️ Limited</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Boilerplate</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Minimal</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Moderate</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Moderate</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Migrations</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Built-in, excellent</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Built-in</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Built-in</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Code Generation</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Required (prisma generate)</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">❌ Not needed</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">❌ Not needed</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Developer Experience</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Excellent</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Good</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">⚠️ Moderate</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Best For</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">New projects, type safety</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">NestJS, decorators</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Legacy, stability</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Prisma Workflow:</p>
              <ol className="text-sm space-y-2 list-decimal list-inside">
                <li><strong>Define Schema:</strong> Write models in schema.prisma</li>
                <li><strong>Generate Client:</strong> Run <code className="bg-gray-100 px-1 rounded">npx prisma generate</code></li>
                <li><strong>Create Migration:</strong> Run <code className="bg-gray-100 px-1 rounded">npx prisma migrate dev</code></li>
                <li><strong>Use Client:</strong> Import PrismaClient in your code</li>
                <li><strong>Deploy:</strong> Run <code className="bg-gray-100 px-1 rounded">npx prisma migrate deploy</code> in production</li>
              </ol>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Prisma Concepts:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Schema (schema.prisma):</strong> Declarative definition of database structure. Single source of truth. Defines models, relationships, indexes, and database configuration.
                </li>
                <li>
                  <strong>Prisma Client:</strong> Auto-generated, type-safe database client. Generated from schema. Provides type-safe query methods. Must regenerate after schema changes.
                </li>
                <li>
                  <strong>Migrations:</strong> Version-controlled SQL files representing schema changes. Generated automatically from schema changes. Can be reviewed and customized. Applied with migrate commands.
                </li>
                <li>
                  <strong>Relations:</strong> Declared in schema with field types. One-to-one uses optional field (?). One-to-many uses array ([]). Many-to-many uses arrays on both sides. Foreign keys use @relation directive.
                </li>
                <li>
                  <strong>Query API:</strong> Type-safe methods like findMany, findUnique, create, update, delete. Supports filtering, sorting, pagination, and aggregations. Include for eager loading. Transactions for atomic operations.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
