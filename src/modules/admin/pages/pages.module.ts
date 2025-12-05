import { PagesEntity } from '@/src/infra';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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

import {
  PageRepositoryTypeOrm,
  PagesRepository,
} from './infra/http/database';

@Module({
  imports: [TypeOrmModule.forFeature([PagesEntity])],
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
