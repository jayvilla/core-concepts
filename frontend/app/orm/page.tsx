import Link from "next/link";
import PrismaExample from "@/components/orm/PrismaExample";
import TypeORMExample from "@/components/orm/TypeORMExample";
import SequelizeExample from "@/components/orm/SequelizeExample";
import ORMComparison from "@/components/orm/ORMComparison";

export default function ORMPage() {
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
              ORM Comparison
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Learn how to model database entities using Prisma, TypeORM, and Sequelize. Compare syntax, features, and use cases for each ORM.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <PrismaExample />
          <TypeORMExample />
          <SequelizeExample />
          <ORMComparison />
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
                <li>&quot;What is an ORM and why use one?&quot;</li>
                <li>&quot;What&apos;s the difference between Prisma, TypeORM, and Sequelize?&quot;</li>
                <li>&quot;When would you choose Prisma over TypeORM?&quot;</li>
                <li>&quot;How do you define relationships in each ORM?&quot;</li>
                <li>&quot;What are the pros and cons of each ORM?&quot;</li>
                <li>&quot;How do migrations work in each ORM?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>ORM (Object-Relational Mapping):</strong> A technique that maps database tables to objects in code. Provides abstraction over SQL, type safety, relationship management, and reduces boilerplate. Trade-off: Some performance overhead vs raw SQL.
                </li>
                <li>
                  <strong>Prisma:</strong> Schema-first approach with a single Prisma schema file. Excellent TypeScript support, auto-generated client, built-in migrations. Best for new projects prioritizing type safety and developer experience. Requires code generation step.
                </li>
                <li>
                  <strong>TypeORM:</strong> Decorator-based ORM using class decorators. Supports Active Record and Data Mapper patterns. Great for NestJS projects. More flexible than Prisma but requires more boilerplate. Mature ecosystem.
                </li>
                <li>
                  <strong>Sequelize:</strong> Very mature ORM with extensive features. Model definitions via classes or functions. Good for legacy projects or teams familiar with Sequelize. Less type-safe than Prisma/TypeORM but very stable.
                </li>
                <li>
                  <strong>Choosing an ORM:</strong> New projects → Prisma (type safety, DX). NestJS projects → TypeORM (decorator-based, fits NestJS). Legacy projects → Sequelize (mature, stable). Consider team familiarity, project requirements, and type safety needs.
                </li>
                <li>
                  <strong>Best Practices:</strong> Use migrations for schema changes, define relationships explicitly, use transactions for multi-step operations, index foreign keys and frequently queried columns, use connection pooling, avoid N+1 queries with eager loading.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">ORM Comparison Table:</p>
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
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Excellent</td>
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
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Built-in</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Built-in</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">✅ Built-in</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Maturity</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Newer</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Mature</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Very Mature</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Best For</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">New projects, type safety</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">NestJS, decorators</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Legacy, stability</td>
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

