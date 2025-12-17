import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

/**
 * AUDIT TRAIL ENTITY - Demonstrates Audit Trail Pattern
 *
 * AUDIT TRAIL PATTERN:
 * - Track who created/modified records
 * - Track when records were created/modified
 * - Track version history (optimistic locking)
 *
 * USE CASES:
 * - Compliance and regulatory requirements
 * - Debugging and troubleshooting
 * - Change tracking and history
 * - Security and access control
 * - Data governance
 */
@Entity('data_modeling_audit_trail_example')
export class AuditTrailExample {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  /**
   * CREATED BY - Tracks who created the record
   *
   * In real systems, this would reference User.id
   * Storing as string for simplicity in this example
   *
   * Useful for:
   * - Accountability
   * - Audit logs
   * - Permission checks
   */
  @Column({ type: 'varchar', length: 100 })
  createdBy: string;

  /**
   * UPDATED BY - Tracks who last modified the record
   *
   * Should be updated on every modification
   * Can be NULL if record was never updated
   */
  @Column({ type: 'varchar', length: 100, nullable: true })
  updatedBy: string | null;

  /**
   * CREATED AT - Timestamp of creation
   *
   * Automatically set by TypeORM on creation
   * Never changes after creation
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * UPDATED AT - Timestamp of last modification
   *
   * Automatically updated by TypeORM on every save
   * Useful for:
   * - Cache invalidation
   * - Change detection
   * - Last activity tracking
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * VERSION - Optimistic Locking
   *
   * Automatically incremented on each update
   * Prevents concurrent modification conflicts
   *
   * How it works:
   * 1. Read record with version = 1
   * 2. Modify and save
   * 3. TypeORM checks version is still 1
   * 4. If version changed, throws OptimisticLockVersionMismatchError
   * 5. If version matches, updates and increments to 2
   *
   * Prevents "lost update" problem in concurrent scenarios
   */
  @VersionColumn()
  version: number;
}
