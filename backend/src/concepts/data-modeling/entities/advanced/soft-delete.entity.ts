import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';

/**
 * SOFT DELETE ENTITY - Demonstrates Soft Delete Pattern
 *
 * SOFT DELETE PATTERN:
 * - Records are not physically deleted from database
 * - Instead, marked as deleted with a timestamp
 * - Allows data recovery and audit trails
 *
 * BENEFITS:
 * - Data recovery (can restore deleted records)
 * - Audit trail (know when/what was deleted)
 * - Referential integrity (related records still valid)
 * - Compliance (some regulations require data retention)
 *
 * TRADE-OFFS:
 * - More complex queries (need to filter deleted records)
 * - Storage overhead (deleted records still take space)
 * - Need to handle cascading soft deletes
 */
@Entity('data_modeling_soft_delete_example')
@Index('idx_soft_delete_deleted', ['deletedAt']) // Index for filtering deleted records
export class SoftDeleteExample {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  /**
   * AUDIT TRAIL - Created timestamp
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * AUDIT TRAIL - Updated timestamp
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * SOFT DELETE - Deleted timestamp
   *
   * NULL = record is active (not deleted)
   * Non-NULL = record is deleted (timestamp of deletion)
   *
   * TypeORM's @DeleteDateColumn:
   * - Automatically sets timestamp on soft delete
   * - Automatically filters out in queries (unless withDeleted())
   * - Provides soft delete functionality out of the box
   *
   * Usage:
   * - repository.softDelete(id) - soft deletes
   * - repository.find() - excludes soft deleted by default
   * - repository.find({ withDeleted: true }) - includes deleted
   * - repository.restore(id) - restores soft deleted record
   */
  @DeleteDateColumn()
  deletedAt: Date | null;
}
