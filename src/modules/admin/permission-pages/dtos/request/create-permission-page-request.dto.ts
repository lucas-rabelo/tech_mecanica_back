import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreatePermissionPageRequestDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  permissionId: number;
  
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  pageId: number;
}
