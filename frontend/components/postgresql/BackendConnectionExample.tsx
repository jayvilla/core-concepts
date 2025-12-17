"use client";

import { useState } from "react";

/**
 * BACKEND CONNECTION EXAMPLE
 *
 * Demonstrates connecting backend to PostgreSQL:
 * - TypeORM connection configuration
 * - Entity definitions
 * - Repository pattern
 * - Query examples
 */

export default function BackendConnectionExample() {
  const [selectedTopic, setSelectedTopic] = useState<
    "config" | "entities" | "repository" | "queries"
  >("config");

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        Connecting Backend to PostgreSQL
      </h2>

      <div className="space-y-6">
        {/* Topic Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "config", label: "Connection Config" },
              { key: "entities", label: "Entities" },
              { key: "repository", label: "Repository Pattern" },
              { key: "queries", label: "Running Queries" },
            ] as const
          ).map((topic) => (
            <button
              key={topic.key}
              onClick={() => setSelectedTopic(topic.key as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedTopic === topic.key
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {topic.label}
            </button>
          ))}
        </div>

        {/* Connection Configuration */}
        {selectedTopic === "config" && (
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h3 className="font-bold text-indigo-900 mb-3">
                TypeORM Connection Configuration:
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Configure TypeORM to connect to PostgreSQL in your NestJS application.
              </p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-indigo-300 overflow-x-auto">
                <code>{`// app.module.ts (NestJS)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'core_concepts',
      entities: [User], // Register your entities
      synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables
      logging: process.env.NODE_ENV !== 'production', // Log SQL queries
      // Connection pool settings
      extra: {
        max: 10, // Maximum connections in pool
        min: 2,  // Minimum connections in pool
      },
    }),
    // ... other modules
  ],
})
export class AppModule {}`}</code>
              </pre>
            </div>

            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h3 className="font-bold text-indigo-900 mb-3">Environment Variables (.env):</h3>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-indigo-300 overflow-x-auto">
                <code>{`# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=core_concepts

# Environment
NODE_ENV=development`}</code>
              </pre>
            </div>

            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h3 className="font-bold text-indigo-900 mb-3">Key Configuration Options:</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Option</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">type</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">
                        Database type: &apos;postgres&apos; for PostgreSQL
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">host</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">
                        Database server hostname
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">port</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">
                        Database server port (default: 5432)
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">username</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Database username</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">password</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Database password</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">database</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">Database name</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">entities</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">
                        Array of entity classes to register
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">synchronize</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">
                        Auto-create tables (⚠️ disable in production, use migrations)
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">logging</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-900">
                        Log SQL queries (useful for debugging)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Entities */}
        {selectedTopic === "entities" && (
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h3 className="font-bold text-indigo-900 mb-3">Defining Entities:</h3>
            <p className="text-sm text-gray-700 mb-3">
              Entities represent database tables. Use decorators to define columns, relationships,
              and constraints.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-indigo-300 overflow-x-auto">
              <code>{`// entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users') // Table name
export class User {
  @PrimaryGeneratedColumn() // Auto-incrementing primary key
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @CreateDateColumn() // Automatically set on creation
  createdAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;
}

// More advanced entity with relationships
import { Entity, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // One-to-Many relationship
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-indigo-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Decorators:</strong> @Entity (table), @Column (column), @PrimaryGeneratedColumn
                (auto-increment ID), @CreateDateColumn/@UpdateDateColumn (timestamps),
                @OneToMany/@ManyToOne/@ManyToMany (relationships).
              </p>
            </div>
          </div>
        )}

        {/* Repository Pattern */}
        {selectedTopic === "repository" && (
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h3 className="font-bold text-indigo-900 mb-3">Repository Pattern:</h3>
              <p className="text-sm text-gray-700 mb-3">
                TypeORM provides repositories for database operations. Inject repositories into your
                services.
              </p>
              <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-indigo-300 overflow-x-auto">
                <code>{`// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register entity
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}

// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) // Inject repository
    private userRepository: Repository<User>,
  ) {}

  // Now you can use this.userRepository for database operations
}`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Running Queries */}
        {selectedTopic === "queries" && (
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h3 className="font-bold text-indigo-900 mb-3">Running Queries:</h3>
              <p className="text-sm text-gray-700 mb-3">
                TypeORM provides multiple ways to query the database: Repository methods, Query
                Builder, and Raw SQL.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-sm text-gray-900 mb-2">
                    1. Repository Methods (Simple CRUD):
                  </p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-indigo-300 overflow-x-auto">
                    <code>{`// Create
async createUser(userData: Partial<User>): Promise<User> {
  const user = this.userRepository.create(userData);
  return await this.userRepository.save(user);
}

// Read
async findAll(): Promise<User[]> {
  return await this.userRepository.find();
}

async findOne(id: number): Promise<User> {
  return await this.userRepository.findOne({ where: { id } });
}

async findByEmail(email: string): Promise<User> {
  return await this.userRepository.findOne({ where: { email } });
}

// Update
async updateUser(id: number, userData: Partial<User>): Promise<User> {
  await this.userRepository.update(id, userData);
  return await this.userRepository.findOne({ where: { id } });
}

// Delete
async deleteUser(id: number): Promise<void> {
  await this.userRepository.delete(id);
}`}</code>
                  </pre>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 mb-2">
                    2. Query Builder (Complex Queries):
                  </p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-indigo-300 overflow-x-auto">
                    <code>{`// Complex queries with joins, conditions, etc.
async findUsersWithOrders(): Promise<User[]> {
  return await this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.orders', 'order')
    .where('user.active = :active', { active: true })
    .andWhere('order.total > :minTotal', { minTotal: 100 })
    .orderBy('user.createdAt', 'DESC')
    .getMany();
}

// Pagination
async findUsersPaginated(page: number, pageSize: number) {
  const [users, total] = await this.userRepository.findAndCount({
    skip: (page - 1) * pageSize,
    take: pageSize,
    order: { createdAt: 'DESC' },
  });
  return { users, total, page, pageSize };
}`}</code>
                  </pre>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 mb-2">3. Raw SQL (Advanced):</p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-indigo-300 overflow-x-auto">
                    <code>{`// For complex queries that are hard to express with Query Builder
async findActiveUsersCount(): Promise<number> {
  const result = await this.userRepository.query(
    \`SELECT COUNT(*) as count FROM users WHERE active = $1\`,
    [true],
  );
  return parseInt(result[0].count, 10);
}

// Using DataSource for raw queries
import { DataSource } from 'typeorm';

constructor(private dataSource: DataSource) {}

async customQuery() {
  return await this.dataSource.query(
    \`SELECT u.*, COUNT(o.id) as order_count
     FROM users u
     LEFT JOIN orders o ON o.user_id = u.id
     GROUP BY u.id\`,
  );
}`}</code>
                  </pre>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 mb-2">4. Transactions:</p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-indigo-300 overflow-x-auto">
                    <code>{`// Using QueryRunner for transactions
import { DataSource } from 'typeorm';

async transferMoney(fromId: number, toId: number, amount: number) {
  const queryRunner = this.dataSource.createQueryRunner();
  
  await queryRunner.connect();
  await queryRunner.startTransaction();
  
  try {
    await queryRunner.manager.update(
      Account,
      { id: fromId },
      { balance: () => \`balance - \${amount}\` },
    );
    
    await queryRunner.manager.update(
      Account,
      { id: toId },
      { balance: () => \`balance + \${amount}\` },
    );
    
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
}`}</code>
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
              <strong>TypeORM:</strong> Object-Relational Mapping library that provides type-safe
              database access for TypeScript/Node.js applications.
            </li>
            <li>
              <strong>Connection Config:</strong> Configure in app.module.ts using TypeOrmModule.forRoot().
              Use environment variables for sensitive data.
            </li>
            <li>
              <strong>Entities:</strong> Define database tables as TypeScript classes with
              decorators. TypeORM handles the mapping between objects and database rows.
            </li>
            <li>
              <strong>Repository Pattern:</strong> Inject repositories into services using
              @InjectRepository(). Provides clean separation of concerns.
            </li>
            <li>
              <strong>Query Methods:</strong> Use repository methods for simple CRUD, Query Builder
              for complex queries, and Raw SQL for advanced cases.
            </li>
            <li>
              <strong>Transactions:</strong> Use QueryRunner for transactions. Ensures data
              consistency for multi-step operations.
            </li>
            <li>
              <strong>Best Practices:</strong> Use migrations instead of synchronize in production,
              use connection pooling, handle errors properly, use transactions for critical
              operations.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

