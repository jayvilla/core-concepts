import {
  Model,
  DataTypes,
  Sequelize,
  BelongsTo,
  ModelStatic,
} from 'sequelize';
import { User } from './user.model';

/**
 * POST MODEL - Sequelize Example
 *
 * One-to-Many relationship with User (author)
 */
export class Post extends Model {
  declare id: number;
  declare title: string;
  declare content: string;
  declare published: boolean;
  declare authorId: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Relationships
  declare author?: User;

  // Static associations
  static associations: {
    author: BelongsTo<Post, User>;
  };
}

export const initPostModel = (sequelize: Sequelize): typeof Post => {
  (Post as ModelStatic<Post>).init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'author_id',
        references: {
          model: 'orm_users',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
      modelName: 'Post',
      tableName: 'orm_posts',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ['author_id'],
          name: 'idx_orm_post_author',
        },
      ],
    },
  );

  return Post;
};

