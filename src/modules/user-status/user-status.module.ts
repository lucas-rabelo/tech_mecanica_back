import { UserStatusEntity } from '@/src/infra';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserStatusEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserStatusModule {}
