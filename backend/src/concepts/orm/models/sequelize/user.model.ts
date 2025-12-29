import {
  Model,
  DataTypes,
  Sequelize,
  HasOne,
  HasMany,
  BelongsToMany,
  ModelStatic,
} from 'sequelize';
import { Profile } from './profile.model';
import { Post } from './post.model';
import { Tag } from './tag.model';

/**
 * USER MODEL - Sequelize Example
 *
 * Demonstrates Sequelize model definition
 * Same structure as Prisma and TypeORM for comparison
 */
export class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Relationships
  declare profile?: Profile;
  declare posts?: Post[];
  declare tags?: Tag[];

  // Static associations
  static associations: {
    profile: HasOne<User, Profile>;
    posts: HasMany<User, Post>;
    tags: BelongsToMany<User, Tag>;
  };
}

export const initUserModel = (sequelize: Sequelize): typeof User => {
  (User as ModelStatic<User>).init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'orm_users',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ['email'],
          name: 'idx_orm_user_email',
        },
      ],
    },
  );

  return User;
};

