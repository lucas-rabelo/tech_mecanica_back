import { HttpMessages, MessageType, MethodType } from '@/src/infra';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePageRequestDto } from '../../dto';
import { PagesRepository } from '../../infra';

@Injectable()
export class CreatePageUseCase {
  constructor(private readonly pagesRepository: PagesRepository) {}

  async execute(request: CreatePageRequestDto) {
    const pageCreated = await this.pagesRepository.create(request);

    return pageCreated;
  }
}
