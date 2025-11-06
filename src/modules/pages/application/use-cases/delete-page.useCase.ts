import { HttpMessages, MessageType, MethodType } from '@/src/infra';
import { FindPageInPermissionPagesService } from '@/src/modules/permission-pages';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PagesRepository } from '../../infra';

@Injectable()
export class DeletePageUseCase {
  constructor(
    private readonly pagesRepository: PagesRepository,
    private readonly findPageInPermissionPagesService: FindPageInPermissionPagesService,
  ) {}

  async execute(id: number) {
    try {
      const pageInPermissionPages =
        await this.findPageInPermissionPagesService.execute(id);
  
      if (pageInPermissionPages) {
        throw new BadRequestException(
          HttpMessages[MessageType.BAD_REQUEST][MethodType.DELETE]('Page'),
        );
      }
  
      const pageDeleted = await this.pagesRepository.delete(id);
  
      if(!pageDeleted) {
        throw new BadRequestException(
          HttpMessages[MessageType.NOT_FOUND][MethodType.DELETE]('Page'),
        );
      }
  
      return pageDeleted
    } catch(error) {
      throw error;
    }
  }
}
