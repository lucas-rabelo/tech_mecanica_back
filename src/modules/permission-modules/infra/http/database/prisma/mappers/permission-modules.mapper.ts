import { CreatePermissionModulesRequestDto } from '@/src/modules/permission-modules/dto';
import { Module, Permission, PermissionModule } from '@prisma/client';

export class PermissionModulesPrismaMapper {
  static toDomain(
    permissionModule: PermissionModule & { permission: Permission } & {
      module: Module;
    },
  ) {
    return {
      id: permissionModule.id,
      permission: permissionModule.permission.name,
      module: permissionModule.module.name,
    };
  }

  static toPrisma(permissionModule: CreatePermissionModulesRequestDto) {
    return {
      permissionId: permissionModule.moduleId,
      moduleId: permissionModule.moduleId,
    };
  }
}
