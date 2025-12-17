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
} from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from './post.entity';
import { Tag } from './tag.entity';

/**
 * User Entity
 * Demonstrates basic TypeORM entity with relationships
 */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // One-to-One relationship
  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: Profile;

  // One-to-Many relationship
  @OneToMany(() => Post, (post) => post.author, { cascade: true })
  posts: Post[];

  // Many-to-Many relationship
  @ManyToMany(() => Tag, (tag) => tag.users, { cascade: true })
  @JoinTable({
    name: 'user_tags',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: Tag[];
}
