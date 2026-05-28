import { configDotenv } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { MoneyTransition } from './moneytransition';
import { Inventory } from './inventary';
import { User } from './user';

configDotenv();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Inventory, MoneyTransition],
  migrations: [__dirname + '/migrations/**/*{.js,.ts}'],
  migrationsRun: true,
  synchronize: false,
};

export const dataSource = new DataSource(dataSourceOptions);
// npm run migration:generate src_migrations/migrationfile
// npm run migration:run

