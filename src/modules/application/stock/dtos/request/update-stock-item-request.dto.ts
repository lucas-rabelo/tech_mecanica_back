import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStockItemRequestDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sku: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  barcode: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  unit: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  location: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  minQuantity: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  currentQuantity: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  notes: string;

  @ApiProperty()
  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  isActive: boolean;
}
