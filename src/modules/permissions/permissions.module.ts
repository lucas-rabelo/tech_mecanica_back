import { PermissionsEntity } from "@/src/infra";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([PermissionsEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class PermissionsModule {};
