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
import { Profile } from './profile.entity';
import { Post } from './post.entity';
import { Tag } from './tag.entity';

/**
 * USER ENTITY - TypeORM Example
 *
 * Demonstrates TypeORM decorator-based entity definition
 * Same structure as Prisma User model for comparison
 */
@Entity('orm_users')
@Index('idx_orm_user_email', ['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // One-to-One: User has one Profile
  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn({ name: 'userId' })
  profile: Profile;

  // One-to-Many: User has many Posts
  @OneToMany(() => Post, (post) => post.author, { cascade: true })
  posts: Post[];

  // Many-to-Many: User has many Tags
  @ManyToMany(() => Tag, (tag) => tag.users, { cascade: true })
  @JoinTable({
    name: 'orm_user_tags',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: Tag[];
}

