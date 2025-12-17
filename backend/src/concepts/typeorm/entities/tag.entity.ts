import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';

/**
 * Tag Entity
 * Demonstrates Many-to-Many relationship with User
 */
@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 7, nullable: true })
  color: string | null;

  // Many-to-Many relationship (inverse side)
  @ManyToMany(() => User, (user) => user.tags)
  users: User[];
}
