import { forwardRef, Module } from '@nestjs/common';

import {
  CreatePageUseCase,
  DeletePageUseCase,
  FindByIdPageUseCase,
  ListPageUseCase,
  UpdatePageUseCase,
} from './application/use-cases';

import {
  CreatePageController,
  DeletePageController,
  FindByIdPageController,
  ListPageController,
  UpdatePageController,
} from './infra/http/controllers';

import { AuthModule } from '../auth';
import { UsersModule } from '../users';
import { PageRepositoryTypeOrm, PagesRepository } from './infra/http/database';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
  controllers: [
    CreatePageController,
    DeletePageController,
    FindByIdPageController,
    ListPageController,
    UpdatePageController,
  ],
  providers: [
    CreatePageUseCase,
    DeletePageUseCase,
    FindByIdPageUseCase,
    ListPageUseCase,
    UpdatePageUseCase,
    {
      provide: PagesRepository,
      useClass: PageRepositoryTypeOrm,
    },
  ],
  exports: [],
})
export class PagesModule {}
