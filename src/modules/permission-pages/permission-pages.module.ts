import { PrismaModule } from '@/src/infra/config';
import { Module } from '@nestjs/common';
import {
  FindPageInPermissionPagesService,
  FindPermissionInPermissionPagesService,
} from './application/services';
import {
  CreatePermissionPageUseCase,
  DeletePermissionPageUseCase,
  FindByIdPermissionPagesUseCase,
  ListPermissionPageUseCase,
  UpdatePermissionPageUseCase,
} from './application/use-cases';
import {
  CreatePermissionPagesController,
  DeletePermissionPagesController,
  FindByIdPermissionPagesController,
  ListPermissionPagesController,
  UpdatePermissionPagesController,
} from './infra/http/controllers';
import { PermissionPagesPrismaRepository } from './infra/http/database';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreatePermissionPagesController,
    DeletePermissionPagesController,
    FindByIdPermissionPagesController,
    ListPermissionPagesController,
    UpdatePermissionPagesController,
  ],
  providers: [
    FindPageInPermissionPagesService,
    FindPermissionInPermissionPagesService,
    CreatePermissionPageUseCase,
    DeletePermissionPageUseCase,
    FindByIdPermissionPagesUseCase,
    ListPermissionPageUseCase,
    UpdatePermissionPageUseCase,

    {
      provide: 'PermissionPagesRepository',
      useClass: PermissionPagesPrismaRepository,
    },
  ],
  exports: [
    FindPageInPermissionPagesService,
    FindPermissionInPermissionPagesService,
  ],
})
export class PermissionPagesModule {}
