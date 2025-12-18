import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';

export class ReadStockItemResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsString()
  barcode: string;

  @ApiProperty()
  @IsString()
  unit: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  minQuantity: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  currentQuantity: number;

  @ApiProperty()
  @IsString()
  notes: string;

  @ApiProperty()
  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean;

  @ApiProperty({ example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ nullable: true, example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  updatedAt: string | null;
}
