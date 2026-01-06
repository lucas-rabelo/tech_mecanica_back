import 'dotenv/config';
import { DataSource } from 'typeorm';

export const MasterDatabaseDataSource = new DataSource({
  type: 'postgres',
  host: process.env.MASTER_DB_HOST,
  port: process.env.MASTER_DB_PORT ? parseInt(process.env.MASTER_DB_PORT) : 5432,
  username: process.env.MASTER_DB_USER,
  password: String(process.env.MASTER_DB_PASS),
  database: process.env.MASTER_DB_NAME,
  entities: ['dist/src/infra/database/entities/*.entity.{ts,js}'],
  migrations: ['dist/src/infra/database/migrations/*.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
  synchronize: false,
});
