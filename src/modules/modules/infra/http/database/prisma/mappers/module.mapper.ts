import { CreateModuleRequestDto } from '@/src/modules/modules/dto';
import { Module } from '@prisma/client';

export class ModulePrismaMapper {
  static toDomain(module: Module) {
    return {
      id: module.id,
      name: module.name,
    };
  }

  static toPrisma(module: CreateModuleRequestDto) {
    return {
      name: module.name,
    };
  }
}
