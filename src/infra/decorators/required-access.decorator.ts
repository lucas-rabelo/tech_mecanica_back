import { SetMetadata } from '@nestjs/common';
import { ACCESS_KEY } from '../constants';

export type AccessRequirement = {
  module?: string;
  page?: string;
};

export const RequireAccess = (access: AccessRequirement) =>
  SetMetadata(ACCESS_KEY, access);