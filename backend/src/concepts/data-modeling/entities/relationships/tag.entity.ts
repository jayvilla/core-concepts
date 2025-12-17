import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Index,
} from 'typeorm';
import { User } from './user.entity';

/**
 * TAG ENTITY - Many-to-Many Relationship Example
 *
 * Demonstrates:
 * - Many-to-Many: Tag can belong to many Users
 * - Junction table: data_modeling_user_tags
 * - Unique constraint on name
 *
 * DESIGN PATTERN: Tagging system
 *
 * Common use cases:
 * - User interests/skills
 * - Content categorization
 * - Search and filtering
 */
@Entity('data_modeling_tags')
@Index('idx_tag_name', ['name'], { unique: true }) // Unique index for tag names
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * TAG NAME - Unique constraint
   *
   * Unique constraint ensures:
   * - No duplicate tags
   * - Consistent tagging
   * - Better search performance
   *
   * Example: "javascript", "react", "nodejs"
   */
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  /**
   * COLOR - Optional visual identifier
   *
   * Stored as hex color code (e.g., "#FF5733")
   * Useful for UI display
   */
  @Column({ type: 'varchar', length: 7, nullable: true })
  color: string | null;

  /**
   * MANY-TO-MANY RELATIONSHIP (Inverse Side)
   *
   * Tag can belong to many Users
   *
   * This is the inverse side because:
   * - User entity has @JoinTable decorator
   * - Junction table is defined in User entity
   *
   * No @JoinTable here - it's defined on the other side (User)
   */
  @ManyToMany(() => User, (user) => user.tags)
  users: User[];
}

