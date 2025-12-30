import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ReadServiceResponseDto } from '../../../services';
import { ReadStockItemResponseDto } from '../../../stock';

export class ReadServiceMaterialResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({ type: ReadServiceResponseDto, nullable: true })
  @IsOptional()
  service: ReadServiceResponseDto | null;

  @ApiProperty({ type: ReadStockItemResponseDto, nullable: true })
  @IsOptional()
  stock: ReadStockItemResponseDto | null;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ nullable: true, example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  updatedAt: string | null;
}
