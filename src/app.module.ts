import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { APP_GUARD } from '@nestjs/core';
import { AccessGuard, AuthGuard } from './infra';
import { AdminModule, SharedJwtModule } from './modules';

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
    SharedJwtModule,
    AdminModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
  ],
})
export class AppModule {}
