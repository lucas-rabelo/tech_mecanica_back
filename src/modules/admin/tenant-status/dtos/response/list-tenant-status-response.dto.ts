import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ReadTenantStatusResponseDto } from './read-tenant-status-response.dto';

export class ListTenantStatusResponseDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadTenantStatusResponseDto] })
  @IsArray()
  TenantStatus: ReadTenantStatusResponseDto[];
}
