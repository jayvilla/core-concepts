"use client";

import { useState } from "react";

/**
 * ORM COMPARISON
 *
 * Side-by-side comparison of Prisma, TypeORM, and Sequelize
 */

export default function ORMComparison() {
  const [selectedAspect, setSelectedAspect] = useState<
    "definition" | "create" | "find" | "update" | "delete"
  >("definition");

  const aspects = [
    { key: "definition", label: "Schema Definition" },
    { key: "create", label: "Create Operation" },
    { key: "find", label: "Find Operation" },
    { key: "update", label: "Update Operation" },
    { key: "delete", label: "Delete Operation" },
  ];

  const codeExamples = {
    definition: {
      prisma: `// Prisma Schema
model User {
  id    Int    @id @default(autoincrement())
  name  String @db.VarChar(100)
  email String @unique
}`,
      typeorm: `// TypeORM Entity
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;
}`,
      sequelize: `// Sequelize Model
User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: { type: DataTypes.STRING(100) },
  email: { type: DataTypes.STRING, unique: true }
}, { sequelize, modelName: 'User' });`,
    },
    create: {
      prisma: `// Prisma
const user = await prisma.user.create({
  data: {
    name: 'John',
    email: 'john@example.com'
  }
});`,
      typeorm: `// TypeORM
const user = userRepo.create({
  name: 'John',
  email: 'john@example.com'
});
await userRepo.save(user);`,
      sequelize: `// Sequelize
const user = await User.create({
  name: 'John',
  email: 'john@example.com'
});`,
    },
    find: {
      prisma: `// Prisma
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: { profile: true }
});`,
      typeorm: `// TypeORM
const user = await userRepo.findOne({
  where: { id: 1 },
  relations: ['profile']
});`,
      sequelize: `// Sequelize
const user = await User.findByPk(1, {
  include: [{ model: Profile, as: 'profile' }]
});`,
    },
    update: {
      prisma: `// Prisma
await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Jane' }
});`,
      typeorm: `// TypeORM
await userRepo.update(1, { name: 'Jane' });`,
      sequelize: `// Sequelize
await user.update({ name: 'Jane' });`,
    },
    delete: {
      prisma: `// Prisma
await prisma.user.delete({
  where: { id: 1 }
});`,
      typeorm: `// TypeORM
await userRepo.delete(1);`,
      sequelize: `// Sequelize
await user.destroy();`,
    },
  };

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        ORM Comparison: Side-by-Side
      </h2>

      <div className="space-y-6">
        {/* Aspect Selector */}
        <div className="flex flex-wrap gap-2">
          {aspects.map((aspect) => (
            <button
              key={aspect.key}
              onClick={() => setSelectedAspect(aspect.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedAspect === aspect.key
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {aspect.label}
            </button>
          ))}
        </div>

        {/* Code Comparison */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Prisma */}
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3">Prisma</h3>
            <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded border border-purple-300 overflow-x-auto">
              <code>{codeExamples[selectedAspect].prisma}</code>
            </pre>
          </div>

          {/* TypeORM */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">TypeORM</h3>
            <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded border border-blue-300 overflow-x-auto">
              <code>{codeExamples[selectedAspect].typeorm}</code>
            </pre>
          </div>

          {/* Sequelize */}
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="font-bold text-orange-900 mb-3">Sequelize</h3>
            <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded border border-orange-300 overflow-x-auto">
              <code>{codeExamples[selectedAspect].sequelize}</code>
            </pre>
          </div>
        </div>

        {/* Quick Decision Guide */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-yellow-900">
            Quick Decision Guide:
          </h4>
          <div className="space-y-2 text-sm text-gray-900">
            <p>
              <strong>New project, want type safety?</strong> → Use{" "}
              <code className="bg-gray-100 px-1 rounded">Prisma</code>
            </p>
            <p>
              <strong>NestJS project, prefer decorators?</strong> → Use{" "}
              <code className="bg-gray-100 px-1 rounded">TypeORM</code>
            </p>
            <p>
              <strong>Legacy project, need stability?</strong> → Use{" "}
              <code className="bg-gray-100 px-1 rounded">Sequelize</code>
            </p>
            <p>
              <strong>Team familiar with one?</strong> → Use what your team knows!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

