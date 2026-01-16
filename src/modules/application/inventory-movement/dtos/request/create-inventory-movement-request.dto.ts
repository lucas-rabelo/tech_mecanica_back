import {
  InventoryMovementReason,
  InventoryMovementReferenceType,
  InventoryMovementType,
  type InventoryMovementReasonEnum,
  type InventoryMovementReferenceTypeEnum,
  type InventoryMovementTypeEnum,
} from '@/src/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateInventoryMovementRequestDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  stockItemId: number;

  @ApiProperty()
  @IsEnum(InventoryMovementType)
  type: InventoryMovementTypeEnum;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  balanceAfter: number;

  @ApiProperty()
  @IsEnum(InventoryMovementReason)
  reason: InventoryMovementReasonEnum;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsEnum(InventoryMovementReferenceType)
  referenceType: InventoryMovementReferenceTypeEnum;
}
