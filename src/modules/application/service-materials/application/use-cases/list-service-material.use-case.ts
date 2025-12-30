import { Injectable } from '@nestjs/common';
import {
  FilterListServiceMaterialsRequestDto,
  ListServiceMaterialsResponseDto,
} from '../../dtos';
import { ServiceMaterialsRepository } from '../../infra';

@Injectable()
export class ListServiceMaterialUseCase {
  constructor(private readonly serviceMaterialsRepository: ServiceMaterialsRepository) {}

  async execute(
    request: FilterListServiceMaterialsRequestDto,
  ): Promise<ListServiceMaterialsResponseDto> {
    try {
      const serviceMaterialsFounded = await this.serviceMaterialsRepository.list(request);

      return serviceMaterialsFounded;
    } catch (err) {
      throw err;
    }
  }
}
