import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsModule, TenantStatusModule, UserStatusModule } from './modules';

const modules = [PermissionsModule, TenantStatusModule, UserStatusModule];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        username: process.env.DB_USER,
        password: String(process.env.DB_PASS),
        database: process.env.DB_NAME,
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
        entities: ['dist/src/infra/database/entities/**/*.entity.{ts,js}'],
        migrations: ['dist/src/infra/database/migrations/**/*.{ts,js}'],
        migrationsTableName: 'typeorm_migrations',
      }),
    }),
    JwtModule.register({
      secret: `${process.env.SECRET_ENV}`,
    }),
    ...modules,
  ],
  providers: [],
})
export class AppModule {}
