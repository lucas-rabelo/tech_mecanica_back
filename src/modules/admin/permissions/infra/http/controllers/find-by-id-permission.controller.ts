import { ErrorBadRequestResponseDto /*RequireAccess*/ } from '@/src/infra';
import {
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FindByIdPermissionUseCase } from '../../../application/use-cases';
import { ReadPermissionResponseDto } from '../../../dtos';

@ApiTags('Permissions')
@Controller('permissions')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdPermissionController {
  constructor(
    @Inject(forwardRef(() => FindByIdPermissionUseCase))
    private readonly findByIdPermissionUseCase: FindByIdPermissionUseCase,
  ) {}

  // @RequireAccess({ module: 'Permissions', page: 'FindPermission' })
  @ApiOperation({ summary: 'Finding a permission by ID' })
  @ApiOkResponse({ type: ReadPermissionResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdPermissionUseCase.execute(id);
  }
}
