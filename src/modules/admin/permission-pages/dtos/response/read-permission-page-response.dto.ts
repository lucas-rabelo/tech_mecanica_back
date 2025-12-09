import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';
import { ReadPageResponseDto, ReadPermissionResponseDto } from '../../..';

export class ReadPermissionPageResponseDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ type: () => ReadPermissionResponseDto, nullable: true })
  permission: ReadPermissionResponseDto | null;

  @ApiProperty({ type: () => ReadPageResponseDto, nullable: true })
  page: ReadPageResponseDto | null;

  @ApiProperty({ example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ nullable: true, example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  updatedAt: string | null;
}
