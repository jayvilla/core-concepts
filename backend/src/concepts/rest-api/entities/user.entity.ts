/**
 * User Entity
 * Represents a user in the system
 * In a real application, this would be a TypeORM entity
 */
export class User {
  id: number;
  name: string;
  email: string;
  age: number;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

