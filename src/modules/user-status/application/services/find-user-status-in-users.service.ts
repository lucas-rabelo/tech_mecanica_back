import { FindByUserStatusIdUseCase } from '@/src/modules/users/application/use-cases';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserStatusInUsersService {
  constructor(
    private readonly findByUserStateIdUseCase: FindByUserStatusIdUseCase,
  ) {}

  async execute(id: number) {
    return await this.findByUserStateIdUseCase.execute(id);
  }
}
