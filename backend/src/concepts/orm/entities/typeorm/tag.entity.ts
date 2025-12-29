import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';

/**
 * TAG ENTITY - TypeORM Example
 *
 * Many-to-Many relationship with User
 */
@Entity('orm_tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Many-to-Many: Tag belongs to many Users
  @ManyToMany(() => User, (user) => user.tags)
  users: User[];
}

