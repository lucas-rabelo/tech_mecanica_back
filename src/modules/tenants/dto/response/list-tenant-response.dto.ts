import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { ReadTenantResponseDto } from './read-tenant-response.dto';

export class ListTenantResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadTenantResponseDto] })
  @IsArray()
  tenants: Omit<ReadTenantResponseDto, "branches">[]
}
