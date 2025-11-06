import { PrismaModule } from '@/src/infra/config';
import { forwardRef, Module } from '@nestjs/common';
import { BranchServicesModule } from '../branch-services';
import {
  CreateServicesUseCase,
  DeleteServicesUseCase,
  FindByIdServicesUseCase,
  ListServicesUseCase,
  UpdateServicesUseCase,
} from './application/use-cases';
import {
  CreateServiceController,
  DeleteServiceController,
  FindByIdServicesController,
  ListServicesController,
  UpdateServicesController,
} from './infra/http/controllers';
import {
  ServicesPrismaRepository,
  ServicesRepository,
} from './infra/http/database';

@Module({
  imports: [PrismaModule, forwardRef(() => BranchServicesModule)],
  controllers: [
    CreateServiceController,
    DeleteServiceController,
    FindByIdServicesController,
    ListServicesController,
    UpdateServicesController,
  ],
  providers: [
    CreateServicesUseCase,
    DeleteServicesUseCase,
    FindByIdServicesUseCase,
    ListServicesUseCase,
    UpdateServicesUseCase,
    {
      provide: ServicesRepository,
      useClass: ServicesPrismaRepository,
    },
  ],
})
export class ServicesModule {}
