import { Migration } from '@/utils/db';
import { DataTypes, QueryInterface } from 'sequelize';

export const up: Migration = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.addColumn('users', 'avatar', {
    type: DataTypes.STRING,
  });
};

export const down: Migration = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.removeColumn('users', 'avatar');
};
