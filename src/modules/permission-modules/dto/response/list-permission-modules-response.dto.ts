import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ReadPermissionModulesResponseDto } from './read-permission-modules-response.dto';

export class ListPermissionModulesResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadPermissionModulesResponseDto] })
  @IsArray()
  permissionModules: ReadPermissionModulesResponseDto[];
}
