import { Migration } from '@/utils/db';
import { DataTypes, QueryInterface } from 'sequelize';

export const up: Migration = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.addColumn('users', 'first_name', {
    type: DataTypes.STRING,
    allowNull: false,
  });
  await queryInterface.addColumn('users', 'last_name', {
    type: DataTypes.STRING,
    allowNull: false,
  });
};

export const down: Migration = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.removeColumn('users', 'first_name');
  await queryInterface.removeColumn('users', 'last_name');
};
