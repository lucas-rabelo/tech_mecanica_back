import { Injectable } from '@nestjs/common';
import { FilterListUserRequestDto, ListUserResponseDto } from '../../dtos';
import { UsersRepository } from '../../infra';

@Injectable()
export class ListUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    request: FilterListUserRequestDto,
  ): Promise<ListUserResponseDto> {
    try {
      const usersFounded = await this.usersRepository.list(request);

      return usersFounded;
    } catch (err) {
      throw err;
    }
  }
}
