import {
  CreateBranchContactRequestDto,
  ReadBranchContactResponseDto,
} from '@/src/modules/branch-services/dto';
import { Branch, BranchContact, Service } from '@prisma/client';

export class BranchContactPrismaMapper {
  static toPrisma(branchContact: CreateBranchContactRequestDto) {
    return {
      branchId: branchContact.branchId,
      serviceId: branchContact.serviceId,
      price: branchContact.price,
    };
  }

  static toDomain(
    branchContact: BranchContact & { branch: Branch } & { service: Service },
  ): ReadBranchContactResponseDto {
    return {
      id: branchContact.id,
      service: branchContact.service.name,
      branch: branchContact.branch.name,
      description: branchContact.service.description,
      price: branchContact.price,
    };
  }
}
