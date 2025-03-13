import { Sequelize } from 'sequelize-typescript';
import { POSTGRES_URI } from '@/utils/config';

export const sequelize = new Sequelize(POSTGRES_URI, {
  models: ['../models'],
});

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Postgresql connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectToDb;
