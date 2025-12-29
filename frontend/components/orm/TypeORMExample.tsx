"use client";

import { useState } from "react";

/**
 * TYPEORM EXAMPLE
 *
 * Demonstrates TypeORM decorator-based entity definition
 */

export default function TypeORMExample() {
  const [selectedSection, setSelectedSection] = useState<
    "entity" | "usage" | "relationships"
  >("entity");

  return (
    <div className="border-2 border-blue-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        TypeORM - Decorator-Based ORM
      </h2>

      <div className="space-y-6">
        {/* Section Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "entity", label: "Entity Definition" },
              { key: "usage", label: "Usage Examples" },
              { key: "relationships", label: "Relationships" },
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

        {/* Entity Definition */}
        {selectedSection === "entity" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">TypeORM Entity:</h3>
            <p className="text-sm text-gray-700 mb-3">
              TypeORM uses decorators on TypeScript classes to define entities.
              Perfect for NestJS projects.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
              <code>{`import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from 'typeorm';

@Entity('orm_users')
@Index('idx_user_email', ['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Profile, profile => profile.user)
  profile: Profile;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @ManyToMany(() => Tag, tag => tag.users)
  @JoinTable()
  tags: Tag[];
}`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Points:</strong>
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>Decorator-based - uses class decorators</li>
                <li>@Entity() marks the class as a database entity</li>
                <li>@PrimaryGeneratedColumn() for auto-incrementing IDs</li>
                <li>@Column() for regular columns with type options</li>
                <li>@CreateDateColumn() and @UpdateDateColumn() for timestamps</li>
                <li>Supports Active Record and Data Mapper patterns</li>
              </ul>
            </div>
          </div>
        )}

        {/* Usage Examples */}
        {selectedSection === "usage" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">TypeORM Usage:</h3>
            <p className="text-sm text-gray-700 mb-3">
              TypeORM provides Repository pattern for database operations.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
              <code>{`import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// In NestJS service
constructor(
  @InjectRepository(User)
  private userRepo: Repository<User>
) {}

// CREATE
const user = this.userRepo.create({
  name: 'John Doe',
  email: 'john@example.com'
});
await this.userRepo.save(user);

// FIND with relations
const userWithRelations = await this.userRepo.findOne({
  where: { id: 1 },
  relations: ['profile', 'posts', 'tags']
});

// FIND MANY with query builder
const users = await this.userRepo
  .createQueryBuilder('user')
  .where('user.email LIKE :email', { email: '%@example.com' })
  .orderBy('user.createdAt', 'DESC')
  .take(10)
  .getMany();

// UPDATE
await this.userRepo.update(1, { name: 'Jane Doe' });

// DELETE
await this.userRepo.delete(1);

// TRANSACTIONS
await this.userRepo.manager.transaction(async (manager) => {
  await manager.save(User, { name: 'User 1', email: 'u1@example.com' });
  await manager.save(User, { name: 'User 2', email: 'u2@example.com' });
});`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Points:</strong>
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>Repository pattern for database operations</li>
                <li>relations array for eager loading</li>
                <li>Query Builder for complex queries</li>
                <li>Works seamlessly with NestJS dependency injection</li>
                <li>Supports both Active Record and Data Mapper patterns</li>
              </ul>
            </div>
          </div>
        )}

        {/* Relationships */}
        {selectedSection === "relationships" && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">TypeORM Relationships:</h3>
            <p className="text-sm text-gray-700 mb-3">
              TypeORM uses decorators to define relationships.
            </p>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-blue-300 overflow-x-auto">
              <code>{`// ONE-TO-ONE
@Entity()
export class User {
  @OneToOne(() => Profile, profile => profile.user, { cascade: true })
  @JoinColumn({ name: 'userId' })
  profile: Profile;
}

@Entity()
export class Profile {
  @ManyToOne(() => User, user => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

// ONE-TO-MANY
@Entity()
export class User {
  @OneToMany(() => Post, post => post.author, { cascade: true })
  posts: Post[];
}

@Entity()
export class Post {
  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: User;
}

// MANY-TO-MANY
@Entity()
export class User {
  @ManyToMany(() => Tag, tag => tag.users)
  @JoinTable({
    name: 'user_tags',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' }
  })
  tags: Tag[];
}

// Usage
const user = await userRepo.findOne({
  where: { id: 1 },
  relations: ['profile', 'posts', 'tags']
});`}</code>
            </pre>
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded">
              <p className="text-sm text-gray-900">
                <strong>Key Points:</strong>
              </p>
              <ul className="text-sm text-gray-900 list-disc list-inside mt-2 space-y-1">
                <li>@OneToOne, @OneToMany, @ManyToOne, @ManyToMany decorators</li>
                <li>@JoinColumn for foreign key columns</li>
                <li>@JoinTable for many-to-many junction tables</li>
                <li>cascade option for automatic related entity operations</li>
                <li>Relations loaded via relations array in find options</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">TypeORM Pros & Cons:</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-900">
          <div>
            <p className="font-semibold mb-2 text-green-700">✅ Pros:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Decorator-based (familiar to NestJS developers)</li>
              <li>Mature and widely used</li>
              <li>Good TypeScript support</li>
              <li>Flexible query builder</li>
              <li>Active Record and Data Mapper patterns</li>
              <li>Great for NestJS projects</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2 text-red-700">❌ Cons:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>More boilerplate than Prisma</li>
              <li>Decorator syntax can be verbose</li>
              <li>Type safety not as strong as Prisma</li>
              <li>Requires more setup</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

