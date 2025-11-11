import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        entities: [__dirname + '/database/entities/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
        migrationsTableName: 'typeorm_migrations',
        migrationsTransactionMode: 'all'
      }),
    }),
    JwtModule.register({
      secret: `${process.env.SECRET_ENV}`,
    }),
  ],
  providers: [],
})
export class AppModule {}
