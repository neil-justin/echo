import {
  Association,
  BelongsToManyAddAssociationMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import { sequelize } from '@/utils/db';
import { LastMessage } from '@repoRoot/types';
import User from '@/models/user';

class Conversation extends Model<
  InferAttributes<Conversation, { omit: 'users' }>,
  InferCreationAttributes<Conversation, { omit: 'users' }>
> {
  declare id: CreationOptional<string>;
  declare lastMessage: LastMessage;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare addUser: BelongsToManyAddAssociationMixin<User, User['id']>;

  declare users?: NonAttribute<User[]>;

  declare static associations: {
    users: Association<Conversation, User>;
  };
}

Conversation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    lastMessage: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    underscored: true,
    tableName: 'conversations',
    modelName: 'conversation',
  }
);

export default Conversation;
