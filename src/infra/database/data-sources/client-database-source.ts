import 'dotenv/config';
import { DataSource } from 'typeorm';

export const ClientDatabaseDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TENANT_4_DB_HOST,
  port: process.env.TENANT_4_DB_PORT ? parseInt(process.env.TENANT_4_DB_PORT) : 5432,
  username: process.env.TENANT_4_DB_USER,
  password: String(process.env.TENANT_4_DB_PASS),
  database: process.env.TENANT_4_DB_NAME,
  entities: ['dist/src/infra/database/entities/client/**/*.entity.{ts,js}'],
  migrations: ['dist/src/infra/database/migrations/client/**/*.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
  synchronize: false,
});
