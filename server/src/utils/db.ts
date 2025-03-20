import { Sequelize } from 'sequelize-typescript';
import { POSTGRES_URI } from '@/utils/config';
import { Umzug, SequelizeStorage } from 'umzug';

export const sequelize = new Sequelize(POSTGRES_URI, {
  models: ['../models'],
});

const configureMigrator = () =>
  new Umzug({
    migrations: {
      glob: ['migrations/*.ts', { cwd: 'src/' }],
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });

const migrator = configureMigrator();

export type Migration = typeof migrator._types.migration;

const runMigrations = async () => {
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

export const rollbackMigration = async () => {
  await sequelize.authenticate();
  await migrator.down();
};

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('Postgresql connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectToDb;
