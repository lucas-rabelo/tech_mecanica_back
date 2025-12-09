import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ReadPermissionPageResponseDto } from './read-permission-page-response.dto';

export class ListPermissionPagesResponseDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadPermissionPageResponseDto] })
  @IsArray()
  permissionPages: ReadPermissionPageResponseDto[];
}
