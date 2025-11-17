import { TenantsEntity } from '@/src/infra';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TenantsEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class TenantsModule {}
