import {
  Model,
  DataTypes,
  Sequelize,
  BelongsToMany,
  ModelStatic,
} from 'sequelize';
import { User } from './user.model';

/**
 * TAG MODEL - Sequelize Example
 *
 * Many-to-Many relationship with User
 */
export class Tag extends Model {
  declare id: number;
  declare name: string;
  declare createdAt: Date;

  // Relationships
  declare users?: User[];

  // Static associations
  static associations: {
    users: BelongsToMany<Tag, User>;
  };
}

export const initTagModel = (sequelize: Sequelize): typeof Tag => {
  (Tag as ModelStatic<Tag>).init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
      },
    },
    {
      sequelize,
      modelName: 'Tag',
      tableName: 'orm_tags',
      timestamps: false, // Only createdAt, no updatedAt
      underscored: true,
    },
  );

  return Tag;
};

