import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ReadPermissionResponseDto } from './read-permission-response.dto';

export class ListPermissionsResponseDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadPermissionResponseDto] })
  @IsArray()
  permissions: ReadPermissionResponseDto[];
}
