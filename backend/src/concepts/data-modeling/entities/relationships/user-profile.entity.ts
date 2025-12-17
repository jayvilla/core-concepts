import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';

/**
 * USER PROFILE ENTITY - One-to-One Relationship Example
 *
 * Demonstrates:
 * - One-to-One relationship with User
 * - Optional profile data (nullable fields)
 * - Foreign key constraint
 *
 * DESIGN PATTERN: Separate table for optional/extended data
 *
 * Why separate from User?
 * - User table stays lean (only essential data)
 * - Profile data can be loaded on demand
 * - Easier to extend profile without modifying User table
 * - Better performance for common queries (login, auth)
 */
@Entity('data_modeling_user_profiles')
@Index('idx_profile_user_id', ['userId']) // Index foreign key for joins
export class UserProfile {
  /**
   * PRIMARY KEY
   * Separate primary key allows profile to exist independently
   * (though in practice, it's always linked to a User)
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * FIRST NAME - Nullable
   *
   * Nullable because:
   * - User might not provide this information
   * - Profile is optional
   * - Allows partial profile creation
   */
  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName: string | null;

  /**
   * PHONE - Nullable, Optional
   *
   * Not all users provide phone numbers
   * Can be used for 2FA, notifications, etc.
   */
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string | null;

  /**
   * BIO - Text field for longer content
   *
   * Using TEXT instead of VARCHAR:
   * - No length limit
   * - Better for variable-length content
   * - Can store longer descriptions
   */
  @Column({ type: 'text', nullable: true })
  bio: string | null;

  /**
   * FOREIGN KEY - References User.id
   *
   * UNIQUE constraint ensures:
   * - One profile per user (enforces one-to-one)
   * - Fast lookups when joining
   *
   * This is the "owning" side of the relationship
   * (the side that contains the foreign key)
   */
  @Column({ type: 'int', unique: true })
  userId: number;

  /**
   * ONE-TO-ONE RELATIONSHIP (Inverse Side)
   *
   * This is the inverse side because:
   * - Foreign key is in THIS table (userId column)
   * - User table has the @OneToOne decorator with @JoinColumn
   *
   * JoinColumn specifies which column contains the foreign key
   */
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'userId' })
  user: User;
}

