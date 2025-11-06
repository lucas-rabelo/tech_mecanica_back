import { CreatePageRequestDto } from "@/src/modules/pages/dto";
import { Module, Page } from "@prisma/client";

export class PagesPrismaMapper {
  static toDomain(page: Page & { module: Module }) {
    return {
      id: page.id,
      name: page.name,
      module: page.module.name,
    };
  }

  static toPrisma(page: CreatePageRequestDto) {
    return {
      name: page.name,
      moduleId: page.moduleId,
    }
  }
}