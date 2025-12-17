import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  Check,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

/**
 * POST ENTITY - One-to-Many Relationship Example
 *
 * Demonstrates:
 * - Many-to-One: Post belongs to User (author)
 * - One-to-Many: Post has many Comments
 * - Cascade delete: Deleting post deletes comments
 * - Check constraint: Published status validation
 *
 * DESIGN PATTERN: Parent-Child relationship
 *
 * This is a classic one-to-many pattern:
 * - One User (parent) has many Posts (children)
 * - One Post (parent) has many Comments (children)
 */
@Entity('data_modeling_posts')
@Index('idx_post_author', ['authorId']) // Index foreign key for fast author lookups
@Index('idx_post_published', ['published']) // Index for filtering published posts
// Note: Check constraint removed - PostgreSQL boolean type doesn't need integer comparison
// TypeORM handles boolean types correctly, and PostgreSQL has native boolean support
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * TITLE - VARCHAR with length limit
   *
   * Length limit (200) prevents:
   * - Database bloat
   * - UI issues with very long titles
   * - Performance problems
   */
  @Column({ type: 'varchar', length: 200 })
  title: string;

  /**
   * CONTENT - TEXT field
   *
   * Using TEXT instead of VARCHAR:
   * - No length limit
   * - Better for blog post content
   * - More efficient storage for long content
   */
  @Column({ type: 'text' })
  content: string;

  /**
   * PUBLISHED - Boolean flag
   *
   * Default: false (draft by default)
   *
   * Use cases:
   * - Draft vs Published posts
   * - Soft publishing workflow
   * - Content moderation
   */
  @Column({ type: 'boolean', default: false })
  published: boolean;

  /**
   * AUDIT TRAIL - Created timestamp
   *
   * Tracks when post was created
   * Useful for:
   * - Sorting by date
   * - Analytics
   * - Content freshness
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * AUDIT TRAIL - Updated timestamp
   *
   * Tracks when post was last modified
   * Useful for:
   * - Showing "last updated" date
   * - Cache invalidation
   * - Change tracking
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * FOREIGN KEY - References User.id
   *
   * This is the "many" side of the relationship
   * - Many Posts belong to one User
   * - Foreign key stored in THIS table
   */
  @Column({ type: 'int' })
  authorId: number;

  /**
   * MANY-TO-ONE RELATIONSHIP
   *
   * Post belongs to User (author)
   *
   * onDelete: 'CASCADE'
   * - If User is deleted, all their Posts are deleted
   * - Prevents orphaned posts
   * - Alternative: SET NULL (if posts should survive user deletion)
   *
   * JoinColumn: Specifies the foreign key column name
   */
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: User;

  /**
   * ONE-TO-MANY RELATIONSHIP
   *
   * Post has many Comments
   *
   * cascade: true
   * - Creating/updating Post can create/update Comments
   * - Deleting Post deletes all Comments
   *
   * This is the "one" side (parent)
   */
  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];
}

