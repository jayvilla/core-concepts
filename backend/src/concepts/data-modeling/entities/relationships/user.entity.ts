import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
  Index,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { Post } from './post.entity';
import { Tag } from './tag.entity';

/**
 * USER ENTITY - Demonstrates Multiple Relationship Types
 *
 * This entity demonstrates:
 * 1. One-to-One relationship (User → UserProfile)
 * 2. One-to-Many relationship (User → Posts)
 * 3. Many-to-Many relationship (User ↔ Tags)
 * 4. Self-Referencing relationship (User follows Users)
 *
 * DESIGN DECISIONS:
 * - Primary Key: Auto-incrementing integer (surrogate key)
 * - Email: Unique constraint for user identification
 * - Timestamps: CreatedAt and UpdatedAt for audit trail
 * - Indexes: Email is indexed for fast lookups
 */
@Entity('data_modeling_users')
@Index('idx_user_email', ['email']) // Index for fast email lookups
export class User {
  /**
   * PRIMARY KEY - Surrogate Key
   *
   * Using auto-incrementing integer as primary key:
   * - Pros: Simple, fast, sequential
   * - Cons: Exposes business information (user count)
   *
   * Alternative: UUID (better for distributed systems, hides business info)
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * USER NAME
   * VARCHAR(100) - Limits name length to prevent abuse
   */
  @Column({ type: 'varchar', length: 100 })
  name: string;

  /**
   * EMAIL - UNIQUE CONSTRAINT
   *
   * Unique constraint ensures:
   * - No duplicate emails in system
   * - Can be used for authentication
   * - Indexed for fast lookups
   */
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  /**
   * AUDIT TRAIL - Created Timestamp
   *
   * Automatically set when entity is created
   * Useful for:
   * - Tracking when user registered
   * - Analytics and reporting
   * - Debugging and troubleshooting
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * AUDIT TRAIL - Updated Timestamp
   *
   * Automatically updated when entity is modified
   * Useful for:
   * - Tracking last activity
   * - Cache invalidation
   * - Change tracking
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * ONE-TO-ONE RELATIONSHIP
   *
   * User has exactly one Profile
   * Profile belongs to exactly one User
   *
   * Implementation:
   * - Foreign key stored in UserProfile table (userId)
   * - Cascade: true means deleting User deletes Profile
   * - JoinColumn: Foreign key column name
   *
   * Use Case: User profile information (bio, avatar, settings)
   * that is optional and stored separately
   */
  @OneToOne(() => UserProfile, (profile) => profile.user, { cascade: true })
  @JoinColumn({ name: 'userId' })
  profile: UserProfile;

  /**
   * ONE-TO-MANY RELATIONSHIP
   *
   * User can have many Posts
   * Each Post belongs to one User (author)
   *
   * Implementation:
   * - Foreign key stored in Post table (authorId)
   * - Cascade: true means deleting User deletes all Posts
   * - Inverse side: Post.author references this
   *
   * Use Case: User creates multiple blog posts
   */
  @OneToMany(() => Post, (post) => post.author, { cascade: true })
  posts: Post[];

  /**
   * MANY-TO-MANY RELATIONSHIP
   *
   * User can have many Tags
   * Tag can belong to many Users
   *
   * Implementation:
   * - Junction table: data_modeling_user_tags
   * - Contains: userId and tagId
   * - JoinTable decorator defines junction table structure
   *
   * Use Case: User interests, skills, categories
   */
  @ManyToMany(() => Tag, (tag) => tag.users, { cascade: true })
  @JoinTable({
    name: 'data_modeling_user_tags', // Junction table name
    joinColumn: { name: 'userId', referencedColumnName: 'id' }, // This side
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' }, // Other side
  })
  tags: Tag[];

  /**
   * SELF-REFERENCING MANY-TO-MANY RELATIONSHIP
   *
   * User can follow many Users
   * User can be followed by many Users
   *
   * Implementation:
   * - Junction table: data_modeling_user_follows
   * - Contains: followerId and followingId
   * - Both reference the same User table
   *
   * Use Case: Social media follow system
   *
   * Note: This creates a bidirectional relationship
   * - following: Users this user follows
   * - followers: Users who follow this user
   */
  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable({
    name: 'data_modeling_user_follows',
    joinColumn: { name: 'followerId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'followingId', referencedColumnName: 'id' },
  })
  following: User[];

  @ManyToMany(() => User, (user) => user.following)
  followers: User[];
}

