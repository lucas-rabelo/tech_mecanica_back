import {
  CreateBranchRequestDto,
  CreateBranchResponseDto,
} from '@/src/modules/branches/dto';
import { Branch, BranchService, Service } from '@prisma/client';

export class BranchPrismaMapper {
  static toDomain(
    data: Branch & {
      branchServices: (BranchService & { service: Service })[];
    },
  ): CreateBranchResponseDto {
    return {
      address: data.address,
      city: data.city,
      id: data.id,
      isMain: data.isMain,
      isWhatsapp: data.isWhatsapp,
      name: data.name,
      neighborhood: data.neighborhood,
      phone: data.phone,
      number: data.number,
      services: data.branchServices.map((branchService) => ({
        id: branchService.id,
        branch: data.name,
        description: branchService.service.description,
        price: branchService.price,
        service: branchService.service.name,
      })),
      uf: data.uf,
      zipCode: data.zipCode,
    };
  }

  static toPrisma(raw: CreateBranchRequestDto) {
    return {
      name: raw.name,
      address: raw.address,
      phone: raw.phone,
      number: raw.number,
      neighborhood: raw.neighborhood,
      city: raw.city,
      uf: raw.uf,
      zipCode: raw.zipCode,
      isWhatsapp: raw.isWhatsapp,
      isMain: raw.isMain,
      tenantId: raw.tenantId,
    };
  }
}
