import { PrismaModule } from '@/src/infra/config';
import { forwardRef, Module } from '@nestjs/common';
import { BranchServicesModule } from '../branch-services';
import { FormattedAddressBranchService } from './application/services';
import {
  CreateBranchUseCase,
  DeleteBranchUseCase,
  FindByIdBranchUseCase,
  ListBranchUseCase,
  UpdateBranchUseCase,
} from './application/use-cases';
import {
  CreateBranchController,
  DeleteBranchController,
  FindByIdBranchController,
  ListBranchController,
  UpdateBranchController,
} from './infra/http/controllers';
import {
  BranchesPrismaRepository,
  BranchesRepository,
} from './infra/http/database';

@Module({
  imports: [PrismaModule, forwardRef(() => BranchServicesModule)],
  controllers: [
    CreateBranchController,
    DeleteBranchController,
    FindByIdBranchController,
    ListBranchController,
    UpdateBranchController,
  ],
  providers: [
    CreateBranchUseCase,
    DeleteBranchUseCase,
    FindByIdBranchUseCase,
    ListBranchUseCase,
    UpdateBranchUseCase,
    FormattedAddressBranchService,
    {
      provide: BranchesRepository,
      useClass: BranchesPrismaRepository,
    },
  ],
})
export class BranchesModule {}
