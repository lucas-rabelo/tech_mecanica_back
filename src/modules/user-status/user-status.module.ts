import { UserStatusEntity } from '@/src/infra';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserStatusRepository, UserStatusRepositoryTypeOrm } from './infra/http/database';

@Module({
  imports: [TypeOrmModule.forFeature([UserStatusEntity])],
  controllers: [],
  providers: [
    {
      provide: UserStatusRepository,
      useClass: UserStatusRepositoryTypeOrm,
    }
  ],
  exports: [],
})
export class UserStatusModule {}
