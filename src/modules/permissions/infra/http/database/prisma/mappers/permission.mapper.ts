import { Permission } from "@prisma/client";

export class PermissionPrismaMapper {
  static toDomain(raw: Permission) {
    return {
      id: raw.id,
      name: raw.name
    }
  }
}