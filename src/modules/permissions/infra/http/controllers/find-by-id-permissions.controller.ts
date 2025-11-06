import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
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
import { FindByIdPermissionsUseCase } from '../../../application/use-cases';

@ApiTags('Permissions')
@Controller('permissions')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdPermissionController {
  constructor(
    @Inject(forwardRef(() => FindByIdPermissionsUseCase))
    private readonly findByIdPermissionsUseCase: FindByIdPermissionsUseCase,
  ) {}

  @RequireAccess({ module: 'Permissions', page: 'FindPermission' })
  @ApiOperation({ summary: 'Encontrando uma permissão pelo id' })
  @ApiOkResponse()
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdPermissionsUseCase.execute(id);
  }
}
