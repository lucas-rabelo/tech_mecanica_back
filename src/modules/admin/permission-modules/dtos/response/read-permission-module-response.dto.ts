import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';
import { ReadModuleResponseDto, ReadPermissionResponseDto } from '../../..';

export class ReadPermissionModuleResponseDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ type: () => ReadPermissionResponseDto, nullable: true })
  permission: ReadPermissionResponseDto | null;

  @ApiProperty({ type: () => ReadModuleResponseDto, nullable: true })
  module: ReadModuleResponseDto | null;

  @ApiProperty({ example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ nullable: true, example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  updatedAt: string | null;
}
