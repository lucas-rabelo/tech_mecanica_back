import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ReadTenantStatusResponseDto } from '../../../tenant-status';

export class ReadTenantsResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;
  
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty({ type: ReadTenantStatusResponseDto, nullable: true })
  tenantStatus: ReadTenantStatusResponseDto | null;
  
  @ApiProperty()
  @IsString()
  subdomain: string;

  @ApiProperty()
  @IsDateString()
  createdAt: string;
  
  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsDateString()
  updatedAt: string | null;
}
