import { Service } from "@prisma/client";

export class ServicePrismaMappers {
  static toDomain(raw: Service) {
    return {
      id: raw.id,
      name: raw.name,
      description: raw.description,
    }
  }
}