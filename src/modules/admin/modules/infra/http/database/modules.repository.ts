import { BaseRepository } from '@/src/core/repositories';
import {
  CreateModuleRequestDto,
  FilterListModuleRequestDto,
  ListModulesResponseDto,
  ReadModuleResponseDto,
} from '../../../dtos';

export abstract class ModulesRepository extends BaseRepository<
  CreateModuleRequestDto,
  ReadModuleResponseDto,
  CreateModuleRequestDto,
  ListModulesResponseDto,
  FilterListModuleRequestDto
> { }
