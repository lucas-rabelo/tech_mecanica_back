import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreatePermissionModuleRequestDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  permissionId: number;
  
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  moduleId: number;
}
