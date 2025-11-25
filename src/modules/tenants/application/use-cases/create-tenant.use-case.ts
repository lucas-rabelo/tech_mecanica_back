import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTenantsRequestDto, ReadTenantsResponseDto } from '../../dtos';
import { TenantsRepository } from '../../infra';

@Injectable()
export class CreateTenantUseCase {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  async execute(
    request: CreateTenantsRequestDto,
  ): Promise<ReadTenantsResponseDto | null> {
    const subdomainAlreadyExists = await this.tenantsRepository.findBySubdomain(
      request.subdomain,
    );

    if (subdomainAlreadyExists) {
      throw new ApplicationException(
        DEFAULT_MESSAGES.ERROR_CREATE + ' Subdomain already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.tenantsRepository.create(request);
  }
}
