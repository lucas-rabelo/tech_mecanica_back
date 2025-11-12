import { UsersEntity } from "@/src/infra";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class UsersModule {};
