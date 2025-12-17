import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParamsDto } from './dto/query-params.dto';

/**
 * REST API Service
 * Demonstrates business logic and data manipulation
 * In a real application, this would interact with a database
 */
@Injectable()
export class RestApiService {
  // In-memory storage for demonstration (replace with database in production)
  private users: User[] = [];
  private nextId = 1;

  /**
   * GET - Retrieve all users with pagination and filtering
   */
  findAll(queryParams: QueryParamsDto) {
    const { page = 1, limit = 10, search, sortBy = 'id', sortOrder = 'asc' } = queryParams;

    let filteredUsers = [...this.users];

    // Search filter
    if (search) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Sorting
    filteredUsers.sort((a, b) => {
      const aValue = a[sortBy as keyof User];
      const bValue = b[sortBy as keyof User];
      const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      data: paginatedUsers,
      meta: {
        total: filteredUsers.length,
        page,
        limit,
        totalPages: Math.ceil(filteredUsers.length / limit),
      },
    };
  }

  /**
   * GET - Retrieve a single user by ID
   */
  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * POST - Create a new user
   */
  create(createUserDto: CreateUserDto): User {
    // Check for duplicate email
    const existingUser = this.users.find((u) => u.email === createUserDto.email);
    if (existingUser) {
      throw new ConflictException(`User with email ${createUserDto.email} already exists`);
    }

    const user = new User({
      id: this.nextId++,
      ...createUserDto,
    });

    this.users.push(user);
    return user;
  }

  /**
   * PUT - Replace an entire user (full update)
   */
  update(id: number, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check for duplicate email if email is being updated
    if (updateUserDto.email) {
      const existingUser = this.users.find(
        (u) => u.email === updateUserDto.email && u.id !== id,
      );
      if (existingUser) {
        throw new ConflictException(`User with email ${updateUserDto.email} already exists`);
      }
    }

    // Full replacement
    const updatedUser = new User({
      id,
      ...updateUserDto,
    });
    updatedUser.createdAt = this.users[userIndex].createdAt;
    updatedUser.updatedAt = new Date();

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  /**
   * PATCH - Partially update a user
   */
  patch(id: number, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check for duplicate email if email is being updated
    if (updateUserDto.email) {
      const existingUser = this.users.find(
        (u) => u.email === updateUserDto.email && u.id !== id,
      );
      if (existingUser) {
        throw new ConflictException(`User with email ${updateUserDto.email} already exists`);
      }
    }

    // Partial update - only update provided fields
    const user = this.users[userIndex];
    Object.assign(user, updateUserDto);
    user.updatedAt = new Date();

    return user;
  }

  /**
   * DELETE - Remove a user
   */
  remove(id: number): { message: string } {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users.splice(userIndex, 1);
    return { message: `User with ID ${id} has been deleted` };
  }
}

