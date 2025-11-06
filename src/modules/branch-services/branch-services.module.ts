import { PrismaModule } from '@/src/infra/config';
import { forwardRef, Module } from '@nestjs/common';
import { ServicesModule } from '../services';
import {
  FindBranchInBranchService,
  FindServiceInBranchService,
} from './application/services';
import {
  CreateBranchServicesUseCase,
  DeleteBranchServicesUseCase,
  FindByIdBranchServicesUseCase,
  ListBranchServicesUseCase,
  UpdateBranchServicesUseCase,
} from './application/use-cases';
import {
  CreateBranchServiceController,
  DeleteBranchServiceController,
  FindByIdBranchServicesController,
  ListBranchServicesController,
  UpdateBranchServicesController,
} from './infra/http/controllers';
import { BranchServicesPrismaRepository } from './infra/http/database';

@Module({
  imports: [PrismaModule, forwardRef(() => ServicesModule)],
  providers: [
    FindServiceInBranchService,
    FindBranchInBranchService,
    CreateBranchServicesUseCase,
    DeleteBranchServicesUseCase,
    FindByIdBranchServicesUseCase,
    ListBranchServicesUseCase,
    UpdateBranchServicesUseCase,
    {
      provide: 'BranchServicesRepository',
      useClass: BranchServicesPrismaRepository,
    },
  ],
  controllers: [
    CreateBranchServiceController,
    DeleteBranchServiceController,
    FindByIdBranchServicesController,
    ListBranchServicesController,
    UpdateBranchServicesController,
  ],
  exports: [FindServiceInBranchService, FindBranchInBranchService],
})
export class BranchServicesModule {}
