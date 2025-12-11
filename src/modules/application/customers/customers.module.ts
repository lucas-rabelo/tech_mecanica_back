import { forwardRef, Module } from '@nestjs/common';
import { AuthModule, UsersModule } from '../../admin';

import { ServicesModule } from '@/src/core';
import {
  CreateCustomerUseCase,
  DeleteCustomerUseCase,
  FindByIdCustomerUseCase,
  ListCustomerUseCase,
  UpdateCustomerUseCase,
} from './application/use-cases';

import {
  CreateCustomerController,
  DeleteCustomerController,
  FindByIdCustomerController,
  ListCustomerController,
  UpdateCustomerController,
} from './infra/http/controllers';

import {
  CustomerRepositoryTypeOrm,
  CustomersRepository,
} from './infra/http/database';

@Module({
  imports: [
    ServicesModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [
    CreateCustomerController,
    DeleteCustomerController,
    FindByIdCustomerController,
    ListCustomerController,
    UpdateCustomerController,
  ],
  providers: [
    CreateCustomerUseCase,
    DeleteCustomerUseCase,
    FindByIdCustomerUseCase,
    ListCustomerUseCase,
    UpdateCustomerUseCase,
    {
      provide: CustomersRepository,
      useClass: CustomerRepositoryTypeOrm,
    },
  ],
})
export class CustomersModule {}
