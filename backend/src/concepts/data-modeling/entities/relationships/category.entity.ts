import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';

/**
 * CATEGORY ENTITY - Self-Referencing Relationship Example
 *
 * Demonstrates:
 * - Self-referencing Many-to-One/One-to-Many
 * - Hierarchical data structure (tree)
 * - Adjacency list pattern
 *
 * DESIGN PATTERN: Adjacency List for hierarchical data
 *
 * This creates a tree structure:
 * - Category can have a parent Category
 * - Category can have many child Categories
 * - Allows unlimited nesting levels
 *
 * Example hierarchy:
 *   Electronics
 *     ├─ Computers
 *     │   ├─ Laptops
 *     │   └─ Desktops
 *     └─ Phones
 *         ├─ Smartphones
 *         └─ Feature Phones
 */
@Entity('data_modeling_categories')
@Index('idx_category_parent', ['parentId']) // Index for fast parent lookups
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * CATEGORY NAME
   *
   * Unique within same parent level
   * (enforced by application logic, not DB constraint)
   */
  @Column({ type: 'varchar', length: 100 })
  name: string;

  /**
   * DESCRIPTION - Optional
   *
   * Text field for category description
   * Useful for SEO, UI display
   */
  @Column({ type: 'text', nullable: true })
  description: string | null;

  /**
   * FOREIGN KEY - References Category.id (self-reference)
   *
   * NULL means this is a root category (no parent)
   * Non-NULL means this is a child category
   *
   * This creates the hierarchical structure
   */
  @Column({ type: 'int', nullable: true })
  parentId: number | null;

  /**
   * MANY-TO-ONE RELATIONSHIP (Self-Referencing)
   *
   * Category belongs to a parent Category
   *
   * onDelete: 'CASCADE' or 'SET NULL'?
   * - CASCADE: Deleting parent deletes all children
   * - SET NULL: Deleting parent makes children root categories
   *
   * Here we use SET NULL to preserve child categories
   */
  @ManyToOne(() => Category, (category) => category.children, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parentId' })
  parent: Category | null;

  /**
   * ONE-TO-MANY RELATIONSHIP (Self-Referencing)
   *
   * Category has many child Categories
   *
   * This is the inverse side
   */
  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];
}

