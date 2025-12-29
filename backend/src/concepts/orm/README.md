# ORM Comparison Concept

This module demonstrates how to model database entities using three popular ORMs:
- **Prisma** - Schema-first, type-safe ORM
- **TypeORM** - Decorator-based ORM
- **Sequelize** - Mature, feature-rich ORM

All three ORMs model the same database structure for easy comparison.

## Setup

### Prerequisites

1. **PostgreSQL Database**
   - Install PostgreSQL (if not already installed)
   - Create a database for this project:
     ```sql
     CREATE DATABASE core_concepts;
     ```

2. **Environment Variables**
   - `DB_HOST` (default: `localhost`)
   - `DB_PORT` (default: `5432`)
   - `DB_USERNAME` (default: `postgres`)
   - `DB_PASSWORD` (default: `postgres`)
   - `DB_NAME` (default: `core_concepts`)
   - `DATABASE_URL` for Prisma: `postgresql://user:password@localhost:5432/core_concepts`

3. **Initialize Prisma**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

## Entity Structure

All three ORMs model the same entities:

- **User** - Main entity with relationships
- **Profile** - One-to-One with User
- **Post** - One-to-Many with User (author)
- **Tag** - Many-to-Many with User

## API Endpoints

### Code Examples

```http
GET /concepts/orm/code-examples
```

Returns code examples for all three ORMs showing:
- Schema/Entity/Model definitions
- CRUD operations
- Relationship handling

### Prisma Endpoints

```http
POST /concepts/orm/prisma/user
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}

GET /concepts/orm/prisma/user/:id
GET /concepts/orm/prisma/users
```

### TypeORM Endpoints

```http
POST /concepts/orm/typeorm/user
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}

GET /concepts/orm/typeorm/user/:id
GET /concepts/orm/typeorm/users
```

### Sequelize Endpoints

```http
POST /concepts/orm/sequelize/user
Content-Type: application/json

{
  "name": "Bob Smith",
  "email": "bob@example.com"
}

GET /concepts/orm/sequelize/user/:id
GET /concepts/orm/sequelize/users
```

## ORM Comparison

### Prisma

**Pros:**
- Schema-first approach (single source of truth)
- Excellent TypeScript support
- Auto-generated client
- Great developer experience
- Built-in migrations
- Type-safe queries

**Cons:**
- Requires code generation step
- Less flexible than decorator-based ORMs
- Newer ecosystem

**Best For:**
- New projects
- Teams wanting type safety
- Projects prioritizing developer experience

### TypeORM

**Pros:**
- Decorator-based (familiar to NestJS developers)
- Active Record and Data Mapper patterns
- Mature and widely used
- Good TypeScript support
- Flexible query builder

**Cons:**
- More boilerplate than Prisma
- Decorator syntax can be verbose
- Type safety not as strong as Prisma

**Best For:**
- NestJS projects
- Teams familiar with decorators
- Projects needing flexibility

### Sequelize

**Pros:**
- Very mature and stable
- Extensive feature set
- Good documentation
- Supports many databases
- Flexible model definitions

**Cons:**
- More verbose syntax
- Less type-safe than Prisma/TypeORM
- Older API design
- Requires more setup

**Best For:**
- Legacy projects
- Teams familiar with Sequelize
- Projects needing extensive features

## Key Differences

### Schema Definition

**Prisma:**
```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

**TypeORM:**
```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
```

**Sequelize:**
```typescript
User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true }
}, { sequelize, modelName: 'User' });
```

### Query Syntax

**Prisma:**
```typescript
await prisma.user.findUnique({
  where: { id: 1 },
  include: { profile: true }
});
```

**TypeORM:**
```typescript
await userRepo.findOne({
  where: { id: 1 },
  relations: ['profile']
});
```

**Sequelize:**
```typescript
await User.findByPk(1, {
  include: [{ model: Profile, as: 'profile' }]
});
```

## When to Use Each

- **Prisma**: New projects, type safety priority, great DX
- **TypeORM**: NestJS projects, decorator preference
- **Sequelize**: Legacy projects, extensive feature needs

