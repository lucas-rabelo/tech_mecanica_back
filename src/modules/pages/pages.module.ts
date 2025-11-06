import { PrismaModule } from '@/src/infra/config';
import { forwardRef, Module } from '@nestjs/common';
import { PermissionPagesModule } from '../permission-pages';
import {
  CreatePageUseCase,
  DeletePageUseCase,
  FindByIdPageUseCase,
  ListPageUseCase,
  UpdatePageUseCase,
} from './application/use-cases';
import {
  CreatePagesController,
  DeletePagesController,
  FindByIdPagesController,
  ListPagesController,
  UpdatePagesController,
} from './infra/http/controllers';
import { PagesPrismaRepository, PagesRepository } from './infra/http/database';

@Module({
  imports: [PrismaModule, forwardRef(() => PermissionPagesModule)],
  controllers: [
    CreatePagesController,
    DeletePagesController,
    FindByIdPagesController,
    ListPagesController,
    UpdatePagesController,
  ],
  providers: [
    CreatePageUseCase,
    DeletePageUseCase,
    FindByIdPageUseCase,
    ListPageUseCase,
    UpdatePageUseCase,
    {
      provide: PagesRepository,
      useClass: PagesPrismaRepository,
    },
  ],
})
export class PagesModule {}
