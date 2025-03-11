import { Sequelize } from 'sequelize';

const connectToDb = async () => {
  const sequelize = new Sequelize(process.env.POSTGRES_URI);

  try {
    await sequelize.authenticate();
    console.log('Postgresql connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectToDb;
