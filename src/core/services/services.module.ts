import { Module } from "@nestjs/common";

import { GetConnectionService } from './get-connection.service'
import { RequestContextService } from './request-context.service'
import { TenantConnectionService } from './tenant-connection.service'

const services = [
  GetConnectionService,
  RequestContextService,
  TenantConnectionService,
];

@Module({
  providers: services,
  exports: services, 
})
export class ServicesModule {};
