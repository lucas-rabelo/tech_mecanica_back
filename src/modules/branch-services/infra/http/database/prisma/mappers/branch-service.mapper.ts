import {
  CreateBranchServiceRequestDto,
  ReadBranchServiceResponseDto,
} from '@/src/modules/branch-services/dto';
import { Branch, BranchService, Service } from '@prisma/client';

export class BranchServicePrismaMapper {
  static toPrisma(branchService: CreateBranchServiceRequestDto) {
    return {
      branchId: branchService.branchId,
      serviceId: branchService.serviceId,
      price: branchService.price,
    };
  }

  static toDomain(
    branchService: BranchService & { branch: Branch } & { service: Service },
  ): ReadBranchServiceResponseDto {
    return {
      id: branchService.id,
      service: branchService.service.name,
      branch: branchService.branch.name,
      description: branchService.service.description,
      price: branchService.price,
    };
  }
}
