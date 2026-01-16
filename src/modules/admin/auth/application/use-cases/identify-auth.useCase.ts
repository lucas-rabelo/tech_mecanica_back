import { IdentifyAuthNextStep, IdentifyAuthScope } from '@/src/core';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../users';
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
    let identifyObj: IdentifyAuthResponseDto =
      validationOfResponse[IdentifyAuthNextStep.PASSWORD];
    const userFounded = await this.usersRepository.findByEmail(email);

    if (!userFounded) {
      return identifyObj;
    }

    const hasOneTenant = userFounded.userTenants.length == 1;
    const hasMoreThanOneTenant = userFounded.userTenants.length > 1;

    const isAdminUser = userFounded.typeUser === IdentifyAuthScope.ADMIN;
    const isSupportUser = userFounded.typeUser === IdentifyAuthScope.SUPPORT;
    const isUser = userFounded.typeUser === IdentifyAuthScope.USER;

    const tenants = hasMoreThanOneTenant
      ? userFounded.userTenants.map((userTenant) => ({
          id: userTenant.tenant.id,
          name: userTenant.tenant.name,
        }))
      : [];

    if (hasOneTenant && isUser) {
      identifyObj = {
        ...validationOfResponse[IdentifyAuthNextStep.PASSWORD],
        tenants,
        scope: IdentifyAuthScope.USER,
      };
    }

    if (hasOneTenant && isSupportUser) {
      identifyObj = {
        ...validationOfResponse[IdentifyAuthNextStep.PASSWORD],
        tenants,
        scope: IdentifyAuthScope.SUPPORT,
      };
    }

    if (hasOneTenant && isAdminUser) {
      identifyObj = {
        ...validationOfResponse[IdentifyAuthNextStep.PASSWORD],
        tenants,
        scope: IdentifyAuthScope.ADMIN,
      };
    }

    if (hasMoreThanOneTenant && isAdminUser) {
      identifyObj = {
        ...validationOfResponse[IdentifyAuthNextStep.SELECT_TENANT],
        tenants,
        scope: IdentifyAuthScope.ADMIN,
      };
    }

    if (hasMoreThanOneTenant && isSupportUser) {
      identifyObj = {
        ...validationOfResponse[IdentifyAuthNextStep.SELECT_TENANT],
        tenants,
        scope: IdentifyAuthScope.SUPPORT,
      };
    }
    
    if (hasMoreThanOneTenant && isSupportUser) {
      identifyObj = {
        ...validationOfResponse[IdentifyAuthNextStep.SELECT_TENANT],
        tenants,
        scope: IdentifyAuthScope.SUPPORT,
      };
    }

    return identifyObj;
  }
}
