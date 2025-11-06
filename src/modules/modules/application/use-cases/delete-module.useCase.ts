import { FindModuleInPermissionModulesService } from '@/src/modules/permission-modules';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ModuleRepository } from '../../infra';

@Injectable()
export class DeleteModuleUseCase {
  constructor(
    private readonly moduleRepository: ModuleRepository,
    private readonly findModuleInPermissionModulesService: FindModuleInPermissionModulesService,
  ) {}

  async execute(id: number) {
    const moduleInUse =
      await this.findModuleInPermissionModulesService.execute(id);

    if (moduleInUse) {
      throw new BadRequestException(
        'Module is in use in permission modules and cannot be deleted.',
      );
    }

    const moduleDeleted = await this.moduleRepository.delete(id);

    if (!moduleDeleted) {
      throw new BadRequestException('Module not deleted');
    }

    return moduleDeleted;
  }
}
