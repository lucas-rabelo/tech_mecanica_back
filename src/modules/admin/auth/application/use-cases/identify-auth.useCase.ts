import {
  ADMIN_USER_ID,
  IdentifyAuthNextStep,
  IdentifyAuthScope,
} from '@/src/core';
import { Injectable } from '@nestjs/common';
import type { UsersRepository } from '../../../users';
import type {
  IdentifyAuthRequestDto,
  IdentifyAuthResponseDto,
} from '../../dtos';
import { validationOfResponse } from '../../utils';

@Injectable()
export class IdentifyAuthUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    email,
  }: IdentifyAuthRequestDto): Promise<IdentifyAuthResponseDto> {
    let identifyObj: IdentifyAuthResponseDto = validationOfResponse[IdentifyAuthNextStep.PASSWORD];
    const userFounded = await this.usersRepository.findByEmail(email);

    if (!userFounded) {
      return identifyObj;
    }

    const hasOneTenant = userFounded.userTenants.length == 1;
    const hasMoreThanOneTenant = userFounded.userTenants.length > 1;
    const isAdminUser = userFounded.userTenants.some(
      (userTenant) => userTenant.permission.id === ADMIN_USER_ID,
    );

    if (hasOneTenant) {
      identifyObj = {
        ...validationOfResponse[IdentifyAuthNextStep.PASSWORD],
        tenants: userFounded.userTenants.map((userTenant) => ({
          id: userTenant.tenant.id,
          name: userTenant.tenant.name,
        })),
      };
    }

    if (hasMoreThanOneTenant && isAdminUser) {
      identifyObj = {
        ...validationOfResponse[IdentifyAuthNextStep.PASSWORD],
        tenants: userFounded.userTenants.map((userTenant) => ({
          id: userTenant.tenant.id,
          name: userTenant.tenant.name,
        })),
        scope: IdentifyAuthScope.ADMIN,
      };
    }

    if (hasMoreThanOneTenant && isAdminUser) {
      identifyObj = {
        ...validationOfResponse[IdentifyAuthNextStep.PASSWORD],
        scope: IdentifyAuthScope.ADMIN,
      };
    }

    return identifyObj;
  }
}
