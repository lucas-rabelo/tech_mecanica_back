import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateStockItemRequestDto {
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
}
