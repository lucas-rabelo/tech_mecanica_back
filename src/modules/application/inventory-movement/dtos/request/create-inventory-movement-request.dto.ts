import {
  InventoryMovementReasonEnum,
  InventoryMovementReferenceTypeEnum,
  InventoryMovementTypeEnum,
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
}
