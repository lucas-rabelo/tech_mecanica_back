import 'dotenv/config';
import { DataSource } from 'typeorm';

export const DatabaseDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER,
  password: String(process.env.DB_PASS),
  database: process.env.DB_NAME,
  entities: ['dist/src/infra/database/entities/**/*.entity.{ts,js}'],
  migrations: ['dist/src/infra/database/migrations/**/*.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
});
