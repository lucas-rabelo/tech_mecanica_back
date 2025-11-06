import { PrismaModule } from '@/src/infra/config';
import { Module } from '@nestjs/common';
import {
  FindBranchInBranchContact,
  FindServiceInBranchContact,
} from './application/services';
import {
  CreateBranchContactsUseCase,
  DeleteBranchContactsUseCase,
  FindByIdBranchContactsUseCase,
  ListBranchContactsUseCase,
  UpdateBranchContactsUseCase,
} from './application/use-cases';
import {
  CreateBranchContactController,
  DeleteBranchContactController,
  FindByIdBranchContactsController,
  ListBranchContactsController,
  UpdateBranchContactsController,
} from './infra/http/controllers';
import { BranchContactsPrismaRepository } from './infra/http/database';

@Module({
  imports: [PrismaModule],
  providers: [
    FindServiceInBranchContact,
    FindBranchInBranchContact,
    CreateBranchContactsUseCase,
    DeleteBranchContactsUseCase,
    FindByIdBranchContactsUseCase,
    ListBranchContactsUseCase,
    UpdateBranchContactsUseCase,
    {
      provide: 'BranchContactsRepository',
      useClass: BranchContactsPrismaRepository,
    },
  ],
  controllers: [
    CreateBranchContactController,
    DeleteBranchContactController,
    FindByIdBranchContactsController,
    ListBranchContactsController,
    UpdateBranchContactsController,
  ],
  exports: [FindServiceInBranchContact, FindBranchInBranchContact],
})
export class BranchContactsModule {}
