import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { ReadTenantsResponseDto } from '../../../tenants';
import { ReadPermissionResponseDto } from '../../../permissions';
import { ReadUserResponseDto } from '../../../users';

export class ReadUserTenantResponseDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ type: ReadTenantsResponseDto })
  tenant: ReadTenantsResponseDto;

  @ApiProperty({ type: ReadPermissionResponseDto })
  permission: ReadPermissionResponseDto;

  @ApiProperty({ type: ReadUserResponseDto })
  user: ReadUserResponseDto;
  
  @ApiProperty({ example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  createdAt: string;
  
  @ApiProperty({ nullable: true, example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  updatedAt: string | null;
}
