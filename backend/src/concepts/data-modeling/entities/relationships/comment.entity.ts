import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Post } from './post.entity';

/**
 * COMMENT ENTITY - Many-to-One Relationship Example
 *
 * Demonstrates:
 * - Many-to-One: Comment belongs to Post
 * - Cascade delete: Deleting post deletes comments
 * - Foreign key indexing for performance
 *
 * DESIGN PATTERN: Child entity in parent-child relationship
 *
 * This is the "many" side:
 * - Many Comments belong to one Post
 * - Foreign key stored in THIS table (postId)
 */
@Entity('data_modeling_comments')
@Index('idx_comment_post', ['postId']) // Index foreign key for fast post lookups
@Index('idx_comment_created', ['createdAt']) // Index for sorting by date
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * CONTENT - Text field for comment body
   *
   * Using TEXT for variable-length content
   * No length limit allows for longer comments
   */
  @Column({ type: 'text' })
  content: string;

  /**
   * AUTHOR NAME - VARCHAR
   *
   * Note: In a real system, this might reference User.id
   * For simplicity, storing name as string
   *
   * Better design: Add userId foreign key to User table
   */
  @Column({ type: 'varchar', length: 100 })
  authorName: string;

  /**
   * CREATED TIMESTAMP
   *
   * Only tracking creation, not updates
   * Comments typically aren't edited (or edits are tracked separately)
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * FOREIGN KEY - References Post.id
   *
   * This links the comment to its parent post
   * NOT NULL constraint ensures every comment has a post
   */
  @Column({ type: 'int' })
  postId: number;

  /**
   * MANY-TO-ONE RELATIONSHIP
   *
   * Comment belongs to Post
   *
   * onDelete: 'CASCADE'
   * - If Post is deleted, all Comments are deleted
   * - Maintains referential integrity
   * - Prevents orphaned comments
   *
   * This is the "owning" side (contains foreign key)
   */
  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;
}

