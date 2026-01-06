import { Injectable } from '@nestjs/common';
import { FilterListUserRequestDto, ListUserResponseDto } from '../../../dtos';
import { UsersRepository } from '../../../infra';
import { IListUserUseCaseRequest } from './types';

@Injectable()
export class ListUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    isAdmin,
    request,
  }: IListUserUseCaseRequest): Promise<ListUserResponseDto> {
    try {
      let filters: FilterListUserRequestDto = request;
      if(!isAdmin) {
        filters = { ...request };
      }
      
      const usersFounded = await this.usersRepository.list(filters);

      return usersFounded;
    } catch (err) {
      throw err;
    }
  }
}
