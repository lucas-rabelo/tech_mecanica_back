import {
  Module,
  type MiddlewareConsumer,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { APP_GUARD } from '@nestjs/core';
import { AccessGuard, AuthGuard, DatabaseModule, TenantMiddleware } from './infra';
import { AdminModule, ApplicationModule, SharedJwtModule } from './modules';
import { ServicesModule } from './core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.MASTER_DB_HOST,
        port: process.env.MASTER_DB_PORT ? parseInt(process.env.MASTER_DB_PORT) : 5432,
        username: process.env.MASTER_DB_USER,
        password: String(process.env.MASTER_DB_PASS),
        database: process.env.MASTER_DB_NAME,
        synchronize: process.env.MASTER_DB_SYNCHRONIZE === 'true',
        entities: ['dist/src/infra/database/entities/**/*.entity.{ts,js}'],
        migrations: ['dist/src/infra/database/migrations/**/*.{ts,js}'],
        migrationsTableName: 'typeorm_migrations',
      }),
    }),
    DatabaseModule,
    ServicesModule,
    SharedJwtModule,
    AdminModule,
    ApplicationModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
