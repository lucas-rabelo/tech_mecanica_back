import { FindServiceInBranchService } from '@/src/modules/branch-services';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReadServiceResponseDto } from '../../dto';
import { ServicesRepository } from '../../infra/http';

@Injectable()
export class DeleteServicesUseCase {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    private readonly findServiceInBranchService: FindServiceInBranchService,
  ) {}

  async execute(id: number): Promise<ReadServiceResponseDto | null> {
    const serviceDeleted = await this.servicesRepository.delete(id);

    if (!serviceDeleted) {
      throw new NotFoundException('Service not found');
    }

    const serviceInUse = await this.findServiceInBranchService.execute(id);

    if (serviceInUse) {
      throw new NotFoundException(
        'Service is in use in branch services and cannot be deleted',
      );
    }

    return serviceDeleted;
  }
}
