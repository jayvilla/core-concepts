# Data Modeling Concept

This module demonstrates core data modeling concepts using TypeORM and PostgreSQL.

## Setup

### Prerequisites

1. **PostgreSQL Database**
   - Install PostgreSQL (if not already installed)
   - Create a database for this project:
     ```sql
     CREATE DATABASE core_concepts;
     ```

2. **Environment Variables**
   - The module uses environment variables for database configuration:
     - `DB_HOST` (default: `localhost`)
     - `DB_PORT` (default: `5432`)
     - `DB_USERNAME` (default: `postgres`)
     - `DB_PASSWORD` (default: `postgres`)
     - `DB_NAME` (default: `core_concepts`)

   You can set these in a `.env` file or as environment variables.

## Concepts Demonstrated

### 1. Relationship Types

#### One-to-One

- **Example**: `User` → `UserProfile`
- **Use Case**: Optional extended data, separate for performance
- **Implementation**: Foreign key in one table with unique constraint

#### One-to-Many

- **Example**: `User` → `Posts`, `Order` → `OrderItems`
- **Use Case**: Parent-child relationships
- **Implementation**: Foreign key in the "many" side table

#### Many-to-Many

- **Example**: `User` ↔ `Tags`
- **Use Case**: Tagging, associations, memberships
- **Implementation**: Junction table with foreign keys to both tables

#### Self-Referencing

- **Example**: `Category` → `Subcategories`, `User` follows `Users`
- **Use Case**: Hierarchical data, trees, networks
- **Implementation**: Foreign key references same table

### 2. Normalization

#### First Normal Form (1NF)

- Each column contains atomic values
- No repeating groups
- Each row is unique

#### Second Normal Form (2NF)

- Must be in 1NF
- All non-key attributes fully depend on primary key
- Remove partial dependencies

#### Third Normal Form (3NF)

- Must be in 2NF
- No transitive dependencies
- Non-key attributes depend only on primary key

#### Denormalization

- Intentionally adding redundancy for performance
- Used in read-heavy workloads
- Examples: Storing calculated totals, historical snapshots

### 3. Advanced Patterns

#### Soft Delete

- Records marked as deleted instead of removed
- Benefits: Data recovery, audit trail, referential integrity
- Implementation: `deletedAt` timestamp column

#### Audit Trail

- Track who and when created/modified records
- Fields: `createdBy`, `updatedBy`, `createdAt`, `updatedAt`
- Use Case: Compliance, debugging, change tracking

#### Historical Snapshot

- Store data as it was at a point in time
- Example: Order stores product price at time of order
- Why: Product price might change, but order should reflect original

### 4. Indexes

- **Purpose**: Improve query performance
- **When to Use**:
  - Foreign keys (for joins)
  - Frequently queried columns
  - Columns used in WHERE clauses
  - Columns used for sorting
- **Trade-offs**: Faster reads, slower writes, more storage

## API Endpoints

### Relationships

#### One-to-One

```http
POST /concepts/data-modeling/users/one-to-one
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "phone": "123-456-7890",
    "bio": "Software developer"
  }
}
```

#### One-to-Many

```http
POST /concepts/data-modeling/users/one-to-many
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "posts": [
    { "title": "First Post", "content": "Content here..." },
    { "title": "Second Post", "content": "More content..." }
  ]
}
```

#### Many-to-Many

```http
POST /concepts/data-modeling/users/:id/tags
Content-Type: application/json

{
  "tags": ["javascript", "react", "nodejs"]
}
```

#### Self-Referencing

```http
POST /concepts/data-modeling/categories/hierarchy
Content-Type: application/json

{
  "categories": [
    { "name": "Electronics", "description": "Electronic devices" },
    { "name": "Computers", "parentName": "Electronics" },
    { "name": "Laptops", "parentName": "Computers" }
  ]
}
```

### E-commerce Example

#### Create Order

```http
POST /concepts/data-modeling/orders
Content-Type: application/json

{
  "userId": 1,
  "orderNumber": "ORD-2024-001",
  "shippingAddress": "123 Main St, City, State 12345",
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 2, "quantity": 1 }
  ]
}
```

### Advanced Patterns

#### Soft Delete

```http
POST /concepts/data-modeling/soft-delete
Content-Type: application/json

{
  "name": "Test Record",
  "description": "This will be soft deleted"
}

POST /concepts/data-modeling/soft-delete/:id/delete
POST /concepts/data-modeling/soft-delete/:id/restore
GET /concepts/data-modeling/soft-delete
```

#### Audit Trail

```http
POST /concepts/data-modeling/audit-trail
Content-Type: application/json

{
  "name": "Document",
  "description": "Important document",
  "createdBy": "user123"
}

POST /concepts/data-modeling/audit-trail/:id/update
Content-Type: application/json

{
  "name": "Updated Document",
  "updatedBy": "user456"
}
```

### Information Endpoints

```http
GET /concepts/data-modeling/normalization
GET /concepts/data-modeling/features
GET /concepts/data-modeling/users/:id/relations
GET /concepts/data-modeling/categories/tree
GET /concepts/data-modeling/orders/:id
```

## Entity Structure

### Relationship Entities

- `User` - Demonstrates multiple relationship types
- `UserProfile` - One-to-One with User
- `Post` - One-to-Many with User, One-to-Many with Comments
- `Comment` - Many-to-One with Post
- `Tag` - Many-to-Many with User
- `Category` - Self-referencing hierarchy

### E-commerce Entities

- `Product` - Product catalog
- `Order` - Order header
- `OrderItem` - Order line items (junction table with additional data)

### Advanced Pattern Entities

- `SoftDeleteExample` - Soft delete pattern
- `AuditTrailExample` - Audit trail with version tracking

## Key Design Decisions

1. **Primary Keys**: Using auto-incrementing integers (surrogate keys)
   - Alternative: UUIDs (better for distributed systems)

2. **Foreign Keys**: All relationships use foreign key constraints
   - Ensures referential integrity
   - Cascade options: CASCADE, SET NULL, RESTRICT

3. **Indexes**: Strategic indexes on:
   - Foreign keys (for joins)
   - Frequently queried columns
   - Unique constraints

4. **Denormalization**: Used where appropriate:
   - Order total (calculated from items)
   - Historical prices in OrderItems
   - Shipping address in Order

5. **Constraints**: Check constraints for:
   - Non-negative prices
   - Positive quantities
   - Boolean values

## Testing

Use Postman or curl to test the endpoints. Make sure PostgreSQL is running and the database is created before testing.

Example:

```bash
# Create a user with profile (One-to-One)
curl -X POST http://localhost:3000/concepts/data-modeling/users/one-to-one \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "profile": {
      "firstName": "John",
      "lastName": "Doe"
    }
  }'
```

## Notes

- The module uses a separate PostgreSQL connection (`dataModeling`) from the TypeORM concept module (which uses SQLite)
- `synchronize: true` is enabled for development (auto-creates tables)
- In production, use migrations instead of `synchronize`
- All entities have detailed comments explaining design decisions
