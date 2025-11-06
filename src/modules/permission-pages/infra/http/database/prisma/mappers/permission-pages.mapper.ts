import { CreatePermissionPagesRequestDto } from '@/src/modules/permission-pages/dto';
import { Page, Permission, PermissionPage } from '@prisma/client';

export class PermissionPagesPrismaMapper {
  static toDomain(
    permissionPage: PermissionPage & { permission: Permission } & {
      page: Page;
    },
  ) {
    return {
      id: permissionPage.id,
      permission: permissionPage.permission.name,
      page: permissionPage.page.name,
    };
  }

  static toPrisma(permissionPage: CreatePermissionPagesRequestDto) {
    return {
      permissionId: permissionPage.permissionId,
      pageId: permissionPage.pageId,
    };
  }
}
