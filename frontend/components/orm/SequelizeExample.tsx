"use client";

import { useState } from "react";

/**
 * SEQUELIZE EXAMPLE
 *
 * Demonstrates Sequelize model definition
 */

export default function SequelizeExample() {
  const [selectedSection, setSelectedSection] = useState<
    "model" | "usage" | "relationships"
  >("model");

  return (
    <div className="border-2 border-orange-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-orange-900">
        Sequelize - Mature ORM
      </h2>

      <div className="space-y-6">
        {/* Section Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "model", label: "Model Definition" },
              { key: "usage", label: "Usage Examples" },
              { key: "relationships", label: "Relationships" },
            ] as const
          ).map((section) => (
            <button
              key={section.key}
              onClick={() => setSelectedSection(section.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedSection === section.key
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Model Definition */}
        {selectedSection === "model" && (
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="font-bold text-orange-900 mb-3">Sequelize Model:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Sequelize uses Model.init() to define models with DataTypes.
              Very mature and stable.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-orange-300 overflow-x-auto">
              <code>{`import { Model, DataTypes, Sequelize } from 'sequelize';

export class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'orm_users',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['email'],
        name: 'idx_user_email'
      }
    ]
  });

  return User;
};`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-orange-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Points:</strong>
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>Model.init() defines model structure</li>
                <li>DataTypes for column types (STRING, INTEGER, DATE, etc.)</li>
                <li>allowNull, unique, primaryKey options</li>
                <li>field option maps property to database column name</li>
                <li>underscored option for snake_case column names</li>
                <li>indexes array for database indexes</li>
              </ul>
            </div>
          </div>
        )}

        {/* Usage Examples */}
        {selectedSection === "usage" && (
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="font-bold text-orange-900 mb-3">Sequelize Usage:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Sequelize provides Active Record pattern with model methods.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-orange-300 overflow-x-auto">
              <code>{`import { User } from './models/user.model';

// CREATE
const user = await User.create({
  name: 'John Doe',
  email: 'john@example.com'
});

// FIND with relations
const userWithRelations = await User.findByPk(1, {
  include: [
    { model: Profile, as: 'profile' },
    { model: Post, as: 'posts' },
    { model: Tag, as: 'tags' }
  ]
});

// FIND MANY with where
const users = await User.findAll({
  where: {
    email: { [Op.like]: '%@example.com' }
  },
  order: [['createdAt', 'DESC']],
  limit: 10
});

// UPDATE
await user.update({ name: 'Jane Doe' });

// DELETE
await user.destroy();

// TRANSACTIONS
await sequelize.transaction(async (t) => {
  await User.create(
    { name: 'User 1', email: 'u1@example.com' },
    { transaction: t }
  );
  await User.create(
    { name: 'User 2', email: 'u2@example.com' },
    { transaction: t }
  );
});`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-orange-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Points:</strong>
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>Active Record pattern - methods on model instances</li>
                <li>include array for eager loading relationships</li>
                <li>where clause with Sequelize operators (Op.like, Op.eq, etc.)</li>
                <li>order, limit, offset for pagination and sorting</li>
                <li>Built-in transaction support</li>
              </ul>
            </div>
          </div>
        )}

        {/* Relationships */}
        {selectedSection === "relationships" && (
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="font-bold text-orange-900 mb-3">Sequelize Relationships:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Sequelize uses static association methods to define relationships.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-orange-300 overflow-x-auto">
              <code>{`// ONE-TO-ONE
User.hasOne(Profile, {
  foreignKey: 'userId',
  as: 'profile'
});

Profile.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// ONE-TO-MANY
User.hasMany(Post, {
  foreignKey: 'authorId',
  as: 'posts'
});

Post.belongsTo(User, {
  foreignKey: 'authorId',
  as: 'author'
});

// MANY-TO-MANY
User.belongsToMany(Tag, {
  through: 'user_tags',
  foreignKey: 'userId',
  otherKey: 'tagId',
  as: 'tags'
});

Tag.belongsToMany(User, {
  through: 'user_tags',
  foreignKey: 'tagId',
  otherKey: 'userId',
  as: 'users'
});

// Usage
const user = await User.findByPk(1, {
  include: [
    { model: Profile, as: 'profile' },
    { model: Post, as: 'posts' },
    { model: Tag, as: 'tags' }
  ]
});`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-orange-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Points:</strong>
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>hasOne, belongsTo, hasMany, belongsToMany methods</li>
                <li>through option for many-to-many junction tables</li>
                <li>foreignKey and otherKey for relationship keys</li>
                <li>as option for alias names</li>
                <li>Relations loaded via include array</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">Sequelize Pros & Cons:</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-900">
          <div>
            <p className="font-semibold mb-2 text-green-700">✅ Pros:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Very mature and stable</li>
              <li>Extensive feature set</li>
              <li>Good documentation</li>
              <li>Supports many databases</li>
              <li>Flexible model definitions</li>
              <li>Active Record pattern</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2 text-red-700">❌ Cons:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>More verbose syntax</li>
              <li>Less type-safe than Prisma/TypeORM</li>
              <li>Older API design</li>
              <li>Requires more setup</li>
              <li>TypeScript support not as strong</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

