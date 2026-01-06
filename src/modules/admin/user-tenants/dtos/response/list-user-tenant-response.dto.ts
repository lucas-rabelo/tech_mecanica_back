import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ReadUserTenantResponseDto } from './read-user-tenant-response.dto';

export class ListUserTenantsResponseDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadUserTenantResponseDto] })
  @IsArray()
  userTenants: ReadUserTenantResponseDto[];
}
