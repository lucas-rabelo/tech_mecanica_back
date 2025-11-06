import {
  CreateBranchContactRequestDto,
  ReadBranchContactResponseDto,
} from '@/src/modules/branch-services/dto';
import { Branch, BranchContact } from '@prisma/client';

export class BranchContactPrismaMapper {
  static toPrisma(branchContact: CreateBranchContactRequestDto) {
    return {
      branchId: branchContact.branchId,
      phone: branchContact.phone,
      isWhatsapp: branchContact.isWhatsapp,
    };
  }

  static toDomain(
    branchContact: BranchContact & { branch: Branch },
  ): ReadBranchContactResponseDto {
    return {
      id: branchContact.id,
      branch: branchContact.branch.name,
      phone: branchContact.phone,
      isWhatsapp: branchContact.isWhatsapp,
    };
  }
}
