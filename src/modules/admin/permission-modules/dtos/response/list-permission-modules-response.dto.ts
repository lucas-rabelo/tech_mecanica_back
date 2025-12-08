import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ReadPermissionModuleResponseDto } from './read-permission-module-response.dto';

export class ListPermissionModulesResponseDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadPermissionModuleResponseDto] })
  @IsArray()
  permissionModules: ReadPermissionModuleResponseDto[];
}
