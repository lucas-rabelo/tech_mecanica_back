import {
  InventoryMovementReasonEnum,
  InventoryMovementReferenceTypeEnum,
  InventoryMovementTypeEnum,
} from '@/src/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReadInventoryMovementResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  stockItemId: number;

  @ApiProperty()
  @IsEnum(InventoryMovementTypeEnum)
  type: InventoryMovementTypeEnum;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  balanceAfter: number;

  @ApiProperty()
  @IsEnum(InventoryMovementReasonEnum)
  reason: InventoryMovementReasonEnum;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsEnum(InventoryMovementReferenceTypeEnum)
  referenceType: InventoryMovementReferenceTypeEnum;

  @ApiProperty({ example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  createdAt: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  createdBy?: number;
}
