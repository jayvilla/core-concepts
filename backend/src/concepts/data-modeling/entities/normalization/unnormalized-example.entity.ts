/**
 * UNNORMALIZED EXAMPLE - Demonstrates Problems with Unnormalized Data
 *
 * This is NOT a real entity - it's a conceptual example to show
 * what NOT to do and why normalization is important.
 *
 * PROBLEMS WITH THIS DESIGN:
 *
 * 1. DATA REDUNDANCY:
 *    - Customer name repeated for every order
 *    - Customer address repeated for every order
 *    - Wastes storage space
 *
 * 2. UPDATE ANOMALIES:
 *    - If customer changes address, must update ALL orders
 *    - Risk of inconsistent data
 *    - Time-consuming updates
 *
 * 3. INSERT ANOMALIES:
 *    - Can't add customer without an order
 *    - Can't add order without customer details
 *
 * 4. DELETE ANOMALIES:
 *    - Deleting last order deletes customer
 *    - Lose customer information
 *
 * EXAMPLE OF UNNORMALIZED TABLE:
 *
 * orders_customers (BAD DESIGN):
 * +----+----------+----------------+------------------+------------+-------+
 * | id | orderNum | customerName   | customerAddress  | orderDate  | total |
 * +----+----------+----------------+------------------+------------+-------+
 * | 1  | ORD-001  | John Doe       | 123 Main St      | 2024-01-01 | 100.00|
 * | 2  | ORD-002  | John Doe       | 123 Main St      | 2024-01-02 | 150.00|
 * | 3  | ORD-003  | Jane Smith     | 456 Oak Ave      | 2024-01-03 | 200.00|
 * | 4  | ORD-004  | John Doe       | 789 Pine Rd      | 2024-01-04 |  75.00|
 * +----+----------+----------------+------------------+------------+-------+
 *
 * PROBLEMS:
 * - John Doe's name appears 3 times (redundancy)
 * - John Doe's address changed (123 Main St → 789 Pine Rd)
 * - Now we have inconsistent data (which address is correct?)
 * - If we delete ORD-001, ORD-002, ORD-004, we lose John Doe's info
 */

export const UnnormalizedExample = {
  description: 'Unnormalized data has redundancy and anomalies',
  problems: [
    'Data redundancy (customer info repeated)',
    'Update anomalies (must update multiple rows)',
    'Insert anomalies (can\'t add customer without order)',
    'Delete anomalies (deleting order might delete customer)',
  ],
};

