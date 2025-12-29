import {
  Model,
  DataTypes,
  Sequelize,
  BelongsTo,
  ModelStatic,
} from 'sequelize';
import { User } from './user.model';

/**
 * PROFILE MODEL - Sequelize Example
 *
 * One-to-One relationship with User
 */
export class Profile extends Model {
  declare id: number;
  declare bio: string | null;
  declare avatar: string | null;
  declare userId: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Relationships
  declare user?: User;

  // Static associations
  static associations: {
    user: BelongsTo<Profile, User>;
  };
}

export const initProfileModel = (sequelize: Sequelize): typeof Profile => {
  (Profile as ModelStatic<Profile>).init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        field: 'user_id',
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
      modelName: 'Profile',
      tableName: 'orm_profiles',
      timestamps: true,
      underscored: true,
    },
  );

  return Profile;
};

