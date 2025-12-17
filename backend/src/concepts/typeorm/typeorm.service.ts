import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Post } from './entities/post.entity';
import { Tag } from './entities/tag.entity';

/**
 * TypeORM Service
 * Demonstrates various TypeORM features:
 * - Repository pattern
 * - Query Builder
 * - Transactions
 * - Relationships
 * - Entity Manager
 */
@Injectable()
export class TypeormService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    private dataSource: DataSource,
  ) {}

  /**
   * Repository Methods - Basic CRUD
   */
  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return await this.findUserById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  /**
   * Repository with Relationships - Eager Loading
   */
  async findUserWithRelations(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile', 'posts', 'tags'],
    });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Query Builder - Complex Queries
   */
  async findUsersWithPostCount(): Promise<any[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .select('user.id', 'userId')
      .addSelect('user.name', 'userName')
      .addSelect('COUNT(post.id)', 'postCount')
      .groupBy('user.id')
      .getRawMany();
  }

  async findUsersByAgeRange(minAge: number, maxAge: number): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.age >= :minAge', { minAge })
      .andWhere('user.age <= :maxAge', { maxAge })
      .orderBy('user.age', 'ASC')
      .getMany();
  }

  /**
   * Query Builder - Joins
   */
  async findUsersWithPublishedPosts(): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.posts', 'post')
      .where('post.published = :published', { published: true })
      .getMany();
  }

  /**
   * Transactions - Using Query Runner
   */
  async createUserWithProfileTransaction(
    userData: Partial<User>,
    profileData: Partial<Profile>,
  ): Promise<{ user: User; profile: Profile }> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create user
      const user = queryRunner.manager.create(User, userData);
      const savedUser = await queryRunner.manager.save(User, user);

      // Create profile
      const profile = queryRunner.manager.create(Profile, {
        ...profileData,
        userId: savedUser.id,
      });
      const savedProfile = await queryRunner.manager.save(Profile, profile);

      // Commit transaction
      await queryRunner.commitTransaction();

      return { user: savedUser, profile: savedProfile };
    } catch (error) {
      // Rollback on error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release query runner
      await queryRunner.release();
    }
  }

  /**
   * Transactions - Using DataSource Transaction
   */
  async createUserWithPostsTransaction(
    userData: Partial<User>,
    postsData: Partial<Post>[],
  ): Promise<{ user: User; posts: Post[] }> {
    return await this.dataSource.transaction(async (manager) => {
      // Create user
      const user = manager.create(User, userData);
      const savedUser = await manager.save(User, user);

      // Create posts
      const posts = postsData.map((postData) =>
        manager.create(Post, { ...postData, authorId: savedUser.id }),
      );
      const savedPosts = await manager.save(Post, posts);

      return { user: savedUser, posts: savedPosts };
    });
  }

  /**
   * Entity Manager - Direct database operations
   */
  async findUsersUsingEntityManager(): Promise<User[]> {
    return await this.dataSource.manager.find(User);
  }

  async createUserUsingEntityManager(userData: Partial<User>): Promise<User> {
    const user = this.dataSource.manager.create(User, userData);
    return await this.dataSource.manager.save(User, user);
  }

  /**
   * Relationships - One-to-One
   */
  async createUserWithProfile(
    userData: Partial<User>,
    profileData: Partial<Profile>,
  ): Promise<User> {
    const user = this.userRepository.create(userData);
    const profile = this.profileRepository.create(profileData);
    user.profile = profile;
    return await this.userRepository.save(user);
  }

  /**
   * Relationships - One-to-Many
   */
  async createUserWithPosts(
    userData: Partial<User>,
    postsData: Partial<Post>[],
  ): Promise<User> {
    const user = this.userRepository.create(userData);
    const posts = postsData.map((postData) =>
      this.postRepository.create(postData),
    );
    user.posts = posts;
    return await this.userRepository.save(user);
  }

  /**
   * Relationships - Many-to-Many
   */
  async addTagsToUser(userId: number, tagIds: number[]): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['tags'],
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const tags = await this.tagRepository
      .createQueryBuilder('tag')
      .where('tag.id IN (:...ids)', { ids: tagIds })
      .getMany();
    user.tags = [...(user.tags || []), ...tags];

    return await this.userRepository.save(user);
  }

  /**
   * Advanced Query - Subqueries
   */
  async findUsersWithMostPosts(limit: number = 5): Promise<any[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select('user.id', 'userId')
      .addSelect('user.name', 'userName')
      .addSelect(
        (subQuery) =>
          subQuery
            .select('COUNT(post.id)', 'count')
            .from(Post, 'post')
            .where('post.authorId = user.id'),
        'postCount',
      )
      .orderBy('postCount', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  /**
   * Raw SQL Query
   */
  async findUsersUsingRawQuery(): Promise<any[]> {
    return await this.userRepository.query(
      'SELECT id, name, email, age FROM users WHERE age > $1 ORDER BY age DESC',
      [25],
    );
  }

  /**
   * Bulk Operations
   */
  async bulkCreateUsers(usersData: Partial<User>[]): Promise<User[]> {
    const users = this.userRepository.create(usersData);
    return await this.userRepository.save(users);
  }

  async bulkUpdateUsers(updates: { id: number; data: Partial<User> }[]): Promise<void> {
    await Promise.all(
      updates.map(({ id, data }) => this.userRepository.update(id, data)),
    );
  }
}

