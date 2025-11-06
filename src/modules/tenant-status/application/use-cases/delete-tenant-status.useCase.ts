import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTenantStatusResponseDto } from '../../dto';
import { TenantStatusRepository } from '../../infra';
import { FindTenantStatusInTenantService } from '../services';

@Injectable()
export class DeleteTenantStatusUseCase {
  constructor(
    private readonly tenantStatusRepository: TenantStatusRepository,
    private readonly findTenantStatusInTenantService: FindTenantStatusInTenantService,
  ) {}

  async execute(id: number): Promise<CreateTenantStatusResponseDto> {
    const hasTenantUsingTenantStatus = await this.findTenantStatusInTenantService.execute(id);

    if(hasTenantUsingTenantStatus) {
      throw new ConflictException('This status is in use')
    }

    return this.tenantStatusRepository.delete(id);
  }
}
