/**
 * NORMALIZED EXAMPLE - Demonstrates Proper Normalization
 *
 * This shows how to properly normalize the unnormalized example.
 *
 * NORMALIZATION STEPS:
 *
 * STEP 1: FIRST NORMAL FORM (1NF)
 * - Each column contains atomic values (no arrays/lists)
 * - Each row is unique
 * - No repeating groups
 *
 * STEP 2: SECOND NORMAL FORM (2NF)
 * - Must be in 1NF
 * - All non-key attributes fully dependent on primary key
 * - Remove partial dependencies
 *
 * STEP 3: THIRD NORMAL FORM (3NF)
 * - Must be in 2NF
 * - No transitive dependencies
 * - Non-key attributes depend only on primary key
 *
 * NORMALIZED DESIGN:
 *
 * customers table:
 * +----+------------+------------------+
 * | id | name       | address          |
 * +----+------------+------------------+
 * | 1  | John Doe   | 789 Pine Rd     |
 * | 2  | Jane Smith | 456 Oak Ave     |
 * +----+------------+------------------+
 *
 * orders table:
 * +----+----------+------------+------------+-------+
 * | id | orderNum | customerId | orderDate  | total |
 * +----+----------+------------+------------+-------+
 * | 1  | ORD-001  | 1          | 2024-01-01 | 100.00|
 * | 2  | ORD-002  | 1          | 2024-01-02 | 150.00|
 * | 3  | ORD-003  | 2          | 2024-01-03 | 200.00|
 * | 4  | ORD-004  | 1          | 2024-01-04 |  75.00|
 * +----+----------+------------+------------+-------+
 *
 * BENEFITS:
 * - No redundancy (customer info stored once)
 * - Easy updates (change address in one place)
 * - Can add customers without orders
 * - Can delete orders without losing customer info
 * - Referential integrity (foreign key constraint)
 */

export const NormalizedExample = {
  description: 'Normalized data eliminates redundancy and anomalies',
  benefits: [
    'No data redundancy',
    'Easy updates (single source of truth)',
    'Can add customers independently',
    'Can delete orders without losing customer data',
    'Referential integrity enforced',
  ],
  tables: {
    customers: {
      description: 'Stores customer information once',
      columns: ['id', 'name', 'address'],
    },
    orders: {
      description: 'Stores order information with reference to customer',
      columns: ['id', 'orderNum', 'customerId (FK)', 'orderDate', 'total'],
    },
  },
};

