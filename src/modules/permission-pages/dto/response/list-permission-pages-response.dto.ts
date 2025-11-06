import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ReadPermissionPagesResponseDto } from './read-permission-pages-response.dto';

export class ListPermissionPagesResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadPermissionPagesResponseDto] })
  @IsArray()
  permissionPages: ReadPermissionPagesResponseDto[];
}
