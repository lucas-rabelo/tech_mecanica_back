import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReadTenantsResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;
  
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsString()
  tenantStatus: string;
  
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
